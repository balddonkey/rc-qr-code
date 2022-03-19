
import React, { useCallback } from 'react'
import { Navbar, Nav, Dropdown, NavDropdown } from 'react-bootstrap';
import styles from './index.module.scss'

/**
 * @typedef {Object} NavUserConfig 用户信息配置
 * @property {String} name 用户名称
 * @property {[{title: String, action: (p: Object) => Void}]} actions 用户登出
 */

/**
 * 导航栏
 * @param {Object} props properties 配置
 * @param {String} props.title 标题
 * @param {Object} props.data 携带的数据体，在action点击时，会回调回去
 * @param {NavUserConfig} props.userConfig 用户配置
 * @returns {React.ElementType} 
 */
const RCNav = (props) => {
  const { className, title, data, userConfig } = props;
  const { name, actions = [] } = userConfig || {};

  const onTriggerAction = useCallback((cfg, index) => {
    const { action } = cfg;
    action && action(data);
  }, [])
  return (
    // <div className={styles['nav']}>
    //   <span className={styles['brand']}>{title}</span>
    //   { showUser && <span className={styles['name']}>{name}</span> }
    // </div>
    <Navbar className={`${styles['nav']} ${className}`}>
      <Navbar.Brand href='/'>
        <span className={styles['brand']}>{title}</span>
      </Navbar.Brand>
      <Nav className={styles['right']}>
        { userConfig && 
          <>
            <Dropdown>
              <Dropdown.Toggle className={styles['dropdown-title']} variant="none" id="dropdown-basic" aria-expanded={false}>
                <span className={styles['name']}>{name}</span>
              </Dropdown.Toggle>
            
              <Dropdown.Menu className={styles['dropdown']}>
                { actions.map((v, i) => {
                  return <Dropdown.Item onClick={() => onTriggerAction(v, i)} key={i}>{v.title}</Dropdown.Item>
                })}
              </Dropdown.Menu>
            </Dropdown>
          </>
        }
      </Nav>
    </Navbar>
  )
}

export default RCNav