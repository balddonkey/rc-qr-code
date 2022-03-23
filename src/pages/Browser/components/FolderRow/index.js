

import React from 'react'
import { Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import styles from './index.module.scss'


/**
 * 
 * @param {Object} props properties
 * @param {'file' | 'folder'} props.type row类型，文件或文件夹
 * @returns {React.ElementType}
 */
const FolderRow = (props) => {
  const { choosed = false, onClick, type = 'folder', onChoose, title, addTime, content, ...otherProps } = props;
  return (
    <div className={styles['container']} {...otherProps}>
      <div className={styles['choose-btn']} onClick={onChoose}>
        <Image className={styles['choose']} src={choosed ? require('../../../../assets/choosed.png') : require('../../../../assets/choose.png')}/>
      </div>
      <Image className={styles['row-type']} src={ type === 'file' ? require('../../../../assets/file.png') : require('../../../../assets/folder.png')} />
      <span className={styles['title']} onClick={onClick}>{title}</span>
      <span className={styles['detail']}>{content}</span>
      <span className={styles['upload-time']}>上传时间：{addTime}</span>
      <Image className={styles['right-arrow']} src={require('../../../../assets/arrow-right.png')}/>
    </div>
  )
}

export default FolderRow