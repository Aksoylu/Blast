import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React, { forwardRef, useImperativeHandle, useState } from "react";

export interface InputModalRef {
    show: () => void;
    hide: () => void;

}

export interface InputModalProps {
    actionResult: (workspaceName: string) => void;
}

export const InputModal = forwardRef(({ actionResult }: InputModalProps, ref) => {
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const [workspaceName, setWorkspaceName] = useState("");

    const { isOpen, onOpen, onClose } = useDisclosure();

    useImperativeHandle(ref, () => ({
        show: onOpen,
        hide: onClose
    }));

    const onSaveButtonClick = () => {
        actionResult(workspaceName);
        onClose();
    }

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new workspace</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input
                                onChange={(e) => { setWorkspaceName(e.target.value) }}
                                value={workspaceName}
                                ref={initialRef}
                                placeholder='Workspace name ...'
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onSaveButtonClick}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
});