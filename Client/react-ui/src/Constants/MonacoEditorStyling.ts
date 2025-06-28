import { MonacoEditorThemes } from "#/Enums";
import type MonacoEditor from "@monaco-editor/react";

export class MonacoEditorStyling {

    private static readonly darkTheme = {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
            "editor.background": "#1A1B26",
        }
    }

    private static readonly lightTheme = {
        base: "vs",
        inherit: true,
        rules: [],
        colors: {
            "editor.background": "#EDF2F7",
        }
    }

    public static SetTheme(monacoInstance: typeof MonacoEditor, theme: MonacoEditorThemes) {
        monacoInstance.editor.defineTheme(MonacoEditorThemes.Dark, MonacoEditorStyling.darkTheme);
        monacoInstance.editor.defineTheme(MonacoEditorThemes.Light, MonacoEditorStyling.lightTheme);

        monacoInstance.editor.setTheme(theme);
    }

}