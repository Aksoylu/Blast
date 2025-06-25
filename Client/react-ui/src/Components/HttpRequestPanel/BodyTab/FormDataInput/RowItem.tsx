import React, { useRef, useState } from "react";
import { Tr, Td, Checkbox, Input, IconButton, Flex, Select, Box, Button, Icon, Text } from "@chakra-ui/react";
import { FiFile, FiTrash, FiUpload } from "react-icons/fi";

import { HttpBodyFormData } from "#/Models";
import { HttpBodyFormDataTypeData } from "#/Constants";
import { HttpBodyFormDataTypesEnum } from "#/Enums";
import { RowCellFileInput } from "./RowCellFileInput";

export interface RowItemProps {
    data: HttpBodyFormData;
    onChange: (updated: HttpBodyFormData) => void;
    onDelete: () => void;
}

export const RowItem = ({ data, onChange, onDelete }: RowItemProps) => {
    const FormDataTypes = HttpBodyFormDataTypeData.List();

    const [isHovered, setIsHovered] = useState(false);

    const handleChange = (field: keyof HttpBodyFormData, value: any) => {
        onChange({ ...data, [field]: value });
    };

    // #region  Inner Components

    /**
     * @description:Inner Component
     */
    const dataTypeSelector = () => {
        return (<Select
            variant="outline"
            size="md"
            value={data.DataType}
            onChange={(e) => handleChange("DataType", e.target.value)}
        >
            {FormDataTypes.map((bodyType) => (
                <option key={bodyType.type} value={bodyType.type}>
                    {bodyType.code}
                </option>
            ))}
        </Select>);
    }



    const textInput = () => {
        const onChange = (e) => {
            handleChange("Value", e.target.value);
        }

        return (<Input
            variant="unstyled"
            size="sm"
            value={data.Value}
            onChange={onChange}
        />)
    }

    const fileInput = () => {
        const onChange = (fileName) => {
            handleChange("Value", fileName);
        }

        return (<RowCellFileInput
            value={data.Value}
            onChange={onChange}
        />)
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
                    value={data.Key}
                    onChange={(e) => handleChange("Key", e.target.value)}
                />
            </Td>

            <Td border="1px solid" borderColor="gray.700">
                {dataTypeSelector()}
            </Td>
            <Td border="1px solid" borderColor="gray.700">
                {data.DataType == HttpBodyFormDataTypesEnum.Text && textInput()}
                {data.DataType == HttpBodyFormDataTypesEnum.File && fileInput()}

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
