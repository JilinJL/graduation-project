import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu, theme } from 'antd';
import { observer } from 'mobx-react';


import HomeSider from '@/components/HomeSider';
import HomeHeader from '@/components/HomeHeader';
import HomeContent from '@/components/HomeContent';
import HomeModel from './HomeModel'
const store = new HomeModel();
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
        <HomeHeader  store={store}/>
        <HomeContent store={store}/>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
        </Footer>
      </Layout>
    </Layout>
  );
}
export default observer(HomeView);