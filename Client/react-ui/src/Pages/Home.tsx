'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, useColorMode, VStack } from '@chakra-ui/react';
import Split from 'react-split';

import { TreeNodeProps } from '../Components/FileTree/TreeNode';
import { WorkspacePanel } from '../Components/WorkspacePanel';
import { HttpRequestPanel } from '../Components/HttpRequestPanel/index';

import "./Home.css";
import { HttpResponsePanel } from '#/Components/HttpResponsePanel';

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

  const [mainPanelLayoutType, setMainPanelLayoutType] = useState<'vertical' | 'horizontal'>("vertical");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [verticalSplitterHeight, setVerticalSplitterHeight] = useState<number | null>(null);

  // #region UI Functions
  const updateHeight = () => {
    const topOffset = wrapperRef.current?.getBoundingClientRect().top || 0;
    const windowHeight = window.innerHeight - 10;
    const verticalSplitterHeight = windowHeight - topOffset;
    setVerticalSplitterHeight(verticalSplitterHeight);

  };

  const updateGutterColors = () => {
    const splitPanelDividers = document.querySelectorAll('.gutter')

    const dividerColor = colorMode === "dark" ? "#4A5568" : "#CBD5E0";

    splitPanelDividers.forEach(divider => {
      divider.setAttribute("style", `background-color:${dividerColor}`);
    });

  }
  // #endregion

  //#region UI Hooks
  useEffect(() => {
    updateGutterColors();

  }, [colorMode]);


  useLayoutEffect(() => {

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const onChangeLayoutButtonClick = () => {
    const newLayoutType = mainPanelLayoutType == "vertical" ? "horizontal" : "vertical";
    setMainPanelLayoutType(newLayoutType);
  }
  //#endregion

  const verticalLayoutConstraints = {
    workspacePanelRatio: 15,
    operationPanelRatio: 85,

    minimumWorkspacePanelWidth: window.innerWidth * (15 / 100),
    minimumOperationPanelWidth: window.innerWidth * (35 / 100),

    mainDividerSize: 2,

    requestPanelHeight: 75,
    responsePanelHeight: 25,

    minimumRequestPanelHeight: 100,
    minimumResponsePanelHeigth: 20
  }

  const verticalLayout = () => {
    return (
      <Box
        height={`${verticalSplitterHeight}px`}
        display="flex"
        width="100%"
        position="relative"
      >
        <Split
          className="horizontal-split"
          sizes={[verticalLayoutConstraints.workspacePanelRatio, verticalLayoutConstraints.operationPanelRatio]}
          minSize={[verticalLayoutConstraints.minimumWorkspacePanelWidth, verticalLayoutConstraints.minimumOperationPanelWidth]}
          direction="horizontal"
          gutterSize={verticalLayoutConstraints.mainDividerSize}
        >
          <Box height="100%" pr={3}><WorkspacePanel data={treeData} onTreeChange={setTreeData} /></Box>
          <Box
            height={`${verticalSplitterHeight}px`}
            display="flex"
            width="100%"
            position="relative"
          >
            <Box height="100%" width="100%" pl={3}>
              <Split
                className="vertical-split"
                sizes={[verticalLayoutConstraints.requestPanelHeight, verticalLayoutConstraints.responsePanelHeight]}
                minSize={[verticalLayoutConstraints.minimumRequestPanelHeight, verticalLayoutConstraints.minimumResponsePanelHeigth]}
                gutterSize={4}
                direction="vertical"
              >
                <Box height="100%" ><HttpRequestPanel initialRequestData_={undefined} /> </Box>
                <Box height="100%" ><HttpResponsePanel onChangeLayoutButtonClick={onChangeLayoutButtonClick} /> </Box>
              </Split>
            </Box>
          </Box>
        </Split>
      </Box>
    );
  }


  const horizontalLayoutConstraints = {
    workspacePanelRatio: 15,
    requestPanelRatio: 50,
    responsePanelRatio: 35,

    minimumWorkspacePanelWidth: window.innerWidth * (15 / 100),
    minimumRequestPanelWidth: window.innerWidth * (35 / 100),
    minimumResponsePanelWidth: 20,

    dividerSize: 2,
  }

  const horizontalLayout = () => {
    return (
      <Box
        height={`${verticalSplitterHeight}px`}
        display="flex"
        width="100%"
        position="relative"
      >
        <Split
          className="horizontal-split"
          sizes={[horizontalLayoutConstraints.workspacePanelRatio, horizontalLayoutConstraints.requestPanelRatio, horizontalLayoutConstraints.responsePanelRatio]}
          minSize={[horizontalLayoutConstraints.minimumWorkspacePanelWidth, horizontalLayoutConstraints.minimumRequestPanelWidth, horizontalLayoutConstraints.minimumResponsePanelWidth]}
          direction="horizontal"
          gutterSize={horizontalLayoutConstraints.dividerSize}
        >
          <Box height="100%">
            <WorkspacePanel data={treeData} onTreeChange={setTreeData} />
          </Box>

          <Box height="100%" ><HttpRequestPanel initialRequestData_={undefined} /> </Box>
          <Box height="100%" ><HttpResponsePanel onChangeLayoutButtonClick={onChangeLayoutButtonClick} /> </Box>
        </Split>
      </Box>
    );
  }

  return (
    <Box ref={wrapperRef} width="100%" height="100%" position="relative">
      {mainPanelLayoutType == "vertical" && verticalLayout()}
      {mainPanelLayoutType == "horizontal" && horizontalLayout()}
    </Box>
  )
}
