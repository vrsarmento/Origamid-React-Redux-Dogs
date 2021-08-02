import { TOKEN_POST } from '../api'
import { config } from '../config'
import createAsyncSlice from './helpers/createAsyncSlice'

const slice = createAsyncSlice({
  name: 'token',
  initialState: {
    data: {
      token:
        window.localStorage.getItem(config.LOCALSTORAGE_TOKEN_KEY_ID) || null
    }
  },
  fetchConfig: (user) => TOKEN_POST(user)
})

export const fetchToken = slice.asyncAction
export const { resetState: resetTokenState } = slice.actions

export default slice.reducer
