import { TOKEN_POST } from '../api'
import createAsyncSlice from './helpers/createAsyncSlice'

const slice = createAsyncSlice({
  name: 'token',
  fetchConfig: (user) => TOKEN_POST(user)
})

export const fetchToken = slice.asyncAction

export default slice.reducer
