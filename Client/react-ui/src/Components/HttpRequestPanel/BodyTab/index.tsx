import { BsRocketTakeoff } from "react-icons/bs";

import { Box, Center, Flex, Text, Icon, VStack, Select, Button } from "@chakra-ui/react";

import { HttpBodyRawData, HttpRequestBody, HttpBodyFormData } from "#/Models";
import { HttpRequestBodyTypeData, HttpBodyRawDataTypeData } from "#/Constants";
import { HttpRequestBodyTypesEnum, SupportedDataFormatsEnum } from "#/Enums";

import { FormDataInput } from "./FormDataInput";
import { UrlEncodedDataInput } from "./UrlEncodedDataInput";
import { RawDataInput, RawDataInputRef } from "./RawDataInput";
import { FiGitMerge } from "react-icons/fi";
import { useRef } from "react";

export interface BodyTabProps {
    requestBody: HttpRequestBody;
    setRequestBody: (updated: HttpRequestBody) => void;
}

export const BodyTab = ({ requestBody, setRequestBody }: BodyTabProps) => {
    const RequestBodyTypes = HttpRequestBodyTypeData.List();
    const BodyRawDataTypes = HttpBodyRawDataTypeData.List();

    const isRawDataTypeSelectorVisible = requestBody.type == HttpRequestBodyTypesEnum.RAW;

    const rawDataInputFieldRef = useRef<RawDataInputRef>(null);

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
            const selectedRawDataType = event.target.value as SupportedDataFormatsEnum;
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
    const beautifyRawContentButton = () => {
        if (requestBody.rawDataType == undefined || requestBody.rawDataType == SupportedDataFormatsEnum.RAW) {
            return (<></>);
        }

        const onClick = () => {
            if (rawDataInputFieldRef != null) {
                rawDataInputFieldRef.current?.formatCode();
            }
        }

        return (
            <Box pt={1} pl={2} width="20%">

                <Button
                    onClick={onClick}
                    colorScheme="blue"
                    variant="ghost"
                    size="sm"
                    leftIcon={<FiGitMerge />}>
                    Beautify
                </Button>
            </Box >

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
        const rawDataType = requestBody.rawDataType as SupportedDataFormatsEnum;
        const setRawData = (updated: HttpBodyRawData) => {
            updateBody({ data: updated });
        };
        return (<RawDataInput
            ref={rawDataInputFieldRef}
            rawData={rawData}
            setRawData={setRawData}
            rawDataType={rawDataType} />
        );
    }

    return (<div>
        <Box maxW="100%" maxH="100%" mb={3}>
            <Flex justifyContent="left" width="100%">
                {bodyTypeSelector()}
                {isRawDataTypeSelectorVisible && rawContentTypeSelector()}
                {isRawDataTypeSelectorVisible && beautifyRawContentButton()}
            </Flex>
        </Box>
        {requestBody.type == HttpRequestBodyTypesEnum.NONE && emptyPlaceholder()}
        {requestBody.type == HttpRequestBodyTypesEnum.FORMDATA && formDataInput()}
        {requestBody.type == HttpRequestBodyTypesEnum.URLENCODED && urlEncodedDataInput()}
        {requestBody.type == HttpRequestBodyTypesEnum.RAW && rawDataInput()}

    </div>);
}