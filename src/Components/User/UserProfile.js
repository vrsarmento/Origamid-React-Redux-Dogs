import React from 'react'
import { useParams } from 'react-router-dom'
import Head from '../Helpers/Head'
import Feed from '../Feed'
import { config } from '../../config'

const UserProfile = () => {
  const { user } = useParams()

  return (
    <section className='container mainContainer'>
      <Head
        title={`@${user}`}
        description={`Página do perfil do usuário ${user} no site Dogs.`}
      />
      <h1 className='title'>{user}</h1>
      <Feed user={user} photosPerPage={config.PHOTOS_PER_PAGE_HOME} />
    </section>
  )
}

export default UserProfile
