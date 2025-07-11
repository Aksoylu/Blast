'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
import Split from 'react-split';

import { WorkspacePanel } from '#/Components/WorkspacePanel';
import { HttpRequestPanel } from '#/Components/HttpRequestPanel/index';

import "./Home.css";
import { HttpResponsePanel } from '#/Components/HttpResponsePanel';
import { HttpResponseStatusData, ScrollBarBehaviour } from '#/Constants';
import { HttpBodyRawData, HttpPayloadSizeObject, HttpResponseHeader, HttpResponseNetworkObject, HttpResponseStatusObject, HttpResponseTimeObject } from '#/Models';
import { SupportedDataFormatsEnum } from '#/Enums';
import { TreeNodeProps } from '#/Components/FileTree/TreeNode';


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



export const VerticalLayout = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const requestPanelRef = useRef<HTMLDivElement>(null);
    const responsePanelRef = useRef<HTMLDivElement>(null);

    // Vertical Panels -> 0 Request panel, 1: Response panel
    const defaultVerticalPanelSize = [425, 200];
    const minimumVerticalPanelSize = [100, 25];

    // Horizontal Panels -> 0 Workspace panel, 1: Content panel
    const defaultHorizontalPanelSize = [15, 85];
    const minimumHorizontalPanelSize = [window.innerWidth * (15 / 100), window.innerWidth * (35 / 100)];

    const offsetTolerance = 5;

    const [horizontalPanelSize, setHorizontalPanelSize] = useState(defaultHorizontalPanelSize);
    const [verticalPanelSize, setVerticalPanelSize] = useState(defaultVerticalPanelSize);
    const [layoutHeight, setLayoutHeight] = useState<number | null>(null);
    const [requestPanelScrollBar, setRequestPanelScrollBar] = useState<any>(ScrollBarBehaviour.Auto);
    const [responsePanelScrollBar, setResponsePanelScrollBar] = useState<any>(ScrollBarBehaviour.Auto);

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
    const updateHeight = () => {
        const topOffset = wrapperRef.current?.getBoundingClientRect().top || 0;
        const windowHeight = window.innerHeight - 10;
        const layoutHeight = windowHeight - topOffset;
        setLayoutHeight(layoutHeight);
    };

    const updateVerticalScrollBars = () => {
        const requestPanelOverflow = (verticalPanelSize[0] <= defaultVerticalPanelSize[0] - offsetTolerance);
        const responsePanelOverflow = (verticalPanelSize[1] <= defaultVerticalPanelSize[1] - offsetTolerance);

        setRequestPanelScrollBar(requestPanelOverflow ? ScrollBarBehaviour.Auto : ScrollBarBehaviour.Hidden);
        setResponsePanelScrollBar(responsePanelOverflow ? ScrollBarBehaviour.Auto : ScrollBarBehaviour.Hidden);
    }

    const onChangeLayoutButtonClick = () => {

    }

    const onResizeResponseWindowButtonClick = () => {

        if (requestPanelRef?.current == null || responsePanelRef?.current == null) {
            return;
        }

        const responsePanelHeight = responsePanelRef?.current.getBoundingClientRect().height;

        // Means that response panel is minimified. set vertical layout to default heights
        if (minimumVerticalPanelSize[1] + 5 > responsePanelHeight) {
            setVerticalPanelSize([425, 200]);
        }
        // Means that response panel is not minimified. set it to minimal
        else if (minimumVerticalPanelSize[1] + offsetTolerance < responsePanelHeight) {
            setVerticalPanelSize([600, 25]);
        }
    }

    const onDragEnd = (updatedPanelSize) => {
        setVerticalPanelSize(updatedPanelSize);
    }

    // #endregion

    //#region UI Hooks
    useEffect(() => {
        updateVerticalScrollBars();
    }, [verticalPanelSize])


    useLayoutEffect(() => {
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    //#endregion

    // #region Render

    return (
        <Box ref={wrapperRef} width="100%" height="100%" position="relative">
            <Box
                height={`${layoutHeight}px`}
                display="flex"
                width="100%"
                position="relative"
            >
                <Split
                    className="horizontal-split"
                    sizes={horizontalPanelSize}
                    minSize={minimumHorizontalPanelSize}
                    direction="horizontal"
                    gutterSize={2}
                >
                    <Box height="100%" pr={3}><WorkspacePanel data={treeData} onTreeChange={setTreeData} /></Box>
                    <Box height="100%" width="100%" pl={3}>
                        <Split
                            className="vertical-split"
                            sizes={verticalPanelSize}
                            minSize={minimumVerticalPanelSize}
                            gutterSize={2}
                            direction="vertical"
                            onDragEnd={onDragEnd}
                        >
                            <Box height="100%" sx={requestPanelScrollBar} ref={requestPanelRef}>
                                <HttpRequestPanel initialRequestData_={undefined} />
                            </Box>
                            <Box height="100%" sx={responsePanelScrollBar} ref={responsePanelRef}>
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
