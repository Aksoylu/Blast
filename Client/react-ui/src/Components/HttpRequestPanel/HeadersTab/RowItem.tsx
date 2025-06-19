import React, { useState } from "react";
import { Tr, Td, Checkbox, Input, IconButton, Flex } from "@chakra-ui/react";
import { FiTrash } from "react-icons/fi";
import { HttpRequestHeader } from "../../../Models/HttpRequestHeader";

export interface RowItemProps {
    data: HttpRequestHeader;
    onChange: (event: HttpRequestHeader) => void;
    onDelete: () => void;
}

const RowItem = ({ data, onChange, onDelete }: RowItemProps) => {
    const handleChange = (event: keyof HttpRequestHeader, value: any) => {
        if(data.IsHardcoded)
        {
            return;
        }
    
        onChange({ ...data, [event]: value });
    };

    const [isHovered, setIsHovered] = useState(false);

    return (
        <Tr
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Td border="1px solid" borderColor="gray.700" w="1">
                <Checkbox
                    ml="1"
                    isChecked={data.IsIncluded}
                    onChange={(e) => handleChange("IsIncluded", e.target.checked)}
                />
            </Td>
            <Td border="1px solid" borderColor="gray.700">
                <Input
                    variant="unstyled"
                    size="sm"
                    value={data.Key}
                    onChange={(e) => handleChange("Key", e.target.value)}
                />
            </Td>
            <Td border="1px solid" borderColor="gray.700">
                <Input
                    variant="unstyled"
                    size="sm"
                    value={data.Value}
                    onChange={(e) => handleChange("Value", e.target.value)}
                />
            </Td>
            <Td border="1px solid" borderColor="gray.700">
                <Flex align="center" justify="space-between">
                    <Input
                        variant="unstyled"
                        size="sm"
                        value={data.Description}
                        onChange={(e) => handleChange("Description", e.target.value)}
                    />

                    <IconButton
                        aria-label="Delete row"
                        icon={<FiTrash />}
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        ml="2"
                        onClick={onDelete}
                        visibility={isHovered ? "visible" : "hidden"}
                    />
                </Flex>
            </Td>
        </Tr>
    );
};

export default RowItem;