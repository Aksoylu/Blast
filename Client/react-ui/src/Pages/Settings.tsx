import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { AppSettings } from "./Settings/AppSettings";

export const Settings = () => {
    return (<Tabs position='relative' variant='unstyled'>
        <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
        </TabList>
        <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
        <TabPanels>
            <TabPanel>
                <AppSettings/>
            </TabPanel>
            <TabPanel>
                <p>two!</p>
            </TabPanel>
            <TabPanel>
                <p>three!</p>
            </TabPanel>
        </TabPanels>
    </Tabs>);
}