import React, { useState } from 'react';
import { VStack } from '@chakra-ui/react';
import { TreeNodeItem, TreeNodeProps } from './TreeNode';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export interface FileTreeProps {
  data: TreeNodeProps[];
  onTreeChange: (newTree: TreeNodeProps[]) => void;
}

export const FileTree: React.FC<FileTreeProps> = ({ data, onTreeChange }) => {
  const handleDrop = (draggedId: string, targetId: string) => {
    if (draggedId === targetId) return;

    const moveNode = (nodes, nodeId) => {
      let nodeToMove;
      const filtered = nodes.filter((node) => {
        if (node.id === nodeId) {
          nodeToMove = node;
          return false;
        }
        if (node.children) {
          const result = moveNode(node.children, nodeId);
          node.children = result.nodes;
          if (result.nodeToMove) nodeToMove = result.nodeToMove;
        }
        return true;
      });
      return { nodes: filtered, nodeToMove };
    };

    const insertNode = (nodes, targetId, nodeToInsert) => {
      return nodes.map((node) => {
        if (node.id === targetId && node.isFolder) {
          const children = node.children || [];
          return { ...node, children: [...children, nodeToInsert] };
        }
        if (node.children) {
          return {
            ...node,
            children: insertNode(node.children, targetId, nodeToInsert),
          };
        }
        return node;
      });
    };

    const { nodes: cleaned, nodeToMove } = moveNode(data, draggedId);
    if (!nodeToMove) return;
    const newTree = insertNode(cleaned, targetId, nodeToMove);
    onTreeChange(newTree);
  };

  return (
    <DndProvider backend={HTML5Backend}>

      <VStack align="start" spacing={1}>
        {data.map((node, index) => (
        <TreeNodeItem key={node.id} node={node} onDrop={handleDrop} />
        ))}
      </VStack>
    </DndProvider>

  );
};

