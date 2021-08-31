//serverless 함수 : node.js 환경에서 동작한다. 
//serverless 함수 안에서는 , 우리의 프로젝트에서 설치한 라이브러리를 그대로 사용핤 ㅜㅇ 씨다. 
const axios = require('axios')

exports.handler = async function(event){
    console.log(event)
    const payload = JSON.parse(event.body)
    const {title,type,year,page,id} = payload
    const OMDB_API_KEY = '7035c60c'
    const url = id 
      ?`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
      :`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
    // const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`
    // 잘못된 요청에 대하여 catch 에서 실행되기를 기대하였는데 해당 url 서버에서 잘못된 요청도 올바른 요청으로 인식하고 
    //해당 서버만의 로직으로 동작하는 , 즉 정상 응답 (status :200) 인 경우 -> 개발자가 직접 예외처리를 명시해주어야 한다. 
    try{
      const { data }  = await axios.get(url)
      console.log(data)
      if(data.Error){
        return {
          statusCode: 400,
          body :  data.Error
        }
      }
      return {
        statusCode:200,
        body: JSON.stringify(data)
      }
    }catch(error){
      return{
        statusCode:error.response.status,
        body: error.message
      }
    }
}