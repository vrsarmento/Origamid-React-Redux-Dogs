import React from 'react'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import { PASSWORD_LOST } from '../../api'
import Error from '../Helpers/Error'
import Head from '../Helpers/Head'

const LoginPasswordLost = () => {
  const login = useForm()
  const { data, loading, error, request } = useFetch()

  async function handleSubmit(e) {
    e.preventDefault()
    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: window.location.href.replace('perdeu', 'resetar')
      })

      request(url, options)
    }
  }

  return (
    <section className='animeLeft'>
      <Head
        title='Perdeu a senha'
        description='Página para recuperação de senha do site Dogs.'
      />

      <h1 className='title'>Perdeu a senha?</h1>

      {data ? (
        <p style={{ color: '#4c1' }}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label='E-mail / Usuário' type='text' name='email' {...login} />

          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Enviar E-mail</Button>
          )}

          {error && <Error error={error} />}
        </form>
      )}
    </section>
  )
}

export default LoginPasswordLost
