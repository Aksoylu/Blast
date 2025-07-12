// src/store/httpResponseStore.ts
import { create } from "zustand";

import {
    HttpBodyRawData,
    HttpPayloadSizeObject,
    HttpResponseHeader, 
    HttpResponseNetworkObject, 
    HttpResponseStatusObject, 
    HttpResponseTimeObject
} from '#/Models';
import { HttpResponseStatusData } from "#/Constants";
import { SupportedDataFormatsEnum } from "#/Enums";

interface TreeNodeProps {
  id: string;
  name: string;
  isCollection?: boolean;
  isFolder: boolean;
  children?: TreeNodeProps[];
}

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

interface HomePageStore {
    treeData: TreeNodeProps[];
    setTreeData: (data: TreeNodeProps[]) => void;

    responseHttpStatus?: HttpResponseStatusObject;
    setResponseHttpStatus: (status?: HttpResponseStatusObject) => void;

    httpResponseTime?: HttpResponseTimeObject;
    setHttpResponseTime: (time?: HttpResponseTimeObject) => void;

    httpPayloadSize?: HttpPayloadSizeObject;
    setHttpPayloadSize: (size?: HttpPayloadSizeObject) => void;

    responseNetworkInfo?: HttpResponseNetworkObject;
    setResponseNetworkInfo: (info?: HttpResponseNetworkObject) => void;

    httpResponseHeaders: HttpResponseHeader[];
    setHttpResponseHeaders: (headers: HttpResponseHeader[]) => void;

    httpResponseBody?: HttpBodyRawData;
    setHttpResponseBody: (body?: HttpBodyRawData) => void;
}

export const useHomePageStore = create<HomePageStore>((set) => ({
    treeData: workspace_1,
    setTreeData: (data) => set({ treeData: data }),

    responseHttpStatus: HttpResponseStatusData.FindByCode("201"),
    setResponseHttpStatus: (status) => set({ responseHttpStatus: status }),

    httpResponseTime: new HttpResponseTimeObject({ Total: 542 }),
    setHttpResponseTime: (time) => set({ httpResponseTime: time }),

    httpPayloadSize: new HttpPayloadSizeObject({ Total: 320 }),
    setHttpPayloadSize: (size) => set({ httpPayloadSize: size }),

    responseNetworkInfo: new HttpResponseNetworkObject({
        HttpVersion: "1.1",
        LocalAddress: "129.168.2.1",
        RemoteAddress: "0.0.0.0"
    }),
    setResponseNetworkInfo: (info) => set({ responseNetworkInfo: info }),

    httpResponseHeaders: [
        new HttpResponseHeader({ Key: "date", Value: "Thu, 03 Jul 2025 11:10:43 GMT" }),
        new HttpResponseHeader({ Key: "server", Value: "Apache" }),
        new HttpResponseHeader({ Key: "content-encoding", Value: "gzip" }),
        new HttpResponseHeader({ Key: "content-length", Value: "589" }),
    ],
    setHttpResponseHeaders: (headers) => set({ httpResponseHeaders: headers }),

    httpResponseBody: new HttpBodyRawData({
        type: SupportedDataFormatsEnum.JSON,
        Value: "<abc> test</abc>",
    }),
    setHttpResponseBody: (body) => set({ httpResponseBody: body }),
}));
