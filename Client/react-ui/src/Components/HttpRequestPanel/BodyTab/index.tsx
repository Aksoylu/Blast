import { ChangeEventHandler, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { BsRocketTakeoff } from "react-icons/bs";

import { Box, Center, Flex, Text, Icon, Tag, VStack, Select } from "@chakra-ui/react";

import { HttpRequestBody } from "#/Models";
import { HttpRequestBodyTypeData, HttpBodyRawDataTypeData } from "#/Constants";
import { HttpRequestBodyTypesEnum } from "#/Enums";

export interface BodyTabProps {
    requestBody: HttpRequestBody;
    setRequestBody: (updated: HttpRequestBody) => void;
}

export const BodyTab = ({ requestBody, setRequestBody }: BodyTabProps) => {
    const RequestBodyTypes = HttpRequestBodyTypeData.List();
    const BodyRawDataTypes = HttpBodyRawDataTypeData.List();

    const isRawDataTypeSelectorVisible = requestBody.type == HttpRequestBodyTypesEnum.RAW;

    const updateBody = (updated: Partial<HttpRequestBody>) => {
        const newData = { ...requestBody, ...updated };
        setRequestBody(newData);
    }

    // #region Inner Components
    /**
     * @description: Inner component
     */
    const bodyTypeSelector = () => {
        const onChange = (event) => {
            const selectedType = event.target.value;
            updateBody({ type: selectedType });
        };

        return (<Box width="30%">
            <Select variant="outline" size="md" value={requestBody.type} onChange={onChange}>
                {RequestBodyTypes.map((bodyType) => (
                    <option key={bodyType.type} value={bodyType.type}>
                        {bodyType.code}
                    </option>
                ))}
            </Select>
        </Box>);
    }

    const rawContentTypeSelector = () => {
        const onChange = (event) => {
            const selectedRawDataType = event.target.value;
            updateBody({ rawDataType: selectedRawDataType });
        };

        return (
            <Box pl={3} width="20%">
                <Select variant="outline" size="md" value={requestBody.rawDataType} onChange={onChange}>
                    {BodyRawDataTypes.map((rawDataType) => (
                        <option key={rawDataType.type} value={rawDataType.type}>
                            {rawDataType.code}
                        </option>
                    ))}
                </Select>
            </Box>
        );
    }

    /**
     * @description: Inner component
     */
    const emptyPlaceholder = () => {
        return (<Box>
            <Center h="200px">
                <VStack textAlign="center">
                    <Icon as={BsRocketTakeoff} w={12} h={12} color="gray.400" />
                    <Text fontSize="xl" fontWeight="semibold" color="gray.500">
                        You didn't added request body
                    </Text>

                </VStack>
            </Center>
        </Box>);
    }

    return (<div>
        <Box maxW="100%" maxH="100%">
            <Flex justifyContent="left" width="100%">
                {bodyTypeSelector()}
                {isRawDataTypeSelectorVisible && rawContentTypeSelector()}
            </Flex>
        </Box>
        {emptyPlaceholder()}
    </div>);
}