
import React, { useCallback, useState, useMemo, useEffect } from 'react'
import { Button, Image, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav'
import NewFolderPanel from '../../components/NewFolderPanel';
import UploadPanel from '../../components/UploadPanel';
import { UserManager } from '../../models/user';
import FileRow from './components/FileRow';
import FolderRow from './components/FolderRow';
import styles from './index.module.scss'

const sources = [1, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1]

const Browser = (props) => {
  const navigate = useNavigate();
  const { user } = props;
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [showNewFolderPanel, setShowNewFolderPanel] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const user = UserManager.getUser();
    if (!user) {
      navigate('/', {replace: true});
    }
  }, [])

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
    // const index = selected.indexOf(i);
    // index >= 0 ? selected.splice(index, 1) : selected.push(i);
    // setSelected([...selected]);
    setSelectedId(i);
  }, [])

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
        <Button className={styles['toolbar-btn']} disabled={selectedId === null || selectedId === undefined}>
          <Image className={styles['image']} src={require('../../assets/file-download.png')} />
          <span className={styles['text']}>
            下载文件
          </span>
        </Button>
      </div>
      <div className={styles['content']}>
        { sources.map((v, i) => {
            const choose = selectedId === i;
            return <FolderRow type={v === 1 ? 'file' : 'folder'} key={`key-${i}`} onClick={() => onChooseRow(v, i)} choosed={choose}/>
          })
        }
      </div>
      <UploadPanel show={showUploadPanel} onHide={() => setShowUploadPanel(false)}/>
      <NewFolderPanel show={showNewFolderPanel} onHide={() => setShowNewFolderPanel(false)}/>
      {/* <a
        href='https://view.officeapps.live.com/op/view.aspx?src=http%3A%2F%2Fupload.rcdqiot.com%3A8080%2Ffiles%2Ftest.docx' width='100%' height='100%' frameborder='1'>
          123
      </a> */}
    </div>
  )
}

export default Browser