import React from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import Error from '../Helpers/Error'
import { PHOTO_POST } from '../../api'
import styles from './UserPhotoPost.module.css'

const UserPhotoPost = () => {
  const nome = useForm()
  const peso = useForm('number')
  const idade = useForm('number')
  const [img, setImg] = React.useState({})
  const { data, error, loading, request } = useFetch()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (data) navigate('/conta')
  }, [data, navigate])

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('img', img.raw)
    formData.append('nome', nome.value)
    formData.append('peso', peso.value)
    formData.append('idade', idade.value)

    const token = window.localStorage.getItem('Dogs_Token')
    const { url, options } = PHOTO_POST(formData, token)
    request(url, options)
  }

  function handleImgChange({ target }) {
    setImg({
      raw: target.files[0],
      preview: URL.createObjectURL(target.files[0])
    })
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label='Nome' type='text' name='name' {...nome} />
        <Input label='Peso' type='number' name='weight' {...peso} />
        <Input label='Idade' type='number' name='age' {...idade} />

        <label htmlFor='img'>Foto</label>
        <input
          type='file'
          className={styles.file}
          name='img'
          id='img'
          onChange={handleImgChange}
        />

        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Postar</Button>
        )}

        <Error error={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  )
}

export default UserPhotoPost
