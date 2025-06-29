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

  const leftPanelRatio = 15;
  const rightPanelRatio = 85;

  const screenWidth = window.innerWidth
  const minimumleftPanelSize = screenWidth * (leftPanelRatio / 100);
  const minimumRightPanelSize = screenWidth * (35 / 100);

  //#region UI Hooks
  useEffect(() => {
    const splitPanelDividers = document.querySelectorAll('.gutter')

    const dividerColor = colorMode === "dark" ? "#4A5568" : "#CBD5E0";

    splitPanelDividers.forEach(divider => {
      divider.setAttribute("style", `background-color:${dividerColor}`);
    });

  }, [colorMode]);

  //#endregion

  return (
    <Split
      className="horizontal-split"
      sizes={[leftPanelRatio, rightPanelRatio]}
      minSize={[minimumleftPanelSize, minimumRightPanelSize]}
      direction="horizontal"
      gutterSize={4}
    >
      <Box height="100%" pr={3}><WorkspacePanel data={treeData} onTreeChange={setTreeData} /></Box>
      <Box height="100%" pl={3}><HttpRequestPanel initialRequestData_={undefined} /></Box>
    </Split>
  )
}
