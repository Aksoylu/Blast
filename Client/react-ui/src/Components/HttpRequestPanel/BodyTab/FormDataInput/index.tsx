import { FiPlus, FiInbox } from "react-icons/fi";
import { Box, Button, Center, Flex, Text, Icon, Table, TableContainer, Tag, Tbody, Th, Thead, Tr, VStack } from "@chakra-ui/react";

import { HttpBodyFormData } from "#/Models";

import { RowItem } from "./RowItem";
import { HttpBodyFormDataTypesEnum } from "#/Enums";

export interface formDataInputProps {
    formDataList: HttpBodyFormData[];
    setFormDataList: (updated: HttpBodyFormData[]) => void;
}

export const FormDataInput = ({ formDataList, setFormDataList }: formDataInputProps) => {
    const activeParams = formDataList.filter(p => p.IsIncluded).length;

    const updateRow = (index: number, updated: Partial<HttpBodyFormData>) => {
        const updatedList = formDataList.map((param, i) =>
            i === index ? { ...param, ...updated } : param
        );
        setFormDataList(updatedList);
    };

    const deleteRow = (index: number) => {
        const updatedList = formDataList.filter((_, i) => i !== index);
        setFormDataList(updatedList);
    };

    const addRow = (newItem: HttpBodyFormData) => {
        setFormDataList([...formDataList, newItem]);
    }

    // #region  Inner Components
    /**
     * @description:Inner Component
     */
    const addButton = () => {
        const onClick = () => {
            const newFormData: HttpBodyFormData = {
                IsIncluded: true,
                DataType: HttpBodyFormDataTypesEnum.Text,
                Key: "",
                Value: "",
                Description: "",
            }
            addRow(newFormData);
        }

        return (<Button
            onClick={onClick}
            ml="12px"
            colorScheme="blue"
            variant="ghost"
            size="sm"
            leftIcon={<FiPlus />}>New</Button>);
    };

    /**
     * @description: Inner component
     */
    const dataTable = () => {
        return (<TableContainer>

            <Table size='sm'>
                <Thead>
                    <Tr>
                        <Th borderBottom="1px solid" borderColor="gray.700"></Th>
                        <Th borderBottom="1px solid" borderColor="gray.700">Key</Th>
                        <Th borderBottom="1px solid" borderColor="gray.700">Type</Th>
                        <Th borderBottom="1px solid" borderColor="gray.700">Value</Th>
                        <Th borderBottom="1px solid" borderColor="gray.700">Description</Th>
                    </Tr>
                </Thead>
                <Tbody >
                    {formDataList.map((eachQueryParameter, index) => (
                        <RowItem
                            key={index}
                            data={eachQueryParameter}
                            onChange={(newData) => updateRow(index, newData)}
                            onDelete={() => deleteRow(index)}
                        />
                    ))}
                </Tbody>
            </Table>
            <Box ml="1" mt="3">
                <Tag size="sm">{activeParams} body item will be sent</Tag>
            </Box>
        </TableContainer>);
    }

    /**
     * @description: Inner component
     */
    const emptyPlaceholder = () => {
        return (<Box>
            <Center h="200px">
                <VStack textAlign="center">
                    <Icon as={FiInbox} w={12} h={12} color="gray.400" />
                    <Text fontSize="xl" fontWeight="semibold" color="gray.500">
                        You didn't added any <u>FormData</u> item to request body yet.
                    </Text>
                    <Text color="gray.400">
                        You can add by clicking <u>+ New</u> button
                    </Text>
                </VStack>
            </Center>
        </Box>);
    }

    return (<div>
        <Box maxW="100%" maxH="100%">
            <Flex justifyContent="space-between" alignItems="center" width="100%">
                <Tag size="sm" color="gray.500">{activeParams} form data active</Tag>
                <Box>
                    {addButton()}
                </Box>
            </Flex>
        </Box>
        {formDataList.length > 0 && dataTable()}
        {formDataList.length == 0 && emptyPlaceholder()}
    </div>);
}