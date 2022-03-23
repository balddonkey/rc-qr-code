
import React, { useState, useCallback } from 'react'
import { Image, Button, Modal } from 'react-bootstrap';
import styles from './index.module.scss'
import {useDropzone} from 'react-dropzone'
import toastr from 'toastr';

const _MaxFiles = 9;

const UploadPanel = (props) => {
  const { onChoosed, onUpload, show = true, onHide } = props;
  const [files, setFiles] = useState(null);

  const onDrop = useCallback((files) => {
    console.log('onDrop:', files);
    if (files.length === 0) {
      toastr.info(`最多选择${_MaxFiles}个文件`)
    }
    setFiles(files);
  }, [setFiles])

  const {
    getRootProps,
    getInputProps,
    rootRef, // Ref to the `<div>`
    inputRef // Ref to the `<input>`
  } = useDropzone({ onDrop, maxFiles: _MaxFiles })

  const onChooseFile = useCallback((e) => {
    console.log('on choose file:', inputRef.current);
    inputRef.current.click();
  }, [inputRef]);

  const onClickUpload = useCallback(() => {
    onUpload && onUpload(files);
  }, [files])

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
              <input {...getInputProps()} ref={inputRef} multiple={true}/>
              <div className={styles['drop-box']} {...getRootProps()}>
              { files && files.length > 0 
                ? <div className={styles['file-container']}>
                  {files.map((v, i) => <div className={styles['choose-file-text']} key={`f-k-${i}`}>{v.name}</div>)}
                  </div>
                : <p className={styles['drop-text']}>拖拽文件到这里，或者点击选择文件</p>
              }
              </div>
            </div> 
          </>
          
          <div className={styles['btn-container']}>
            <Button className={styles['choose-btn']} onClick={onChooseFile}>选择文件</Button>
            <Button className={styles['upload-btn']} onClick={onClickUpload} disabled={!files}>上传</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default UploadPanel