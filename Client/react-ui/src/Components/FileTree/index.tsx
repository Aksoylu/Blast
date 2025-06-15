import React, { useRef, useState } from 'react';
import { Box, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import { TreeNodeItem, TreeNodeProps } from './TreeNode';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ContextMenu } from './ContextMenu';

export interface FileTreeProps {
  data: TreeNodeProps[];
  onTreeChange: (newTree: TreeNodeProps[]) => void;
}

export const FileTree: React.FC<FileTreeProps> = ({ data, onTreeChange }) => {

  const isDescendant = (nodes: TreeNodeProps[], parentId: string, childId: string): boolean => {
    for (const node of nodes) {
      if (node.id === parentId) {
        return containsNode(node, childId);
      }
      if (node.children) {
        if (isDescendant(node.children, parentId, childId)) return true;
      }
    }
    return false;
  };

  const containsNode = (node: TreeNodeProps, id: string): boolean => {
    if (node.id === id) return true;
    if (!node.children) return false;
    return node.children.some(child => containsNode(child, id));
  };

  const findNodeById = (nodes: TreeNodeProps[], id: string): TreeNodeProps | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const handleDrop = (draggedId: string, targetId: string) => {
    // Interrupt moving node operation if target node is its self
    if (draggedId === targetId) {
      return;
    }

    // Interrupt moving node operation if target node is picked nodes child node
    if (isDescendant(data, draggedId, targetId)) {
      return;
    }

    // Interrupt moving node operation if current node is a collection.
    // Because that moving collections is not permitted by business logic
    const currentNode = findNodeById(data, draggedId);
    if (currentNode?.isCollection) {
      return;
    }

    // Interrupt moving node operation if target node is not an folder
    const targetNode = findNodeById(data, targetId);
    if (!targetNode || !targetNode.isFolder) {
      return;
    }

    const moveNode = (nodes, draggedId) => {
      let nodeToMove = null;

      const filtered = nodes
        .map(node => {
          if (node.id === draggedId) {
            nodeToMove = node;
            return null;
          }

          if (node.children) {
            const result = moveNode(node.children, draggedId);
            node.children = result.nodes;
            if (result.nodeToMove) nodeToMove = result.nodeToMove;
          }

          return node;
        })
        .filter(Boolean);

      return { nodes: filtered, nodeToMove };
    };

    const insertNode = (nodes, targetId, nodeToInsert) => {
      return nodes.map(node => {
        if (node.id === targetId && node.isFolder) {
          const children = node.children ? [...node.children, nodeToInsert] : [nodeToInsert];
          return { ...node, children };
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

  const contextMenuDisclosure = useDisclosure();
  const hoveringNodeIdRef = useRef<string>("");

  const handleHover = (id: string) => {
    if (!contextMenuDisclosure.isOpen) {
      hoveringNodeIdRef.current = id;
    }
  };

  const items = [
    { label: "Kopyala", value: "copy" },
    { label: "Yapıştır", value: "paste" },
    { label: "Sil", value: "delete" },
  ];

  const handleSelect = (value: string) => {
    const nodeId = hoveringNodeIdRef.current;

    if (nodeId !== "") {
      const node = findNodeById(data, nodeId);
      alert(`Seçilen işlem: ${value}, ${node?.name} <-> ${node?.id}`);
    }
  };
  //todo: menü kapanınca tüm gereksiz hover olmuş elemanlar resetlenmeli

  return (
    <DndProvider backend={HTML5Backend}>
      <ContextMenu menuItems={items} onSelect={handleSelect} disclosure={contextMenuDisclosure} >
        <VStack align="start" spacing={1} h="100%" w="100%" >
          {data.map((node, index) => (
            <TreeNodeItem key={node.id} node={node} onDrop={handleDrop} handleHover={(e) => handleHover(e)} isContextMenuOpen={contextMenuDisclosure.isOpen} />
          ))}
        </VStack>
      </ContextMenu>
    </DndProvider >

  );
};

