import React from 'react'
import styles from './Image.module.css'

const Image = ({ alt, ...props }) => {
  const [skeleton, setSkeleton] = React.useState(true)

  function handleLoad({ target }) {
    target.classList.add(styles.showLoadedImg)
    setSkeleton(false)
  }

  return (
    <div className={styles.wrapper}>
      {skeleton && <div className={styles.skeleton}></div>}
      <img className={styles.img} alt={alt} {...props} onLoad={handleLoad} />
    </div>
  )
}

export default Image
