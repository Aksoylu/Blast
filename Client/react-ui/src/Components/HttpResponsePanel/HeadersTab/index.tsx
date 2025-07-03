
import { Box, Center, Text, Icon, Table, TableContainer, Tbody, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { BsCardChecklist } from "react-icons/bs";

import { HttpResponseHeader } from "#/Models";

import RowItem from "./RowItem";

export interface HeadersTabProps {
    headerList: HttpResponseHeader[];
}

export const HeadersTab = ({ headerList }: HeadersTabProps) => {
    /**
    * @description:Inner Component
    */
    const headerTable = () => {
        return (<Table size='sm'>
            <Thead>
                <Tr>
                    <Th borderBottom="1px solid" borderColor="gray.700">Key</Th>
                    <Th borderBottom="1px solid" borderColor="gray.700">Value</Th>
                </Tr>
            </Thead>
            <Tbody >
                {headerList.map((eachResponseHeader, index) => (
                    <RowItem
                        key={index}
                        data={eachResponseHeader}
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
                        Send request first to get response headers from server
                    </Text>
                </VStack>
            </Center>
        </Box>);
    }

    return (<div>
        <TableContainer>
            {headerList.length > 0 && headerTable()}
            {headerList.length == 0 && emptyPlaceholder()}
        </TableContainer>
    </div>);
}