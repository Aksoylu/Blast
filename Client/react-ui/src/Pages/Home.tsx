'use client'

import { useState } from 'react';

import { TreeNodeProps } from '../Components/FileTree/TreeNode';
import { WorkspacePanel } from '../Components/WorkspacePanel';
import { ResizablePanel } from '../Components/ResizablePanel';
import { HttpRequestPanel } from '../Components/HttpRequestPanel/index';

const workspace_1 = [
  {
    id: '1',
    name: 'Test Folder',
    isCollection: true,
    isFolder: true,
    children: [
      { id: '2', name: 'get isteği', isFolder: false },
      {
        id: '3',
        name: 'subfolder',
        isFolder: true,
        children: [
          { id: '4', name: 'put deneme', isFolder: false },
        ],
      },
    ],
  },
  {
    id: '6',
    name: 'Deneme',
    isCollection: true,
    isFolder: true,
    children: [
      { id: '7', name: 'Post req test', isFolder: false }
    ],
  },
  {
    id: '5',
    name: 'get2',
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

      rightPanel={<HttpRequestPanel initialRequestData_={undefined}/>}    
      minimumPanelWidth={200}
    />
  )
}
