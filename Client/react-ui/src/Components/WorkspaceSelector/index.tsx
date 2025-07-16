import { useMainStore } from "#/MainStore";
import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import { IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useDisclosure } from "@chakra-ui/react";
import { FiCheck } from "react-icons/fi";
import { InputModal, InputModalRef } from "./InputModal";
import React, { useEffect } from "react";

export const WorkspaceSelector = ({ }) => {
    const inputModalRef = React.useRef<InputModalRef | null>(null);

    const setLocaleWorkSpaceList = useMainStore((state) => state.setLocaleWorkSpaceList)
    const { localeWorkSpaceList } = useMainStore();

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
            await createNewWorkspace(workspaceName);
            await loadWorkspaceList();
        }
        catch (e) {
            // throw toast
        }

        loadWorkspaceList();
    }

    return (<Menu>
        <InputModal ref={inputModalRef} actionResult={onAddWorkspaceActionResult} />
        <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
        />
        <Text>Example Workspace 1</Text>
        <MenuList>
            <MenuItem icon={<AddIcon />} onClick={onAddNewWorkspaceButtonClick}>
                Add new workspace
            </MenuItem>
            <MenuDivider />
            {localeWorkSpaceList.map((workspaceName, index) => {
                return (<MenuItem icon={<FiCheck />} key={`workspace_${index}`}>
                    {workspaceName.Name}
                </MenuItem>);
            })}
        </MenuList>
    </Menu>);
}