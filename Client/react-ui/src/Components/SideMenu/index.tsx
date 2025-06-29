'use client'

import { useTranslation } from 'react-i18next'

import {
    Box,
    CloseButton,
    Flex,
    useColorModeValue,
    Text,
    BoxProps,
} from '@chakra-ui/react'

import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiFileText,
    FiFolder
} from 'react-icons/fi'
import { IconType } from 'react-icons'

import { Pages } from '#/Enums'

import { SideMenuItem } from './SideMenuItem'



interface SideMenuProps extends BoxProps {
    onClose: () => void;
    onSelectPage: (page: Pages) => void;
}

interface LinkItemProps {
    key: Pages;
    icon: IconType;
    translationKey: string;
}
const LinkItems: Array<LinkItemProps> = [
    { key: Pages.Home, icon: FiHome , translationKey: "page_home"},
    { key: Pages.Teams, icon: FiCompass, translationKey: "page_teams"},
    { key: Pages.Configurations, icon: FiFolder, translationKey: "page_configurations"},
    { key: Pages.Settings, icon: FiSettings, translationKey: "page_settings"}
];

export const SideMenu = ({ onClose, onSelectPage, ...rest }: SideMenuProps) => {
  const { t } = useTranslation();

    const onMenuItemClick = (selectedPage: Pages) => {
        onSelectPage(selectedPage);
        onClose();
    }

    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 40 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="4" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Blast
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>

            {LinkItems.map((link) => (
                <SideMenuItem key={link.key} icon={link.icon} onClick={() => {
                    onMenuItemClick(link.key);
                }}>
                    <div style={{fontSize: 12}}>{t(link.translationKey)}</div>
                </SideMenuItem>
            ))}
        </Box>
    )
}