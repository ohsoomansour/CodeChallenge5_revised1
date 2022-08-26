import styled  from "styled-components";
import {AnimatePresence, motion, useViewportScroll} from "framer-motion";
import { makeImagePath } from "../utils";
import { useQuery } from "react-query";
import { getDetail } from "../api";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { Volume } from "../recoil";


//translate3d(x,y,z):	현재의 위치에서 해당 요소를 주어진 x축, y축과 z축의 거리만큼 이동시킴.


const BigMovie = styled(motion.div)`
  position: absolute;
  left:0px;
  right:0px;
  margin: 0 auto;
  width: 960px;
  max-width: calc(100% - 40px);
  height: calc(100% - 80px);
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  overflow: hidden;
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top:0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity:0;
`;
const BigCover = styled.div<{bgPhoto:string}>`
  width: 100%;
  height:70vh;
  background-image:linear-gradient(to bottom, transparent, black), url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
`;
const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 35px;
  position: relative; 
  top:800px;
`;

const BigOverview = styled.p`
  font-size:20px;
  line-height:1.5;
  padding: 0 20px;
  position: relative;
  top:810px;
  color: ${(props) => props.theme.white.lighter};
`;
const TagLine = styled.p`
  position: relative;
  font-size:28px;
  font-weight:600;
  top:380px;
  text-align:center;
`
export interface IDetailProps {
  id:number;
  kind:string;
  category:string;
}


export interface IDetailDatas{
  backdrop_path:string;
  belongs_to_collection:{
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  }
  genres:{id:number; name:string;}[]
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies:{id:number; logo_path:string; name:string; origin_country:string;}[]
  production_countries:{iso_3166_1:string; name:string;}
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages:{english_name:string; iso_639_1:string; name:string; }[]
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
const OverlayVariants = {
  initial:{
    opacity:0
  },
  animate:{
    opacity:1
  },
  exit:{
    opacity:0
  }
}
export default function Detail({id, kind, category}:IDetailProps) {
  const setVolume = useSetRecoilState(Volume)
  const { scrollY, scrollX } = useViewportScroll()
  const history = useHistory();
  const onOverlayClick = () => {
    history.goBack();
    setVolume(false); //오버레이off시 '홈 화면' 볼륨 0.3
  }
  const {data, isLoading} = useQuery<IDetailDatas>(
    ["Detail",kind, id ],
    () => getDetail(kind, id)
    )
  console.log(data)
  return (
    <AnimatePresence>
    <>

      <Overlay 
        onClick={onOverlayClick}
        variants={OverlayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      />
      <BigMovie 
        layoutId={id + "-" + kind + "-" + category}
        style={{  
          top: scrollY.get(),
          zIndex: 1000,
        }}
        
      >
        
        {data && (
          <>  
            <BigCover
              bgPhoto={makeImagePath(data?.poster_path)}
              
            >
              <BigTitle>{data.title}</BigTitle>
              <BigOverview>{data.overview}</BigOverview>
              <TagLine>{data.tagline}</TagLine>
              
            </BigCover>
          </>
          )}
      </BigMovie>

    </>  
    </AnimatePresence>
  )
}