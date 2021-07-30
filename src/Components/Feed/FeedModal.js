import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPhoto } from '../../store/photo'
import Error from '../Helpers/Error'
import Loading from '../Helpers/Loading'
import PhotoContent from '../Photo/PhotoContent'
import styles from './FeedModal.module.css'

const FeedModal = ({ photo, setModalPhoto }) => {
  const { loading, error, data } = useSelector((state) => state.photo)

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchPhoto(photo.id, false))
  }, [dispatch, photo])

  function handleOutsideClick(e) {
    if (e.currentTarget === e.target) setModalPhoto(null)
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent />}
    </div>
  )
}

export default FeedModal
