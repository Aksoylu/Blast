'use client'
import { useEffect, useState } from 'react';
import { Box, useColorMode, VStack } from '@chakra-ui/react';

import { VerticalLayout } from './VerticalLayout';
import { HorizontalLayout } from './HorizontalLayout';

import "./Home.css";



export const Home = () => {
  const { colorMode } = useColorMode();
  const [mainPanelLayoutType, setMainPanelLayoutType] = useState<'vertical' | 'horizontal'>("vertical");

  // #region UI Functions
  const onChangeLayoutButtonClick = () => {
    const newLayoutType = mainPanelLayoutType == "vertical" ? "horizontal" : "vertical";
    setMainPanelLayoutType(newLayoutType);
  }
  // #endregion

  //#region UI Hooks
  useEffect(() => {
    const splitPanelDividers = document.querySelectorAll('.gutter')
    const dividerColor = colorMode === "dark" ? "#4A5568" : "#CBD5E0";
    splitPanelDividers.forEach(divider => {
      divider.setAttribute("style", `background-color:${dividerColor}`);
    });

  }, [colorMode]);
  //#endregion

  return (mainPanelLayoutType == "vertical" ? <VerticalLayout /> : <HorizontalLayout />);
}
