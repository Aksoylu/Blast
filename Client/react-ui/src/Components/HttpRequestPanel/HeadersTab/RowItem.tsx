import React, { useState } from "react";

import { Tr, Td, Checkbox, Input, IconButton, Flex } from "@chakra-ui/react";
import { FiTrash } from "react-icons/fi";

import { HttpRequestHeader } from "#/Models";

export interface RowItemProps {
    data: HttpRequestHeader;
    onChange: (event: HttpRequestHeader) => void;
    onDelete: () => void;
}

const RowItem = ({ data, onChange, onDelete }: RowItemProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleChange = (event: keyof HttpRequestHeader, value: any) => {
        if (data.IsConstant) {
            return;
        }

        onChange({ ...data, [event]: value });
    };

    // eğer constant value ise set edilmesi gereken: 
    //    color="gray.600"
    //                readOnly={true}


    // #region Inner Components
    const deleteButton = () => {
        const visibility = !data.IsConstant && isHovered ? "visible": "hidden";
        const onClick = () => {
            if(data.IsConstant)
            {
                return;
            }

            onDelete();
        }

        return (<IconButton
            aria-label="Delete row"
            icon={<FiTrash />}
            size="sm"
            variant="ghost"
            colorScheme="red"
            ml="2"
            onClick={onClick}
            visibility={visibility}
        />);
    }

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
                    color="gray.600"
                    readOnly={true}
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

                    {deleteButton()}
                </Flex>
            </Td>
        </Tr>
    );
};

export default RowItem;