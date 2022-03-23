
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Image, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import toastr from 'toastr';
import NewFolderPanel from '../../../../components/NewFolderPanel';
import UploadPanel from '../../../../components/UploadPanel';
import { UserManager } from '../../../../models/user';
import RCNetwork from '../../../../network/RCNetwork';
import { CatalogueActions } from '../../../../redux/action';
import FolderRow from '../../components/FolderRow';
import styles from './index.module.scss'
import mime from '../../../../utils/mime-types'

const Catalogue = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const catalogue = useSelector((state) => {
    console.log('sss:', state.catalogue);
    return state.catalogue;
  })
  console.log('ffff:', catalogue);
  const { className } = props;
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [showNewFolderPanel, setShowNewFolderPanel] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const params = useParams();
  const { level = 1 } = params;
  console.log('ppp:', params);
  
  const getHomeData = useCallback((user) => {
    RCNetwork.folder.getAll({userId: user.id})
    .then(res => {
      console.log('get all:', res);
      const data = res.data;
      setData(data);
    })
    .catch(e => {
      toastr.error(e.msg);
    })
  }, [])

  const loadById = useCallback((id, user) => {
    const { id: userId } = user;
    RCNetwork.folder.getByParentId({parentId: id, userId})
    .then(res => {
      console.log('on get childs:', res);
      const data = res.data;
      setData(data);
    })
    .catch(e => {
      toastr.error(e.msg);
    })
  }, [])

  const reload = useCallback((user) => {
    const { id = user.folderParentId } = params;
    console.log('zzzzzz:', id);  
    if (id !== null && id !== undefined && id > 0) {
      loadById(id, user);
    } else {
      getHomeData(user);
    }
  }, [params])

  useEffect(() => {
    const user = UserManager.getUser();
    console.log('zzzz:', user);
    if (!user) {
      navigate('/', {replace: true});
    } else {
      setUser(user);
      reload(user);
    }
  }, [getHomeData, reload])

  useLayoutEffect(() => {
    setSelectedId(null);
  }, [params])

  const _onChooseRow = useCallback((v, i, e) => {
    console.log('on choose:', v);
    dispatch(CatalogueActions.change(v));
    const { id } = v;
    setSelectedId(id);
  }, [])

  const _onClickRow = useCallback((v, i, e) => {
    console.log('on click row:', v);
    const { id, type, picUrl } = v;
    dispatch(CatalogueActions.change(v));
    if (type === 0) {
      navigate(`/browser/catalogue/${id}/${v.lever + 1}`)
    } else {
      navigate(`/browser/preview/${id}`)
    }
  }, [])
  
  const onUploadFiles = useCallback((files) => {
    const { id = user.folderParentId } = params;
    RCNetwork.folder.uploadFiles({
      parentId: id,
      userId: user.id,
      files
    })
    .then(res => {
      console.log('on upload f:', res);
      setShowUploadPanel(false);
      reload(user);
    })
    .catch(e => {
      console.log('on upload e:', e);
    })
  }, [user, reload, params])

  const onNewFolder = useCallback((name, content) => {
    const { id = user.folderParentId, level = 1 } = params;
    RCNetwork.folder.new({
      name, content: content, userId: user.id, level: level, parentId: id
    })
    .then(res => {
      console.log('on new succ:', res);
      setShowNewFolderPanel(false);
      reload(user);
    })
    .catch(e => {
      console.log('on new e:', e);
      toastr.error(e.msg);
    })
  }, [user, reload, params])

  const onDownloadFile = useCallback(() => {
    const v = data.find((v, i, o) => v.id === selectedId)
    console.log('will download:', v);
    const path = catalogue.groups.map(v => v.name).join('/');
    console.log('download path:', path);
    RCNetwork.folder.downloadFile({
      path: path,
      userId: user.id,
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
  }, [selectedId, data, user])

  return (
    
    <div className={`${styles['container']} ${className}`}>
      <div className={styles['folder-handle-container']}>
        <Button className={styles['toolbar-btn']} disabled={level >= 3} onClick={() => setShowNewFolderPanel(true)}>
          <Image className={styles['image']} src={require('../../../../assets/folder-add.png')} />
          <span className={styles['text']}>
            新建文件夹
          </span>
        </Button>
        <Button className={styles['toolbar-btn']} disabled={level <= 1}  onClick={() => setShowUploadPanel(true)} >
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
    </div>
  )
}

export default Catalogue