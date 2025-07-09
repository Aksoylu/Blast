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
import { HttpBodyRawData, HttpPayloadSizeObject, HttpResponseHeader, HttpResponseNetworkObject, HttpResponseStatusObject, HttpResponseTimeObject } from '#/Models';
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const verticalLayoutRequestPanelRef = useRef<HTMLDivElement>(null);
  const verticalLayoutResponsePanelRef = useRef<HTMLDivElement>(null);
  const horizontalLayoutRequestPanelRef = useRef<HTMLDivElement>(null);
  const horizontalLayoutResponsePanelRef = useRef<HTMLDivElement>(null);

  const verticalPanelOffsetTolerance = 5;
  const verticalLayoutMinimifiedResponsePanelSize = 25;

  const leftPanelRatio = 15;
  const rightPanelRatio = 85;




  const minimumleftPanelSize = window.innerWidth * (leftPanelRatio / 100);
  const minimumRightPanelSize = window.innerWidth * (35 / 100);

  const defaultVerticalPanelSize = [425, 200];

  const [verticalPanelSize, setVerticalPanelSize] = useState(defaultVerticalPanelSize);
  const [horizontalPanelSize, setHorizontalPanelSize] = useState([leftPanelRatio, rightPanelRatio * 0.7, rightPanelRatio * 0.5]);
  const [verticalSplitterHeight, setVerticalSplitterHeight] = useState<number | null>(null);
  const [mainPanelLayoutType, setMainPanelLayoutType] = useState<'vertical' | 'horizontal'>("vertical");

  const [treeData, setTreeData] = useState<TreeNodeProps[]>(workspace_1);

  const [responseHttpStatus, setResponseHttpStatus] = useState<HttpResponseStatusObject | undefined>(HttpResponseStatusData.FindByCode("201")); // HttpResponseStatusData.FindByCode("100")
  const [httpResponseTime, setHttpResponseTime] = useState<HttpResponseTimeObject | undefined>(new HttpResponseTimeObject({ Total: 542 }));
  const [httpPayloadSize, setHttpPayloadSize] = useState<HttpPayloadSizeObject | undefined>(new HttpPayloadSizeObject({ Total: 320 }));
  const [responseNetworkInfo, setResponseNetworkInfo] = useState<HttpResponseNetworkObject | undefined>(new HttpResponseNetworkObject({
    HttpVersion: "1.1",
    LocalAddress: "129.168.2.1",
    RemoteAddress: "0.0.0.0"
  }));

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


  const onResizeResponseWindowButtonClick = () => {
    if (mainPanelLayoutType == "vertical") {
      if (verticalLayoutRequestPanelRef?.current == null || verticalLayoutResponsePanelRef?.current == null) {
        return;
      }
      const responsePanelHeight = verticalLayoutResponsePanelRef?.current.getBoundingClientRect().height;

      // Means that response panel is minimified. set vertical layout to default heights
      if (verticalLayoutMinimifiedResponsePanelSize + 5 > responsePanelHeight) {
        setVerticalPanelSize([425, 200]);
      }
      // Means that response panel is not minimified. set it to minimal
      else if (verticalLayoutMinimifiedResponsePanelSize + verticalPanelOffsetTolerance < responsePanelHeight) {
        setVerticalPanelSize([600, 25]);
      }
    }
  }

  //#endregion

  // #region Render

  const verticalLayout = () => {
    const onDragEnd = (updatedPanelSize) => {
      setVerticalPanelSize(updatedPanelSize);
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
            <Box height="100%" width="100%" pl={3}>
              <Split
                className="vertical-split"
                sizes={verticalPanelSize}
                minSize={[100, 25]}
                gutterSize={4}
                direction="vertical"
                onDragEnd={onDragEnd}
              >
                <Box height="100%" sx={verticalPanelSize[0] <= defaultVerticalPanelSize[0] - verticalPanelOffsetTolerance ? ScrollBarBehaviour.Auto : ScrollBarBehaviour.Hidden} ref={verticalLayoutRequestPanelRef}>
                  <HttpRequestPanel initialRequestData_={undefined} />
                </Box>
                <Box height="100%" sx={verticalPanelSize[1] <= defaultVerticalPanelSize[1] - verticalPanelOffsetTolerance ? ScrollBarBehaviour.Auto : ScrollBarBehaviour.Hidden} ref={verticalLayoutResponsePanelRef}>
                  <HttpResponsePanel
                    renderLayout='vertical'
                    onChangeLayoutButtonClick={onChangeLayoutButtonClick}
                    onResizeResponseWindowButtonClick={onResizeResponseWindowButtonClick}

                    responseHeaders={httpResponseHeaders}
                    responseBody={httpResponseBody}
                    responseNetworkInfo={responseNetworkInfo}

                    responseStatus={responseHttpStatus}
                    responseTime={httpResponseTime}
                    payloadSize={httpPayloadSize} />
                </Box>
              </Split>
            </Box>
          </Split>
        </Box>
      </Box>

    );
  }

  const horizontalLayout = () => {
    const onDragEnd = (updatedPanelSize) => {
      setHorizontalPanelSize(updatedPanelSize);
    }
    return (
      <Box ref={wrapperRef} width="100%" height="100%" position="relative">
        <Box
          height={`${verticalSplitterHeight}px`}
          display="flex"
          width="100%"
          position="relative"
          onDragEnd={onDragEnd}
        >
          <Split
            className="horizontal-split"
            sizes={horizontalPanelSize}
            minSize={[minimumleftPanelSize, minimumRightPanelSize, minimumRightPanelSize * 0.5]}
            gutterSize={4}
            direction="horizontal"
          >
            <Box height="100%" pr={3}>
              <WorkspacePanel
                data={treeData}
                onTreeChange={setTreeData}
              />
            </Box>
            <Box height="100%" pl={3} ref={horizontalLayoutRequestPanelRef}>
              <HttpRequestPanel
                initialRequestData_={undefined}
              />
            </Box>
            <Box height="100%" ref={horizontalLayoutResponsePanelRef}>
              <HttpResponsePanel
                renderLayout='horizontal'

                onChangeLayoutButtonClick={onChangeLayoutButtonClick}
                onResizeResponseWindowButtonClick={onResizeResponseWindowButtonClick}

                responseHeaders={httpResponseHeaders}
                responseBody={httpResponseBody}
                responseNetworkInfo={responseNetworkInfo}

                responseStatus={responseHttpStatus}
                responseTime={httpResponseTime}
                payloadSize={httpPayloadSize}
              />
            </Box>
          </Split>
        </Box >


      </Box >


    );
  }

  return (mainPanelLayoutType == "vertical" ? verticalLayout() : horizontalLayout());
}
