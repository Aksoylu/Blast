import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";

import Editor, { OnMount, useMonaco } from "@monaco-editor/react";
import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react";

import { HttpBodyRawData } from "#/Models";
import { MonacoEditorStyling } from "#/Constants";
import { SupportedDataFormatsEnum, MonacoEditorThemes } from "#/Enums";
import { HttpBodyRawDataTypeData } from "#/Constants";
import vkbeautify from 'vkbeautify';

export interface RawDataInputProps {
  rawData: HttpBodyRawData;
  setRawData: (updated: HttpBodyRawData) => void;
  rawDataType?: SupportedDataFormatsEnum;
}

export interface RawDataInputRef {
  formatCode: () => void;
}

export const RawDataInput = forwardRef<RawDataInputRef, RawDataInputProps>(
  ({ rawData, setRawData, rawDataType }, ref) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<any>(null);
    const { colorMode } = useColorMode();
    const monacoInstance = useMonaco();
    const [monacoEditorHeight, setMonacoEditorHeight] = useState<number | undefined>(undefined);
    const [monacoEditorLanguage, setMonacoEditorLanguage] = useState<string>("html");
    const monacoEditorBorderColor = colorMode == "dark" ? "gray.600" : "gray.300";

    const onValueChange = (eventData: string) => {
      setRawData({ ...rawData, Value: eventData })
    }

    // #region UI Actions

    const formatCode = () => {
      if (rawDataType == SupportedDataFormatsEnum.XML) {
        const beautifiedXmlContent = vkbeautify.xml(rawData.Value, 4);
        setRawData({ ...rawData, Value: beautifiedXmlContent })
      }
      else {
        editorRef.current?.getAction("editor.action.formatDocument").run();
      }
    };
    // #endregion

    useImperativeHandle(ref, () => ({
      formatCode,
    }));

    //#region UI Hooks

    /**
     * @description: on rawDataType change
     */
    useEffect(() => {
      const message = HttpBodyRawDataTypeData.GetAsMonacoLanguage(rawDataType);
      setMonacoEditorLanguage(message);
    }, [rawDataType]);

    const updateMonacoEditorHeight = () => {
      if (parentRef.current) {
        const offsetTop = parentRef.current.getBoundingClientRect().top;
        const calculatedHeight = (window.innerHeight - (offsetTop * 1.2));
        setMonacoEditorHeight(calculatedHeight);
      }
    }

    const fillRawData = () => {
      if (!rawData) {
        const newRawData: HttpBodyRawData = {
          type: SupportedDataFormatsEnum.RAW,
          Value: ""
        }
        setRawData(newRawData);
      }
    }

    useEffect(() => {
      fillRawData();
      updateMonacoEditorHeight();

      window.addEventListener("resize", updateMonacoEditorHeight);
      return () => window.removeEventListener("resize", updateMonacoEditorHeight);
    }, []);


    useLayoutEffect(() => {
      updateMonacoEditorHeight();

      window.addEventListener("resize", updateMonacoEditorHeight);
      return () => window.removeEventListener("resize", updateMonacoEditorHeight);
    }, []);

    useEffect(() => {
      if (!monacoInstance) return;
      const monacoEditorTheme = colorMode === "dark" ? MonacoEditorThemes.Dark : MonacoEditorThemes.Light;
      MonacoEditorStyling.SetTheme(monacoInstance, monacoEditorTheme);
    }, [colorMode, monacoInstance]);

    const handleEditorDidMount: OnMount = (editor, monaco) => {
      editorRef.current = editor;

      const monacoEditorTheme = colorMode === "dark" ? MonacoEditorThemes.Dark : MonacoEditorThemes.Light;
      MonacoEditorStyling.SetTheme(monacoInstance, monacoEditorTheme);
    };
    //#endregion

    return (
      <Box
        ref={parentRef}
        width="100%"
        minHeight="0"
        overflow="hidden"
        border="1px solid"
        height={monacoEditorHeight}
        borderColor={monacoEditorBorderColor}
        borderRadius={5}
      >
        <Editor
          key={colorMode}
          height="100%"
          width="100%"
          defaultLanguage={monacoEditorLanguage}
          defaultValue={rawData?.Value ?? ""}
          language={monacoEditorLanguage}
          value={rawData?.Value ?? ""}
          onChange={onValueChange}
          onMount={handleEditorDidMount}
          options={{
            scrollBeyondLastLine: false,
            formatOnPaste: true,
            formatOnType: true,
            minimap: { enabled: false },
          }}
        />
      </Box>
    );
  }
);
