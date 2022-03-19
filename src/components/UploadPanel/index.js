
import React, { useState, useCallback } from 'react'
import { Image, Button, Modal } from 'react-bootstrap';
import styles from './index.module.scss'
import {useDropzone} from 'react-dropzone'

const UploadPanel = (props) => {
  const { onChoosed, onUpload, show = true, onHide } = props;
  const [file, setFile] = useState(null);

  const onDrop = useCallback((files) => {
    console.log('onDrop:', files);
    const file = files[0];
    setFile(file);
  }, [setFile])

  const {
    getRootProps,
    getInputProps,
    rootRef, // Ref to the `<div>`
    inputRef // Ref to the `<input>`
  } = useDropzone({ onDrop, maxFiles: 1 })

  const onChooseFile = useCallback((e) => {
    console.log('on choose file:', inputRef.current);
    inputRef.current.click();
  }, [inputRef]);

  return (
    <Modal className={styles['modal']} dialogClassName={styles['dialog']} show={show} fullscreen='md-down' onHide={() => onHide(false)} backdrop='static'>
      <Modal.Header closeButton>
        <Modal.Title className={styles['title']}>
          上传文件
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles['container']}>
          <>
            <div className={styles['upload-container']}>
              <input {...getInputProps()} ref={inputRef} multiple={false}/>
              <div className={styles['drop-box']} {...getRootProps()}>
              { file 
                ? <div className={styles['drop-text']}>{file.name}</div>
                : <p className={styles['drop-text']}>拖拽文件到这里，或者点击选择文件</p>
              }
              </div>
            </div> 
          </>
          
          <div className={styles['btn-container']}>
            <Button className={styles['choose-btn']} onClick={onChooseFile}>选择文件</Button>
            <Button className={styles['upload-btn']} onClick={onUpload} disabled={!file}>上传</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default UploadPanel