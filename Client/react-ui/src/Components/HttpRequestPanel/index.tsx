
import {
    Box,
    Button,
    Flex,
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
                        <ParametersTab/>
                    </Box>
                </TabPanel>
                <TabPanel>
                    <Box flex="1" overflow="auto">
                        Headers
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

                <TabPanel  p={0} h="100%" display="flex" flexDirection="column">
                    <DocumentationTab />
                </TabPanel>
            </TabPanels>
        </Tabs>

    </Box>
    );
}