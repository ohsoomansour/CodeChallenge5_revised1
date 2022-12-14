import styled from "styled-components";
import { useQuery } from "react-query";
import {  getLatestMovies, getNowPlayingMovies, getTopRatedMoives, getUpcomingMovies, getVideoFunc } from "../api";
import {  makeMoviePath } from "../utils";
import Slider from "../Components/Slider";
import { category, isSoundAtom} from "../recoil";
import ReactPlayer from "react-player";
import React  from "react";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
/*{
  "iso_639_1": "en",
  "iso_3166_1": "US",
  "name": "Official Trailer 2",
  "key": "GD8nCSr54PA",
  "site": "YouTube",
  "size": 1080,
  "type": "Trailer",
  "official": true,
  "published_at": "2022-07-23T00:30:04.000Z",
  "id": "62e0d0601dbc88067448c39e"
}
๐ฌ์์ ๋ง๋ค๊ธฐ
1.์ค์น:npm install react-player > import ReactPlayer from "react-player";
 - "react-player/youtube": ํ ๊ฐ์ง ์ ํ๋ง ์ฌ์ฉํ๋ ๊ฒฝ์ฐ ์ ํ๊น์ง ์ ์ด์ฃผ๋ฉด ๋ฒ๋ค ํฌ๊ธฐ๋ฅผ ์ค์ฌ์ import 
2.๐์์key ์ป๊ธฐ
  export const getVideoFunc = async (movieId?: string) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
  );
  return await response.json();
};
3. ๐์์key >> ์์ ์ฃผ์๋ก ์ด๋  
export function makeTrailerPath(key?: string) {
  #๏ธโฃembed: ์๋ ์ฌ์๋๋๋ก ํ๊ณ  ์ถ์ ๊ฒฝ์ฐ
  return `https://www.youtube.com/embed/${key}โ?showinfo=0&enablejsapi=1&origin=http://localhost:3000`; //localhost ์ ๊ฑฐ
}

4.
const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25% /* Player ratio: 100 / (1280 / 720) 
  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }
`;
<const PlayerWrapper> ๐https://shinsangeun.github.io/posts/react/react-player
  <ReactPlayer
    className="react-player"
    url={[makeTrailerPath(trailer?.results[0].key || "")]} #๏ธโฃ[]์ฌ์ฉ์, ์์์ ๋ค์ ์์์ผ๋ก ์ฌ์
    volume={isVolum ? 0 : 0.3} #๏ธโฃ[Slider.tsx]์ปดํฌ๋ํธ์ isVolume ์ํฐ๊ฐ ์ธํ > 
    controls={true} #๏ธโฃํ๋ ์ด์ด ์ปจํธ๋กค ๋ธ์ถ ์ฌ๋ถ
    playing={true}  #๏ธโฃ์๋์ฌ์ on
    muted={isSound === "0" ? true : false}  #๏ธโฃ์ง์  ์์๊ฑฐ ์ค์ 
    loop={true}
    width="200vw" #๏ธโฃํ๋ ์ด์ด ์ธ๋กํฌ๊ธฐ
    height="calc(110vh)" #๏ธโฃํ๋ ์ด์ด ๊ฐ๋กํฌ๊ธฐ
    pip={true} #๏ธโฃpip ๋ชจ๋ ์ค์  ์ฌ๋ถ
    onEnded={} #๏ธโฃํ๋ ์ด์ด ๋๋ฌ์ ๋ ์ด๋ฒคํธ
    light={true} #๏ธโฃํ๋ ์ด์ด ๋ชจ๋
  >
  </ReactPlayer>
</const PlayerWrapper>
*/
const Wrapper = styled.div`
  background-color:black;
`
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
//โญ๐์ ์๋ ๋๋ ์ง๋๋ฐ ์ค์ํ ์ญํ !โญ
const SliderWrapper = styled.div`
  width:100%;
  height:300px;
`;
const SliderTitle = styled.p`
  font-size:40px;
  color:${(props) => props.theme.white.lighter};
  position:relative;
  padding:20px;
  margin-bottom:10px;
`
const PlayerWrapper = styled.div`
  position:relative;
  padding-top: 56.25%
  .react-player{
    position:absolute;
    top:0;
    left:0;
  }
`
const PlayBtn = styled.button`
  font-size: 15px;
  height: 30px;
  border-radius: 5px;
  font-weight: 600;
  border: none;
  outline: none;
  cursor:pointer;
`;
export interface IData{
  adult: boolean;
  backdrop_path: string;
  id: number;
  media_type:string;
  original_language: string;
  original_title: string;
  original_name:string; 
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  name:string; 
  vote_count: number;
}
export interface IGetDataResult{
  dates:{
    maximum:string;
    minumum:string;
  },
  results:IData[]
  total_pages:number;
  total_results:number;
}
export interface IMovieVideo{
  id:number;
  results:{
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: false,
    published_at: string;
    id: string;
  }[]
}
//๐จHome, Tv์ปดํฌ๋ํธ์ category๋ณ 'data'๋ค์ ์ธํฐํ์ด์ค๋ฅผ ํตํฉํด์ ๊ด๋ฆฌํด์ผ props ์ ๋ฌ ๊ฐ๋ฅ๐จ
export default function Home() {
  const {data:nowPlayingData, isLoading:nowPlayingLoading} = useQuery<IGetDataResult>(
    ["nowPlaying", "Movies" ], getNowPlayingMovies)
  const nowPlayingDatas = nowPlayingLoading
    ? []
    : nowPlayingData
    ? nowPlayingData.results
    : []; 
  const {data:topRatedData, isLoading:topRatedLoading} = useQuery<IGetDataResult>(
    ["TopRated", "Movies"],getTopRatedMoives)
  const topRatedDatas = topRatedLoading
    ? []
    : topRatedData
    ? topRatedData.results
    : [];
  const {data:upComingData, isLoading:upComingLoading} = useQuery<IGetDataResult>(
    ["Upcoming", "Movies"], getUpcomingMovies)
  const upComingDatas = upComingLoading
    ? []
    : upComingData
    ? upComingData.results
    : [];
  const {data:latestData, isLoading:latestLoading} = useQuery<IGetDataResult>(
    ["Latest", "Movies"], getLatestMovies)
  const latestDatas = latestLoading
    ? []
    : latestData
    ? latestData.results
    : [];
  
  //movieId๋ฅผ ์ด๋ค ๋ฐฉ๋ฒ์ผ๋ก ๋์ด ์์ผ ํ ๊น!? localStorage.movieId  (The RounduP:619803)
  //const stateMovieId = localStorage.getItem('movieId')
  //Button type attribute has not been set
  const {data:VideoData, isLoading:VideoLoading} = useQuery<IMovieVideo>(
    ["MovieVideo","VIDEO" ],() => getVideoFunc(String(619803)))  

  const [isSound, setIsSound] = useRecoilState(isSoundAtom);

  const handleChangeSound = () => {
    setIsSound((prev) => !prev)
  }

      return (
      <Wrapper>
        {nowPlayingLoading ? (
          <Loader>Loading...</Loader>
        ) : (
        <> 
          <PlayerWrapper>
            <ReactPlayer
              className="react-player"
              url={makeMoviePath(VideoData?.results[0].key || "" )}
              volume={isSound ? 0 : 2 }
              muted={true} //์๋ ์ฌ์ Y / N
              controls={true}
              playing={true}
              width="100vw"
              height="calc(110vh)"
              pip={false}
              light={false}
              loop={true}
            >
            </ReactPlayer>
          </PlayerWrapper>  
          <PlayBtn type="button" onClick={() => handleChangeSound()}>
              {isSound ? "Sound ON" : "Sound OFF" }
          </PlayBtn>  
          <SliderWrapper>
            
            <SliderTitle>Now Playing</SliderTitle>
            <Slider
              data={nowPlayingDatas}
              kind={"movie"}
              category={category["nowPlaying-Moive"]} 
            />  
          </SliderWrapper>
          <SliderWrapper>
            <SliderTitle>TopRated</SliderTitle>
            <Slider
              data={topRatedDatas}
              kind={"movie"}
              category={category["topRated-Movie"]} 
            />  
          </SliderWrapper>
          <SliderWrapper>
            <SliderTitle>UpComing</SliderTitle> 
            <Slider
              data={upComingDatas}
              kind={"movie"}
              category={category["upComing-Movie"]} 
            />  
          </SliderWrapper>
          <SliderWrapper>
            <SliderTitle>Latest</SliderTitle>
            <Slider
              data={latestDatas}
              kind={"movie"}
              category={category["latest-Movie"]} 
            />  
          </SliderWrapper>

        </>  
        )}
      </Wrapper>
    )  
}

