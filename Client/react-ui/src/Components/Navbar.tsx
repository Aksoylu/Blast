import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex, Text, FlexProps, HStack, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, useColorModeValue, VStack, Button, useColorMode } from "@chakra-ui/react"
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi"
import { EnvironmentSelector } from "./EnvironmentSelector";
import { useMainStore } from "#/MainStore";

interface NavbarProps extends FlexProps {
    onOpen: () => void
}

export const Navbar = ({ onOpen, ...rest }: NavbarProps) => {
    const { colorMode, toggleColorMode } = useColorMode();

    const { userSession } = useMainStore();

    /**
     * @description: Inner component
     */
    const renderProfileImage = () => {
        if (userSession?.ProfileImage === undefined || userSession?.ProfileImage.length === 0) {
            return (<Avatar
                size={'sm'}
                src={"assets/defaultProfilePhoto.png"}
            />);
        }

        return (<Avatar
            size={'sm'}
            src={userSession?.ProfileImage}
        />)
    }

    return (
        <Flex
            ml={{ base: 0, md: 40 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between' }}
            {...rest}>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <HStack spacing={4}>
                <EnvironmentSelector />
            </HStack>

            <HStack spacing={{ base: '0', md: '6' }}>
                <Button onClick={toggleColorMode}>
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                            <HStack>

                                <Avatar
                                    size={'sm'}
                                    src={userSession?.ProfileImage}
                                />

                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">
                                    <Text fontSize="sm">{userSession?.Name} {userSession?.Surname}</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        {userSession?.UserName}
                                    </Text>

                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <Box pl={3} color="gray.400">{userSession?.Organization}</Box>
                            <MenuDivider />
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuDivider />
                            <MenuItem>Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    )
}
