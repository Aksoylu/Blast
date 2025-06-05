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
        <Text>test</Text>
        <MenuList>
            <MenuItem icon={<AddIcon />}>
                Create new configuration
            </MenuItem>
            <MenuDivider />

            <MenuItem icon={<FiCheck />}>
                New Window
            </MenuItem>
            <MenuItem pl="9">
                Empty menu item
            </MenuItem>

            <MenuItem pl="9">
                Empty menu item
            </MenuItem>
            <MenuItem pl="9">
                Empty menu item
            </MenuItem>
        </MenuList>
    </Menu>);
}