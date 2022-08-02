import React from "react";
import {
  IconBrandYoutube,
  IconBrandFacebook,
  IconBrandInstagram,
  IconMap,
  IconPhoto
} from "@tabler/icons";

export function ChurchDetails(props) {
  return (
    <div className="links">
      <a
        href={"https://maps.google.com/?q=" +
          props.lat +
          "," +
          props.lng +
          "&ll=" +
          props.lat +
          "," +
          props.lng +
          "&z=20"}
        target="_blank"
        rel="noreferrer"
        title="Mapa"
      >
        <IconMap color="#ecb72b" size={30}></IconMap>
      </a>
      {props.pictureUrl !== undefined &&
        props.pictureUrl !== null &&
        props.pictureUrl !== "" && (
          <a
            href={props.pictureUrl}
            title="Foto"
            target="_blank"
            rel="noreferrer"
          >
            <IconPhoto color="#003366" size={30}></IconPhoto>
          </a>
        )}
      {props.youtube !== undefined &&
        props.youtube !== null &&
        props.youtube !== "" && (
          <a
            href={props.youtube}
            title="Youtube"
            target="_blank"
            rel="noreferrer"
          >
            <IconBrandYoutube color="#da2f2f" size={30}></IconBrandYoutube>
          </a>
        )}

      {props.facebook !== undefined &&
        props.facebook !== null &&
        props.facebook !== "" && (
          <a
            href={props.facebook}
            title="Facebook"
            target="_blank"
            rel="noreferrer"
          >
            <IconBrandFacebook color="#4267B2" size={30}></IconBrandFacebook>
          </a>
        )}

      {props.instagram !== undefined &&
        props.instagram !== null &&
        props.instagram !== "" && (
          <a
            href={props.instagram}
            title="Instagram"
            target="_blank"
            rel="noreferrer"
          >
            <IconBrandInstagram color="#b92e9d" size={30}></IconBrandInstagram>
          </a>
        )}
    </div>
  );
}
