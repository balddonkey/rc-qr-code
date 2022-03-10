
import React, { useCallback } from 'react'
import { Button, FormText, Form, Navbar, Container, NavDropdown } from 'react-bootstrap'
import Nav from '../../components/Nav'
import styles from './index.module.scss'

const Login = (props) => {

  return (
    <div className={styles['container']}>
      <Nav title='文件管理系统'/>
      <div className={styles['login-panel']}>
        <p className={styles['login-title']}>
          登录
        </p>
        <Form.Control className={styles['input']} type="text" placeholder="请输入手机号码" />
        <Form.Control className={styles['input']} type="password" placeholder="请输入密码" />
        <Button className={styles['login-btn']}>登录</Button>
      </div>
    </div>
  )
}

export default Login