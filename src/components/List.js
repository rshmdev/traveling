import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { createRef, useEffect, useState } from "react";
import CardDetais from "./CardsDetails";
import Animation from "../assets/loading.json";
import top from "../assets/top.png";
import Lottie from "react-lottie";

export default function List({
  places,
  childClick,
  isLoading,
  setType,
  setRating,
  type,
  rating,
}) {
  const [elRefs, setElRefs] = useState([]);
  const [visible, setVisible] = useState(false);
  const divTop = createRef();

  useEffect(() => {
    document.getElementById("list").addEventListener("scroll", () => {
      if (document.getElementById("list").scrollTop > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    });
  }, []);

  useEffect(() => {
    setElRefs((refs) =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || React.createRef())
    );
  }, [places]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Flex
      id="list"
      w="530px"
      flexDirection="column"
      maxHeight=" 90.3vh;"
      overflowX="auto"
    >
      {isLoading ? (
        <Lottie options={defaultOptions} width="400px" height="400px" />
      ) : (
        <>
          <FormControl
            ref={divTop}
            mt="10px"
            display="flex"
            gap="20px"
            alignItems="center"
            justifyContent="center"
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <FormLabel fontSize="14px">Type</FormLabel>
              <Select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
                w="140px"
                h="30px"
              >
                <option value="restaurants">Restaurants</option>
                <option value="hotels">Hotels</option>
                <option value="attractions">Attractions</option>
              </Select>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <FormLabel fontSize="14px">Rating</FormLabel>
              <Select
                value={rating}
                onChange={(e) => {
                  setRating(e.target.value);
                }}
                w="140px"
                h="30px"
              >
                <option value="">All</option>
                <option value="3">Above 3.0</option>
                <option value="4">Above 4.0</option>
                <option value="4.5">Above 4.5</option>
              </Select>
            </Box>
          </FormControl>
          <Flex
            zIndex={2}
            position="fixed"
            mt="10px"
            w="400px"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              transition="all 0.7s ease"
              id="btn-top"
              onClick={() => {
                divTop?.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "start",
                });
              }}
              w={visible ? "40px" : "0px"}
              h={visible ? "40px" : "0px"}
              src={top}
            />
          </Flex>
          <Box>
            {places?.length <= 0 ? (
              <Text ml="20%" mt="50%" fontWeight="bold" fontSize="18px">
                {type} not founds in your area
              </Text>
            ) : (
              places?.map((place, i) => {
                return (
                  <Box ref={elRefs[i]} key={i}>
                    <CardDetais
                      refProp={elRefs[i]}
                      places={place}
                      selected={Number(childClick) === i}
                      childClick={childClick}
                      type={type}
                    />
                  </Box>
                );
              })
            )}
          </Box>
        </>
      )}
    </Flex>
  );
}
