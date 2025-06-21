import { useState } from 'react';

import {
    Button,
    Flex,
    Input,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    VStack,
    useDisclosure
} from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons';

import { HttpRequestTypeData } from '#/Constants';
import { HttpRequestTypesEnum } from '#/Enums';

export const RequestTypeSelector = () => {
    const ComponentWidth = 135;
    const CustomRequestTypeMinLength = 2;
    const CustomRequestTypeMaxLength = 10;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedRequestType, setSelectedRequestType] = useState(HttpRequestTypesEnum.POST);
    const [customRequestType, setCustomRequestType] = useState("");

    const requestTypeDataList = HttpRequestTypeData.List().filter(i => i.type !== HttpRequestTypesEnum.CUSTOM);

    const foundRequestType = HttpRequestTypeData.GetByType(selectedRequestType);

    const onRegularRequestTypeSelected = (requestType: HttpRequestTypesEnum) => {
        setSelectedRequestType(requestType);
        setCustomRequestType("");
        onClose();
    }

    const onCustomRequestInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentRequestType = HttpRequestTypeData.GetByType(HttpRequestTypesEnum.CUSTOM);
        setSelectedRequestType(currentRequestType.type);

        let eventData = event.target.value.toUpperCase();
        if (eventData.length >= CustomRequestTypeMaxLength) {
            eventData = eventData.slice(0, CustomRequestTypeMaxLength);
        }

        setCustomRequestType(eventData);
    };

    const renderPopoverButtonText = () => {
        return selectedRequestType == HttpRequestTypesEnum.CUSTOM ? customRequestType : foundRequestType.code;
    }

    const onCustomRequestInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClose();
        }
    }

    return (
        <Flex justifyContent="center">
            <Popover placement="bottom"
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                isLazy>
                <PopoverTrigger>
                    <Button
                        minW={ComponentWidth}
                        maxW={ComponentWidth}
                        rightIcon={<ChevronDownIcon />}
                        colorScheme={foundRequestType.color}
                        variant="outline"
                        w="fit-content"
                    >
                        {renderPopoverButtonText()}
                    </Button>
                </PopoverTrigger>
                <PopoverContent _focus={{ boxShadown: 'none' }} w={200}>
                    <PopoverArrow />
                    <PopoverHeader fontWeight="bold">Request Type</PopoverHeader>
                    <PopoverBody w="100%" >
                        <VStack width="100%">
                            {requestTypeDataList.map((eachType) => {
                                return (<Button
                                    onClick={() => { onRegularRequestTypeSelected(eachType.type) }}
                                    width="100%"
                                    colorScheme={eachType.color}
                                    variant="outline"
                                    size="sm" >{eachType.code}
                                </Button>);
                            })}

                            <Input
                                value={customRequestType}
                                onKeyDown={onCustomRequestInputKeyDown}
                                onChange={onCustomRequestInputChange}
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