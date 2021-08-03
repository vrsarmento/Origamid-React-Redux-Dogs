import React from 'react'
import { useSelector } from 'react-redux'
import { COMMENT_POST } from '../../api'
import useFetch from '../../Hooks/useFetch'
import Error from '../Helpers/Error'
import { ReactComponent as Send } from '../../Assets/enviar.svg'
import styles from './PhotoCommentsForm.module.css'

const PhotoCommentsForm = ({ id, setComments, single }) => {
  const [comment, setComment] = React.useState('')
  const { request, error } = useFetch()
  const { token } = useSelector((state) => state.token.data)

  async function handleSubmit(e) {
    e.preventDefault()
    const { url, options } = COMMENT_POST(id, { comment }, token)
    const { response, json } = await request(url, options)
    if (response.ok) {
      setComments((comments) => [...comments, json])
      setComment('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${single ? styles.single : ''}`}
    >
      <textarea
        className={styles.textarea}
        id='comment'
        name='comment'
        placeholder='Comente...'
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button className={styles.button}>
        <Send />
      </button>

      <Error error={error} />
    </form>
  )
}

export default PhotoCommentsForm
