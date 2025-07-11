'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, useColorMode, VStack } from '@chakra-ui/react';
import Split from 'react-split';

import { WorkspacePanel } from '#/Components/WorkspacePanel';
import { HttpRequestPanel } from '#/Components/HttpRequestPanel/index';

import "./Home.css";
import { HttpResponsePanel } from '#/Components/HttpResponsePanel';
import { HttpResponseStatusData, ScrollBarBehaviour } from '#/Constants';
import { HttpBodyRawData, HttpPayloadSizeObject, HttpResponseHeader, HttpResponseNetworkObject, HttpResponseStatusObject, HttpResponseTimeObject } from '#/Models';
import { SupportedDataFormatsEnum } from '#/Enums';
import { VerticalLayout } from './VerticalLayout';
import { HorizontalLayout } from './HorizontalLayout';

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


export interface TreeNodeProps {
  id: string;
  name: string;
  isCollection?: boolean;
  isFolder: boolean;
  children?: TreeNodeProps[];
}


export const Home = () => {
  const { colorMode } = useColorMode();

  const [mainPanelLayoutType, setMainPanelLayoutType] = useState<'vertical' | 'horizontal'>("vertical");

  // #region zustand
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
  // #endregion
  
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
