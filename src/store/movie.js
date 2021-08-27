import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export default{
  namespaced:true,
  state:()=>({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie:{}
  }),
  getters:{},
  mutations:{
    updateState(state,payload){
      Object.keys(payload).forEach(key=>{
        state[key]=payload[key]
      })
    },
    resetMovies(state){
      state.movies=[]
      state.message = _defaultMessage
      state.loading = false
    }
  },
  // 비동기로 동작
  actions:{
    async searchMovies({ state, commit },payload){
      if (state.loading) return
      commit('updateState',{
        message:'',
        loading: true
      })
      try{
         const res = await _fetchMovie({
           ...payload,
           page: 1
         })
         const {
           Search,
           totalResults
         } = res.data
         commit('updateState', {
           movies: _uniqBy(Search, 'imdbID')
         })
         const total = parseInt(totalResults, 10)
         const pageLength = Math.ceil(total / 10)
         if (pageLength > 1) {
           for (let page = 2; page <= pageLength; page++) {
             if (page > (payload.number / 10)) break
             const res = await _fetchMovie({
               ...payload,
               page
             })
             const {
               Search
             } = res.data
             commit('updateState', {
               movies: [
                 ...state.movies,
                 ..._uniqBy(Search, 'imdbID')
               ]
             })
           }
         }
      }catch(message){
        commit('updateState',{
          movies:[],
          message
        })
      }finally{
        commit('updateState', {
          loading: false
        })
      }
    },
    async searchMovieWithId({state, commit} ,payload){
      if (state.loading) return
      commit('updateState',{
        theMovie:{},
        loading: true
      })
      try{
        const res = await _fetchMovie(payload)
        commit('updateState',{
          theMovie:res.data
        })
      }catch(error){
        (error)
        commit('updateState',{
          theMovie:{}
        })
      }finally{
        commit('updateState',{
          loading:false
        })
      }
    }
  }
}

function _fetchMovie(payload){
  const { title, type, year, page, id } = payload
  const OMDB_API_KEY = '7035c60c'
  const url = id
  ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
  : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
  // const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`
// 잘못된 요청에 대하여 catch 에서 실행되기를 기대하였는데 해당 url 서버에서 잘못된 요청도 올바른 요청으로 인식하고 
//해당 서버만의 로직으로 동작하는 , 즉 정상 응답 (status :200) 인 경우 -> 개발자가 직접 예외처리를 명시해주어야 한다. 
  return new Promise( (resolve,reject) =>{
    axios.get(url)
      .then(res=>{
        if ( res.data.Error){
          reject(res.data.Error)
        }
        resolve(res)
      })
      .catch(err=>{
        reject(err.message)
      })
  })
}