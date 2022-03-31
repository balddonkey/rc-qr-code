
import React, { useCallback, useMemo, useState } from 'react'
import { Button, FormText, Form, Navbar, Container, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import toastr from 'toastr'
import Nav from '../../components/Nav'
import RCNetwork from '../../network/RCNetwork'
import styles from './index.module.scss'

const Register = (props) => {

  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordIdentical = useMemo(() => {
    return password === confirmPassword;
  }, [password, confirmPassword])

  const phoneValid = useMemo(() => {
    const re = new RegExp('^1[0-9]{10}$');
    return re.test(phone);
  }, [phone]);

  const dataValid = useMemo(() => {
    return userName && userName.length > 0
      && phone && phone.length > 0
      && password && password.length > 0
      && password === confirmPassword
  }, [userName, phone, password, confirmPassword])

  const onUserNameChanged = useCallback((e) => {
    const v = e.target.value;
    setUserName(v);
  }, []);
  const onPhoneChanged = useCallback((e) => {
    const v = e.target.value;
    setPhone(v);
  }, []);
  const onPasswordChanged = useCallback((e) => {
    const v = e.target.value;
    setPassword(v);
  }, []);
  const onConfirmPasswordChanged = useCallback((e) => {
    const v = e.target.value;
    setConfirmPassword(v);
  }, []);

  const doRegister = useCallback(() => {
    // console.log('do register');
    if (!phoneValid) {
      toastr.error('手机号码格式不正确');
      return;
    }
    RCNetwork.user.register({
      name: userName,
      phone, password
    })
    .then(res => {
      // console.log('on reg:', res);
      toastr.success('注册成功');
      navigate(-1);
    })
    .catch(e => {
      toastr.error(`注册失败，${e.msg}`);
      // console.log('on reg err:', e);
    })
  }, [userName, phone, phoneValid, password])
  return (
    <div className={styles['container']}>
      <Nav title='文件管理系统'/>
      <div className={styles['login-panel']}>
        <p className={styles['login-title']}>
          注册
        </p>
        <Form.Control className={styles['input']} type="text" placeholder="请输入用户名" onChange={onUserNameChanged}/>
        <Form.Control className={`${styles['input']} ${!phoneValid && styles['input-error']}`} type="text" placeholder="请输入手机号码" onChange={onPhoneChanged}/>
        <Form.Control className={styles['input']} type="password" placeholder="请输入密码" onChange={onPasswordChanged}/>
        <Form.Control className={styles['input']} type="password" placeholder="请确认密码" onChange={onConfirmPasswordChanged}/>
        <div className={styles['password-diff']}>{!passwordIdentical && '两次密码不相同，请重新输入'}</div>
        <Button className={styles['login-btn']} onClick={doRegister} disabled={!dataValid}>注册</Button>
      </div>
    </div>
  )
}

export default Register