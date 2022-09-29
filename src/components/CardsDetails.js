import {
  Flex,
  Box,
  Image,
  useColorModeValue,
  Text,
  Link,
} from "@chakra-ui/react";
import {
  BsStar,
  BsStarFill,
  BsStarHalf,
  BsFillTelephoneFill,
} from "react-icons/bs";
import { FaMapMarkerAlt, FaHotel, FaMoneyBillWave } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { useEffect } from "react";
import { BiCategory } from "react-icons/bi";

export function Rating({ rating, numReviews }) {
  return (
    <Box display="flex" alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: "1" }}
                color={i < rating ? "teal.500" : "gray.300"}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
          }
          return <BsStar key={i} style={{ marginLeft: "1" }} />;
        })}
      <Flex as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && "s"}
      </Flex>
    </Box>
  );
}

export default function CardDetais({
  places,
  selected,
  refProp,
  childClick,
  type,
}) {
  useEffect(() => {
    if (selected)
      refProp?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
  }, [childClick]);

  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        mt="20px"
      >
        <Image
          maxH="300px"
          w="100%"
          src={
            places.photo
              ? places.photo.images.large.url
              : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
          }
          alt={`Picture of ${places.name}`}
          roundedTop="lg"
        />

        <Box p="18px">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {places.name}
            </Box>
          </Flex>

          <Flex mt="20px">
            <Rating rating={places.rating} numReviews={places.num_reviews} />
          </Flex>
          <Flex flexDirection="column" gap="30px">
            <Flex mt="20px" alignItems="center">
              {type === "hotels" ? (
                <FaMoneyBillWave size={21} />
              ) : type === "Attractions" ? (
                <FaMapMarkerAlt size={21} />
              ) : (
                <FaMapMarkerAlt size={21} />
              )}

              <Text ml="20px" fontSize={type === "hotels" ? "14px" : "12px"}>
                {type === "hotels"
                  ? places.price
                  : type === "Attractions"
                  ? places.address
                  : places.address}
              </Text>
            </Flex>
            <Flex alignItems="center">
              {type === "hotels" ? (
                <FaHotel size={21} />
              ) : type === "attractions" ? (
                <BiCategory size={22} />
              ) : (
                <BsFillTelephoneFill size={21} />
              )}

              <Text maxInlineSize="270px" ml="20px" fontSize="13px">
                {type === "hotels"
                  ? places.subcategory_type_label
                  : type === "attractions"
                  ? places.subcategory?.map((attraction) => attraction.name)
                  : places.phone}
              </Text>
            </Flex>
            <Flex mt="20px" alignItems="center">
              <CgWebsite size={21} />
              {places.website ? (
                <Link href={places.website} ml="20px" fontSize="12px">
                  {places.website}
                </Link>
              ) : (
                <Text ml="20px" fontSize="14px">
                  Website not found
                </Text>
              )}
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
