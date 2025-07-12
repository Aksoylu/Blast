import { JSX, useEffect, useState } from 'react';

import {
    Box,
    Button,
    Flex,
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
import { HttpBodyRawData, HttpPayloadSizeObject, HttpResponseHeader, HttpResponseNetworkObject, HttpResponseStatusObject, HttpResponseTimeObject } from '#/Models';


import { ResponseStatusCodeBox } from './ResponseStatusCodeBox';
import { ResponseTimeBox } from './ResponseTimeBox';
import { ResponsePayloadSizeBox } from './ResponsePayloadSizeBox';
import { HeadersTab } from './HeadersTab';
import { BodyTab } from './BodyTab';
import { ResponseHeader } from './ResponseHeader';

export interface HttpResponsePanelProps {
    renderLayout: 'vertical' | 'horizontal';

    responseHeaders: HttpResponseHeader[];

    responseBody: HttpBodyRawData | undefined;
    responseNetworkInfo: HttpResponseNetworkObject | undefined;
    responseStatus: HttpResponseStatusObject | undefined;
    responseTime: HttpResponseTimeObject | undefined;
    payloadSize: HttpPayloadSizeObject | undefined;

    onChangeLayoutButtonClick: () => void;
    onResizeResponseWindowButtonClick: () => void;
}

export const HttpResponsePanel = ({ renderLayout, responseHeaders, responseBody, responseNetworkInfo, responseStatus, responseTime, payloadSize, onChangeLayoutButtonClick, onResizeResponseWindowButtonClick }: HttpResponsePanelProps) => {
    const { colorMode } = useColorMode();

    const [responseBodyType, setResponseBodyType] = useState<SupportedDataFormatsEnum>(responseBody?.type ?? SupportedDataFormatsEnum.RAW);
    const [tabIndex, setTabIndex] = useState(0);

    // #region Inner Components
    /**
     * @description: Inner component
     */
    const bodyTypeSelector = () => {
        const onChange = (event) => {
            const selectedType = event.target.value;
            setResponseBodyType(selectedType);
        };

        const hoverColor = colorMode === "dark" ? "gray.600" : "blue.300";

        return (<Box ml={3} pt={1} width={125}>
            <Select
                variant="filled"
                colorScheme={colorMode}
                borderRadius="md"
                size="sx"
                _hover={{ borderColor: hoverColor }}
                value={responseBodyType}
                fontSize={"1rem"}
                onChange={onChange}
            >
                {HttpResponseBodyTypeData.List().map((bodyType) => (
                    <option key={bodyType.type} value={bodyType.type}>
                        &nbsp;&nbsp;&nbsp;{bodyType.code}
                    </option>
                ))}
            </Select>
        </Box>);
    }

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

    // #region Render
    const horizontalLayout = () => {
        return (<Box height="100%" width="100%">

            <Box>
                <Flex justifyContent="normal" alignItems="stretch" width="100%" >
                    {changeLayoutButton()}
                    <ResponseHeader
                        responseBody={responseBody}
                        responseNetworkInfo={responseNetworkInfo}
                        responseStatus={responseStatus}
                        responseTime={responseTime}
                        payloadSize={payloadSize}

                        onResizeResponseWindowButtonClick={onResizeResponseWindowButtonClick}
                    />

                </Flex>
            </Box>
            <Box>
                <Tabs size="sm">
                    <Tabs index={tabIndex} onChange={setTabIndex} size="sm">
                        <TabList>
                            <Tab>Body</Tab>
                            <Tab>Headers</Tab>

                            {responseStatus !== undefined && bodyTypeSelector()}
                        </TabList>
                    </Tabs>

                </Tabs>
            </Box>

            <Tabs index={tabIndex} onChange={setTabIndex}>
                <TabPanels>
                    <TabPanel p={0} height="100%" width="100%" display="flex" flexDirection="column">
                        <BodyTab data={responseBody?.Value ?? ""} dataType={responseBodyType} />
                    </TabPanel>

                    <TabPanel p={0}>
                        <HeadersTab headerList={responseHeaders} />
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </Box>);
    }

    const verticalLayout = () => {
        return (<Box height="100%" width="100%">
            <Flex justifyContent="left" alignItems="space-between" width="100%" >
                <Tabs size="sm">
                    <Tabs index={tabIndex} onChange={setTabIndex} size="sm">
                        <TabList>
                            <Tab>Body</Tab>
                            <Tab>Headers</Tab>
                            {responseStatus !== undefined && bodyTypeSelector()}
                        </TabList>
                    </Tabs>

                </Tabs>
                <Spacer />
                <ResponseHeader
                    responseBody={responseBody}
                    responseNetworkInfo={responseNetworkInfo}
                    responseStatus={responseStatus}
                    responseTime={responseTime}
                    payloadSize={payloadSize}

                    onResizeResponseWindowButtonClick={onResizeResponseWindowButtonClick}
                />
                {changeLayoutButton()}

            </Flex>
            <Tabs index={tabIndex} onChange={setTabIndex}>
                <TabPanels>
                    <TabPanel p={0} height="100%" width="100%" display="flex" flexDirection="column">
                        <BodyTab data={responseBody?.Value ?? ""} dataType={responseBodyType} />
                    </TabPanel>

                    <TabPanel p={0}>
                        <HeadersTab headerList={responseHeaders} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>);
    }

    return (renderLayout == "horizontal" ? horizontalLayout() : verticalLayout());
}