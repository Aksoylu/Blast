export const ScrollBarBehaviour = {
    Auto: {
        overflow: "auto",
        scrollbarWidth: "thin",
        "-ms-overflow-style": "auto",

        // Chrome/Safari/Electron
        "&::-webkit-scrollbar": {
            width: "2px",
            background: "transparent",
            transition: "opacity 0.3s",
            opacity: 0,
        },
        "&:hover::-webkit-scrollbar": {
            opacity: 1,
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#a0aec0", // gri ton
            borderRadius: "4px",
        },
        "&::-webkit-scrollbar-track": {
            background: "transparent",
        },
    },

    Hidden: {
        "&::-webkit-scrollbar": {
            display: "none",
        },
    }

};