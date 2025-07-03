import React from "react";

import { Tr, Td, Input } from "@chakra-ui/react";

import { HttpResponseHeader } from "#/Models";

export interface RowItemProps {
    data: HttpResponseHeader;
}

const RowItem = ({ data}: RowItemProps) => {
    const rowTextColor = "gray.600";
    return (
        <Tr>
            <Td border="1px solid" borderColor="gray.700">
                <Input
                    variant="unstyled"
                    size="sm"
                    color={rowTextColor}
                    readOnly={true}
                    value={data.Key}
                />
            </Td>
            <Td border="1px solid" borderColor="gray.700">
                <Input
                    variant="unstyled"
                    size="sm"
                    color={rowTextColor}
                    readOnly={true}
                    value={data.Value}
                />
            </Td>
          
        </Tr>
    );
};

export default RowItem;