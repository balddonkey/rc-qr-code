
import React, { useCallback, useState, useMemo, useEffect, useLayoutEffect } from 'react'
import { Button, Image, Modal } from 'react-bootstrap';
import { Link, Outlet, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import toastr from 'toastr';
import Nav from '../../components/Nav'
import NewFolderPanel from '../../components/NewFolderPanel';
import UploadPanel from '../../components/UploadPanel';
import { UserManager } from '../../models/user';
import RCNetwork from '../../network/RCNetwork';
import FileRow from './components/FileRow';
import FolderRow from './components/FolderRow';
import styles from './index.module.scss'
import Catalogue from './SubPages/Catalogue';

const Browser = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  console.log('asdfasdf:', window.location);

  const onLogout = useCallback((user) => {
    console.log('on logout:', user);
    RCNetwork.user.logout()
    navigate('/', {replace: true});
  }, [])

  useEffect(() => {
    const user = UserManager.getUser();
    console.log('zzzz:', user);
    if (!user) {
      // navigate('/', {replace: true});
    } else {
      setUser(user);
    }
  }, [])

  return (
    <div className={styles['container']}>
      <Nav className={styles['nav']} title='文件管理系统' userConfig={user && user.trueName && { name: user.trueName, actions: [
        { title: '退出登录', action: (p) => onLogout(p) }
      ]}}/>
      <Outlet />
    </div>
  )
}

export default Browser