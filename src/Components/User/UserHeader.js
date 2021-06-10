import React from 'react'
import UserHeaderNav from './UserHeaderNav'
import styles from './UserHeader.module.css'
import { useLocation } from 'react-router'

const titles = {
  conta: 'Minha Conta',
  estatisticas: 'Estatísticas',
  postar: 'Postar Foto'
}

const UserHeader = () => {
  const [title, setTitle] = React.useState('Feed')
  const location = useLocation()

  React.useEffect(() => {
    switch (location.pathname) {
      case '/conta':
        setTitle(titles.conta)
        break
      case '/conta/estatisticas':
        setTitle(titles.estatisticas)
        break
      case '/conta/postar':
        setTitle(titles.postar)
        break
      default:
        setTitle('Página não encontrada.')
        break
    }
  }, [location])

  return (
    <header className={styles.header}>
      <h1 className='title'>{title}</h1>
      <UserHeaderNav />
    </header>
  )
}

export default UserHeader
