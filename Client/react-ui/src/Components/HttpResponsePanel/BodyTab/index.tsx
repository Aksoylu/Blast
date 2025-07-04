import { HttpBodyRawDataTypeData, MonacoEditorStyling } from "#/Constants";
import { SupportedDataFormatsEnum, MonacoEditorThemes } from "#/Enums";
import { HttpBodyRawData } from "#/Models";
import { Box, useColorMode } from "@chakra-ui/react";
import { Editor, OnMount, useMonaco } from "@monaco-editor/react";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import vkbeautify from 'vkbeautify';

export interface BodyTabProps {
    data: string;
    dataType: SupportedDataFormatsEnum;
};

export interface BodyTabRef {
    formatCode: () => void;
}


export const BodyTab = forwardRef<BodyTabRef, BodyTabProps>(
    ({ data, dataType }, ref) => {
        const parentRef = useRef<HTMLDivElement>(null);
        const editorRef = useRef<any>(null);
        const { colorMode } = useColorMode();
        const monacoInstance = useMonaco();

        const monacoEditorBorderColor = colorMode == "dark" ? "gray.600" : "gray.300";

        const [monacoEditorHeight, setMonacoEditorHeight] = useState<number | undefined>(undefined);
        const [monacoEditorLanguage, setMonacoEditorLanguage] = useState<string>("html");

        const [displayedBodyData, setDisplayedBodyData] = useState(data);

        // #region UI Actions

        const formatCode = () => {
            if (dataType == SupportedDataFormatsEnum.XML) {
                const beautifiedXmlContent = vkbeautify.xml(data, 4);
                setDisplayedBodyData(beautifiedXmlContent);
            }
            else {
                editorRef.current?.getAction("editor.action.formatDocument").run();
            }
        };

        const updateMonacoEditorHeight = () => {
            if (parentRef.current) {
                const offsetTop = parentRef.current.getBoundingClientRect().top;
                const calculatedHeight = (window.innerHeight - offsetTop) - 10;
                setMonacoEditorHeight(calculatedHeight);
            }
        }

        const updateMonacoEditorTheme = () => {
            if (!monacoInstance) return;
            const monacoEditorTheme = colorMode === "dark" ? MonacoEditorThemes.Dark : MonacoEditorThemes.Light;
            MonacoEditorStyling.SetTheme(monacoInstance, monacoEditorTheme);
        }
        // #endregion


        //#region UI Hooks
        useImperativeHandle(ref, () => ({
            formatCode,
        }));

        /**
         * @description: on rawDataType change
         */
        useEffect(() => {
            const message = HttpBodyRawDataTypeData.GetAsMonacoLanguage(dataType);
            setMonacoEditorLanguage(message);
        }, [dataType]);


        useEffect(() => {
            updateMonacoEditorHeight();

            window.addEventListener("resize", updateMonacoEditorHeight);
            return () => window.removeEventListener("resize", updateMonacoEditorHeight);
        }, []);

        useEffect(() => {
            updateMonacoEditorTheme();
        }, [colorMode, monacoInstance]);

        const handleEditorDidMount: OnMount = (editor, monaco) => {
            editorRef.current = editor;

            updateMonacoEditorTheme();
        };
        //#endregion

        return (
            <Box
                ref={parentRef}
                width="100%"
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
                    defaultValue={displayedBodyData}
                    language={monacoEditorLanguage}
                    value={displayedBodyData}
                    onMount={handleEditorDidMount}
                    options={{
                        scrollBeyondLastLine: false,
                        formatOnPaste: true,
                        formatOnType: true,
                        minimap: { enabled: false },
                        readOnly: true
                    }}
                />
            </Box>
        );
    }
);
