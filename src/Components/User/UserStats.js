import React from 'react'
import { useSelector } from 'react-redux'
import Head from '../Helpers/Head'
import Loading from '../Helpers/Loading'
import Error from '../Helpers/Error'
import useFetch from '../../Hooks/useFetch'
import { STATS_GET } from '../../api'

const UserStatsGraphs = React.lazy(() => import('./UserStatsGraphs'))

const UserStats = () => {
  const { data, error, loading, request } = useFetch()
  const { token } = useSelector((state) => state.token.data)

  React.useEffect(() => {
    async function getData() {
      const { url, options } = STATS_GET(token)
      await request(url, options)
    }
    getData()
  }, [request, token])

  if (loading) return <Loading />
  if (error) return <Error error={error} />
  if (data)
    return (
      <React.Suspense fallback={<Loading />}>
        <Head
          title='Estatísticas'
          description='Estatísticas de acesso às postagens do site Dogs.'
        />
        <UserStatsGraphs data={data} />
      </React.Suspense>
    )
  else return null
}

export default UserStats
