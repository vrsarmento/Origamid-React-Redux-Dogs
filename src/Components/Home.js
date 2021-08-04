import React from 'react'
import Head from './Helpers/Head'
import Feed from './Feed'
import { config } from '../config'

const Home = () => {
  return (
    <section className='container mainContainer'>
      <Head
        title='Fotos'
        description='Página inicial do site Dogs com o feed de fotos.'
      />
      <Feed photosPerPage={config.PHOTOS_PER_PAGE_HOME} />
    </section>
  )
}

export default Home
