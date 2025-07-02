import { useState } from 'react';

import {
    Box,
    Button,
    Flex,
    Spacer,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs
} from '@chakra-ui/react';

import { FiLayout } from 'react-icons/fi';
import Split from 'react-split';

import "./index.css";
import { ResponseStatusCodeBox } from './ResponseStatusCodeBox';
import { HttpPayloadSizeObject, HttpResponseStatusObject, HttpResponseTimeObject } from '#/Models';
import { ResponseTimeBox } from './ResponseTimeBox';
import { ResponsePayloadSizeBox } from './ResponsePayloadSizeBox';

export interface HttpResponsePanelProps {
    responseStatus: HttpResponseStatusObject | undefined;
    responseTime: HttpResponseTimeObject | undefined;
    payloadSize: HttpPayloadSizeObject | undefined;

    onChangeLayoutButtonClick: () => void;
}

export const HttpResponsePanel = ({ responseStatus, responseTime, payloadSize, onChangeLayoutButtonClick }: HttpResponsePanelProps) => {

    return (
        <Box height="100%" width="100%">
            <Flex justifyContent="left" alignItems="space-between" width="100%" >
                <Box>
                    <Tabs size="sm">
                        <TabList>
                            <Tab>Body</Tab>
                            <Tab>Headers</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel p={0} height="100%" display="flex" flexDirection="column">
                                <Box flex="1" overflow="auto">
                                    Body
                                </Box>
                            </TabPanel>

                            <TabPanel p={0} height="100%" display="flex" flexDirection="column">
                                <Box flex="1" overflow="auto">
                                    Headers
                                </Box>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>

                <Spacer />
                <Box>
                    {responseStatus !== undefined && <ResponseStatusCodeBox StatusData={responseStatus} />}
                </Box>
                <Box>
                    {responseTime !== undefined && <ResponseTimeBox responseTime={responseTime} />}
                </Box>
                <Box>
                    {payloadSize !== undefined && <ResponsePayloadSizeBox payloadSize={payloadSize} />}
                </Box>
                <Box >
                    <Button colorScheme="blue" variant="ghost" size="sm" leftIcon={<FiLayout />} onClick={() => {
                        onChangeLayoutButtonClick();
                    }} />
                </Box>
            </Flex>
        </Box>

    );
}