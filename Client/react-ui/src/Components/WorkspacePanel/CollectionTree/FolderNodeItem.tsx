import React, { useRef, useState } from "react";
import { FiFolder } from 'react-icons/fi';
import { Box, VStack, HStack, Text, Icon, Collapse } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useDrag, useDrop } from 'react-dnd';
import { HttpRequestFolder, HttpRequestObject } from "#/Models";
import { HttpRequestNodeItem } from "./HttpRequestNodeItem";


export const FolderNodeItem: React.FC<{
  node: HttpRequestFolder;
  onDrop: (draggedId: string, targetId: string) => void
  handleHover?: (hoveredId: string) => void;
  isContextMenuOpen: boolean;

}> = ({ node, onDrop, handleHover, isContextMenuOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.Items && node.Items.length > 0;
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


  const renderChildItem = (item: HttpRequestFolder | HttpRequestObject) => {
    if (item.EntityType == "folder") {
      return (<FolderNodeItem
        key={item.Id}
        node={item}
        onDrop={onDrop}
        handleHover={handleHover}
        isContextMenuOpen={isContextMenuOpen}
      />)
    }
    if (item.EntityType == "http_request") {
      return (<HttpRequestNodeItem
        key={item.Id}
        node={item}
        onDrop={onDrop}
        handleHover={handleHover}
        isContextMenuOpen={isContextMenuOpen}
      />);
    }
  }

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
        {hasChildren ? (
          <Icon as={isOpen ? ChevronDownIcon : ChevronRightIcon} boxSize={4} />
        ) : (
          <Box w={4} />
        )}
        <Icon
          as={FiFolder}
          color="yellow.500"
        />
        <Text fontSize="sm">{node.Name}</Text>
      </HStack>

      {hasChildren && isOpen && (
        <Collapse in={isOpen} >
          <VStack align="start" spacing={1} mt={1} >
            {node.Items?.map(eachItem => renderChildItem(eachItem))}
          </VStack>
        </Collapse>
      )}
    </Box>
  );
};
