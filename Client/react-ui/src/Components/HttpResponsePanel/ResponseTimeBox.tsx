import { HttpResponseTimeObject } from "#/Models";
import { Button } from "@chakra-ui/react";
import { BsClock } from "react-icons/bs";

export interface ResponseTimeBoxProps {
    responseTime: HttpResponseTimeObject;
}

export const ResponseTimeBox = ({ responseTime }: ResponseTimeBoxProps) => {
    return (<Button
        mt={1}
        ml={1}
        variant="ghost"
        size="xs"
        leftIcon={<BsClock/>}>
        {responseTime.Total} ms
    </Button>);
}