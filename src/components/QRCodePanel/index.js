
import React, { useState, useCallback, useLayoutEffect } from 'react'
import { Image, Button, Modal } from 'react-bootstrap';
import styles from './index.module.scss'
import QRCode from 'qrcode';
import { baseUrl } from '../../utils/netutil';

const QRCodePanel = (props) => {
  const { url, show = true, onHide } = props;
  // console.log('uuu:', url);
  useLayoutEffect(() => {
    // navigate(`/browser/preview/${id}/${user.id}`)
    QRCode.toCanvas(document.getElementById('qrcode'), url, {
      width: 300
    })
    .then(function (error) {
      if (error) console.error(error)
      // console.log('success!');
    })
  }, [url])
  return (
    
    <Modal className={styles['modal']} dialogClassName={styles['dialog']} show={show} fullscreen='md-down' onHide={() => onHide(false)} backdrop='static'>
      <Modal.Header closeButton>
        <Modal.Title className={styles['title']}>
          二维码
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles['container']}>
          <div className={styles['qr-container']}>
            <canvas className={styles['qrcode']} id='qrcode'/>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default QRCodePanel