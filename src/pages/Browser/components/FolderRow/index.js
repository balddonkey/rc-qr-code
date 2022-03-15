

import React from 'react'
import { Image } from 'react-bootstrap'
import styles from './index.module.scss'


/**
 * 
 * @param {Object} props properties
 * @param {'file' | 'folder'} props.type row类型，文件或文件夹
 * @returns {React.ElementType}
 */
const FolderRow = (props) => {
  const { choosed = false, type = 'folder' } = props;
  return (
    <div className={styles['container']}>
      <Image className={styles['choose']} src={choosed ? require('../../../../assets/choosed.png') : require('../../../../assets/choose.png')}/>
      <Image className={styles['row-type']} src={ type === 'file' ? require('../../../../assets/file.png') : require('../../../../assets/folder.png')} />
      <span className={styles['title']}>充电柜</span>
      <span className={styles['detail']}>文件详细描述文件详细描述文件详细描述文件详细描述文件详细描述文件详细描述文件详细描述文件详细描述文件详细描述文件详细描述</span>
      <span className={styles['upload-time']}>上传时间：2022-03-10</span>
      <Image className={styles['right-arrow']} src={require('../../../../assets/arrow-right.png')}/>
    </div>
  )
}

export default FolderRow