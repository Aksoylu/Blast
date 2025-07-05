import { HttpResponseBodyTypeData } from "#/Constants";
import { SupportedDataFormatsEnum } from "#/Enums";
import { Box, Select, useColorMode } from "@chakra-ui/react";

export interface BodyTypeSelectorProps {
    responseBodyType: SupportedDataFormatsEnum;
    onResponseBodyTypeChanged: (event: any) => void;
};

export const BodyTypeSelector = ({ responseBodyType, onResponseBodyTypeChanged }: BodyTypeSelectorProps) => {
    const { colorMode } = useColorMode();

    const onChange = (event) => {
        onResponseBodyTypeChanged(event);
    };

    const hoverColor = colorMode === "dark" ? "gray.600" : "blue.300";

    return (<Box ml={3} pt={1} width={125}>
        <Select
            variant="filled"
            colorScheme={colorMode}
            borderRadius="md"
            size="sx"
            _hover={{ borderColor: hoverColor }}
            value={responseBodyType}
            fontSize={"1rem"}
            onChange={onChange}
        >
            {HttpResponseBodyTypeData.List().map((bodyType) => (
                <option key={bodyType.type} value={bodyType.type}>
                    &nbsp;&nbsp;&nbsp;{bodyType.code}
                </option>
            ))}
        </Select>
    </Box>)
}