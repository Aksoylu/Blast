import { HttpResponseStatusObject } from "#/Models";
import { Box, Button } from "@chakra-ui/react";
import { FiRefreshCw } from "react-icons/fi";

export const ResponsePanelHeader = () => {
    return (<Box><Button
        mt={1}
        ml={1}
        variant="ghost"
        size="xs"
    >
        Response
    </Button></Box>);
}