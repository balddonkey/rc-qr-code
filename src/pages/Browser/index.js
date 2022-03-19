
import React, { useCallback, useState, useMemo, useEffect } from 'react'
import { Button, Image, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import Nav from '../../components/Nav'
import NewFolderPanel from '../../components/NewFolderPanel';
import UploadPanel from '../../components/UploadPanel';
import { UserManager } from '../../models/user';
import RCNetwork from '../../network/RCNetwork';
import FileRow from './components/FileRow';
import FolderRow from './components/FolderRow';
import styles from './index.module.scss'

const sources = [1, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1]

const Browser = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [folders, setFolders] = useState([]);
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [showNewFolderPanel, setShowNewFolderPanel] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const user = UserManager.getUser();
    if (!user) {
      navigate('/', {replace: true});
    } else {
      setUser(user);
      RCNetwork.folder.getAll({userId: user.id})
      .then(res => {
        console.log('get all:', res);
        setFolders(res);
      })
      .catch(e => {

      })
    }
  }, [])

  const onLogout = useCallback((user) => {
    console.log('on logout:', user);
    RCNetwork.user.logout()
    navigate('/', {replace: true});
  }, [])

  const onClickNewFolder = useCallback(() => {
    setShowNewFolderPanel(true);
  }, [])

  const onNewFolder = useCallback((name) => {
    RCNetwork.folder.new({
      name, content: '测试添加', userId: user.id, level: 1
    })
    .then(res => {

    })
    .catch(e => {
      
    })
  }, [user])

  const onClickUpload = useCallback(() => {
    setShowUploadPanel(true);
  }, [])

  const onChooseRow = useCallback((v, i, e) => {
    // const index = selected.indexOf(i);
    // index >= 0 ? selected.splice(index, 1) : selected.push(i);
    // setSelected([...selected]);
    console.log('on choose row:', e);
    setSelectedId(i);
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();     
    e.stopPropagation()
  }, [])

  const onClickRow = useCallback((v, i) => {
    navigate('/preview/123')
    console.log('on click row:', i);
  }, [])

  return (
    <div className={styles['container']}>
      <Nav className={styles['nav']} title='文件管理系统' userConfig={{ name: user && user.trueName, data: user, actions: [
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
            return <FolderRow type={v === 1 ? 'file' : 'folder'} key={`key-${i}`} onChoose={(e) => onChooseRow(v, i, e)} choosed={choose} onClick={(e) => onClickRow(v, i, e)}/>
          })
        }
      </div>
      <UploadPanel show={showUploadPanel} onHide={() => setShowUploadPanel(false)}/>
      <NewFolderPanel show={showNewFolderPanel} onNewFolder={onNewFolder} onHide={() => setShowNewFolderPanel(false)}/>
      {/* <a
        href='https://view.officeapps.live.com/op/view.aspx?src=http%3A%2F%2Fupload.rcdqiot.com%3A8080%2Ffiles%2Ftest.docx' width='100%' height='100%' frameborder='1'>
          123
      </a> */}
    </div>
  )
}

export default Browser