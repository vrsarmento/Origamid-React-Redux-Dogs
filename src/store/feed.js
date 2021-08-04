import { PHOTOS_GET } from '../api'
import createAsyncSlice from './helpers/createAsyncSlice'

const slice = createAsyncSlice({
  name: 'feed',
  initialState: {
    list: [],
    pages: 1,
    infinite: true
  },
  reducers: {
    addPhotos(state, action) {
      state.list.push(...action.payload)
      if (action.payload.length === 0) state.infinite = false
    },
    addPage(state) {
      state.pages++
    },
    resetState(state) {
      state.list = []
      state.infinite = true
      state.pages = 1
      state.data = null
      state.error = null
      state.loading = false
    }
  },
  fetchConfig: ({ page, total, user }) => PHOTOS_GET({ page, total, user })
})

export const fetchFeed = slice.asyncAction
export const { addPhotos, addPage, resetState: resetFeedState } = slice.actions

export const loadNewPhotos =
  ({ total, user }) =>
  async (dispatch, getState) => {
    const { feed } = getState()
    const { payload } = await dispatch(
      fetchFeed({ page: feed.pages, total, user })
    )
    dispatch(addPhotos(payload))
    dispatch(addPage())
  }

export default slice.reducer
