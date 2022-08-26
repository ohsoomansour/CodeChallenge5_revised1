/*#8.5 Home Screen part One
  1. themoviedb, https://www.themoviedb.org/settings/api?language=ko 
    >> key - "e7a6b4de55b190b9bd44f056560c7e68"  
  2. API 페이지 ※https://developers.themoviedb.org/3/movies/get-now-playing
  3. Invalid key 메세지 정상 vs 비정상 비교 
  비정상:https://api.themoviedb.org/3/movie/now_playing?api_key=e7a6b4de55b190b9bd44f056560c7e68%20%20&language=en-US&page=1&region=kr
  정상:https://api.themoviedb.org/3/movie/now_playing?api_key=e7a6b4de55b190b9bd44f056560c7e68&language=en-US&page=1&region=kr
    >> ★주의:Try it out 기입란에 '공백'이 있을시에 %20%20 추가됨! 

  4. image받기: GETTING STARTED > Images 
  > 예시1(w500사이즈): https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg(포스터패트)
  > 예시2(풀사이즈): https://image.tmdb.org/t/p/original/62HCnUTziyWcpDaBO2i1DX17ljH.jpg(포스터패트)
  
  🔷On the / (home) page implement sliders for: Latest movies, Top Rated Movies and Upcoming Movies.
  */

  

  
 //🔹On the / (home) page implement sliders for: Latest movies, Top Rated Movies and Upcoming Movies.
  const API_KEY = "e7a6b4de55b190b9bd44f056560c7e68"
  const BASE_PATH = "https://api.themoviedb.org/3"

  //https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
  //🚧샘플 시험🚧  https://api.themoviedb.org/3/movie/610150?api_key=e7a6b4de55b190b9bd44f056560c7e68
  export function getDetail(kind:string, id:number) {
    return fetch(`${BASE_PATH}/${kind}/${id}?api_key=${API_KEY}`).then(
      (response) => response.json()
    )
  }  
  
  export function getNowPlayingMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
      (response) => response.json()
    )
  }

  export function getTopRatedMoives() {
    return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
      (response) => response.json()
    )
  } 
  export function getUpcomingMovies() {
    return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
      (response) => response.json()
    )
  }
  export function getLatestMovies() {
    return fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}`).then(
      (response) => response.json()
    )
  } 

  

  //🔹On the /tv page implement sliders for: Latest Shows, Airing Today, Popular, Top Rated.


  export function getAiringTodayShowTv(){
    return fetch("https://api.themoviedb.org/3/tv/airing_today?api_key=e7a6b4de55b190b9bd44f056560c7e68&language=en-US&page=1").then(
      (repsonse) => repsonse.json()
    )
  }
  export function getPopularShowTv(){
    return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then(
      (response) => response.json()
    )
  }

  export function getTopRatedTv(){
    return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
      (response) => response.json()
    )
  }
  export function getLatestShowTv(){
    return fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}`).then(
      (repsonse) => repsonse.json()
    )
  }

//#️⃣샘플:https://api.themoviedb.org/3/search/multi?api_key=e7a6b4de55b190b9bd44f056560c7e68&language=en-US&query=dune&page=1&include_adult=false
interface IMultiSearch{
  params:string | null;
}  
export function getMultiSearch({params}:IMultiSearch){
  return fetch(`${BASE_PATH}/search/multi?api_key=${API_KEY}&language=en-US&query=${params}`).then(
    (repsponse) => repsponse.json()
  )
}
export const getVideoFunc = async(movieId?:string) => {
  const json = await(
    await fetch (`${BASE_PATH}/movie/${movieId}/videos?api_key=${API_KEY}`))
    .json();
  return json
}


/*
{
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

🎬영상 만들기 #️⃣샘플:https://api.themoviedb.org/3/movie/619803/videos?api_key=e7a6b4de55b190b9bd44f056560c7e68(범죄도시2id:619803)
  1.import ReactPlayer from "react-player";
  2.🔑영상key 얻기
    export const getMoviesTrailer = async (movieId?: string) => {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
    );
    return await response.json();
  };
  3. 🔑영상key >> 영상 주소로 이동  
  export function makeTrailerPath(key?: string) {
    return `https://www.youtube.com/embed/${key}✅?showinfo=0&enablejsapi=1&origin=http://localhost:3000`; //localhost 제거
  }

  4.
  <ReactPlayer
    url={makeTrailerPath(trailer?.results[0].key || "")}
    volume={isVolum ? 0 : 0.3}
    controls={false}
    playing={true}
    muted={isSound === "0" ? true : false}
    loop={true}
    width="200vw"
    height="calc(110vh)"
  >
  </ReactPlayer>
*/

  