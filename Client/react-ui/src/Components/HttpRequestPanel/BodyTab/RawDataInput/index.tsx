import { useEffect, useRef, useState } from "react";

import Editor, { OnMount, useMonaco } from "@monaco-editor/react";
import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react";

import { HttpBodyRawData } from "#/Models";
import { MonacoEditorStyling } from "#/Constants/MonacoEditorStyling";
import { HttpBodyRawDataTypesEnum, MonacoEditorThemes } from "#/Enums";
import { HttpBodyRawDataTypeData } from "#/Constants";

export interface RawDataInputProps {
  rawData: HttpBodyRawData;
  setRawData: (updated: HttpBodyRawData) => void;
}

// todo: something breaks resizability. need fix
export const RawDataInput = ({ rawData, setRawData }: RawDataInputProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
  const { colorMode } = useColorMode();
  const monacoInstance = useMonaco();
  const [dataType, setDataType] = useState(HttpBodyRawDataTypesEnum.TEXT);
  const [monacoEditorHeight, setMonacoEditorHeight] = useState<number | undefined>(undefined);

  const monacoEditorBorderColor = colorMode == "dark" ? "gray.600" : "gray.300";
  const monacoEditorLanguage = HttpBodyRawDataTypeData.GetAsMonacoLanguage(dataType);

  const onValueChange = (eventData: string) => {
    setRawData({ ...rawData, Value: eventData })
  }

  // #region UI Actions

  const formatCode = () => {
    editorRef.current?.getAction("editor.action.formatDocument").run();
  };
  // #endregion


  //#region UI Hooks
  const updateMonacoEditorHeight = () => {
    if (parentRef.current) {
      const offsetTop = parentRef.current.getBoundingClientRect().top;
      const calculatedHeight = (window.innerHeight - offsetTop) - 10;
      setMonacoEditorHeight(calculatedHeight);
    }
  }

  const fillRawData = () => {
    if (!rawData) {
      const newRawData: HttpBodyRawData = {
        type: HttpBodyRawDataTypesEnum.TEXT,
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
      width="99%"
      position="relative"
      minHeight="0"
      overflow="hidden"
      border="1px solid"
      height={monacoEditorHeight}
      borderColor={monacoEditorBorderColor}
      borderRadius={5}
      mt={3}
    >
      <Editor
        key={colorMode}
        height="95%"
        width="100%"
        defaultLanguage="json"
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
};
