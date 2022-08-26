import {atom} from "recoil";

export enum category {
  "nowPlaying-Moive" = "nowPlaying-Moive",
  "topRated-Movie" = "topRated-Movie",
  "upComing-Movie" = "upComing-Movie",
  "latest-Movie" = "latest-Movie",
  "topRated-TV" = "topRated-TV",
  "pupular-TV" = "pupular-TV",
  "airingToday" = "airingToday",   
  "MultiSearch" = "MultiSearch"
}

export const SearchAtom = atom({
  key:"Keyword",
  default:""
})

export const Volume = atom({
  key:"volume",
  default:false
})

export enum SoundEnums{
  OFF = "0",
  ON = "1",
}
export const getSound = (): SoundEnums => {
  const sound = localStorage.getItem("sound");
  if (sound === OFF) {
    return OFF;
  }
  return ON;
};

const { OFF, ON } = SoundEnums;
export const isSoundAtom = atom({
  key:"soundSwitch",
  default:getSound()
})

