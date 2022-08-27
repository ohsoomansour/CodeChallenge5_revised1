import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
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

export const isSoundAtom = atom({
  key:"soundSwitch",
  default: false,
})

