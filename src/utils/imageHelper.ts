import { StaticImageData } from "next/image";

import defaultProfile from "images/DefaultAvatar.png";
import defaultBackdrop from "images/DefaultBackdrop.png";
import defaultPoster from "images/DefaultImage.png";

const defaultImages = {
  poster: defaultPoster,
  profile: defaultProfile,
  backdrop: defaultBackdrop,
  logo: ""
} as const;

// https://developer.themoviedb.org/reference/configuration-details
type BackdropSize = "w300" | "w780" | "w1280" | "original";
type LogoSize = "w45" | "w92" | "w154" | "w185" | "w300" | "w500" | "original";
type PosterSize = "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original";
type ProfileSize = "w45" | "w185" | "h632" | "original" | PosterSize;

type TMDBImageArgs<T extends keyof typeof defaultImages> = {
  path: string;
  type: T;
  size?: T extends "backdrop"
    ? BackdropSize
    : T extends "logo"
      ? LogoSize
      : T extends "poster"
        ? PosterSize
        : T extends "profile"
          ? ProfileSize
          : never;
  fallback?: string | StaticImageData;
};

export const getTMDBImage = <T extends keyof typeof defaultImages>({ path, type, size, fallback }: TMDBImageArgs<T>) => {
  if (!path) {
    return fallback || defaultImages[type];
  }

  return `https://image.tmdb.org/t/p/${size || "w500"}${path}`;
};

type ImageSizesProp<T extends keyof typeof defaultImages> = {
  screenWidth: number;
  imageSize: T extends "backdrop"
    ? BackdropSize
    : T extends "logo"
      ? LogoSize
      : T extends "poster"
        ? PosterSize
        : T extends "profile"
          ? ProfileSize
          : never;
}[];

export const getSrcSet = <T extends keyof typeof defaultImages>({
  imageSizes,
  path,
  type
}: {
  imageSizes: ImageSizesProp<T>;
  path: string;
  type: T;
}) => {
  if (!path) {
    return null;
  }

  return imageSizes
    .map(({ screenWidth, imageSize }) => {
      return `${getTMDBImage({ path, type, size: imageSize })} ${screenWidth}w`;
    })
    .join(", ");
};
