import React, { useState, useRef, JSX } from "react";
import { Box } from "@chakra-ui/react";

export interface ResizablePanelProps {
  leftPanel: JSX.Element[];
  leftPanelWidth: number;
  rightPanel: JSX.Element[];

  minimumPanelWidth: number;
};

export const ResizablePanel = ({ leftPanel, leftPanelWidth, rightPanel, minimumPanelWidth }) => {
  const [leftWidth, setLeftWidth] = useState(leftPanelWidth);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);

  const onMouseDown = () => {
    document.body.style.userSelect = "none";
    isDragging.current = true;
    document.body.style.cursor = "col-resize";
    setIsMouseOver(true);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const containerLeft = containerRef.current.getBoundingClientRect().left;
    const newLeftWidth = e.clientX - containerLeft;
    setLeftWidth(Math.max(minimumPanelWidth, newLeftWidth));

  };

  const onMouseUp = () => {
    isDragging.current = false;
    document.body.style.cursor = "default";
    document.body.style.userSelect = "auto";
    setIsMouseOver(false);
  };

  React.useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      display="flex"
      height="100vh"
      width="100%"
      position="relative"
    >
      <Box width={`${leftWidth}px`} p={4}>
        {leftPanel}
      </Box>
      <Box
        width="4px"
        paddingLeft="2px"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <Box
          width="1px"
          height="100%"
          bg={isMouseOver ? "gray.400" : "gray.600"}
          cursor="col-resize"
        >
        </Box>

      </Box>

      <Box flex={1} p={4}>
        {rightPanel}
      </Box>
    </Box>
  );
};
