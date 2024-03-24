import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu, theme } from 'antd';
import {Outlet} from 'react-router-dom'
import { observer } from 'mobx-react';
import store from './HomeModel'
import HomeSider from '@/components/HomeSider';
import HomeHeader from '../../components/HomeHeader';

const { Header, Content, Footer, Sider } = Layout;
const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  }),
);
const HomeView = () => {

const getNum = () =>{
  store.getNum();
}
const userData = {
  userName: '小明'
}
  return (
    <Layout>
      <HomeSider userInfo={userData} />
      <Layout>
        <HomeHeader/>
        <Content
          style={{
            width: '100%',
            background:'#ffffff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >

          {/* 内容展示位置 */}
          <Outlet />
          <button onClick={getNum}></button>
          {store.Number}
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by 林翰平-202031061530
        </Footer>
      </Layout>
    </Layout>
  );
}
export default observer(HomeView);