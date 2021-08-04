import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import FeedModal from './FeedModal'
import FeedPhotos from './FeedPhotos'
import styles from './Feed.module.css'
import { loadNewPhotos, resetFeedState } from '../../store/feed'
import Loading from '../Helpers/Loading'
import Error from '../Helpers/Error'

const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null)
  const { infinite, loading, list, error } = useSelector((state) => state.feed)

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(resetFeedState())
    dispatch(loadNewPhotos({ user }))
  }, [dispatch, user])

  React.useEffect(() => {
    let wait = false

    function infiniteScroll() {
      if (infinite) {
        const scroll = window.scrollY
        const height = document.body.offsetHeight - window.innerHeight

        if (scroll > height * 0.75 && !wait) {
          dispatch(loadNewPhotos({ user }))
          wait = true

          setTimeout(() => {
            wait = false
          }, 1000)
        }
      }
    }

    window.addEventListener('wheel', infiniteScroll)
    window.addEventListener('scroll', infiniteScroll)

    return () => {
      window.removeEventListener('wheel', infiniteScroll)
      window.removeEventListener('scroll', infiniteScroll)
    }
  }, [infinite, dispatch, user])

  return (
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}

      {list.length > 0 && <FeedPhotos setModalPhoto={setModalPhoto} />}
      {loading && <Loading />}
      {error && <Error error={error} />}

      {!infinite && !user && (
        <p className={styles.noMorePosts}>Não existem mais postagens.</p>
      )}
    </div>
  )
}

Feed.defaultProps = {
  user: 0
}

Feed.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ])
}

export default Feed
