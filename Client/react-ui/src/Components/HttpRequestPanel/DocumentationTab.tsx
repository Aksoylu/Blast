import React, { useEffect, useRef, useState } from "react";
import { Box, useColorMode } from "@chakra-ui/react";

import MDEditor from '@uiw/react-md-editor';
import "./DocumentationTab.css";

export interface DocumentationTabProps {

};

export const DocumentationTab = ({ }: DocumentationTabProps) => {
    const [value, setValue] = useState("## Markdown Başlığı");
    const { colorMode } = useColorMode();

    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | undefined>(undefined);

    const calculatedHeight = height ? `${height}px` : "auto";
    useEffect(() => {
        function updateHeight() {
            if (ref.current) {
                const offsetTop = ref.current.getBoundingClientRect().top;
                setHeight(window.innerHeight - offsetTop);
            }
        }
        updateHeight();

        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);


    return (
        <Box position="relative"
            border="1px solid blue" ref={ref}
            height={calculatedHeight}>
            <div data-color-mode={colorMode} style={{
                width:"100%",
                height:"100%",
                minHeight:"400px",
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            }}>

                <MDEditor
                    value={value}
                    color="red"
                    onChange={(i) => {
                        setValue(i ?? "");
                    }} />
            </div>
        </Box>
    );
}