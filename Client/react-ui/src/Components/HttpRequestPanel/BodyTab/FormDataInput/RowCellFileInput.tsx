import React, { useRef, useState } from "react";
import { Box, Button, Flex, HStack, Icon, Text, useToast } from "@chakra-ui/react";
import { FiUpload, FiFile, FiX } from "react-icons/fi";
import { MessageCodes } from "#/Constants/MessageCodes";


export interface RowCellFileInputProps {
    value: string;
    onChange: (updated: string) => void;
}
export const RowCellFileInput: React.FC<RowCellFileInputProps> = ({ value, onChange }) => {
    const toast = useToast();

    const fileName = value ? value.split(/[\\/]/).pop() : "";

    // #region  Inner Components
    const uploadFileButton = () => {
        const onClick = async () => {
            const fileDialogResult = await window.electronAPI.FileDialogService.GetFilePath();
            if (fileDialogResult.success) {
                onChange(fileDialogResult.path ?? "");
            }
            else {
                displayFileSelectionError(fileDialogResult.message ?? MessageCodes.UNKNOWN);
            }
        }

        return (<Button
            leftIcon={<FiUpload />}
            onClick={onClick}
        >
            Select File
        </Button>);
    }

    const uploadedFileDisplay = () => {
        const onFileDeleteButtonClick = () => {
            onChange("");
        }

        const onFileChangeButtonClick = async () => {
            const fileDialogResult = await window.electronAPI.FileDialogService.GetFilePath();
            if (fileDialogResult.success) {
                onChange(fileDialogResult.path ?? "");
            }
            else {
                displayFileSelectionError(fileDialogResult.message ?? MessageCodes.UNKNOWN);
            }
        }

        return (
            <Flex
                align="center"
                gap={2}
                p={2}
            >
                <HStack>
                    <Icon onClick={onFileChangeButtonClick} cursor="pointer" as={FiFile} color="blue.500" boxSize={5} />
                    <Text
                        onClick={onFileChangeButtonClick}
                        cursor="pointer"
                        fontSize="sm"
                        _hover={{
                            color: "blue.500",
                        }}
                    >
                        {fileName}
                    </Text>

                    <Icon
                        onClick={onFileDeleteButtonClick}
                        cursor="pointer"
                        as={FiX}
                        color="red.500"
                        boxSize={5}
                        _hover={{
                            color: "red.500",
                            transform: "scale(1.2)",
                            transition: "all 0.2s ease-in-out",
                        }}
                    /></HStack>
            </Flex>
        );
    }
    // #endregion


    // #region UI Actions
    const displayFileSelectionError = (description: string) => {
        toast({
            title: "File Error",
            description: description,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
        });
    }
    // #endregion

    return (
        <Box>
            {!value && uploadFileButton()}
            {value && uploadedFileDisplay()}
        </Box>
    );
};