import { useState } from "react";

import { Box, Button, Flex, Table, TableContainer, Tag, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { FiPlus, FiEyeOff, FiEye } from "react-icons/fi";

import { HttpRequestHeader } from "#/Models";

import RowItem from "./RowItem";

export interface HeadersTabProps {
    headerList: HttpRequestHeader[];
    setHeaderList: (updated: HttpRequestHeader[]) => void;
}

export const HeadersTab = ({ headerList, setHeaderList }: HeadersTabProps) => {
    // #region  Definitions
    const [isHardcodedHeadersVisible, setIsHardcodedHeadersVisible] = useState(false);

    const IsConstantHeaders = headerList.filter(eachHeader => eachHeader.IsConstant === true);
    const activeOptionalHeaders = headerList.filter(eachHeader => eachHeader.IsIncluded === true && eachHeader.IsConstant !== true);
    const renderedHeaderList = isHardcodedHeadersVisible ? headerList : activeOptionalHeaders;

    // #region  UI Actions
    const updateRow = (index: number, updated: Partial<HttpRequestHeader>) => {
        const updatedList = headerList.map((param, i) =>
            i === index ? { ...param, ...updated } : param
        );
        setHeaderList(updatedList);
    };

    const deleteRow = (index: number) => {
        const updatedList = headerList.filter((_, i) => i !== index);
        setHeaderList(updatedList);
    };

    const addRow = (newItem: HttpRequestHeader) => {
        setHeaderList([...headerList, newItem]);
    }


    // #region  Inner Components
    /**
     * @description:Inner Component
     */
    const addButton = () => {
        const onClick = () => {
            const newRequestHeader: HttpRequestHeader = {
                IsIncluded: true,
                Key: "",
                Value: "",
                Description: "",
                IsConstant: false,
                Explanation: ""
            }

            addRow(newRequestHeader);
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
      * @description:Inner Component
    */
    const showIsConstantHeadersButton = () => {
        const onClick = () => {
            setIsHardcodedHeadersVisible(true);
        }

        return (<Button
            onClick={onClick}
            ml="12px"
            color="gray.500"
            variant="ghost"
            size="sm"
            leftIcon={<FiEye />}>Show constant headers</Button>);
    };

    /**
     * @description:Inner Component
    */
    const hideIsConstantHeadersButton = () => {
        const onClick = () => {
            setIsHardcodedHeadersVisible(false);
        }
        return (<Button
            onClick={onClick}
            ml="12px"
            color="gray.500"
            variant="ghost"
            size="sm"
            leftIcon={<FiEyeOff />}>Hide constant headers</Button>);
    };

    return (<div>
        <TableContainer>
            <Box maxW="100%" maxH="100%">
                <Flex justifyContent="space-between" alignItems="center" width="100%">
                    <Tag size="sm" color="gray.500">{headerList.length} header added to request ({IsConstantHeaders.length} constant)</Tag>
                    <Box>
                        {!isHardcodedHeadersVisible && showIsConstantHeadersButton()}
                        {isHardcodedHeadersVisible && hideIsConstantHeadersButton()}
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
                    {renderedHeaderList.map((eachRequestHeader, index) => (
                        <RowItem
                            key={index}
                            data={eachRequestHeader}
                            onChange={(newData) => updateRow(index, newData)}
                            onDelete={() => deleteRow(index)}
                        />
                    ))}
                </Tbody>
            </Table>

        </TableContainer>
    </div>);
}