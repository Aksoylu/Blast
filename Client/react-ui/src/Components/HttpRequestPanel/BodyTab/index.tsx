import { BsRocketTakeoff } from "react-icons/bs";

import { Box, Center, Flex, Text, Icon, VStack, Select } from "@chakra-ui/react";

import { HttpBodyRawData, HttpRequestBody, HttpBodyFormData } from "#/Models";
import { HttpRequestBodyTypeData, HttpBodyRawDataTypeData } from "#/Constants";
import { HttpRequestBodyTypesEnum } from "#/Enums";

import { FormDataInput } from "./FormDataInput";
import { UrlEncodedDataInput } from "./UrlEncodedDataInput";
import { RawDataInput } from "./RawDataInput";

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
            updateBody({ type: selectedType, data: undefined });
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

    /**
     * @description: Inner component
     */
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

    /**
     * @description: Inner component
    */
    const formDataInput = () => {
        const formDataList = (requestBody.data ?? []) as HttpBodyFormData[];
        const setFormDataList = (updated: HttpBodyFormData[]) => {
            updateBody({ data: updated });
        };

        return (<FormDataInput
            formDataList={formDataList}
            setFormDataList={setFormDataList} />
        );
    }

    /**
     * @description: Inner component
    */
    const urlEncodedDataInput = () => {
        const urlEncodedDataList = (requestBody.data ?? []) as HttpBodyFormData[];
        const setUrlEncodedDataList = (updated: HttpBodyFormData[]) => {
            updateBody({ data: updated });
        };

        return (<UrlEncodedDataInput
            urlEncodedDataList={urlEncodedDataList}
            setUrlEncodedDataList={setUrlEncodedDataList} />
        );
    }

    /**
     * @description: Inner component
    */
    const rawDataInput = () => {
        const rawData = requestBody.data as HttpBodyRawData;
        const setRawData = (updated: HttpBodyRawData) => {
            updateBody({ data: updated });
        };
        return (<RawDataInput
            rawData={rawData}
            setRawData={setRawData} />
        );
    }

    return (<div>
        <Box maxW="100%" maxH="100%">
            <Flex justifyContent="left" width="100%">
                {bodyTypeSelector()}
                {isRawDataTypeSelectorVisible && rawContentTypeSelector()}
            </Flex>
        </Box>
        {requestBody.type == HttpRequestBodyTypesEnum.NONE && emptyPlaceholder()}
        {requestBody.type == HttpRequestBodyTypesEnum.FORMDATA && formDataInput()}
        {requestBody.type == HttpRequestBodyTypesEnum.URLENCODED && urlEncodedDataInput()}
        {requestBody.type == HttpRequestBodyTypesEnum.RAW && rawDataInput()}

    </div>);
}