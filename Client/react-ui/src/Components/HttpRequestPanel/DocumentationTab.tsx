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

    const calculatedHeight = height ? `${height - 15}px` : "auto";
    useEffect(() => {
        function updateHeight() {
            if (ref.current) {
                const offsetTop = ref.current.getBoundingClientRect().top;
                const detectedHeight = (window.innerHeight - offsetTop) ;
                setHeight(detectedHeight);
            }
        }
        updateHeight();

        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);


    return (
        <Box position="relative"
            ref={ref}
            height={calculatedHeight}>
            <div data-color-mode={colorMode} style={{
                height:"100%",
                minHeight:"100%",
            }}>

                <MDEditor
                    height="100%"
                    value={value}
                    onChange={(i) => {
                        setValue(i ?? "");
                    }} />
            </div>
        </Box>
    );
}