import { HttpBodyRawDataTypeData, MonacoEditorStyling } from "#/Constants";
import { SupportedDataFormatsEnum, MonacoEditorThemes } from "#/Enums";
import { HttpBodyRawData } from "#/Models";
import { Box, useColorMode } from "@chakra-ui/react";
import { Editor, OnMount, useMonaco } from "@monaco-editor/react";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import vkbeautify from 'vkbeautify';

export interface BodyTabProps {
    rawData: HttpBodyRawData;
    rawDataType?: SupportedDataFormatsEnum;
};

export interface BodyTabRef {
    formatCode: () => void;
}


export const BodyTab = forwardRef<BodyTabRef, BodyTabProps>(
    ({ rawData, rawDataType }, ref) => {
        const parentRef = useRef<HTMLDivElement>(null);
        const editorRef = useRef<any>(null);
        const { colorMode } = useColorMode();
        const monacoInstance = useMonaco();
        const [monacoEditorHeight, setMonacoEditorHeight] = useState<number | undefined>(undefined);
        const [monacoEditorLanguage, setMonacoEditorLanguage] = useState<string>("html");
        const monacoEditorBorderColor = colorMode == "dark" ? "gray.600" : "gray.300";


        // #region UI Actions

        const formatCode = () => {
            if (rawDataType == SupportedDataFormatsEnum.XML) {

                const beautifiedXmlContent = vkbeautify.xml(rawData.Value, 4);
                // todo
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
                const calculatedHeight = (window.innerHeight - offsetTop) - 10;
                setMonacoEditorHeight(calculatedHeight);
            }
        }


        useEffect(() => {
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
                width="95%"
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
                    defaultLanguage={monacoEditorLanguage}
                    defaultValue={rawData?.Value ?? ""}
                    language={monacoEditorLanguage}
                    value={rawData?.Value ?? ""}
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
