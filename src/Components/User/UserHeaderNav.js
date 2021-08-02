import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import useMedia from '../../Hooks/useMedia'
import { ReactComponent as MyPhotos } from '../../Assets/feed.svg'
import { ReactComponent as MyStats } from '../../Assets/estatisticas.svg'
import { ReactComponent as AddPhoto } from '../../Assets/adicionar.svg'
import { ReactComponent as Logout } from '../../Assets/sair.svg'
import styles from './UserHeaderNav.module.css'
import { userLogout } from '../../store/user'

const UserHeaderNav = () => {
  const dispatch = useDispatch()
  const mobile = useMedia('(max-width: 40rem)')
  const [mobileMenu, setMobileMenu] = React.useState(false)

  const { pathname } = useLocation()
  React.useEffect(() => {
    setMobileMenu(false)
  }, [pathname])

  return (
    <>
      {mobile && (
        <button
          aria-label='Menu'
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <NavLink to='/conta' end activeClassName={styles.active}>
          <MyPhotos /> {mobile && 'Minhas Fotos'}
        </NavLink>
        <NavLink to='/conta/estatisticas' activeClassName={styles.active}>
          <MyStats /> {mobile && 'Estatísticas'}
        </NavLink>
        <NavLink to='/conta/postar' activeClassName={styles.active}>
          <AddPhoto /> {mobile && 'Adicionar Foto'}
        </NavLink>
        <button onClick={() => dispatch(userLogout())}>
          <Logout /> {mobile && 'Sair'}
        </button>
      </nav>
    </>
  )
}

export default UserHeaderNav
