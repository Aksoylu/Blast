import React, { useRef, useState } from "react";
import { FiFolder, FiFile } from 'react-icons/fi';
import { Box, VStack, HStack, Text, Icon, Collapse } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useDrag, useDrop } from 'react-dnd';

export interface TreeNodeProps {
  id: string;
  name: string;
  isCollection?: boolean;
  isFolder: boolean;
  children?: TreeNodeProps[];
}

export const TreeNodeItem: React.FC<{ node: TreeNodeProps; onDrop: (draggedId: string, targetId: string) => void }> = ({ node, onDrop }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const ref = useRef<HTMLDivElement>(null);

  const toggle = () => {
    if (hasChildren) setIsOpen(!isOpen);
  };


   const [{ isDragging }, drag] = useDrag({
    type: 'TREE_NODE',
    item: { id: node.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'TREE_NODE',
    drop: (item: { id: string }) => {
      onDrop(item.id, node.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  });

  drag(drop(ref));

  return (
    <Box pl={2}>
      <HStack
        ref={ref}
        onClick={toggle}
        cursor="pointer"
        bg={isOver ? 'blue.100' : 'transparent'}
        opacity={isDragging ? 0.5 : 1}
        p={1}
        borderRadius="md"
      >
        {hasChildren ? (
          <Icon as={isOpen ? ChevronDownIcon : ChevronRightIcon} boxSize={4} />
        ) : (
          <Box w={4} />
        )}
        <Icon
          as={node.isFolder ? FiFolder : FiFile}
          color={node.isFolder ? 'yellow.500' : 'gray.400'}
        />
        <Text fontSize="sm">{node.name}</Text>
      </HStack>

      {hasChildren && isOpen && (
        <Collapse in={isOpen}>
          <VStack align="start" spacing={1} mt={1}>
            {node.children?.map((child) => (
              <TreeNodeItem key={child.id} node={child} onDrop={onDrop} />
            ))}
          </VStack>
        </Collapse>
      )}
    </Box>
  );
};
