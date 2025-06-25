import React, { useRef, useState } from "react";
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { FiUpload, FiFile } from "react-icons/fi";


export interface RowCellFileInputProps {
    value: string;
    onChange: (updated: string) => void;
}
export const RowCellFileInput: React.FC<RowCellFileInputProps> = ({ value, onChange }) => {
    const [filePath, setFilePath] = useState<string | null>(value || null);

    const handleSelectFile = async () => {
        const selectedFile = await window.electronAPI.openFileDialog();
        if (selectedFile) {
            setFilePath(selectedFile);
            onChange(selectedFile);
        }
    };

    return (
        <Box>
            {!filePath ? (
                <Button leftIcon={<FiUpload />} onClick={handleSelectFile}>
                    Dosya Yükle
                </Button>
            ) : (
                <Flex
                    align="center"
                    gap={2}
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    p={2}
                    cursor="pointer"
                    onClick={handleSelectFile}
                >
                    <Icon as={FiFile} color="blue.500" boxSize={5} />
                    <Text fontSize="sm">{filePath.split(/[\\/]/).pop()}</Text>
                </Flex>
            )}
        </Box>
    );
};