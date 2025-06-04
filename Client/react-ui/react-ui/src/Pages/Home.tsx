'use client'

import {
  Box
} from '@chakra-ui/react'
import { FileTree } from '../Components/FileTree';
import { useState } from 'react';
import { TreeNodeProps } from '#/Components/FileTree/TreeNode';

const initialData = [
  {
    id: '1',
    name: 'src',
    isFolder: true,
    children: [
      { id: '2', name: 'index.tsx', isFolder: false },
      {
        id: '3',
        name: 'components',
        isFolder: true,
        children: [
          { id: '4', name: 'Button.tsx', isFolder: false },
        ],
      },
    ],
  },
  {
    id: '5',
    name: 'package.json',
    isFolder: false,
  },
];

export const Home = () => {
  const [treeData, setTreeData] = useState(initialData);

  return (
    <Box p={4}>
      <FileTree data={treeData} onTreeChange={setTreeData} />
    </Box>
  )
}
