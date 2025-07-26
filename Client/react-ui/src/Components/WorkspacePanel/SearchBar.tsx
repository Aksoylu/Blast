import { InputGroup, InputLeftElement, Input, Box } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";

export const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <Box maxW="100%">
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.400" />} />
        <Input
          type="text"
          placeholder="Ara..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          variant="filled"
          focusBorderColor="blue.400"
        />
      </InputGroup>
    </Box>
  );
}
