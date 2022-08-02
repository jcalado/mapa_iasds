import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";
import { getChurchesList } from "./services/churches";
import "./App.css";
import { ChurchDetails } from "./components/ChurchDetails";

const center = {
  lat: 39.6948,
  lng: -8.1303,
};
const initialCenter = center;

function MyComponent() {
  const [markerList, setMarkerList] = useState([]);
  var [searchList, setSearchList] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [activePlace, setActivePlace] = useState(center);
  const [map, setMap] = React.useState(null);
  const [autocomplete, setAutocomplete] = React.useState(null);
  const [libraries] = useState(["places"]);
  const [mapCenter, setMapCenter] = useState(center);
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries,
  });

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
    console.log("mapa carregado");
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
    console.log("unmount do mapa");
  }, []);

  const handlePlaceChanged = () => {
    var place = {
      lat: autocomplete.getPlace().geometry.location.lat(),
      lng: autocomplete.getPlace().geometry.location.lng(),
    };
    console.log(place);

    console.log(distanceBetween(place, center));
    setActivePlace(place);
    markerList.forEach((marker) => {
      marker.distance = distanceBetween(place, marker);
    });
    markerList.sort((a, b) =>
      parseInt(a.distance) > parseInt(b.distance) ? 1 : -1
    );
    setMapCenter(place);
    map.setCenter(place);
    map.setZoom(14);
  };

  const handleAutocompleteLoaded = (obj) => {
    setAutocomplete(obj);
  };

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }

    setActiveMarker(marker);
  };

  const handleSearchChange = (data) => {
    setSearchList(
      markerList.filter(
        (marker) =>
          marker.name.toLowerCase().includes(data.target.value.toLowerCase()) ||
          [marker.firstName.toLowerCase(), marker.lastName.toLowerCase()]
            .join(" ")
            .includes(data.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    let mounted = true;
    getChurchesList().then((items) => {
      if (mounted) {
        items.sort((a, b) => (a.city > b.city ? 1 : -1));
        setMarkerList(items);
        setSearchList(items);
      }
    });
    return () => (mounted = false);
  }, []);

  // useEffect( () => {
  //   if (!navigator.geolocation) {
  //     alert("Geolocation kaput!")
  //   } else {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setLocationPosition({lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude)});
  //       console.log(`Setting position to ${position.coords.latitude},${position.coords.longitude} `)
  //     });
  //   }
  // } )

  function distanceBetween(pointA, pointB) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(pointB.lat - pointA.lat); // deg2rad below
    var dLon = deg2rad(pointB.lng - pointA.lng);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(pointA.lat)) *
        Math.cos(deg2rad(pointB.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d.toFixed(0);
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  return isLoaded ? (
    <div id="content">
      <div id="searchList">
        <input
          type="search"
          autoComplete="off"
          id="search"
          placeholder="filtrar lista ..."
          onChange={handleSearchChange}
        ></input>

        <div id="list">
          <ul>
            {searchList.map(
              ({
                id,
                name,
                lat,
                lng,
                address,
                city,
                firstName,
                lastName,
                gender,
              }) => (
                <li
                  key={id}
                  position={{ lat, lng }}
                  onClick={() => {
                    map.setCenter({ lat, lng });
                    map.setZoom(20);
                  }}
                  place_id={id}
                  distance={distanceBetween(activePlace, { lat, lng })}
                >
                  {name}
                  <small>
                    {mapCenter === initialCenter
                      ? ""
                      : "Distância: " +
                        distanceBetween(activePlace, { lat, lng }) +
                        " Km"}
                  </small>
                  <small>
                    {gender === "M" ? "Pr." : "Pra."} {firstName} {lastName}
                  </small>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      <GoogleMap
        id="map"
        center={center}
        zoom={7}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Autocomplete
          onLoad={handleAutocompleteLoaded}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            type="text"
            autoComplete="off"
            placeholder="Introduza uma morada..."
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `50%`,
              height: `40px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              top: "10px",
              marginLeft: "-25%",
            }}
          />
        </Autocomplete>
        {
          /* Child components, such as markers, info windows, etc. */

          searchList.map(
            ({
              id,
              name,
              lat,
              lng,
              address,
              schedule,
              youtube,
              facebook,
              instagram,
              firstName,
              lastName,
              pictureUrl,
            }) => (
              <Marker
                key={id}
                position={{ lat, lng }}
                onClick={() => handleActiveMarker(id)}
              >
                {activeMarker === id && (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <div className="churchInfo">
                      <h1>{name}</h1>
                      <h2>Morada</h2>
                      <address>{address}</address>

                      <h2>Horário</h2>
                      <p>{schedule}</p>

                      <h2>Pastor</h2>
                      <p>
                        {firstName} {lastName}
                      </p>

                      <ChurchDetails
                        lat={lat}
                        lng={lng}
                        youtube={youtube}
                        facebook={facebook}
                        instagram={instagram}
                        pictureUrl={pictureUrl}
                      ></ChurchDetails>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            )
          )
        }
        <></>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
