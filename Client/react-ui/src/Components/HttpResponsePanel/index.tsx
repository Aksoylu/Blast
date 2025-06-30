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

import { FiLayout, FiRefreshCw, FiSave, FiUpload } from 'react-icons/fi';
import Split from 'react-split';

import { DefaultHttpHeaders } from '#/Constants';
import { HttpRequestTypesEnum } from '#/Enums/';
import { HttpQueryParameter, HttpRequestBody, HttpRequestHeader, HttpRequestType, HttpRequestObject } from '#/Models';

import "./index.css";

export interface HttpResponsePanelProps {
    onChangeLayoutButtonClick: () => void;
}

export const HttpResponsePanel = ({ onChangeLayoutButtonClick }: HttpResponsePanelProps) => {
    return (
        <Box height="100%" display="flex" flexDirection="column">
            <Button colorScheme="blue" variant="ghost" size="sm" leftIcon={<FiLayout />} onClick={() => {
                onChangeLayoutButtonClick();
            }} />
            <Box height="100%">HttpResponsePanel</Box>
        </Box>
    );
}