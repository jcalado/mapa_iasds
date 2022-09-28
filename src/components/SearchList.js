import React from "react";
import logo from "../assets/adventist-pt-text--white.svg";
import logoPng from "../assets/adventist-pt-text--white.png";
import { IconCurrentLocation, IconMapSearch } from "@tabler/icons";

export function SearchList(props) {
  return (
    <div id="searchList">
      <div id="searchButtons">
        <span id="near">
          <IconCurrentLocation></IconCurrentLocation>
          <span onClick={props.getCurrentLocation}>Mais próxima de mim</span>
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
                  props.map.setCenter({
                    lat,
                    lng,
                  });
                  props.map.setZoom(20);
                  props.setActiveMarker(id);
                }}
                place_id={id}
                distance={distance}
              >
                {name}
                <small>
                  {distance === undefined ? "" : distance + " Km"}
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
  );
}
