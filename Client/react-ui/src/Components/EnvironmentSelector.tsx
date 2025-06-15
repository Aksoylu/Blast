import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import { IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { FiCheck } from "react-icons/fi";

export const EnvironmentSelector = ({ }) => {
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

            <MenuItem icon={<FiCheck />}>
                Example Workspace 1
            </MenuItem>
            <MenuItem pl="9">
                Example Workspace 2
            </MenuItem>

            <MenuItem pl="9">
                Example Workspace 3
            </MenuItem>
            <MenuItem pl="9">
                Example Workspace 4
            </MenuItem>
        </MenuList>
    </Menu>);
}