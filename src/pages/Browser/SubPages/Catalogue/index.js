
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Image, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import toastr from 'toastr';
import NewFolderPanel from '../../../../components/NewFolderPanel';
import UploadPanel from '../../../../components/UploadPanel';
import { UserManager } from '../../../../models/user';
import RCNetwork from '../../../../network/RCNetwork';
import FolderRow from '../../components/FolderRow';
import styles from './index.module.scss'
import mime from '../../../../utils/mime-types'
import QRCodePanel from '../../../../components/QRCodePanel';

const Catalogue = (props) => {
  const navigate = useNavigate();
  const { className } = props;
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [showNewFolderPanel, setShowNewFolderPanel] = useState(false);
  const [showQRPanel, setShowQRPanel] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const { level = 1, userId, id = 0 } = useParams();

  const isOwnFolder = useMemo(() => {
    console.log('is own folder:', user, userId);
    return user && (parseInt(user.id) === parseInt(userId));
  }, [user, userId])
  
  const getHomeData = useCallback(() => {
    RCNetwork.folder.getAll({userId: userId})
    .then(res => {
      console.log('get all:', res);
      const data = res.data;
      setData(data);
    })
    .catch(e => {
      toastr.error(e.msg);
    })
  }, [userId])

  const loadById = useCallback(() => {
    RCNetwork.folder.getByParentId({parentId: id, userId})
    .then(res => {
      console.log('on get childs:', res);
      const data = res.data;
      setData(data);
    })
    .catch(e => {
      toastr.error(e.msg);
    })
  }, [userId, id])

  const reload = useCallback(() => {
    console.log('reload zzzzzz:', id);  
    if (id !== null && id !== undefined && id > 0) {
      loadById();
    } else {
      getHomeData();
    }
  }, [id])

  useEffect(() => {
    const user = UserManager.getUser();
    setUser(user);
    reload();
  }, [reload, userId, id, level])

  useLayoutEffect(() => {
    setSelectedId(null);
  }, [id, userId, level])

  const _onChooseRow = useCallback((v, i, e) => {
    console.log('on choose:', v);
    const { id } = v;
    setSelectedId(id);
  }, [])

  const _onClickRow = useCallback((v, i, e) => {
    console.log('on click row:', v);
    const { id, type, picUrl } = v;
    if (type === 0) {
      navigate(`/browser/${userId}/catalogue/${id}/${v.lever + 1}`)
    } else {
      navigate(`/preview/${userId}/${id}`)
    }
  }, [userId, id])
  
  const onUploadFiles = useCallback((files) => {
    RCNetwork.folder.uploadFiles({
      parentId: id,
      userId: userId,
      files
    })
    .then(res => {
      console.log('on upload f:', res);
      setShowUploadPanel(false);
      reload();
    })
    .catch(e => {
      console.log('on upload e:', e);
    })
  }, [reload, userId, id])

  const onNewFolder = useCallback((name, content) => {
    if (!name || !content || name.length === 0 | content.length === 0) {
      toastr.info('请输入文件夹名称以及描述')
      return;
    }
    RCNetwork.folder.new({
      name, content: content, userId: userId, level: level, parentId: id
    })
    .then(res => {
      console.log('on new succ:', res);
      setShowNewFolderPanel(false);
      reload();
    })
    .catch(e => {
      console.log('on new e:', e);
      toastr.error(e.msg);
    })
  }, [userId, id, level, reload])

  const onDownloadFile = useCallback(() => {
    const v = data.find((v, i, o) => v.id === selectedId)
    console.log('will download:', v);
    RCNetwork.folder.downloadFile({
      id: v.id,
      userId: userId,
    })
    .then(res => {
      console.log('get download data:', res);
      const { zipNameUrl } = res;
      // return fetch(zipNameUrl, { method: 'GET'})
      // let aElement = document.getElementById('downloadDiv');
      // aElement.href = zipNameUrl;
      // aElement.click();
      window.open(new URL(zipNameUrl), '_blank')
    })
    // .then(res => {
    //   console.log('on download:', res);
    //   // let blob = new Blob([res.data], { type: 'application/zip'})
    //   // let url = window.URL.createObjectURL(blob);
    //   // const link = document.createElement('a');
    //   // link.href = url;
    //   // link.click();
    //   // URL.revokeObjectURL(url);
    //   // res.blob().then(blob => {
    //   // })
    // })
    .catch(e => {
      console.log('get download failed:', e);
    })
  }, [selectedId, data, userId])

  return (
    
    <div className={`${styles['container']} ${className}`}>
      <div className={styles['folder-handle-container']}>
        <Button className={styles['toolbar-btn']} disabled={level >= 3} onClick={() => setShowNewFolderPanel(true)}  hidden={!isOwnFolder}>
          <Image className={styles['image']} src={require('../../../../assets/folder-add.png')} />
          <span className={styles['text']}>
            新建文件夹
          </span>
        </Button>
        <Button className={styles['toolbar-btn']} disabled={level <= 1}  onClick={() => setShowUploadPanel(true)}  hidden={!isOwnFolder}>
          <Image className={styles['image']} src={require('../../../../assets/file-upload.png')} />
          <span className={styles['text']}>
            上传文件
          </span>
        </Button>
        <Button className={styles['toolbar-btn']} disabled={selectedId === null || selectedId === undefined} onClick={onDownloadFile}>
          <Image className={styles['image']} src={require('../../../../assets/file-download.png')} />
          <span className={styles['text']}>
            下载文件
          </span>
        </Button>
        <Button className={styles['toolbar-btn']} disabled={selectedId === null || selectedId === undefined} onClick={() => setShowQRPanel(true)}  hidden={!isOwnFolder}>
          <Image className={styles['image']} src={require('../../../../assets/qrcode_fill.png')} />
          <span className={styles['text']}>
            生成二维码
          </span>
        </Button>
      </div>
      <div className={styles['content']}>
      { data && data.map((v, i) => {
          const choose = selectedId === v.id;
          return <FolderRow type={v.type === 1 ? 'file' : 'folder'}
            title={`${v.name}`}
            content={v.content}
            addTime={v.addTime}
            // to={`/browser/${v.id}/${parseInt(v.lever) + 1}`}
            key={`key-${i}`}
            onChoose={(e) => _onChooseRow(v, i, e)}
            choosed={choose}
            onClick={(e) => _onClickRow(v, i, e)}
          />
        })
      }
      </div>
      <a id='downloadDiv' hidden></a>
      { showUploadPanel && <UploadPanel show={true} onUpload={onUploadFiles} onHide={() => setShowUploadPanel(false)}/>}
      { showNewFolderPanel && <NewFolderPanel show={true} onNewFolder={onNewFolder} onHide={() => setShowNewFolderPanel(false)}/>}
      { showQRPanel && <QRCodePanel onHide={() => setShowQRPanel(false)} url={`${window.location.origin}/#/browser/${userId}/catalogue/${selectedId}/${level + 1}`}/>}
    </div>
  )
}

export default Catalogue