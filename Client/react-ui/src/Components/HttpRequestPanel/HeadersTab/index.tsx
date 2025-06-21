import { useState } from "react";

import { Box, Button, Center, Text, Flex, Icon, Table, TableContainer, Tag, Tbody, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { FiPlus, FiEyeOff, FiEye } from "react-icons/fi";
import { BsCardChecklist } from "react-icons/bs";

import { HttpRequestHeader } from "#/Models";

import RowItem from "./RowItem";

export interface HeadersTabProps {
    headerList: HttpRequestHeader[];
    setHeaderList: (updated: HttpRequestHeader[]) => void;
}

export const HeadersTab = ({ headerList, setHeaderList }: HeadersTabProps) => {
    // #region  Definitions
    const [isHardcodedHeadersVisible, setIsHardcodedHeadersVisible] = useState(false);

    const ConstantHeaders = headerList.filter(eachHeader => eachHeader.IsConstant === true);

    const activeOptionalHeaders = headerList.filter(eachHeader => eachHeader.IsIncluded === true && eachHeader.IsConstant !== true);
    const renderedHeaderList = isHardcodedHeadersVisible ? headerList : activeOptionalHeaders;

    // #region  UI Actions
    const updateRow = (updatedHeaderKey: string, updated: Partial<HttpRequestHeader>) => {
        if (updated.IsConstant) {
            return;
        }

        const updatedHeaderList = [] as HttpRequestHeader[];
        const updatedHeaderKeys = [] as string[];

        for (let i = 0; i < headerList.length; i++) {
            const currentHeader = headerList[i];

            if (currentHeader.IsConstant || updatedHeaderKeys.includes(currentHeader.Key)) {
                updatedHeaderList.push(currentHeader);
                continue;
            }

            if (updatedHeaderKey === currentHeader.Key) {
                const updatedHeaderData = { ...currentHeader, ...updated };

                updatedHeaderList.push(updatedHeaderData);
                updatedHeaderKeys.push(currentHeader.Key);
                continue;
            }

            updatedHeaderList.push(currentHeader);
            updatedHeaderKeys.push(currentHeader.Key);
        }

        setHeaderList(updatedHeaderList);
    };

    const deleteRow = (deletedHeaderKey: string) => {
        const updatedList = headerList.filter((headerData) => {
            if(headerData.IsConstant)
            {
                return true;
            }
    
            return headerData.Key !== deletedHeaderKey;
        });

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
    const showConstantHeadersButton = () => {
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
    const hideConstantHeadersButton = () => {
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


    /**
    * @description:Inner Component
    */
    const headerTable = () => {
        return (<Table size='sm'>
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
                        onChange={(newData) => updateRow(eachRequestHeader.Key, newData)}
                        onDelete={() => deleteRow(eachRequestHeader.Key)}
                    />
                ))}
            </Tbody>
        </Table>);
    }

    /**
    * @description: Inner component
    */
    const emptyPlaceholder = () => {
        return (<Box>
            <Center h="200px">
                <VStack textAlign="center">
                    <Icon as={BsCardChecklist} w={12} h={12} color="gray.400" />
                    <Text fontSize="xl" fontWeight="semibold" color="gray.500">
                        You didn't added any request header yet.
                    </Text>
                    <Text color="gray.400">
                        You can add by clicking <u>+ New</u> button
                    </Text>
                </VStack>
            </Center>
        </Box>);
    }

    return (<div>
        <TableContainer>
            <Box maxW="100%" maxH="100%">
                <Flex justifyContent="space-between" alignItems="center" width="100%">
                    <Tag size="sm" color="gray.500">{headerList.length} header added to request ({ConstantHeaders.length} constant)</Tag>
                    <Box>
                        {!isHardcodedHeadersVisible && showConstantHeadersButton()}
                        {isHardcodedHeadersVisible && hideConstantHeadersButton()}
                        {addButton()}
                    </Box>
                </Flex>
            </Box>

            {renderedHeaderList.length > 0 && headerTable()}
            {renderedHeaderList.length == 0 && emptyPlaceholder()}
        </TableContainer>
    </div>);
}