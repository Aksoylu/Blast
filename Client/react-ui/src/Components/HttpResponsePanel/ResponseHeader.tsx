import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Box, Button, Divider } from "@chakra-ui/react";
import { FiRefreshCw } from "react-icons/fi";

import { HttpBodyRawData, HttpResponseStatusObject, HttpResponseTimeObject, HttpPayloadSizeObject } from "#/Models";

import { ResponseStatusCodeBox } from "./ResponseStatusCodeBox";
import { BsBox, BsClock } from "react-icons/bs";

export interface ResponseHeaderProps {
    responseBody: HttpBodyRawData;
    responseStatus: HttpResponseStatusObject | undefined;
    responseTime: HttpResponseTimeObject | undefined;
    payloadSize: HttpPayloadSizeObject | undefined;
    onResizeResponseWindowButtonClick: () => void;
}

export const ResponseHeader = ({ responseBody, responseStatus, responseTime, payloadSize , onResizeResponseWindowButtonClick}: ResponseHeaderProps) => {
    // #region Inner Components
    /**
     * @description: Inner component
     */
    const placeHolder = () => {
        const onClick = () => {
            onResizeResponseWindowButtonClick();
        }
        return (<Button
            variant="ghost"
            onClick={onClick}
            size="sm">
            Response
        </Button>);
    }

    /**
     * @description: Inner component
     * @returns 
     */
    const statusCodeBox = () => {
        if (responseStatus === undefined)
            return (<></>);

        return (<Button
            mt={1}
            ml={1}
            variant="ghost"
            size="xs"
            color={responseStatus.DisplayBackgroundColor}
            leftIcon={<responseStatus.Icon />}>
            {responseStatus.Code} {responseStatus.Status}
        </Button>);
    }


    const responseTimeBox = () => {
        if (responseTime === undefined)
            return (<></>);

        return (<Box
            ml={1}
            pb={1}
            fontSize="sm"
            display="flex"
        >
            <Box flex="right" pt={1}><BsClock /> </Box>
            <Box flex="left" pl={2}>Response Time: {responseTime.Total} ms</Box>
        </Box>);
    }

    const payloadSizeBox = () => {
        if (payloadSize === undefined)
            return (<></>);

        return (<Box
            mt={1}
            ml={1}
            fontSize="sm"
            display="flex"
        >
            <Box flex="right" pt={1}><BsBox /> </Box>
            <Box flex="left" pl={2}>Payload Size: {payloadSize.Total} kb</Box>
        </Box>);
    }

    // #region Render
    if (responseStatus === undefined) {
        return placeHolder();
    }

    return (<Popover>
        <PopoverTrigger>
            {statusCodeBox()}
        </PopoverTrigger>
        <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader color={responseStatus.DisplayBackgroundColor}>
                <Box display="flex" pt={1} pr={2}>
                    <Box flex="right" fontSize="md" pt={1}>{<responseStatus.Icon />} </Box>
                    <Box flex="left" fontSize="sm" pl={2}>{responseStatus.Description}</Box>
                </Box>
            </PopoverHeader>
            <PopoverBody>
                {responseTimeBox()}
                <Divider />
                {payloadSizeBox()}
            </PopoverBody>
        </PopoverContent>
    </Popover>)
}