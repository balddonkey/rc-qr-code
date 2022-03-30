
import QRCode from 'qrcode';

import React, { useLayoutEffect } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { baseUrl } from '../../utils/netutil';
import styles from './index.module.scss'

const QRCodePreview = () => {
  const { url } = useParams();
  // console.log('uuu:', url);
  const encodeUrl = encodeURIComponent(url);
  useLayoutEffect(() => {
    // const text = decodeURIComponent(url);
    // console.log('will gen qrcode:', encodeUrl);
    QRCode.toCanvas(document.getElementById('qrcode'), `${baseUrl}#/preview/${encodeUrl}`, {
      width: 300
    })
    .then(function (error) {
      if (error) console.error(error)
      // console.log('success!');
    })
  }, [url])
  return (
    <div className={styles['container']}>
      <div className={styles['qr-container']}>
        <canvas className={styles['qrcode']} id='qrcode'/>
      </div>
    </div>
  )
}

export default QRCodePreview