import { JSX, useEffect, useState } from 'react';

import {
    Box,
    Button,
    Flex,
    HStack,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Select,
    Spacer,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useColorMode,
    VStack
} from '@chakra-ui/react';

import { FiLayout } from 'react-icons/fi';

import { SupportedDataFormatsEnum } from '#/Enums';
import { HttpResponseBodyTypeData } from '#/Constants';
import { HttpBodyRawData, HttpPayloadSizeObject, HttpResponseHeader, HttpResponseStatusObject, HttpResponseTimeObject } from '#/Models';


import { ResponseStatusCodeBox } from './ResponseStatusCodeBox';
import { ResponseTimeBox } from './ResponseTimeBox';
import { ResponsePayloadSizeBox } from './ResponsePayloadSizeBox';
import { HeadersTab } from './HeadersTab';
import { BodyTab } from './BodyTab';
import { ResponseHeader } from './ResponseHeader';
import { BodyTypeSelector } from './BodyTypeSelector';

export interface HttpResponsePanelProps {
    responseHeaders: HttpResponseHeader[];
    responseBody: HttpBodyRawData;
    responseStatus: HttpResponseStatusObject | undefined;
    responseTime: HttpResponseTimeObject | undefined;
    payloadSize: HttpPayloadSizeObject | undefined;

    layoutDirection: "horizontal" | "vertical";
    onChangeLayoutButtonClick: () => void;
    onResizeResponseWindowButtonClick: () => void;
}

export const HttpResponsePanel = ({ responseHeaders, responseBody, responseStatus, responseTime, payloadSize, layoutDirection, onChangeLayoutButtonClick, onResizeResponseWindowButtonClick }: HttpResponsePanelProps) => {
    const [responseBodyType, setResponseBodyType] = useState<SupportedDataFormatsEnum>(responseBody.type);
    const [tabIndex, setTabIndex] = useState(0);

    const onResponseBodyTypeChanged = (event: any) => {
        const selectedType = event.target.value;
        setResponseBodyType(selectedType);
    }

    // #region Inner Components
    /**
     * @description: Inner component
     */
    const changeLayoutButton = (): JSX.Element => {
        return (<Box>
            <Button colorScheme="blue" variant="ghost" size="sm" leftIcon={<FiLayout />} onClick={() => {
                onChangeLayoutButtonClick();
            }} />
        </Box>);
    }

    const verticalLayout = (): JSX.Element => {
        return (<Flex justifyContent="left" alignItems="space-between" width="100%" >
            <Tabs size="sm">
                <Tabs index={tabIndex} onChange={setTabIndex} size="sm">
                    <TabList>
                        <Tab>Body</Tab>
                        <Tab>Headers</Tab>
                        <BodyTypeSelector
                            responseBodyType={responseBodyType}
                            onResponseBodyTypeChanged={onResponseBodyTypeChanged}
                        />
                    </TabList>
                </Tabs>

            </Tabs>
            <Spacer />
            <ResponseHeader
                responseBody={responseBody}
                responseStatus={responseStatus}
                responseTime={responseTime}
                payloadSize={payloadSize}

                layoutDirection={layoutDirection}
                onResizeResponseWindowButtonClick={onResizeResponseWindowButtonClick}
            />
            {changeLayoutButton()}

        </Flex>);
    }

    const horizontalLayout = (): JSX.Element => {
        return (
            <Box>
                <Flex  justifyContent="left" alignItems="space-between" width="100%" >
                    <ResponseHeader
                        responseBody={responseBody}
                        responseStatus={responseStatus}
                        responseTime={responseTime}
                        payloadSize={payloadSize}

                        layoutDirection={layoutDirection}
                        onResizeResponseWindowButtonClick={onResizeResponseWindowButtonClick}
                    />
                    {changeLayoutButton()}
                </Flex>
                <Box width="100%" pt={1} mb={1}>
                    <Tabs size="sm" >
                        <Tabs index={tabIndex} onChange={setTabIndex} size="sm" isFitted>
                            <TabList>
                                <Tab>Body</Tab>
                                <Tab>Headers</Tab>
                                <BodyTypeSelector
                                    responseBodyType={responseBodyType}
                                    onResponseBodyTypeChanged={onResponseBodyTypeChanged}
                                />
                            </TabList>
                        </Tabs>

                    </Tabs>
                </Box>
            </Box>
        );
    }

    return (
        <Box height="100%" width="100%">
            {layoutDirection == "vertical" && verticalLayout()}
            {layoutDirection == "horizontal" && horizontalLayout()}

            <Tabs index={tabIndex} onChange={setTabIndex}>
                <TabPanels>
                    <TabPanel p={0} height="100%" width="100%" display="flex" flexDirection="column">
                        <BodyTab data={responseBody.Value} dataType={responseBodyType} />
                    </TabPanel>

                    <TabPanel p={0}>
                        <HeadersTab headerList={responseHeaders} />
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </Box>

    );
}