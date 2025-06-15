import { Box, Button, Checkbox, Flex, FormLabel, Table, TableContainer, Tag, TagLabel, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { FiDelete, FiPlus } from "react-icons/fi";
import RowItem, { RowItemProps } from "./RowItem";


export interface ParameterTabProps {

}


export const ParametersTab = ({ }: ParameterTabProps) => {

    const [parameterData, setParameterData] = useState<
        { data: RowItemProps["data"] }[]
    >([
        { data: { IsIncluded: true, Key: "item1", Value: "value1", Description: "desc1" } },
        { data: { IsIncluded: false, Key: "item2", Value: "value2", Description: "desc2" } }
    ]);

    const updateRow = (index: number, updatedData: RowItemProps["data"]) => {
        setParameterData(prev =>
            prev.map((row, i) => (i === index ? { data: updatedData } : row))
        );
    };

    const deleteRow = (index: number) => {
        setParameterData(prev => prev.filter((_, i) => i !== index));
    };

    const onAddButtonClick = () => {
        const newParameterData: RowItemProps["data"] = {
            IsIncluded: true,
            Key: "",
            Value: "",
            Description: ""
        }

        setParameterData(prev => [...prev, { data: newParameterData }]);
    }

    /**
     * @description:Inner Component
     * @returns 
     */
    const addButton = () => {
        return (<Button
            onClick={onAddButtonClick}
            ml="12px"
            colorScheme="blue"
            variant="ghost"
            size="sm"
            leftIcon={<FiPlus />}>New</Button>);
    };

    /**
     * @description: Inner component
     */
    const paramterCounter = () => {
        const activeParams = parameterData.filter(eachParameter => eachParameter.data.IsIncluded === true).length;
        return (<Tag size="sm">{activeParams} parameter active</Tag>);
    }

    return (<div>
        <TableContainer>
            <Box maxW="100%" maxH="100%">
                <Flex justifyContent="space-between" alignItems="center" width="100%">
                    <FormLabel pl="12px">Query Parameters</FormLabel>
                    <Box>
                        {addButton()}
                    </Box>
                </Flex>
            </Box>
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
                    {parameterData.map((row, index) => (
                        <RowItem
                            key={index}
                            data={row.data}
                            onChange={(newData) => updateRow(index, newData)}
                            onDelete={() => deleteRow(index)}
                        />
                    ))}
                </Tbody>
            </Table>
            <Box ml="1" mt="3">
                {paramterCounter()}
            </Box>
        </TableContainer>
    </div>);
}