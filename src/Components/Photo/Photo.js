import React from 'react'
import { useParams } from 'react-router-dom'
import { PHOTO_GET_WITH_CACHE } from '../../api'
import useFetch from '../../Hooks/useFetch'
import Error from '../Helpers/Error'
import Loading from '../Helpers/Loading'
import PhotoContent from './PhotoContent'
import Head from '../Helpers/Head'

const Photo = () => {
  const { id } = useParams()
  const { data, loading, error, request } = useFetch()

  React.useEffect(() => {
    const { url } = PHOTO_GET_WITH_CACHE(id)
    request(url)
  }, [request, id])

  if (error) return <Error error={error} />
  if (loading) return <Loading />
  if (data)
    return (
      <section className='container mainContainer'>
        <Head
          title={data.photo.title}
          description={`Página com a foto ${data.photo.title} no site Dogs.`}
        />
        <PhotoContent data={data} single={true} />
      </section>
    )
  else return null
}

export default Photo
