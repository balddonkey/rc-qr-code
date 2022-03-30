
import React, { useState, useCallback } from 'react'
import { Image, Button, Modal } from 'react-bootstrap';
import styles from './index.module.scss'

const QRCodePanel = () => {
  return (
    
    <Modal className={styles['modal']} dialogClassName={styles['dialog']} show={show} fullscreen='md-down' onHide={() => onHide(false)} backdrop='static'>
      <Modal.Header closeButton>
        <Modal.Title className={styles['title']}>
          新建文件夹
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles['container']}>
          
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default QRCodePanel