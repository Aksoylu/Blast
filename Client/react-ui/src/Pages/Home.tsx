'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, useColorMode, VStack } from '@chakra-ui/react';
import Split from 'react-split';

import { TreeNodeProps } from '../Components/FileTree/TreeNode';
import { WorkspacePanel } from '../Components/WorkspacePanel';
import { HttpRequestPanel } from '../Components/HttpRequestPanel/index';

import "./Home.css";

const workspace_1 = [
  {
    id: '1',
    name: 'Test Folder',
    isCollection: true,
    isFolder: true,
    children: [
      { id: '2', name: 'get isteği', isFolder: false },
      {
        id: '3',
        name: 'subfolder',
        isFolder: true,
        children: [
          { id: '4', name: 'put deneme', isFolder: false },
        ],
      },
    ],
  },
  {
    id: '6',
    name: 'Deneme',
    isCollection: true,
    isFolder: true,
    children: [
      { id: '7', name: 'Post req test', isFolder: false }
    ],
  },
  {
    id: '5',
    name: 'get2',
    isFolder: false,
  },
];


export const Home = () => {
  const { colorMode } = useColorMode();
  const [treeData, setTreeData] = useState<TreeNodeProps[]>(workspace_1);

  
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [verticalSplitterHeight, setVerticalSplitterHeight] = useState<number | null>(null);

  const leftPanelRatio = 15;
  const rightPanelRatio = 85;
  
  const defaultTopPanelHeight = 300;
  const defaultBottomPanelHeight = 100;

  const screenWidth = window.innerWidth
  const minimumleftPanelSize = screenWidth * (leftPanelRatio / 100);
  const minimumRightPanelSize = screenWidth * (35 / 100);


  // #region UI Functions

  const updateHeight = () => {
    const topOffset = wrapperRef.current?.getBoundingClientRect().top || 0;
    const windowHeight = window.innerHeight;
    const verticalSplitterHeight = windowHeight - topOffset;
    setVerticalSplitterHeight(verticalSplitterHeight);

  };
  // #endregion

  //#region UI Hooks
  useEffect(() => {
    const splitPanelDividers = document.querySelectorAll('.gutter')

    const dividerColor = colorMode === "dark" ? "#4A5568" : "#CBD5E0";

    splitPanelDividers.forEach(divider => {
      divider.setAttribute("style", `background-color:${dividerColor}`);
    });

  }, [colorMode]);


  useLayoutEffect(() => {

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);


  //#endregion

  return (
    <Box ref={wrapperRef} width="100%" height="100%" position="relative" >
      <Box
        height={`${verticalSplitterHeight}px`}
        display="flex"
        width="100%"
        position="relative"
      >
        <Split
          className="horizontal-split"
          sizes={[leftPanelRatio, rightPanelRatio]}
          minSize={[minimumleftPanelSize, minimumRightPanelSize]}
          direction="horizontal"
          gutterSize={2}
        >
          <Box height="100%" pr={3}><WorkspacePanel data={treeData} onTreeChange={setTreeData} /></Box>
          <Box height="100%" pl={3}>
            <Split

              className="vertical-split"
              sizes={[defaultTopPanelHeight, defaultBottomPanelHeight]}
              minSize={[100, 25]}
              gutterSize={4}
              direction="vertical"
            >
              <Box height="100%"><HttpRequestPanel initialRequestData_={undefined} /></Box>
              <Box height="100%" bg="blue.100">Bottom Panel</Box>
            </Split>
          </Box>
        </Split>
      </Box>
    </Box>

  )
}
