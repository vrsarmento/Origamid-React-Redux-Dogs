import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Image from '../Helpers/Image'
import PhotoComments from './PhotoComments'
import styles from './PhotoContent.module.css'
import PhotoDelete from './PhotoDelete'

const PhotoContent = ({ single }) => {
  const user = useSelector((state) => state.user)
  const { photo, comments } = useSelector((state) => state.photo.data)

  return (
    <div className={`${styles.photo} ${single ? styles.single : ''}`}>
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title} />
      </div>
      <div className={styles.details}>
        <div>
          <div className={styles.author}>
            {user.data && user.data.username === photo.author ? (
              <PhotoDelete id={photo.id} />
            ) : (
              <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
            )}
            <span className={styles.views}>{photo.acessos}</span>
          </div>
          <h1 className='title'>
            <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={styles.attributes}>
            <li>{photo.peso} kg</li>
            <li>
              {photo.idade} {photo.idade === 1 ? 'ano' : 'anos'}
            </li>
          </ul>
        </div>
      </div>
      <PhotoComments id={photo.id} comments={comments} single={single} />
    </div>
  )
}

export default PhotoContent
