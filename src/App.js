import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import List from "./components/List";
import Map from "./components/Map";
import { getPlacesData } from "./services/api";

export default function App() {
  const [places, setPlaces] = useState([]);
  const [childClick, setChildClick] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filtered = places?.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating]);

  useEffect(() => {
    setIsLoading(true);
    getPlacesData(type, bounds?.sw, bounds?.ne).then((data) => {
      setPlaces(data);
      setFilteredPlaces([]);
      setIsLoading(false);
    });
  }, [type, coordinates, bounds]);

  return (
    <>
      <Header setCoordinates={setCoordinates} />
      <Flex>
        <List
          places={filteredPlaces.length ? filteredPlaces : places}
          childClick={childClick}
          isLoading={isLoading}
          setType={setType}
          setRating={setRating}
          rating={rating}
          type={type}
          setChildClick={setChildClick}
        />

        <Map
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}
          places={filteredPlaces.length ? filteredPlaces : places}
          setChildClick={setChildClick}
        />
      </Flex>
    </>
  );
}
