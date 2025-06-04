'use client'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box
} from '@chakra-ui/react'
import { FileTree, FileTreeProps } from '../FileTree';


export const WorkspaceItem : React.FC<FileTreeProps> = ({ data, onTreeChange }) => {
    
    return (<Accordion>
        <AccordionItem>
            <h2>
                <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                        Section 1 title
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
            </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
            <AccordionButton>
                <Box as='span' flex='1' textAlign='left'>
                    Section 2 title
                </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
                <FileTree data={data} onTreeChange={onTreeChange} />
            </AccordionPanel>
        </AccordionItem>
    </Accordion>);
}