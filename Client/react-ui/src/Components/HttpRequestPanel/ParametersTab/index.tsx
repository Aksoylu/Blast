import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { BsStack } from "react-icons/bs";

import RowItem from "./RowItem";

import { Box, Button, Center, Flex, Text, Icon, Table, TableContainer, Tag, Tbody, Th, Thead, Tr, VStack } from "@chakra-ui/react";

import { HttpQueryParameter } from "#/Models/HttpQueryParameter";

export interface ParameterTabProps {
    parameterList: HttpQueryParameter[];
    setParameterList: (updated: HttpQueryParameter[]) => void;
}


export const ParametersTab = ({ parameterList, setParameterList }: ParameterTabProps) => {
    const activeParams = parameterList.filter(p => p.IsIncluded).length;

    const updateRow = (index: number, updated: Partial<HttpQueryParameter>) => {
        const updatedList = parameterList.map((param, i) =>
            i === index ? { ...param, ...updated } : param
        );
        setParameterList(updatedList);
    };

    const deleteRow = (index: number) => {
        const updatedList = parameterList.filter((_, i) => i !== index);
        setParameterList(updatedList);
    };

    const addRow = (newItem: HttpQueryParameter) => {
        setParameterList([...parameterList, newItem]);
    }

    // #region  Inner Components
    /**
     * @description:Inner Component
     */
    const addButton = () => {
        const onClick = () => {
            const newQueryParameter: HttpQueryParameter = {
                IsIncluded: true,
                Key: "",
                Value: "",
                Description: ""
            }
            addRow(newQueryParameter);
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
    const parameterTable = () => {
        return (<TableContainer>

            <Table size='sm'>
                <Thead>
                    <Tr>
                        <Th borderBottom="1px solid" borderColor="gray.700"></Th>
                        <Th borderBottom="1px solid" borderColor="gray.700">Key</Th>
                        <Th borderBottom="1px solid" borderColor="gray.700">Value</Th>
                        <Th borderBottom="1px solid" borderColor="gray.700">Description</Th>
                    </Tr>
                </Thead>
                <Tbody >
                    {parameterList.map((eachQueryParameter, index) => (
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
                <Tag size="sm">{activeParams} parameter active</Tag>
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
                    <Icon as={BsStack} w={12} h={12} color="gray.400" />
                    <Text fontSize="xl" fontWeight="semibold" color="gray.500">
                        You didn't added any query parameter yet.
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
                <Tag size="sm" color="gray.500">{activeParams} parameter active</Tag>
                <Box>
                    {addButton()}
                </Box>
            </Flex>
        </Box>
        {parameterList.length > 0 && parameterTable()}
        {parameterList.length == 0 && emptyPlaceholder()}
    </div>);
}