
import React, { useState, useCallback, useRef, useEffect } from 'react'
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

  const { url: file } = useParams();

  console.log('on preview:', file);
  const download = useCallback(() => {
    
    // window.open(new URL(file), '_blank')
    fetch(file, { method: 'GET'})
    .then(res => {
      res.blob().then(blob => {
        // const types = blob.type.split('/');
        // let type = '';
        // if (types.length > 0) {
        //   type = types[types.length - 1];
        // }
        console.log('file type:', mime.extension(blob.type));
        const exts = file.split('/');
        if (exts.length <= 0) {
          toastr.error(`文件错误，无法下载，请联系管理员\n${file}`);
          return;
        }
        const fileName = exts[exts.length - 1];
        let blobUrl = window.URL.createObjectURL(blob);
        let aElement = document.getElementById('downloadDiv');
        // let fileName = `${Date.now()}.${mime.extension(blob.type) || ''}`
        console.log('fn:', fileName);
        aElement.href = blobUrl;
        aElement.download = fileName;
        aElement.click();
        window.URL.revokeObjectURL(blobUrl);
      })
    })
  }, [file])

  return (
    <div className={styles['container']}>
      <div className={styles['file-container']}>
        <Image className={styles['preview']} src={file} placeholder={require('../../assets/file.png')} onErrorCapture={e => e.target.src = require('../../assets/file.png')}/>
        <div className={styles['file-name']}>
          <a href={file} download={file}>{file}</a>
        </div>
        <Button className={styles['download-btn']} onClick={download}>下载</Button>
      </div> 
      <a id='downloadDiv'></a>
    </div>
  )
}

export default Preview