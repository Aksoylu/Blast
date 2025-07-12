'use client'

import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps
} from '@chakra-ui/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'

import { Home } from './Home/index'
import { Teams } from './Teams'
import { Settings } from './Settings'
import { Configurations } from './Configurations'

import { SideMenu, Navbar } from '#/Components';

import { Pages } from '#/Enums'

export const Layout = () => {
  const layoutRef = useRef<HTMLDivElement>(null);

  const [layoutHeight, setLayoutHeight] = useState<number | null>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activePage, setActivePage] = useState<Pages>(Pages.Home);

  const pages = {
    [Pages.Home]: Home,
    [Pages.Teams]: Teams,
    [Pages.Configurations]: Configurations,
    [Pages.Settings]: Settings,
  };

  // #region UI Functions
  const updateHeight = () => {
    const topOffset = layoutRef.current?.getBoundingClientRect().top || 0;
    const windowHeight = window.innerHeight - 10;
    const newLayoutHeight = windowHeight - topOffset;
    setLayoutHeight(newLayoutHeight);
  };
  //#endregion

  //#region UI Hooks
  useLayoutEffect(() => {
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);
  //#endregion


  return (
    <Box minH="100vh" overflow="hidden" bg={useColorModeValue('gray.100', 'gray.900')}>
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

      <Box ml={{ base: 0, md: 40 }} p={2} overflow="hidden" ref={layoutRef} height={`${layoutHeight}px`} position="relative">
        {Object.entries(pages).map(([key, PageComponent]) => {
          const isActive = key === activePage.toString();

          return (
            <motion.div
              key={key}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                display: "block",
                pointerEvents: isActive ? "auto" : "none",
                zIndex: isActive ? 1 : 0,
              }}
              animate={{
                opacity: isActive ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <PageComponent />
            </motion.div>
          );
        })}
      </Box>
    </Box>
  )
}

export default Layout