
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
import { RequestBreadcrumb } from './RequestBreadcrumb';
import { DocumentationTab } from './DocumentationTab';

import { HttpRequestObject } from '../../Models/HttpRequestObject';
import { FiRefreshCw, FiSave, FiUpload } from 'react-icons/fi';
import { ParametersTab } from './ParametersTab';
import { RequestTypeSelector } from './RequestTypeSelector';
import { HeadersTab } from './HeadersTab';

export interface HttpRequestPanelProps {
    requestData: HttpRequestObject;
}

export const HttpRequestPanel = ({ }) => {


    
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
                        <ParametersTab />
                    </Box>
                </TabPanel>
                <TabPanel p={0} h="100%" display="flex" flexDirection="column">
                    <Box flex="1" overflow="auto">
                        <HeadersTab />
                    </Box>
                </TabPanel>

                <TabPanel>
                    <Box flex="1" overflow="auto">
                        Body
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