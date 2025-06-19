import { Box, Button, Flex, FormLabel, Table, TableContainer, Tag, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import RowItem from "./RowItem";
import { HttpRequestHeader } from "#/Models/HttpRequestHeader";

export interface HeadersTabProps {

}


export const HeadersTab = ({ }: HeadersTabProps) => {

    const [parameterData, setParameterData] = useState<
        HttpRequestHeader[]>([]);

    const updateRow = (index: number, eventData: HttpRequestHeader) => {
        setParameterData(prev =>
            prev.map((row, i) => (i === index ? eventData : row))
        );
    };

    const deleteRow = (index: number) => {
        setParameterData(prev => prev.filter((_, i) => i !== index));
    };

    const onAddButtonClick = () => {
        const newRequestHeader: HttpRequestHeader= {
            IsIncluded: true,
            Key: "",
            Value: "",
            Description: "",
            IsHardcoded: false
        }

        setParameterData(prev => [...prev, newRequestHeader]);
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
        const activeParams = parameterData.filter(eachParameter => eachParameter.IsIncluded === true).length;
        return (<Tag size="sm">{activeParams} header added to request</Tag>);
    }

    return (<div>
        <TableContainer>
            <Box maxW="100%" maxH="100%">
                <Flex justifyContent="space-between" alignItems="center" width="100%">
                    <FormLabel pl="12px">Request Headers</FormLabel>
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
                    {parameterData.map((eachRequestHeader, index) => (
                        <RowItem
                            key={index}
                            data={eachRequestHeader}
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