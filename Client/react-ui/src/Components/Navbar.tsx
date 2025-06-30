import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex, Text, FlexProps, HStack, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, useColorModeValue, VStack, Button, useColorMode } from "@chakra-ui/react"
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi"
import { EnvironmentSelector } from "./EnvironmentSelector";

interface NavbarProps extends FlexProps {
    onOpen: () => void
}

export const Navbar = ({ onOpen, ...rest }: NavbarProps) => {
    const { colorMode, toggleColorMode } = useColorMode();

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
                                    src={
                                        'https://media.licdn.com/dms/image/v2/D4D03AQGLOJAeptkKNg/profile-displayphoto-shrink_800_800/B4DZSHqy.6G4Ac-/0/1737442931161?e=1754524800&v=beta&t=YMJDBXwiLQ2D8GyC2VVdhispFH7QWdu3bNzQvP6HY6I'
                                    }
                                />

                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">
                                    <Text fontSize="sm">Emrullah</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        BT Uzman
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
