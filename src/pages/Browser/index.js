
import React, { useCallback, useState } from 'react'
import { Button, Image, Modal } from 'react-bootstrap';
import Nav from '../../components/Nav'
import NewFolderPanel from '../../components/NewFolderPanel';
import UploadPanel from '../../components/UploadPanel';
import FileRow from './components/FileRow';
import FolderRow from './components/FolderRow';
import styles from './index.module.scss'

const sources = [1, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1]

const Browser = (props) => {
  const { user } = props;
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [showNewFolderPanel, setShowNewFolderPanel] = useState(false);
  const [selected, setSelected] = useState([]);

  const onLogout = useCallback((user) => {
    console.log('on logout:', user);
  }, [])

  const onClickNewFolder = useCallback(() => {
    setShowNewFolderPanel(true);
  }, [])

  const onClickUpload = useCallback(() => {
    setShowUploadPanel(true);
  }, [])

  const onChooseRow = useCallback((v, i) => {
    const index = selected.indexOf(i);
    index >= 0 ? selected.splice(index, 1) : selected.push(i);
    setSelected([...selected]);
  }, [selected])

  return (
    <div className={styles['container']}>
      <Nav className={styles['nav']} title='文件管理系统' userConfig={{ name: '老张', data: user, actions: [
        { title: '退出登录', action: (p) => onLogout(p) }
      ]}}/>
      <div className={styles['toolbar']}>
        <Button className={styles['toolbar-btn']} onClick={onClickNewFolder}>
          <Image className={styles['image']} src={require('../../assets/folder-add.png')} />
          <span className={styles['text']}>
            新建文件夹
          </span>
        </Button>
        <Button className={styles['toolbar-btn']} onClick={onClickUpload}>
          <Image className={styles['image']} src={require('../../assets/file-upload.png')} />
          <span className={styles['text']}>
            上传文件
          </span>
        </Button>
        <Button className={styles['toolbar-btn']} disabled={selected.length <= 0}>
          <Image className={styles['image']} src={require('../../assets/file-download.png')} />
          <span className={styles['text']}>
            下载文件
          </span>
        </Button>
      </div>
      <div className={styles['content']}>
        { sources.map((v, i) => {
            const choose = selected.indexOf(i) >= 0;
            return <FolderRow type={v === 1 ? 'file' : 'folder'} key={`key-${i}`} onClick={() => onChooseRow(v, i)} choosed={choose}/>
          })
        }
      </div>
      <UploadPanel show={showUploadPanel} onHide={() => setShowUploadPanel(false)}/>
      <NewFolderPanel show={showNewFolderPanel} onHide={() => setShowNewFolderPanel(false)}/>

    </div>
  )
}

export default Browser