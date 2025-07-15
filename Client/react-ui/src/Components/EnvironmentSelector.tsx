import { useMainStore } from "#/MainStore";
import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import { IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { FiCheck } from "react-icons/fi";

export const EnvironmentSelector = ({ }) => {
    const { localeWorkSpaceList } = useMainStore();

    const renderWorkspaceSelection = (index: number, workspaceName: string) => {
        return (<MenuItem icon={<FiCheck />}>
            {workspaceName}
        </MenuItem>);
    }

    return (<Menu>
        <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
        />
        <Text>Example Workspace 1</Text>
        <MenuList>
            <MenuItem icon={<AddIcon />}>
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