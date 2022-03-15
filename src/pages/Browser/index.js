
import React, { useCallback } from 'react'
import { Button, Image } from 'react-bootstrap';
import Nav from '../../components/Nav'
import FileRow from './components/FileRow';
import FolderRow from './components/FolderRow';
import styles from './index.module.scss'

const Browser = (props) => {
  const { user } = props;
  const onLogout = useCallback((user) => {
    console.log('on logout:', user);
  }, [])
  return (
    <div className={styles['container']}>
      <Nav className={styles['nav']} title='文件管理系统' userConfig={{ name: '老张', data: user, actions: [
        { title: '退出登录', action: (p) => onLogout(p) }
      ]}}/>
      <div className={styles['toolbar']}>
        <div className={styles['toolbar-btn']}>
          <Image className={styles['image']} src={require('../../assets/folder-add.png')} />
          <span className={styles['text']}>
            新建文件夹
          </span>
        </div>
        <div className={styles['toolbar-btn']}>
          <Image className={styles['image']} src={require('../../assets/file-upload.png')} />
          <span className={styles['text']}>
            上传文件
          </span>
        </div>
        <div className={styles['toolbar-btn']}>
          <Image className={styles['image']} src={require('../../assets/file-download.png')} />
          <span className={styles['text']}>
            下载文件
          </span>
        </div>
      </div>
      <div className={styles['content']}>
        <FolderRow />
        <FolderRow />
        <FolderRow />
        <FolderRow />
        <FolderRow type='file'/>
      </div>
    </div>
  )
}

export default Browser