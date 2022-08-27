import { useQuery } from "react-query";
import styled from "styled-components";
import { getAiringTodayShowTv, getPopularShowTv, getTopRatedTv } from "../api";
import Slider from "../Components/Slider";
import { category } from "../recoil";
import { makeImagePath } from "../utils";
import { IGetDataResult} from "./Home";

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
`

export default function Tv() {
  const {data:airingTodayData, isLoading:airingTodayLoading} = useQuery<IGetDataResult>(
    ["AiringToday", "TV"], getAiringTodayShowTv)
  
  const airingTodayDatas = airingTodayLoading
    ? []
    : airingTodayData
    ? airingTodayData.results
    : [];
  const {data:PopularTodayData, isLoading:PopularTodayLoading} = useQuery<IGetDataResult>(  
  ["PopluarShow", "TV"], getPopularShowTv)
  const PopularTodayDatas = PopularTodayLoading
    ? []
    : PopularTodayData
    ? PopularTodayData.results
    : [];
  const {data:TopRatedData, isLoading:TopRatedLoading} = useQuery<IGetDataResult>(
    ["TopRated", "Tv"], getTopRatedTv)
  
  const TopRatedDatas = TopRatedLoading
   ? []
   : TopRatedData
   ? TopRatedData.results
   : [];
   const {data:LatestData, isLoading:LatestLoading} = useQuery<IGetDataResult>(
   ["Latest", "TV"], )

   const LatestDatas = LatestLoading
    ? []
    : LatestData
    ? LatestData.results
    : [];

  return (
    <Wrapper>  
      {airingTodayLoading? (
      <Loader>loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(airingTodayDatas[0].poster_path)}
          >
            <Title>{airingTodayDatas[0].name}</Title>
            <Ovierview>{airingTodayDatas[0].overview}</Ovierview>
          </Banner>
          <SliderWrapper>
            <SliderTitle>AiringToday</SliderTitle>
            <Slider
              data={airingTodayDatas}
              kind={"tv"}
              category={category.airingToday}
             />
          </SliderWrapper>
          <SliderWrapper>
            <SliderTitle>PopularToday</SliderTitle>
            <Slider
              data={PopularTodayDatas}
              kind={"tv"}
              category={category["pupular-TV"]}
             />
          </SliderWrapper>
          <SliderWrapper>
            <SliderTitle>TopRated</SliderTitle>
            <Slider
              data={TopRatedDatas}
              kind={"tv"}
              category={category["topRated-TV"]}
             />
          </SliderWrapper>
          <SliderWrapper>
            <SliderTitle>Latest</SliderTitle>
            <Slider
              data={LatestDatas}
              kind={"tv"}
              category={category["latest-Movie"]}
             />
          </SliderWrapper>
        </>
      )}
    </Wrapper> 
  )
};