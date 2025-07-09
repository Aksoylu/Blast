import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Box, Button, Divider } from "@chakra-ui/react";
import { FiRefreshCw } from "react-icons/fi";

import { HttpBodyRawData, HttpResponseStatusObject, HttpResponseTimeObject, HttpPayloadSizeObject, HttpResponseNetworkObject } from "#/Models";

import { ResponseStatusCodeBox } from "./ResponseStatusCodeBox";
import { BsBox, BsClock, BsHddNetwork } from "react-icons/bs";
import { QuestionIcon } from "@chakra-ui/icons";
import { MdOutlineNetworkWifi } from "react-icons/md";

export interface ResponseHeaderProps {
    responseBody: HttpBodyRawData;
    responseNetworkInfo: HttpResponseNetworkObject | undefined;

    responseStatus: HttpResponseStatusObject | undefined;
    responseTime: HttpResponseTimeObject | undefined;
    payloadSize: HttpPayloadSizeObject | undefined;
    onResizeResponseWindowButtonClick: () => void;
}

export const ResponseHeader = ({ responseBody, responseNetworkInfo, responseStatus, responseTime, payloadSize, onResizeResponseWindowButtonClick }: ResponseHeaderProps) => {
    // #region UI Actions    

    // #region Inner Components

    /**
     * @description: Inner component
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

    /**
     * @description: Inner component
     */
    const responseDetailsHeader = () => {
        const displayBackgroundColor = responseStatus?.DisplayBackgroundColor ?? "#000000";
        const icon = responseStatus !== undefined ? <QuestionIcon /> : <></>
        const description = responseStatus?.Description ?? "Description";

        return (<PopoverHeader color={displayBackgroundColor}>
            <Box display="flex" pt={1} pr={2}>
                <Box flex="right" fontSize="md" pt={1}>{icon} </Box>
                <Box flex="left" fontSize="sm" pl={2}>{description}</Box>
            </Box>
        </PopoverHeader>);
    }

    /**
       * @description: Inner component
    */
    const responseTimeBox = () => {
        return (<Box
            ml={1}
            pt={1}
            mb={2}
            fontSize="sm"
            display="flex"
        >
            <Box flex="right" pt={1}><BsClock /> </Box>
            <Box flex="left" pl={2}>Response Time: {responseTime?.Total} ms</Box>
        </Box>);
    }

    /**
     * @description: Inner component
    */
    const responseNetworkInfoBox = () => {
        return (<Box
            ml={1}
            pt={1}
            mb={2}
            fontSize="sm"
        >
            <Box display="flex">
                <Box flex="right" pt={1}><MdOutlineNetworkWifi /> </Box>
                <Box flex="left" pl={2}>Network Info</Box>
            </Box>
            <Box pt={1} pl={5}>Http Version: {responseNetworkInfo?.HttpVersion}</Box>
            <Box pl={5}>Local Address: {responseNetworkInfo?.LocalAddress}</Box>
            <Box pl={5}>Remote Address: {responseNetworkInfo?.HttpVersion}</Box>
        </Box>);
    }

    /**
     * @description: Inner component
    */
    const payloadSizeBox = () => {
        return (<Box
            ml={1}
            pt={1}
            mb={2}
            fontSize="sm"
            display="flex"
        >
            <Box flex="right" pt={1}><BsBox /> </Box>
            <Box flex="left" pl={2}>Payload Size: {payloadSize?.Total} kb</Box>
        </Box>);
    }

    return (<Box>
        <Button
            variant="ghost"
            onClick={onResizeResponseWindowButtonClick}
            size="sm">
            Response
        </Button>

        <Popover>
            <PopoverTrigger>
                {responseStatus != undefined && statusCodeBox()}
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                {responseDetailsHeader()}
                <PopoverBody>
                    {responseTime != undefined &&
                        <>{responseTimeBox()}< Divider /></>
                    }

                    {payloadSize != undefined &&
                        <>{payloadSizeBox()}< Divider /></>
                    }

                    {responseNetworkInfo != undefined &&
                        <>{responseNetworkInfoBox()}</>
                    }

                    <Divider />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    </Box>)
}