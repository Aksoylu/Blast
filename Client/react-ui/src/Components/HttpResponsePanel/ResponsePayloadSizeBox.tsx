import { HttpPayloadSizeObject } from "#/Models";
import { Button } from "@chakra-ui/react";
import { BsBox } from "react-icons/bs";

export interface ResponsePayloadSizeBoxProps {
    payloadSize: HttpPayloadSizeObject;
}

export const ResponsePayloadSizeBox = ({ payloadSize }: ResponsePayloadSizeBoxProps) => {
    return (<Button
        mt={1}
        ml={1}
        variant="ghost"
        size="xs"
        leftIcon={<BsBox />}>
        {payloadSize.Total}
    </Button>);
}