import React, { useRef, useState } from "react";
import { FiFolder, FiFile } from 'react-icons/fi';
import { Box, VStack, HStack, Text, Icon, Collapse } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useDrag, useDrop } from 'react-dnd';
import { HttpRequestCollection, HttpRequestFolder, HttpRequestObject } from "#/Models";


export const HttpRequestNodeItem: React.FC<{
  node: HttpRequestObject;
  onDrop: (draggedId: string, targetId: string) => void
  handleHover?: (hoveredId: string) => void;
  isContextMenuOpen: boolean;

}> = ({ node, onDrop, handleHover, isContextMenuOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = false;
  const ref = useRef<HTMLDivElement>(null);

  const toggle = () => {
    if (hasChildren) setIsOpen(!isOpen);
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'TREE_NODE',
    item: { id: node.Id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'TREE_NODE',
    drop: (item: { id: string }) => {
      onDrop(item.id, node.Id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  });

  drag(drop(ref));

  const [isMouseOver, setIsMouseOver] = useState(false);


  return (
    <Box pl={2}>
      <HStack
        ref={ref}
        onClick={toggle}
        cursor="pointer"
        bg={isOver ? 'blue.100' : 'transparent'}
        fontWeight={isMouseOver ? 600 : 300}
        opacity={isDragging ? 0.5 : 1}
        p={1}
        borderRadius="md"
        onMouseEnter={(e) => {
          if (isContextMenuOpen)
            return;
          e.stopPropagation();
          handleHover?.(node.Id);
          setIsMouseOver(true);
        }}
        onMouseLeave={(e) => {
          if (isContextMenuOpen)
            return;
          e.stopPropagation();
          setIsMouseOver(false);
        }}
      >
        <Box w={4} />
        <Icon
          as={FiFile}
          color="gray.400"
        />
        <Text fontSize="sm">{node.Name}</Text>
      </HStack>
    </Box>
  );
};
