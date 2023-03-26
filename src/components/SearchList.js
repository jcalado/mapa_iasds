import React from "react";
import { IconCurrentLocation, IconMapSearch } from "@tabler/icons";

export function SearchList(props) {
  return (
    <div id="searchList">
      <div id="searchButtons">
        <span id="near">
          <IconCurrentLocation></IconCurrentLocation>
          <span onClick={props.getCurrentLocation}>Mais próxima</span>
        </span>
        <div id="searchInput">
          <IconMapSearch></IconMapSearch>
          <input
            type="search"
            autoComplete="off"
            id="search"
            placeholder="filtrar lista"
            onChange={props.handleSearchChange}
          ></input>
        </div>
      </div>

      <div id="list">
        <ul>
          {props.searchList.map(
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
              distance,
            }) => (
              <li
                key={id}
                onClick={() => {
                  props.map.setZoom(20);
                  props.map.setCenter({
                    lat,
                    lng,
                  });
                  props.setActiveMarker(id);
                }}
                place_id={id}
                distance={distance}
              >
                <span>{name}</span>
                {distance && (<small className="distance">
                  {distance === undefined ? "" : distance + " Km"}
                </small>)}
                <small className="pastor">
                  {gender === "M" ? "Pr." : "Pra."} {firstName} {lastName}
                </small>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
