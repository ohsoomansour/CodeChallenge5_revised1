/*image받기: GETTING STARTED > Images
  > 예시1(w500사이즈): https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg(포스터패트)
  > 예시2(풀사이즈): https://image.tmdb.org/t/p/original/62HCnUTziyWcpDaBO2i1DX17ljH.jpg(포스터패트)

  
*/
// 🚧테스트  https://image.tmdb.org/t/p/w500/tjE2nRjHrMCG3QNcpgjcUjB0a0X.jpg
 
  export function makeImagePath(id:string | undefined, format?:string) {
  return `https://image.tmdb.org/t/p/${format? format : "original"}${id}`
 }
//tvairing 2번 째 샘플:https://www.youtube.com/embed/l-MqNftE0BY
//https://www.youtube.com/embed/W5szC4XgR1s
 export function makeMoviePath(key?:string) {
  return `https://www.youtube.com/embed/${key}`
 }