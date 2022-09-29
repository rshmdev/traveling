import GoogleMapReact from "google-map-react";
import "../styles/Map.css";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { TiArrowSortedDown } from "react-icons/ti";

export default function Map({
  coordinates,
  setCoordinates,
  setBounds,
  places,
  setChildClick,
}) {
  function RatingMap({ rating }) {
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
          {rating}
        </Flex>
      </Box>
    );
  }

  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  return (
    <div className="mapContainer">
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${apiKey}` }}
        defaultCenter={coordinates}
        options={""}
        onChildClick={(child) => {
          setChildClick(child);
        }}
        margin={[50, 50, 50, 50]}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        center={coordinates}
        defaultZoom={14}
      >
        {places?.map((place, i) => (
          <div
            className="markerContainer"
            key={i}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
          >
            <Box className="paper">
              <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontWeight="extrabold" padding="5px">
                  {place.name}
                </Text>
                <RatingMap rating={place.rating} />
              </Flex>
              <Image
                mt="10px"
                borderBottomRadius="10px"
                h="50px"
                w="100%"
                className="pointer"
                src={
                  place.photo
                    ? place.photo.images.large.url
                    : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                }
                alt={place.name}
              />

              <TiArrowSortedDown
                size={30}
                color="white"
                style={{
                  position: "absolute",
                  bottom: "-19px",
                  left: "30%",
                  zIndex: 1,
                }}
              />
            </Box>
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
}
