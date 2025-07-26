'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
import Split from 'react-split';

import { WorkspacePanel } from '#/Components/WorkspacePanel';
import { HttpRequestPanel } from '#/Components/HttpRequestPanel/index';

import "./Home.css";
import { HttpResponsePanel } from '#/Components/HttpResponsePanel';
import { ScrollBarBehaviour } from '#/Constants';
import { useHomePageStore } from './Store';

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

    // #region Page State
    const {
        responseHttpStatus,
        httpResponseTime,
        httpPayloadSize,
        responseNetworkInfo,
        httpResponseHeaders,
        httpResponseBody
    } = useHomePageStore();

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
                    <Box height="100%" pr={3}>
                        <WorkspacePanel />
                    </Box>
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
