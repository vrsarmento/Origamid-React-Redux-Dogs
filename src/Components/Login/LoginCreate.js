import React from 'react'
import { useDispatch } from 'react-redux'
import Button from '../Forms/Button'
import Input from '../Forms/Input'
import useForm from '../../Hooks/useForm'
import { USER_POST } from '../../api'
import useFetch from '../../Hooks/useFetch'
import Error from '../Helpers/Error'
import Head from '../Helpers/Head'
import { userLogin } from '../../store/user'

const LoginCreate = () => {
  const username = useForm()
  const email = useForm('email')
  const password = useForm()

  const dispatch = useDispatch()
  const { loading, error, request } = useFetch()

  async function handleSubmit(e) {
    e.preventDefault()
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value
    })
    const { response } = await request(url, options)
    if (response.ok)
      dispatch(
        userLogin({ username: username.value, password: password.value })
      )
  }

  return (
    <section className='animeLeft'>
      <Head
        title='Crie sua conta'
        description='Página para criação de conta no site Dogs.'
      />

      <h1 className='title'>Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label='Usuário' type='text' name='username' {...username} />
        <Input label='E-mail' type='email' name='email' {...email} />
        <Input label='Senha' type='password' name='password' {...password} />

        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}

        <Error error={error} />
      </form>
    </section>
  )
}

export default LoginCreate
