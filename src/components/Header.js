import { Box, Flex, Stack, Input, Image } from "@chakra-ui/react";
import { Autocomplete } from "@react-google-maps/api";
import { useState } from "react";
import logo from "../assets/logo.png";

export default function Header({ setCoordinates }) {
  const [autoComplete, setAutoComplete] = useState(null);

  const onLoad = (autoC) => setAutoComplete(autoC);
  const onPlaceChanged = () => {
    const lat = autoComplete.getPlace().geometry.location.lat();
    const lng = autoComplete.getPlace().geometry.location.lng();

    setCoordinates({ lat, lng });
  };

  return (
    <>
      <Box bg="rgba(0,0,0,0.8)" px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Image w="60px" h="60px" src={logo} />
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <Input
                  _placeholder={{ color: "white" }}
                  color="white"
                  placeholder="Pesquise um local"
                />
              </Autocomplete>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
