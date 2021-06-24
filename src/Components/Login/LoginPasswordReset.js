import React from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import { PASSWORD_RESET } from '../../api'
import Error from '../Helpers/Error'
import Head from '../Helpers/Head'

const LoginPasswordReset = () => {
  const [login, setLogin] = React.useState('')
  const [key, setKey] = React.useState('')
  const password = useForm()
  const { error, loading, request } = useFetch()
  const navigate = useNavigate()

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const key = params.get('key')
    const login = params.get('login')
    if (key) setKey(key)
    if (login) setLogin(login)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value
      })
      const { response } = await request(url, options)
      if (response.ok) navigate('/login')
    }
  }

  return (
    <section>
      <Head
        title='Resete a senha'
        description='Página para resetar a senha do site Dogs.'
      />

      <h1 className='title'>Resetar Senha</h1>

      <form onSubmit={handleSubmit}>
        <Input
          label='Nova Senha'
          type='password'
          name='password'
          {...password}
        />

        {loading ? (
          <Button disabled>Resetando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}

        {error && <Error error={error} />}
      </form>
    </section>
  )
}

export default LoginPasswordReset
