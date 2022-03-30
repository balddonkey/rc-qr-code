
import Netutil from '../../utils/netutil';
import React, { useState, useCallback, useRef, useLayoutEffect, useEffect } from 'react'
import { Image, Button } from 'react-bootstrap';
import styles from './index.module.scss'
import Dropzone from 'react-dropzone'
import {useDropzone} from 'react-dropzone'
// import './home.module.scss';
import QRCode from 'qrcode';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserManager } from '../../models/user';

const Home = (props) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // const [Image] = useQRCode();

  const readFile = useCallback((file) => {
    setLoading(true);
    const fr = new FileReader();
    fr.onload = (t, ev) => {
      // console.log('on load file:', t, ev);
      setFile({
        show: t.target.result,
        origin: file
      })
      setLoading(false);
    };
    fr.onloadend = fr.onerror = fr.onabort = () => {
      setLoading(false);
    }
    fr.readAsDataURL(file);
  }, [])

  const onDrop = useCallback((files) => {
    // console.log('onDrop:', files);
    const file = files[0];
    readFile(file);
  }, [readFile])

  const {
    getRootProps,
    getInputProps,
    rootRef, // Ref to the `<div>`
    inputRef // Ref to the `<input>`
  } = useDropzone({ onDrop, maxFiles: 1 })
  
  const onChooseFile = useCallback((e) => {
    // console.log('on choose file:', inputRef.current);
    inputRef.current.click();
  }, [inputRef]);
  
  const onUpload = useCallback((e) => {
    // console.log('on upload:', file)
    if (file && file.origin) {
      Netutil.upload({
        file: file.origin
      })
      .then(res => {
        const { picName } = res;
        const url = encodeURIComponent(picName);
        // console.log('uuu:', url);
        navigate(`qrcode-preview/${url}`)
      })
      .catch(e => {

      })
    }
  }, [file, navigate])

  useEffect(() => {
    const user = UserManager.getUser();
    // console.log('load user');
    if (user) {
      navigate('/browser');
    } else {
      navigate('/login')
    }
  }, [])

  return (
    <div className={styles['container']}>
      Loading
      {/* <p className={styles['title']}>洛阳市锐创电气设备有限公司</p>
      <>
        <div className={styles['upload-container']}>
          <input {...getInputProps()} ref={inputRef} multiple={false}/>
          <div className={styles['drop-box']} {...getRootProps()}>
          { file 
            ? <Image className={styles['preview']} src={file ? file.show : null} placeholder={require('../../assets/file.png')} onErrorCapture={e => e.target.src = require('../../assets/file.png')}/>
            : <p className={styles['drop-text']}>Drag and drop a file or select add Image</p>
          }
          </div>
        </div> 
      </>
      <div className={styles['btn-container']}>
        <Button className={styles['choose-btn']} onClick={onChooseFile}>选择文件</Button>
        <Button className={styles['upload-btn']} onClick={onUpload} disabled={!file || !file.origin}>上传</Button>
      </div>
      <div className={styles['qr-container']}>
        <canvas className={styles['qrcode']} id='qrcode'/>
      </div> */}
    </div>
  )
}

export default Home