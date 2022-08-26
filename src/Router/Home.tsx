import styled from "styled-components";
import { useQuery } from "react-query";
import {  getLatestMovies, getNowPlayingMovies, getTopRatedMoives, getUpcomingMovies, getVideoFunc } from "../api";
import { makeImagePath, makeMoviePath } from "../utils";
import Slider from "../Components/Slider";
import { category, isSoundAtom, SoundEnums, Volume } from "../recoil";
import ReactPlayer from "react-player";
import React, { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
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
🎬영상 만들기
1.설치:npm install react-player > import ReactPlayer from "react-player";
 - "react-player/youtube": 한 가지 유형만 사용하는 경우 유형까지 적어주면 번들 크기를 줄여서 import 
2.🔑영상key 얻기
  export const getMoviesTrailer = async (movieId?: string) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
  );
  return await response.json();
};
3. 🔑영상key >> 영상 주소로 이동  
export function makeTrailerPath(key?: string) {
  #️⃣embed: 자동 재생되도록 하고 싶은 경우
  return `https://www.youtube.com/embed/${key}✅?showinfo=0&enablejsapi=1&origin=http://localhost:3000`; //localhost 제거
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
<const PlayerWrapper> 📄https://shinsangeun.github.io/posts/react/react-player
  <ReactPlayer
    className="react-player"
    url={[makeTrailerPath(trailer?.results[0].key || "")]} #️⃣[]사용시, 알아서 다음 영상으로 재생
    volume={isVolum ? 0 : 0.3} #️⃣[Slider.tsx]컴포넌트에 isVolume 아톰값 세팅 > 
    controls={true} #️⃣플레이어 컨트롤 노출 여부
    playing={true}  #️⃣자동재생 on
    muted={isSound === "0" ? true : false}  #️⃣직접 음소거 설정
    loop={true}
    width="200vw" #️⃣플레이어 세로크기
    height="calc(110vh)" #️⃣플레이어 가로크기
    pip={true} #️⃣pip 모드 설정 여부
    onEnded={} #️⃣플레이어 끝났을 때 이벤트
    light={true} #️⃣플레이어 모드
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
//⭐🔑위 아래 나눠지는데 중요한 역할!⭐
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
const PlayBtn = styled(motion.button)`
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
//🚨Home, Tv컴포넌트의 category별 'data'들의 인터페이스를 통합해서 관리해야 props 전달 가능🚨
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
  
  //movieId를 어떤 방법으로 끌어 와야 할까!? localStorage.movieId  (The RounduP:619803)
  //const stateMovieId = localStorage.getItem('movieId')
  //Button type attribute has not been set
  const {data:VideoData, isLoading:VideoLoading} = useQuery<IMovieVideo>(
    ["MovieVideo","VIDEO" ],() => getVideoFunc(String(619803)))  
  const isVolume = useRecoilValue(Volume);
  const [isSound, setIsSound] = useRecoilState<SoundEnums>(isSoundAtom);
  const { OFF, ON } = SoundEnums;
  const handleChangeSound = useCallback((): void => {
    if (isSound === OFF ) {
      localStorage.setItem("sound", ON);
      setIsSound(ON)
      return;
    }
    localStorage.setItem("sound", OFF);
    setIsSound(OFF);
  }, [OFF, ON, isSound, setIsSound])

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
              volume={isVolume ? 0 : 0.3 }
              muted={true}
              controls={false}
              playing={true}
              width="100vw"
              height="calc(110vh)"
              pip={false}
              light={false}
              loop={true}
            >
            </ReactPlayer>
          </PlayerWrapper>  
          <PlayBtn type="submit"  onClick={handleChangeSound}>
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

