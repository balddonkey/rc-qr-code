
import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { Image, Button } from 'react-bootstrap';
import styles from './index.module.scss'
import util from '../../utils/util'
import mime from '../../utils/mime-types'
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../../components/Nav'
import { UserManager } from '../../models/user';
import RCNetwork from '../../network/RCNetwork';
import toastr from 'toastr';

const Preview = (props) => {

  const { id, userId } = useParams();
  const [file, setFile] = useState(null);

  useEffect(() => {
    RCNetwork.folder.getInfo({id, userId})
    .then(res => {
      console.log('get folder info:', res);
      setFile(res.data);
    })
    .catch(e => {
      console.log('get error:', e);
      toastr.error(`获取文件信息失败，${e.msg}`)
    })
  }, [id, userId]);

  const previewUrl = useMemo(() => {
    return file && file.picUrl ? new URL(file.picUrl) : null;
  }, [file])

  console.log('on preview:', file);
  const download = useCallback(() => {
    
    // const v = data.find((v, i, o) => v.id === selectedId)
    // console.log('will download:', v);
    RCNetwork.folder.downloadFile({
      id: file.id,
      userId: userId,
    })
    .then(res => {
      console.log('get download data:', res);
      const { zipNameUrl } = res;
      window.open(new URL(zipNameUrl), '_blank')
    })
    .catch(e => {
      console.log('get download failed:', e);
    })
    // window.open(new URL(file), '_blank')
    // fetch(file, { method: 'GET'})
    // .then(res => {
    //   res.blob().then(blob => {
    //     // const types = blob.type.split('/');
    //     // let type = '';
    //     // if (types.length > 0) {
    //     //   type = types[types.length - 1];
    //     // }
    //     console.log('file type:', mime.extension(blob.type));
    //     const exts = file.split('/');
    //     if (exts.length <= 0) {
    //       toastr.error(`文件错误，无法下载，请联系管理员\n${file}`);
    //       return;
    //     }
    //     const fileName = exts[exts.length - 1];
    //     let blobUrl = window.URL.createObjectURL(blob);
    //     let aElement = document.getElementById('downloadDiv');
    //     // let fileName = `${Date.now()}.${mime.extension(blob.type) || ''}`
    //     console.log('fn:', fileName);
    //     aElement.href = blobUrl;
    //     aElement.download = fileName;
    //     aElement.click();
    //     window.URL.revokeObjectURL(blobUrl);
    //   })
    // })
  }, [file])

  return (
    <div className={styles['container']}>
      <div className={styles['file-container']}>
        <Image className={styles['preview']} src={previewUrl} 
        placeholder={require('../../assets/file.png')} onErrorCapture={e => e.target.src = require('../../assets/file.png')}
        />
        <div className={styles['file-name']}>
          <a href={previewUrl}>{file && file.picUrl}</a>
        </div>
        <Button className={styles['download-btn']} onClick={download}>下载</Button>
      </div> 
      <a id='downloadDiv'></a>
    </div>
  )
}

export default Preview