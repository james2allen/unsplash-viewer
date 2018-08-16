import Unsplash, {toJson} from 'unsplash-js'

let unsplash = new Unsplash({
  applicationId: process.env.UNSPLASH_APPLICATION_ID,
  secret: process.env.UNSPLASH_SECRET,
  callbackUrl: ''
})

export default {
  state: {
    photos: [],
    paginator: 1
  },
  mutations: {
    setPhotos (state, data) {
      state.photos.push(...data)
    }
  },
  getters: {
    getPhotos: (state) => state.photos
  },
  actions: {
    LOAD_PHOTOS: ({commit, state}) => {
      state.paginator++
      return unsplash.photos.listPhotos(state.paginator, 50, 'latest')
        .then(toJson)
        .then((res) => commit('setPhotos', res))
    }
  }
}
