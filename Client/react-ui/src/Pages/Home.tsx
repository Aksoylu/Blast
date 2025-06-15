'use client'

import { useState } from 'react';

import { TreeNodeProps } from '../Components/FileTree/TreeNode';
import { WorkspacePanel } from '../Components/WorkspacePanel';
import { ResizablePanel } from '../Components/ResizablePanel';
import { HttpRequestPanel } from '../Components/HttpRequestPanel/index';

const workspace_1 = [
  {
    id: '1',
    name: 'src',
    isCollection: true,
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
    id: '6',
    name: 'collection 2',
    isCollection: true,
    isFolder: true,
    children: [
      { id: '7', name: 'index.tsx', isFolder: false }
    ],
  },
  {
    id: '5',
    name: 'package.json',
    isFolder: false,
  },
];

const workspaces = [
  workspace_1
]

export const Home = () => {
  const [treeData, setTreeData] = useState<TreeNodeProps[]>(workspace_1);

  return (
    <ResizablePanel
      leftPanel={<WorkspacePanel data={treeData} onTreeChange={setTreeData} />}
      leftPanelWidth={200}

      rightPanel={<HttpRequestPanel/>}    
      minimumPanelWidth={200}
    />
  )
}
