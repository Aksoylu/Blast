import React, { useRef, useState } from 'react';
import { Box, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ContextMenu } from './ContextMenu';
import { HttpRequestCollection, HttpRequestFolder, HttpRequestObject } from '#/Models';
import { FolderNodeItem } from './FolderNodeItem';
import { HttpRequestNodeItem } from './HttpRequestNodeItem';
import { CollectionNodeItem } from './CollectionNodeItem';

type FileTreeNode = HttpRequestCollection | HttpRequestFolder | HttpRequestObject;

export interface FileTreeProps {
  data: FileTreeNode[];
  onTreeChange: (newTree: HttpRequestCollection[]) => void;
}


export const FileTree: React.FC<FileTreeProps> = ({ data, onTreeChange }) => {

  function isFolderOrCollection(
    node: FileTreeNode
  ): node is HttpRequestCollection | HttpRequestFolder {
    return 'Items' in node && Array.isArray(node.Items);
  }

  const isDescendant = (nodes: FileTreeNode[], parentId: string, childId: string): boolean => {
    for (const node of nodes) {
      if (node.Id === parentId) {
        if (isFolderOrCollection(node)) {
          return containsNode(node, childId);
        }
        return false;
      }

      if (isFolderOrCollection(node) && node.Items) {
        if (isDescendant(node.Items, parentId, childId)) return true;
      }
    }
    return false;
  };

  const containsNode = (node: FileTreeNode, id: string): boolean => {
    if (node.Id === id) {
      return true;
    }

    if (isFolderOrCollection(node)) {
      return node.Items.some(item => containsNode(item, id));
    }

    return false;
  };

  const findNodeById = (nodes: FileTreeNode[], id: string): FileTreeNode | null => {
    for (const node of nodes) {
      if (node.Id === id) return node;
      if (isFolderOrCollection(node)) {
        const found = findNodeById(node.Items, id);
        if (found) {
          return found;
        }
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
    if (currentNode?.EntityType == "collection" || currentNode?.EntityType == "folder") {
      return;
    }

    // Interrupt moving node operation if target node is not an folder
    const targetNode = findNodeById(data, targetId);
    if (!targetNode || targetNode.EntityType == "http_request") {
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
      alert(`Seçilen işlem: ${value}, ${node?.Name} <-> ${node?.Id}`);
    }
  };
  //todo: menü kapanınca tüm gereksiz hover olmuş elemanlar resetlenmeli

  const renderTree = (node: FileTreeNode) => {
    if (node instanceof HttpRequestFolder) {
      return (<FolderNodeItem
        key={node.Id}
        node={node}
        onDrop={handleDrop}
        handleHover={handleHover}
        isContextMenuOpen={contextMenuDisclosure.isOpen}
      />);
    }
    else if (node instanceof HttpRequestObject) {
      return (<HttpRequestNodeItem
        key={node.Id}
        node={node}
        onDrop={handleDrop}
        handleHover={handleHover}
        isContextMenuOpen={contextMenuDisclosure.isOpen}
      />);
    }
    else if (node instanceof HttpRequestCollection) {
      return (<CollectionNodeItem
        key={node.Id}
        node={node}
        onDrop={handleDrop}
        handleHover={handleHover}
        isContextMenuOpen={contextMenuDisclosure.isOpen}
      />);
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <ContextMenu menuItems={items} onSelect={handleSelect} disclosure={contextMenuDisclosure} >
        <VStack align="start" spacing={1} h="100%" w="100%" >
          {data.map(node => renderTree(node))}
        </VStack>
      </ContextMenu>
    </DndProvider >

  );
};

