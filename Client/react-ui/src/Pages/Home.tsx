'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, useColorMode, VStack } from '@chakra-ui/react';
import Split from 'react-split';

import { TreeNodeProps } from '../Components/FileTree/TreeNode';
import { WorkspacePanel } from '../Components/WorkspacePanel';
import { HttpRequestPanel } from '../Components/HttpRequestPanel/index';

import "./Home.css";
import { HttpResponsePanel } from '#/Components/HttpResponsePanel';
import { HttpResponseStatusData, ScrollBarBehaviour } from '#/Constants';
import { HttpBodyRawData, HttpPayloadSizeObject, HttpResponseHeader, HttpResponseStatusObject, HttpResponseTimeObject } from '#/Models';
import { SupportedDataFormatsEnum } from '#/Enums';

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

  const leftPanelRatio = 15;
  const rightPanelRatio = 85;

  const minimumRequestPanelHeight = 300;
  const defaultResponsePanelHeight = 100;

  const screenWidth = window.innerWidth
  const minimumleftPanelSize = screenWidth * (leftPanelRatio / 100);
  const minimumRightPanelSize = screenWidth * (35 / 100);


  const [responseHttpStatus, setResponseHttpStatus] = useState<HttpResponseStatusObject | undefined>(HttpResponseStatusData.FindByCode("100"));
  const [httpResponseTime, setHttpResponseTime] = useState<HttpResponseTimeObject | undefined>(new HttpResponseTimeObject({ Total: 542 }));
  const [httpPayloadSize, setHttpPayloadSize] = useState<HttpPayloadSizeObject | undefined>(new HttpPayloadSizeObject({ Total: 320 }));
  const [httpResponseHeaders, setHttpResponseHeaders] = useState<HttpResponseHeader[]>([
    new HttpResponseHeader({
      Key: "date",
      Value: "Thu, 03 Jul 2025 11:10:43 GMT"
    }),
    new HttpResponseHeader({
      Key: "server",
      Value: "Apache"
    }),
    new HttpResponseHeader({
      Key: "content-encoding",
      Value: "gzip"
    }),
    new HttpResponseHeader({
      Key: "content-length",
      Value: "589"
    })
  ]);
  const [httpResponseBody, setHttpResponseBody] = useState<HttpBodyRawData>(new HttpBodyRawData({
    type: SupportedDataFormatsEnum.JSON,
    Value: '<abc> test</abc>'
  }));

  // #region UI Functions

  const updateHeight = () => {
    updateGutterColors();

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

  const verticalLayout = () => {
    return (<Box height="100%" width="100%"  pl={3}>
      <Split
        className="vertical-split"
        sizes={[minimumRequestPanelHeight, defaultResponsePanelHeight]}
        minSize={[100, 25]}
        gutterSize={4}
        direction="vertical"
        //onDragEnd={}
      >
        <Box height="100%" sx={ScrollBarBehaviour.Auto}><HttpRequestPanel initialRequestData_={undefined} /> </Box>
        <Box height="100%" sx={ScrollBarBehaviour.Auto}>
          <HttpResponsePanel
            onChangeLayoutButtonClick={onChangeLayoutButtonClick}

            responseHeaders={httpResponseHeaders}
            responseBody={httpResponseBody}

            responseStatus={responseHttpStatus}
            responseTime={httpResponseTime}
            payloadSize={httpPayloadSize} />
        </Box>
      </Split>
    </Box>
    );
  }

  const horizontalLayout = () => {
    return (<Box width="100%" pl={3}>
      <Split
        className="horizontal-split"
        sizes={[minimumRequestPanelHeight, defaultResponsePanelHeight]}
        minSize={[150, 25]}
        gutterSize={4}
        direction="horizontal"
      >
        <Box height="100%" ><HttpRequestPanel initialRequestData_={undefined} /> </Box>
        <Box height="100%" >
          <HttpResponsePanel
            onChangeLayoutButtonClick={onChangeLayoutButtonClick}

            responseBody={httpResponseBody}
            responseHeaders={httpResponseHeaders}
            responseStatus={responseHttpStatus}
            responseTime={httpResponseTime}
            payloadSize={httpPayloadSize} 
            />
        </Box>
      </Split>
    </Box>
    );
  }

  return (
    <Box ref={wrapperRef} width="100%" height="100%" position="relative">
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
          {mainPanelLayoutType == "vertical" && verticalLayout()}
          {mainPanelLayoutType == "horizontal" && horizontalLayout()}

        </Split>
      </Box>
    </Box>

  )
}
