import { JSX, useEffect, useState } from 'react';

import {
    Box,
    Button,
    Flex,
    Select,
    Spacer,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useColorMode
} from '@chakra-ui/react';

import { FiLayout } from 'react-icons/fi';

import { ResponseStatusCodeBox } from './ResponseStatusCodeBox';
import { HttpBodyRawData, HttpPayloadSizeObject, HttpResponseHeader, HttpResponseStatusObject, HttpResponseTimeObject } from '#/Models';
import { ResponseTimeBox } from './ResponseTimeBox';
import { ResponsePayloadSizeBox } from './ResponsePayloadSizeBox';
import { ResponsePanelHeader } from './ResponsePanelHeader';
import { HttpResponseBodyTypeData } from '#/Constants';
import { HttpResponseBodyTypesEnum } from '#/Enums';
import { HeadersTab } from './HeadersTab';
import { BodyTab } from './BodyTab';

export interface HttpResponsePanelProps {
    responseHeaders: HttpResponseHeader[];
    responseBody: HttpBodyRawData;
    responseStatus: HttpResponseStatusObject | undefined;
    responseTime: HttpResponseTimeObject | undefined;
    payloadSize: HttpPayloadSizeObject | undefined;

    onChangeLayoutButtonClick: () => void;
}

export const HttpResponsePanel = ({ responseHeaders, responseBody, responseStatus, responseTime, payloadSize, onChangeLayoutButtonClick }: HttpResponsePanelProps) => {
    const { colorMode } = useColorMode();

    const [responseBodyType, setResponseBodyType] = useState<HttpResponseBodyTypesEnum>(HttpResponseBodyTypesEnum.RAW);
    const [activeHeaderButtons, setActiveHeaderButtons] = useState<JSX.Element[]>([]);
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        const activeButtons: JSX.Element[] = [];

        if (responseStatus !== undefined) {
            activeButtons.push(<ResponseStatusCodeBox StatusData={responseStatus} />);
        }

        if (responseTime !== undefined) {
            activeButtons.push(<ResponseTimeBox responseTime={responseTime} />);
        }

        if (payloadSize !== undefined) {
            activeButtons.push(<ResponsePayloadSizeBox payloadSize={payloadSize} />);
        }

        setActiveHeaderButtons(activeButtons);
    }, [responseStatus, responseTime, payloadSize]);


    // #region Inner Components
    /**
     * @description: Inner component
     */
    const bodyTypeSelector = () => {
        const onChange = (event) => {
            const selectedType = event.target.value;
            setResponseBodyType(selectedType);
        };

        const hoverColor = colorMode === "dark" ? "gray.600" : "blue.300";

        return (<Box ml={3} pt={1} width={125}>
            <Select
                variant="filled"
                colorScheme={colorMode}
                borderRadius="md"
                size="sx"
                _hover={{ borderColor: hoverColor }}
                value={responseBodyType}
                fontSize={"1rem"}
                onChange={onChange}
            >
                {HttpResponseBodyTypeData.List().map((bodyType) => (
                    <option key={bodyType.type} value={bodyType.type}>
                        &nbsp;&nbsp;&nbsp;{bodyType.code}
                    </option>
                ))}
            </Select>
        </Box>);
    }

    const changeLayoutButton = () => {
        return (<Box>
            <Button colorScheme="blue" variant="ghost" size="sm" leftIcon={<FiLayout />} onClick={() => {
                onChangeLayoutButtonClick();
            }} />
        </Box>);
    }

    return (
        <Box height="100%" width="100%">
            <Flex justifyContent="left" alignItems="space-between" width="100%" >
                <Tabs size="sm">
                    <Tabs index={tabIndex} onChange={setTabIndex} size="sm">
                        <TabList>
                            <Tab>Body</Tab>
                            <Tab>Headers</Tab>
                            {activeHeaderButtons.length > 0 && bodyTypeSelector()}
                        </TabList>
                    </Tabs>


                </Tabs>
                <Spacer />
                {activeHeaderButtons.length === 0 && <ResponsePanelHeader />}
                {activeHeaderButtons.length > 0 && activeHeaderButtons.map(i => i)}

                {changeLayoutButton()}

            </Flex>
            <Tabs index={tabIndex} onChange={setTabIndex}>
                <TabPanels>
                    <TabPanel p={0} height="100%" width="100%" display="flex" flexDirection="column">
                        <BodyTab rawData={responseBody} />
                    </TabPanel>

                    <TabPanel p={0}>
                        <HeadersTab headerList={responseHeaders} />
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </Box>

    );
}