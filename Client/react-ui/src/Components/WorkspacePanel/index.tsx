'use client'

import {
    Box,
    Button,
    HStack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    VStack
} from '@chakra-ui/react';
import { SearchBar } from './SearchBar';
import { CollectionTree } from './CollectionTree';
import { FiDownload, FiPlus, FiRefreshCw, FiShare, FiShare2, FiUpload } from 'react-icons/fi';
import { Tooltip } from '@chakra-ui/react'


export const WorkspacePanel: React.FC = () => {
    //const treeData = useHomePageStore((state) => state.collectionList);
    //const setTreeData = useHomePageStore((state) => state.setCollectionList);

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

    // #region Inner Components
    /**
     * inner component
     * @returns 
     */
    const CreateNewButton = () => {
        const onClick = () => {
            alert("todo");
        }
        return (
            <Tooltip label="Create New">
                <Button
                    flex="1"
                    colorScheme="blue"
                    variant="outline"
                    iconSpacing={0}
                    size="sm"
                    leftIcon={<FiPlus />}
                    onClick={onClick}>
                </Button>
            </Tooltip>);
    }

    /**
     * inner component
     * @returns 
     */
    const ImportButton = () => {
        const onClick = () => {
            alert("todo");
        }
        return (
            <Tooltip label="Import">
                <Button
                    flex="1"
                    colorScheme="blue"
                    variant="outline"
                    iconSpacing={0}
                    size="sm"
                    leftIcon={<FiDownload />}
                    onClick={onClick}>
                </Button>
            </Tooltip>);
    }

    /**
     * inner component
     * @returns 
    */
    const RefreshButton = () => {
        const onClick = () => {
            alert("todo");
        }
        return (
            <Tooltip label="Sync">
                <Button
                    flex="1"
                    colorScheme="blue"
                    variant="outline"
                    iconSpacing={0}
                    size="sm"
                    leftIcon={<FiRefreshCw />}
                    onClick={onClick}>
                </Button>
            </Tooltip>);
    }

    /**
     * inner component
     * @returns 
    */
    const ShareButton = () => {
        const onClick = () => {
            alert("todo");
        }
        return (
            <Tooltip label="Share / Export">
                <Button
                    flex="1"
                    colorScheme="blue"
                    variant="outline"
                    iconSpacing={0}
                    size="sm"
                    leftIcon={<FiShare2 />}
                    onClick={onClick}>
                </Button>
            </Tooltip>);
    }
    // #endregion

    // #region Render
    return (
        <Box >
            <Tabs isFitted>
                <TabList mb='1em'>
                    <Tab>Requests</Tab>
                    <Tab>Variables</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel p={0} h="100%" display="flex" flexDirection="column" >
                        <Box>
                            <HStack maxW="100%" spacing={{ base: 1, sm: 1, md: 2, lg: 3 }}>
                                <CreateNewButton />
                                <ImportButton />
                                <RefreshButton />
                                <ShareButton />
                            </HStack>
                        </Box>

                        <Box mt={2}>
                            <SearchBar />
                        </Box>

                        <Box flex="1" overflow="auto">
                            <CollectionTree />
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