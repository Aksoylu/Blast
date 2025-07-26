import { useMainStore } from "#/MainStore";
import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";

import { useToast, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { FiCheck, FiCircle } from "react-icons/fi";
import { InputModal, InputModalRef } from "./InputModal";
import React, { useEffect } from "react";
import { HttpRequestCollection, Workspace } from "#/Models";
import { useHomePageStore } from "#/Pages/Home/Store";


export const WorkspaceSelector = ({ }) => {
    const inputModalRef = React.useRef<InputModalRef | null>(null);
    const toast = useToast();

    const { localeWorkSpaceList, activeWorkspace } = useMainStore();

    const setLocaleWorkSpaceList = useMainStore((state) => state.setLocaleWorkSpaceList);
    const setActiveWorkspace = useMainStore((state) => state.setActiveWorkspace);
    const setCollectionList = useMainStore((state) => state.setCollectionList);


    // #region LifeCycle
    useEffect(() => {
        loadWorkspaceList();
    }, []);

    // #region Service Functions
    const loadWorkspaceList = async () => {
        const getLocaleWorkspaceListResult = await window.electronAPI.WorkspaceService.GetLocaleWorkspaceList();
        if (!getLocaleWorkspaceListResult.success) {
            throw new Error(getLocaleWorkspaceListResult.message);
        }

        setLocaleWorkSpaceList(getLocaleWorkspaceListResult.workspaceList);
    }

    const createNewWorkspace = async (workspaceName: string) => {
        const createLocaleWorkspaceResult = await window.electronAPI.WorkspaceService.CreateLocaleWorkspace(workspaceName);
        if (!createLocaleWorkspaceResult.success) {
            throw new Error(createLocaleWorkspaceResult.message);
        }
    }

    const updateSessionInfo = async (selectedWorkspace: Workspace) => {
        const updatedSession = useMainStore.getState().userSession;
        if (updatedSession === undefined) {
            throw new Error("User session is not exist");
        }

        const saveSessionInfoToStorageResult = await window.electronAPI.UserSessionService.SaveSessionInfoToStorage(updatedSession);
        if (!saveSessionInfoToStorageResult.success) {
            throw new Error(saveSessionInfoToStorageResult.message);
        }

    }

    const readCollectionList = async (selectedWorkspace: Workspace) => {
        let collectionList = [] as HttpRequestCollection[];

        if (selectedWorkspace.Storage === "locale") {
            const getLocaleCollectionListResult = await window.electronAPI.HttpCollectionService.GetLocaleCollectionList(selectedWorkspace.Id)
            if (!getLocaleCollectionListResult.success) {
                throw new Error(getLocaleCollectionListResult.message);
            }

            collectionList = getLocaleCollectionListResult.CollectionList;
        }
        else if (selectedWorkspace.Storage === "remote") {
            // todo
        }

        setCollectionList(collectionList);
    }

    // #region UI Actions
    const onAddNewWorkspaceButtonClick = () => {
        inputModalRef.current?.show();
    }

    const onAddWorkspaceActionResult = async (workspaceName: string) => {
        try {
            await createNewWorkspace(workspaceName.toString());
            await loadWorkspaceList();
        }
        catch (exception) {
            toast({
                title: 'Error',
                description: exception.toString(),
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const onSelectedWorkspaceChange = async (selectedWorkspace: Workspace) => {
        if (selectedWorkspace.Id === activeWorkspace?.Id) {
            return;
        }

        try {
            setActiveWorkspace(selectedWorkspace);
            await updateSessionInfo(selectedWorkspace);
            await readCollectionList(selectedWorkspace);
        }
        catch (exception) {
            toast({
                title: 'Error',
                description: exception.toString(),
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    return (<Menu>
        <InputModal ref={inputModalRef} actionResult={onAddWorkspaceActionResult} />
        <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
        />
        <Text>{activeWorkspace?.Name}</Text>
        <MenuList>
            <MenuItem icon={<AddIcon />} onClick={onAddNewWorkspaceButtonClick}>
                Add new workspace
            </MenuItem>
            <MenuDivider />
            {localeWorkSpaceList.map((workspace, index) => {
                const isCurrentWorkspace = (workspace.Id == activeWorkspace?.Id);

                return (<MenuItem
                    onClick={() => { onSelectedWorkspaceChange(workspace) }}
                    icon={isCurrentWorkspace ? <FiCheck /> : <FiCircle />}
                    key={`workspace_${workspace.Id}`}>
                    {workspace.Name}
                </MenuItem>);
            })}
        </MenuList>
    </Menu>);
}