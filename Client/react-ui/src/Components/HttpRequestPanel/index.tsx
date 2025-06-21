import { useState } from 'react';

import {
    Box,
    Button,
    Flex,
    Input,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs
} from '@chakra-ui/react';

import { FiRefreshCw, FiSave, FiUpload } from 'react-icons/fi';

import { DefaultHttpHeaders } from '#/Constants';
import { HttpRequestTypesEnum } from '#/Enums/';
import { HttpQueryParameter, HttpRequestBody, HttpRequestHeader, HttpRequestType, HttpRequestObject } from '#/Models';

import { RequestBreadcrumb } from './RequestBreadcrumb';
import { RequestTypeSelector } from './RequestTypeSelector';
import { ParametersTab } from './ParametersTab';
import { HeadersTab } from './HeadersTab';
import { BodyTab } from './BodyTab';
import { DocumentationTab } from './DocumentationTab';



export interface HttpRequestPanelProps {
    initialRequestData_: HttpRequestObject | undefined;
}
export const HttpRequestPanel = ({ initialRequestData_ }: HttpRequestPanelProps) => {
    const initialRequestData: HttpRequestObject = {
        RequestType: {
            type: HttpRequestTypesEnum.POST,
            color: 'blue',
            code: 'POST'
        },
        Headers: DefaultHttpHeaders.List(),
        QueryParameters: [],
        Body: new HttpRequestBody()
    };

    const [queryParameters, setQueryParameters] = useState<HttpQueryParameter[]>(initialRequestData.QueryParameters);
    const [headers, setHeaders] = useState<HttpRequestHeader[]>(initialRequestData.Headers);
    const [requestType, setRequestType] = useState<HttpRequestType>(initialRequestData.RequestType);
    const [requestBody, setRequestBody] = useState<HttpRequestBody>(initialRequestData.Body);

    const onQueryParametersUpdated = (eventData: HttpQueryParameter[]) => {
        setQueryParameters(eventData);
    };

    const onHeadersUpdated = (eventData: HttpRequestHeader[]) => {
        setHeaders(eventData);
    };

    const onRequestTypeUpdated = (eventData: HttpRequestType) => {
        setRequestType(eventData);
    };

    const onRequestBodyUpdated = (eventData: HttpRequestBody) => {
        setRequestBody(eventData);
    }


    // Tam request objesi (gerekirse)
    const requestData: HttpRequestObject = {
        RequestType: requestType,
        Headers: headers,
        QueryParameters: queryParameters,
        Body: requestBody
    };


    // #region Inner Components
    const saveButton = () => {
        return (<Button colorScheme="blue" variant="ghost" size="sm" leftIcon={<FiSave />}>Save</Button>);
    };

    const syncButton = () => {
        return (<Button ml="12px" colorScheme="blue" variant="ghost" size="sm" leftIcon={<FiRefreshCw />}>Sync</Button>);
    };

    const exportButton = () => {
        return (<Button ml="12px" colorScheme="blue" variant="ghost" size="sm" leftIcon={<FiUpload />}>Export</Button>);
    };

    const requestInputBar = () => {
        return (<Box width="100%" height={10} >
            <Flex justifyContent="right" alignItems="center" width="100%">
                <RequestTypeSelector />
                <Input
                    ml={3}
                    variant="unstyled"
                    size="md"
                />
            </Flex>
        </Box>);
    }

    const sendRequestButton = () => {
        return (<Button ml={3} colorScheme="blue" size="md" height={10}>
            Send
        </Button>);
    }

    return (<Box >
        <Box maxW="100%" maxH="100%">
            <Flex justifyContent="space-between" alignItems="center" width="100%">
                <RequestBreadcrumb />
                <Box>
                    {saveButton()}
                    {syncButton()}
                    {exportButton()}
                </Box>
            </Flex>
        </Box>

        <Flex justifyContent="right" alignItems="center" width="100%" mt={4}>
            <Box borderRadius={5} border="1px solid" borderColor="gray.700" width="95%" height={10} >
                {requestInputBar()}
            </Box>
            {sendRequestButton()}
        </Flex>
        <Tabs isFitted>
            <TabList>
                <Tab>Parameters</Tab>
                <Tab>Headers</Tab>
                <Tab>Body</Tab>
                <Tab>Settings</Tab>
                <Tab>Documentation</Tab>
            </TabList>
            <TabPanels>
                <TabPanel p={0} h="100%" display="flex" flexDirection="column">
                    <Box flex="1" overflow="auto">
                        <ParametersTab
                            parameterList={queryParameters}
                            setParameterList={onQueryParametersUpdated}
                        />
                    </Box>
                </TabPanel>
                <TabPanel p={0} h="100%" display="flex" flexDirection="column">
                    <Box flex="1" overflow="auto">
                        <HeadersTab
                            headerList={headers}
                            setHeaderList={onHeadersUpdated}
                        />
                    </Box>
                </TabPanel>

                <TabPanel>
                    <Box flex="1" overflow="auto">
                        <BodyTab
                            requestBody={requestBody}
                            setRequestBody={onRequestBodyUpdated}
                        />
                    </Box>
                </TabPanel>

                <TabPanel>
                    <Box flex="1" overflow="auto">
                        Settings
                    </Box>
                </TabPanel>

                <TabPanel p={0} h="100%" display="flex" flexDirection="column">
                    <DocumentationTab />
                </TabPanel>
            </TabPanels>
        </Tabs>

    </Box>
    );
}