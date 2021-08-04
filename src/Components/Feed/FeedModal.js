import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../store/ui'
import Error from '../Helpers/Error'
import Loading from '../Helpers/Loading'
import PhotoContent from '../Photo/PhotoContent'
import styles from './FeedModal.module.css'

const FeedModal = () => {
  const { loading, error, data } = useSelector((state) => state.photo)
  const { modal } = useSelector((state) => state.ui)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(closeModal())
  }, [dispatch])

  function handleOutsideClick(e) {
    if (e.currentTarget === e.target) dispatch(closeModal())
  }

  if (!modal) return null

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent />}
    </div>
  )
}

export default FeedModal
