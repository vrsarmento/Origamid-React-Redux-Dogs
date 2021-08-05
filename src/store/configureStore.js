import { combineReducers, configureStore } from '@reduxjs/toolkit'
import photo from './photo'
import token from './token'
import user from './user'
import feed from './feed'
import ui from './ui'
import photoPost from './photoPost'

const reducer = combineReducers({ feed, photo, photoPost, token, ui, user })
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
})

export default store
