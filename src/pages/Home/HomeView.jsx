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

const HomeView = () => {

const getNum = () =>{
  store.getNum();
}
const userData = {
  userName: '小明'
}
  return (
    <Layout style={{padding: "5px",borderRadius: "20px"}}>
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