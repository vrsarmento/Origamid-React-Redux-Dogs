import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import FeedModal from './FeedModal'
import FeedPhotos from './FeedPhotos'
import styles from './Feed.module.css'
import { loadNewPhotos, resetFeedState } from '../../store/feed'
import Loading from '../Helpers/Loading'
import Error from '../Helpers/Error'
import { config } from '../../config'

const Feed = ({ user, photosPerPage }) => {
  const { infinite, loading, list, error } = useSelector((state) => state.feed)
  console.log('user: ', user, 'photosperPage: ', photosPerPage)

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(resetFeedState())
    dispatch(loadNewPhotos({ user, total: photosPerPage }))
  }, [dispatch, user, photosPerPage])

  React.useEffect(() => {
    let wait = false

    function infiniteScroll() {
      if (infinite) {
        const scroll = window.scrollY
        const height = document.body.offsetHeight - window.innerHeight

        if (scroll > height * 0.75 && !wait) {
          dispatch(loadNewPhotos({ user, total: photosPerPage }))
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
  }, [infinite, dispatch, user, photosPerPage])

  return (
    <div>
      <FeedModal />

      {list.length > 0 && <FeedPhotos />}
      {loading && <Loading />}
      {error && <Error error={error} />}

      {!infinite && !user && (
        <p className={styles.noMorePosts}>Não existem mais postagens.</p>
      )}
    </div>
  )
}

Feed.defaultProps = {
  user: 0,
  photosPerPage: config.PHOTOS_PER_PAGE_DEFAULT
}

Feed.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ])
}

export default Feed
