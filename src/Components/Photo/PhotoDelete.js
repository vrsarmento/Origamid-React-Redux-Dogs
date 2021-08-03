import React from 'react'
import { PHOTO_DELETE } from '../../api'
import { config } from '../../config'
import useFetch from '../../Hooks/useFetch'
import styles from './PhotoDelete.module.css'

const PhotoDelete = ({ id }) => {
  const { loading, request } = useFetch()
  const token = window.localStorage.getItem(config.LOCALSTORAGE_TOKEN_KEY_ID)

  async function handleClick() {
    const confirm = window.confirm('Tem certeza que deseja apagar a foto?')
    if (confirm) {
      const { url, options } = PHOTO_DELETE(id, token)
      const response = await request(url, options)
      if (response.response.ok) window.location.reload()
    }
  }

  return (
    <>
      {loading ? (
        <button disabled className={styles.delete}>
          Deletando...
        </button>
      ) : (
        <button className={styles.delete} onClick={handleClick}>
          Deletar
        </button>
      )}
    </>
  )
}

export default PhotoDelete
