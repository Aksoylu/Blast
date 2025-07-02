import { HttpResponseStatusObject } from "#/Models";
import { Box, Button } from "@chakra-ui/react";
import { FiRefreshCw } from "react-icons/fi";

export interface ResponseStatusCodeBox {
    StatusData: HttpResponseStatusObject;
}

export const ResponseStatusCodeBox = ({ StatusData }: ResponseStatusCodeBox) => {
    return (<Button
        mt={1}
        ml={1}
        variant="ghost"
        size="xs"
        color={StatusData.DisplayBackgroundColor}
        leftIcon={<StatusData.Icon />}>
        {StatusData.Code} {StatusData.Status}
    </Button>);
}