
import React from 'react'
import styles from './index.module.scss'

const Nav = (props) => {
  const { title, name, showUser = false } = props;
  return (
    <div className={styles['nav']}>
      <span className={styles['brand']}>{title}</span>
      { showUser && <span className={styles['name']}>{name}</span> }
    </div>
  )
}

export default Nav