import React, { useState, useEffect, useCallback } from "react";
import "./index.less";
import { useNavigate, Link } from "react-router-dom";
import Utils from "../../utils/Utils";
import { Layout, Menu, theme, Input, Button, Popover, List, Modal } from "antd";
import { FormOutlined,UploadOutlined, UserOutlined, LoginOutlined, GithubOutlined, QuestionCircleOutlined } from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;
import { Collapse,Popconfirm  } from "antd";
import AnalysisTags from "@/components/AnalysisTags";
const { Panel } = Collapse;

const HomeSider = props => {
  const [openNew, setOpenNew] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const showPopconfirm = () => {
    setOpenNew(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
	// TODO 新建
    setTimeout(() => {
      setOpenNew(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpenNew(false);
  };

  const handleSearch = value => {
    const results = props.contentList.filter(item => item.title.toLowerCase().includes(value.toLowerCase()));
    setSearchTerm(value);
    setSearchResults(results);
  };

  const sortList = Utils.splitArrayByTime(props.contentList);
  const items = [
    {
      key: "1",
      label: "今天",
      children: sortList.today.map(data => AnalysisTags(data)),
    },
    {
      key: "2",
      label: "一周内",
      children: sortList.lastSevenDays.map(data => AnalysisTags(data)),
    },
    {
      key: "3",
      label: "更久",
      children: sortList.other.map(data => AnalysisTags(data)),
    },
  ];

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = newOpen => {
    setOpen(newOpen);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.clear("token");
    navigate("/login", { replace: true });
  };

  return (
    <Sider className='home-sider' breakpoint='lg' collapsedWidth='0' onBreakpoint={broken => {}} width={"15rem"} style={{ backgroundColor: "#f2f2f2" }}>
      <div className='manage_header'>
        <Input placeholder='搜索分析记录' allowClear onChange={handleSearch} style={{ width: 300 }} />
        <Popconfirm
          title='标题'
          description={() => <div><input/></div>}
          open={openNew}
          onConfirm={handleOk}
          okButtonProps={{
            loading: confirmLoading,
          }}
          onCancel={handleCancel}
		  icon={<FormOutlined />}
        >
          <Button className='manage_header_button' onClick={showPopconfirm}>
            新建分析
          </Button>
        </Popconfirm>
      </div>
      <div className='list'>
        <Collapse items={items} defaultActiveKey={["1"]} />
        <Collapse>
          {searchResults.map(item => (
            <Panel header={item.title} key={item.id}>
              <p>{item.content_data}</p>
            </Panel>
          ))}
        </Collapse>
      </div>
      <div className='manage_footer'>
        <Popover
          content={
            <div style={{ width: "8rem" }}>
              <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
                <li onClick={showModal}>
                  <a>
                    <QuestionCircleOutlined /> 关于此项目
                  </a>
                </li>
                <li onClick={handleLogout}>
                  <a>
                    <LoginOutlined /> 注销
                  </a>
                </li>
              </ul>
            </div>
          }
          trigger='click'
          open={open}
          onOpenChange={handleOpenChange}
          arrow={false}
        >
          <UserOutlined className='user_icon' style={{ display: "inline-block", padding: "0.2rem", fontSize: "2rem", borderRadius: "50%", border: "1px solid #ccc" }} />
          <div className='username'>用户名</div>
        </Popover>
      </div>
      <Modal title='关于项目' open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
        <a href='https://github.com/JilinJL/graduation-project' target='_blank'>
          <GithubOutlined />
        </a>
      </Modal>
    </Sider>
  );
};

export default HomeSider;
