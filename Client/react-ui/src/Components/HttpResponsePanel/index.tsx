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
import Split from 'react-split';

import { DefaultHttpHeaders } from '#/Constants';
import { HttpRequestTypesEnum } from '#/Enums/';
import { HttpQueryParameter, HttpRequestBody, HttpRequestHeader, HttpRequestType, HttpRequestObject } from '#/Models';

import "./index.css";

export interface HttpResponsePanelProps {
}

export const HttpResponsePanel = ({ }: HttpResponsePanelProps) => {
    return (
        <Box height="100vh" display="flex" flexDirection="column">
            <Box height="100%" bg="blue.100">HttpResponsePanel</Box>
        </Box>
    );
}