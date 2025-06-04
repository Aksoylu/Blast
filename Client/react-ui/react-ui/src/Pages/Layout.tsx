'use client'

import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'

import { Home } from './Home'
import { Teams } from './Teams'
import { Settings } from './Settings'
import { Configurations } from './Configurations'

import { SideMenu } from '../Components/SideMenu'
import { Navbar } from '../Components/Navbar'
import { Pages } from '../Constants/Enums/Pages'
import { useTranslation } from 'react-i18next'

export const Layout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activePage, setActivePage] = useState<Pages>(Pages.Home);

  const MotionBox = motion<BoxProps>(Box)

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SideMenu
        display={{ base: 'none', md: 'block' }}

        onClose={() => onClose}
        onSelectPage={setActivePage} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SideMenu onClose={onClose} onSelectPage={setActivePage} />
        </DrawerContent>
      </Drawer>
      <Navbar onOpen={onOpen} />

      <Box ml={{ base: 0, md: 60 }} p="4">
        <AnimatePresence mode="wait">
          <MotionBox
            key={activePage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activePage === Pages.Home && <Home />}
            {activePage === Pages.Teams && <Teams />}
            {activePage === Pages.Configurations && <Configurations />}
            {activePage === Pages.Settings && <Settings />}
          </MotionBox>
        </AnimatePresence>
      </Box>
    </Box>
  )
}

export default Layout