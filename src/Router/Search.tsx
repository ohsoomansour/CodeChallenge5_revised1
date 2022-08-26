import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getMultiSearch } from "../api";
import Slider from "../Components/Slider";
import { category } from "../recoil";
import { makeImagePath } from "../utils";
import { IGetDataResult } from "./Home";
/* 검색:dune
  hash: ""
  key: "ony0x9"
  pathname: "/search"
  search: "?keyword=dune"
  state: undefined
  [[Prototype]]: Object
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
const Banner = styled.div<{bgPhoto:string}>`
  height:100vh;
  display:flex;
  flex-direction:column;
  justify-content:center;
  padding:60px;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${(props) => props.bgPhoto}); 
  backgound-size:cover;
  background-position:center center;
`;
const Title = styled.h2`
  color:whit;
  font-size: 60px;
  margin-bottom: 10px;
`;
const Ovierview = styled.p`
  font-size: 24px;
  width: 50%;
`;
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
export default function Search() {
  const location = useLocation()
  const params = new URLSearchParams(location.search).get("keyword");
  const [keyword, setkeyword] = useState(params);
  useEffect(() => {
    if (params !== null) setkeyword(params)
  }, []);
  const {data:MultiSearchData, isLoading:MultiSearchLoading} = useQuery<IGetDataResult>(
    ["MultiSearch", "Search"],
    () => getMultiSearch({params}))
  const MultiSearchDatas = MultiSearchLoading
    ? []
    : MultiSearchData 
    ? MultiSearchData.results
    : [];
   //⭐로직 확인 
    let movieResults:IData[] = [];
    let tvResults:IData[] = [];

    MultiSearchData?.results.map((item) => {
      if(item.media_type === "movie") {
        movieResults.push(item);
      } else if(item.media_type === "tv") {
        tvResults.push(item);
      }
    })

  return (
    <Wrapper>
    {MultiSearchLoading ?(
      <Loader></Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(MultiSearchDatas[0].poster_path)}
          >
          <Title>{MultiSearchDatas[0].title}</Title>
          <Ovierview>{MultiSearchDatas[0].overview}</Ovierview>  
          </Banner>
          <SliderWrapper>
            <SliderTitle>💋Movie Result</SliderTitle>
            <Slider data={movieResults} kind={"search"} category={category.MultiSearch} />
          </SliderWrapper>
          <SliderWrapper>
            <SliderTitle>🎬tv Result</SliderTitle>
            <Slider data={movieResults} kind={"search"} category={category.MultiSearch} />
          </SliderWrapper>
        </>

    
     
    )}
    </Wrapper>
  )
    
}   