import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";
import { getChurchesList } from "./services/churches";
import { searchChurchesList } from "./services/searchChurches";
import { ChurchDetails } from "./components/ChurchDetails";
import { SearchList } from "./components/SearchList";
import { useSearchParams } from "react-router-dom";
import "./App.css";
import { distanceBetween } from  "./utils/GeoMath";

var startConfig = {
  center: { lat: 39.8, lng: -8.1303 },
  zoom: 7,
};

function App() {
  const [markerList, setMarkerList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [map, setMap] = React.useState(null);
  const [autocomplete, setAutocomplete] = React.useState(null);
  const [libraries] = useState(["places"]);
  let [searchParams] = useSearchParams();
  let [currentLocation, setCurrentLocation] = useState(null);
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;
  const [mapCenter, setMapCenter] = useState(startConfig.center);
  const [mapZoom, setMapZoom] = useState(startConfig.zoom);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries,
  });

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handlePlaceChanged = () => {
    var place = {
      lat: autocomplete.getPlace().geometry.location.lat(),
      lng: autocomplete.getPlace().geometry.location.lng(),
    };

    markerList.forEach((marker) => {
      marker.distance = distanceBetween(place, marker);
    });
    markerList.sort((a, b) =>
      parseInt(a.distance) > parseInt(b.distance) ? 1 : -1
    );
    setMapCenter(place);
    //map.setCenter(place);
    setMapZoom(14);
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
    if (
      searchParams.get("search") !== "" &&
      searchParams.get("search") !== null
    ) {
      searchChurchesList(searchParams.get("search")).then((items) => {
        if (mounted) {
          setMarkerList(items);
          setSearchList(items);
          setMapCenter({ lat: items[0].lat, lng: items[0].lng });
          setMapZoom(20);
          setTimeout(() => {
            setActiveMarker(items[0].id);
          }, 2000);
        }
      });
    } else {
      getChurchesList().then((items) => {
        if (mounted) {
          items.sort((a, b) => (a.name > b.name ? 1 : -1));
          setMarkerList(items);
          setSearchList(items);
        }
      });
    }

    return () => (mounted = false);
  }, [searchParams]);

  function getCurrentLocation() {
    if (!navigator.geolocation) {
      alert("O Seu browser não suporta geolocalização.")
    } else {
      if (currentLocation != null) {
        setMapCenter(currentLocation);
        setMapZoom(23);

        setCurrentLocation(null);
        return;
      }

      navigator.geolocation.getCurrentPosition((position) => {
        var lat = parseFloat(position.coords.latitude);
        var lng = parseFloat(position.coords.longitude);
        setCurrentLocation({ lat: lat, lng: lng });
        // console.log(`Setting position to ${lat},${lng} `);
        // setMapCenter({ lat: lat, lng: lng });
        setMapZoom(17);
        markerList.forEach((marker) => {
          marker.distance = 
            distanceBetween(
              { lat: lat, lng: lng },
              { lat: marker.lat, lng: marker.lng }
          );
        });
        markerList.sort((a, b) =>
          parseInt(a.distance) > parseInt(b.distance) ? 1 : -1
        );
        setMapCenter({lat: markerList[0].lat, lng: markerList[0].lng})
        setActiveMarker(markerList[0].id)
      });
    }
  }

  

  return isLoaded ? (
    <div id="content">
      <SearchList
        getCurrentLocation={getCurrentLocation}
        searchList={searchList}
        map={map}
        handleSearchChange={handleSearchChange}
      ></SearchList>
      <GoogleMap
        id="map"
        center={mapCenter}
        zoom={mapZoom}
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
              pastorEmail,
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
                        <a href={`mailto:${pastorEmail}`}>{firstName} {lastName}</a>
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

export default React.memo(App);
