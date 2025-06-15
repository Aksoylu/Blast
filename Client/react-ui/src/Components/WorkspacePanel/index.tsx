'use client'

import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs
} from '@chakra-ui/react';
import { FileTree, FileTreeProps } from '../FileTree';
import { SearchBar } from '../SearchBar';
import { ContextMenu } from '../FileTree/ContextMenu';


export const WorkspacePanel: React.FC<FileTreeProps> = ({ data, onTreeChange }) => {

    // todo: menü kapanınca tüm gereksiz hover olmuş elemanlar resetlenmeli
    // todo: arama çubuğu elastik filtreli arama özelliği eklenmeli
    // todo: Yeni koleksiyon oluşturma tuşu eklenmeli
    // todo: koleksiyon sağ tık menüsü
    //          - sil tuşu
    //          - klasör oluştur tuşu
    //          - yeniden adlandır tuşu
    //          - request oluştur tuşu
    //          - dışarı aktar tuşu
    // todo: klasör sağ tık menüsü
    //          - sil tuşu
    //          - yeniden adlandır tuşu
    //          - request oluştur tuşu
    //          - dışarı aktar tuşu
    // todo: request sağ tık menüsü
    //          - sil tuşu
    //          - yeniden adlandır tuşu
    //          - dışarı aktar tuşu
    //          - burada request oluştur tuşu
    //          - dublicate (çoğalt) tuşu
    return (
        <Box >
            <Tabs isFitted>
                <TabList mb='1em'>
                    <Tab>Requests</Tab>
                    <Tab>Variables</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel p={0} h="100%" display="flex" flexDirection="column">
                        <Box>
                            <SearchBar />
                        </Box>

                        <Box flex="1" overflow="auto">
                            <FileTree data={data} onTreeChange={onTreeChange} />
                        </Box>

                    </TabPanel>
                    <TabPanel>
                        <p>Variables!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </Box>
    );
}