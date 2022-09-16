import React from "react";
import {
  IconBrandYoutube,
  IconBrandFacebook,
  IconBrandInstagram,
  IconMap,
  IconPhoto
} from "@tabler/icons";
import { Tooltip } from '@mantine/core';

export function ChurchDetails(props) {
  return (
    <div className="links">
      <Tooltip label="Mostrar no mapa" position="top">
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
        >
          <IconMap color="#ecb72b" size={30}></IconMap>
        </a>
      </Tooltip>
      {props.pictureUrl !== undefined &&
        props.pictureUrl !== null &&
        props.pictureUrl !== "" && (
          <Tooltip label="Mostrar foto" position="top">
            <a
              href={props.pictureUrl}
              target="_blank"
              rel="noreferrer"
            >
              <IconPhoto color="#003366" size={30}></IconPhoto>
            </a>
          </Tooltip>
        )}
      {props.youtube !== undefined &&
        props.youtube !== null &&
        props.youtube !== "" && (
          <Tooltip label="Abrir canal do Youtube" position="top">
          <a
            href={props.youtube}
            target="_blank"
            rel="noreferrer"
          >
            <IconBrandYoutube color="#da2f2f" size={30}></IconBrandYoutube>
          </a>
          </Tooltip>
        )}

      {props.facebook !== undefined &&
        props.facebook !== null &&
        props.facebook !== "" && (
          <Tooltip label="Abrir página" position="top">
          <a
            href={props.facebook}
            target="_blank"
            rel="noreferrer"
          >
            <IconBrandFacebook color="#4267B2" size={30}></IconBrandFacebook>
          </a>
          </Tooltip>
        )}

      {props.instagram !== undefined &&
        props.instagram !== null &&
        props.instagram !== "" && (
          <Tooltip label="Abrir perfil" position="top">
          <a
            href={props.instagram}
            target="_blank"
            rel="noreferrer"
          >
            <IconBrandInstagram color="#b92e9d" size={30}></IconBrandInstagram>
          </a>
          </Tooltip>
        )}
    </div>
  );
}
