import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useForm from '../../Hooks/useForm'
import Button from '../Forms/Button'
import Input from '../Forms/Input'
import Error from '../Helpers/Error'
import styles from './LoginForm.module.css'
import stylesBtn from '../Forms/Button.module.css'
import Head from '../Helpers/Head'
import { userLogin } from '../../store/user'

const LoginForm = () => {
  const username = useForm()
  const password = useForm()

  const dispatch = useDispatch()
  const { token, user } = useSelector((state) => state)
  const loading = token.loading || user.loading
  const error = token.error || user.error

  async function handleSubmit(e) {
    e.preventDefault()

    if (username.validate() && password.validate()) {
      dispatch(
        userLogin({ username: username.value, password: password.value })
      )
    }
  }

  return (
    <section className='animeLeft'>
      <Head title='Login' description='Página de login do site Dogs.' />

      <h1 className='title'>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input type='text' label='Usuário' name='username' {...username} />
        <Input type='password' label='Senha' name='password' {...password} />

        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error} />
      </form>

      <Link className={styles.lost} to='/login/perdeu'>
        Perdeu a senha?
      </Link>

      <div className={styles.signup}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={stylesBtn.button} to='/login/criar'>
          Cadastro
        </Link>
      </div>
    </section>
  )
}

export default LoginForm
