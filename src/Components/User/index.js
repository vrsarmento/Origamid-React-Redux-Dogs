import React from 'react'
import { Route, Routes } from 'react-router'
import Feed from '../Feed'
import NotFound from '../NotFound'
import UserHeader from './UserHeader'
import UserPhotoPost from './UserPhotoPost'
import UserStats from './UserStats'
import Head from '../Helpers/Head'
import { useSelector } from 'react-redux'

const User = () => {
  const { data } = useSelector((state) => state.user)

  return (
    <section className='container'>
      <Head title='Minha conta' description='Página do usuário no site Dogs.' />
      <UserHeader />
      <Routes>
        <Route path='/' element={<Feed user={data.id} />} />
        <Route path='/postar' element={<UserPhotoPost />} />
        <Route path='/estatisticas' element={<UserStats />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </section>
  )
}

export default User
