
import React, { useCallback, useMemo, useState } from 'react'
import { Button, FormText, Form, Navbar, Container, NavDropdown, Toast } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import toastr from 'toastr'
import Nav from '../../components/Nav'
import { UserManager } from '../../models/user'
import RCNetwork from '../../network/RCNetwork'
import styles from './index.module.scss'

const Login = (props) => {

  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const dataValid = useMemo(() => {
    return phone && phone.length > 0
      && password && password.length > 0
  }, [phone, password])

  const goToRegister = useCallback(() => {
    // console.log('go to register');
    navigate('/register')
  }, [])
  const onPhoneChanged = useCallback((e) => {
    const v = e.target.value;
    setPhone(v);
  }, []);
  const onPasswordChanged = useCallback((e) => {
    const v = e.target.value;
    setPassword(v);
  }, []);

  const doLogin = useCallback(() => {
    // console.log('do login');
    RCNetwork.user.login({
      phone, password
    })
    .then(res => {
      // console.log('on login:', res);
      const user = res.data;
      UserManager.saveUser(user);
      toastr.success('登陆成功')
      navigate(`/browser/${user.id}`)
    })
    .catch(e => {
      // console.log('on login err:', e);
      toastr.error(`登陆失败，${e.msg}`);
    })
  }, [phone, password])

  return (
    <div className={styles['container']}>
      <Nav title='文件管理系统'/>
      <div className={styles['login-panel']}>
        <p className={styles['login-title']}>
          登录
        </p>
        <Form.Control className={styles['input']} type="text" placeholder="请输入手机号码" onChange={onPhoneChanged}/>
        <Form.Control className={styles['input']} type="password" placeholder="请输入密码" onChange={onPasswordChanged}/>
        <Button className={styles['login-btn']} onClick={doLogin} disabled={!dataValid}>登录</Button>
        <Button className={styles['register-btn']} onClick={goToRegister}>注册账号</Button>
      </div>
    </div>
  )
}

export default Login