import { useMainStore } from "#/MainStore";
import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";

import { useToast, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useDisclosure } from "@chakra-ui/react";
import { FiCheck, FiCircle } from "react-icons/fi";
import { InputModal, InputModalRef } from "./InputModal";
import React, { useEffect } from "react";
import { Workspace } from "#/Models";

export const WorkspaceSelector = ({ }) => {
    const inputModalRef = React.useRef<InputModalRef | null>(null);
    const toast = useToast();

    const setLocaleWorkSpaceList = useMainStore((state) => state.setLocaleWorkSpaceList);
    const setActiveWorkspace = useMainStore((state) => state.setActiveWorkspace);

    const { localeWorkSpaceList, activeWorkspace } = useMainStore();

    // #region LifeCycle
    useEffect(() => {
        loadWorkspaceList();
    }, []);

    // #region UI Actions
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

        setActiveWorkspace(selectedWorkspace);

        const updatedSession = useMainStore.getState().userSession;

        if (updatedSession !== undefined) {
            await window.electronAPI.UserSessionService.SaveSessionInfoToStorage(updatedSession);

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