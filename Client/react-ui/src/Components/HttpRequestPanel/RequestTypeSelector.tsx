
import {
    Box,
    Button,
    Flex,
    Input,
    MenuItem,
    MenuList,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Tab,
    Table,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tbody,
    Td,
    VStack
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { HttpRequestTypeColors } from '../../Constants/HttpRequestTypeColors';
import { FiUpload } from 'react-icons/fi';
import { HttpRequestTypes } from '../../Constants/Enums/HttpRequestTypes';
import { useState } from 'react';

export const RequestTypeSelector = () => {
    const requestTypes = HttpRequestTypeColors.List().filter(i => i.type !== HttpRequestTypes.CUSTOM);


    const [selectedRequestType, setSelectedRequestType] = useState(HttpRequestTypes.POST);
    const [customRequestType, setCustomRequestType] = useState("");

    const onRequestSelected = (requestType: HttpRequestTypes) => {
        setSelectedRequestType(requestType);
    }
    const onCustomRequestTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomRequestType(e.target.value.toUpperCase());
    };

    const getSelectedRequestColor = () => {
        const foundRequestType = requestTypes.find((item) => item.type === selectedRequestType);

        return foundRequestType !== undefined ? foundRequestType.color: "white";
    }

    return (
        <Flex justifyContent="center">
            <Popover placement="bottom" isLazy>
                <PopoverTrigger>
                    <Button rightIcon={<ChevronDownIcon />} colorScheme={getSelectedRequestColor()} variant="outline" w="fit-content">
                        Quick Actions
                    </Button>
                </PopoverTrigger>
                <PopoverContent _focus={{ boxShadown: 'none' }} w={200}>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader fontWeight="bold">Request Type</PopoverHeader>
                    <PopoverBody w="100%">
                        <VStack width="100%">
                            {requestTypes.map((eachType) => {
                                const name = eachType.type.toString();
                                return (<Button
                                    onClick={() => {onRequestSelected(eachType.type)}}
                                    width="100%"
                                    colorScheme={eachType.color}
                                    variant="outline"
                                    size="sm" >{name}
                                </Button>);
                            })}

                            <Input
                                value={customRequestType}
                                onChange={onCustomRequestTypeChange}
                                placeholder="Custom"
                                colorScheme="white"
                                variant="outline"
                                size="md"
                            />
                        </VStack>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Flex>
    )
}