import { useEffect, useRef, useState } from "react";

import Editor, { OnMount, useMonaco } from "@monaco-editor/react";
import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react";

import { HttpBodyRawData } from "#/Models";

export interface RawDataInputProps {
  rawData: HttpBodyRawData;
  setRawData: (updated: HttpBodyRawData) => void;
}

export const RawDataInput = ({ rawData, setRawData }: RawDataInputProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
  const { colorMode } = useColorMode();
  const monacoInstance = useMonaco();

  const [language, setLanguage] = useState("json");
  const onValueChange = (eventData: string) => {
    setRawData({ ...rawData, Value: eventData })
  }

  const [height, setHeight] = useState<number | undefined>(undefined);
  const calculatedHeight = height ? `${height - 15}px` : "auto";
  useEffect(() => {
    if (!rawData) {
      setRawData(new HttpBodyRawData());
    }

    function updateHeight() {
      if (parentRef.current) {
        const offsetTop = parentRef.current.getBoundingClientRect().top;
        const detectedHeight = (window.innerHeight - offsetTop);
        setHeight(detectedHeight);
      }
    }
    updateHeight();

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);


  useEffect(() => {
    if (!monacoInstance) return;

    monacoInstance.editor.defineTheme("custom-vs-dark-bg", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#1A1B26",
      },
    });

    monacoInstance.editor.defineTheme("custom-vs-light-bg", {
      base: "vs",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#EDF2F7",
      },
    });

    const themeToSet = colorMode === "dark" ? "custom-vs-dark-bg" : "custom-vs-light-bg";

    monacoInstance.editor.setTheme(themeToSet);

  }, [colorMode, monacoInstance]);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monaco.editor.setTheme(colorMode === "dark" ? "custom-vs-dark-bg" : "custom-vs-light-bg");
  };

  const formatCode = () => {
    editorRef.current?.getAction("editor.action.formatDocument").run();
  };

  return (
    <Box position="relative" ref={parentRef} height={calculatedHeight}>
      <Box pt={3} />
      <Editor
        key={colorMode}
        height="95%"
        defaultLanguage="json"
        defaultValue='{"foo":    "bar"}'
        language={language}
        value={rawData?.Value ?? ""}
        onChange={onValueChange}
        onMount={handleEditorDidMount}
        options={{
          formatOnPaste: true,
          formatOnType: true,
          minimap: { enabled: false },
        }}
      />
    </Box>
  );
};
