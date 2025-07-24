import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, useColorMode, VStack } from '@chakra-ui/react';
import Split from 'react-split';

import { WorkspacePanel } from '#/Components/WorkspacePanel';
import { HttpRequestPanel } from '#/Components/HttpRequestPanel/index';

import "./Home.css";
import { HttpResponsePanel } from '#/Components/HttpResponsePanel';
import { useHomePageStore } from './Store';



export const HorizontalLayout = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const requestPanelRef = useRef<HTMLDivElement>(null);
    const responsePanelRef = useRef<HTMLDivElement>(null);

    const minimumPanelSize = [window.innerWidth * (15 / 100), window.innerWidth * (35 / 100), window.innerWidth * (20 / 100)];
    const [panelSize, setPanelSize] = useState([15, 65, 20]);
    const [layoutHeight, setLayoutHeight] = useState<number | null>(null);

    // #region zustand
    const {
        responseHttpStatus,
        httpResponseTime,
        httpPayloadSize,
        responseNetworkInfo,
        httpResponseHeaders,
        httpResponseBody
    } = useHomePageStore();

    const treeData = useHomePageStore((state) => state.collectionList);
    const setTreeData = useHomePageStore((state) => state.setCollectionList);
    // #endregion 

    // #region UI Functions
    const updateHeight = () => {
        const topOffset = wrapperRef.current?.getBoundingClientRect().top || 0;
        const windowHeight = window.innerHeight - 10;
        const newLayoutHeight = windowHeight - topOffset;
        setLayoutHeight(newLayoutHeight);
    };

    const onChangeLayoutButtonClick = () => {

    }

    const onDragEnd = (updatedPanelSize) => {
        setPanelSize(updatedPanelSize);
    }

    // #endregion

    //#region UI Hooks
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
                onDragEnd={onDragEnd}
            >
                <Split
                    className="horizontal-split"
                    sizes={panelSize}
                    minSize={minimumPanelSize}
                    gutterSize={4}
                    direction="horizontal"
                >
                    <Box height="100%" pr={3}>
                        <WorkspacePanel
                            data={treeData}
                            onTreeChange={setTreeData}
                        />
                    </Box>
                    <Box height="100%" pl={3} ref={requestPanelRef}>
                        <HttpRequestPanel
                            initialRequestData_={undefined}
                        />
                    </Box>
                    <Box height="100%" ref={responsePanelRef}>
                        <HttpResponsePanel
                            renderLayout='horizontal'

                            onChangeLayoutButtonClick={onChangeLayoutButtonClick}
                            onResizeResponseWindowButtonClick={() => { }}

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
