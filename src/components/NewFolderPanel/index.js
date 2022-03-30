
import React, { useState, useCallback } from 'react'
import { Image, Button, Modal } from 'react-bootstrap';
import styles from './index.module.scss'

const NewFolderPanel = (props) => {
  const { show = true, onHide, onNewFolder } = props;
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const onInputChange = useCallback((e) => {
    // console.log('e:', e);
    const value = e.target.value;
    setName(value);
  }, [])

  const onContentChange = useCallback((e) => {
    // console.log('on content change:', e);
    const v = e.target.value;
    setContent(v);
  }, [])

  const onClickNewFolder = useCallback(() => {
    onNewFolder && onNewFolder(name, content);
  }, [name, content])

  return (
    
    <Modal className={styles['modal']} dialogClassName={styles['dialog']} show={show} fullscreen='md-down' onHide={() => onHide(false)} backdrop='static'>
      <Modal.Header closeButton>
        <Modal.Title className={styles['title']}>
          新建文件夹
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles['container']}>
          <input className={styles['name-input']} placeholder='请输入名称' value={name} onChange={onInputChange} maxLength={20}>
          </input>
          <textarea className={styles['detail-input']} placeholder='请输入备注' value={content} onChange={onContentChange}>
          </textarea>
          <button className={styles['create-button']} onClick={onClickNewFolder}>创建</button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default NewFolderPanel