import React, { useState, useEffect, useCallback } from "react";
import "./index.less";
import Utils from "../../utils/Utils";


const LoginBox = props => {
	const [isLogin, setIsLogin] = React.useState(true);
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	const [phoneLogin, setPhoneLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '', 
        email: '',
        password: '', 
    });
    const [timer,setTimer] = useState(0);

	const throttledHandleResize = useCallback(
		Utils.throttle(() => {
			const mediaQueryList = window.matchMedia("(max-width: 1440px)");
			setIsSmallScreen(mediaQueryList.matches);
		}, 50),
		[],
	);

    const handleChange = (e) => {
        setTimer(new Date().getTime());
        const { name, value } = e.target;
        if(e.target.name=='username' && e.target.id == 'register' && new Date().getTime()-timer>=1000 ){
            clearTimeout(timer);

            // 创建新的定时器，在1秒后执行逻辑
            const newTimer = setTimeout(() => {
				props.handleCheckName(e.target.value);
            }, 1000);
            
        }
        setTimer(new Date().getTime())
        setFormData({ ...formData, [name]: value });
      };

	const handleSubmit = e => {
		// 阻止默认的表单提交行为
		e.preventDefault();
        const formData = new FormData(e.target); // 创建一个 FormData 对象来获取表单数据
        const formDataObject = {}; // 将 FormData 对象转换为普通 JavaScript 对象
        formData.forEach((value, key) => {
          formDataObject[key] = value;
        });
        
        formDataObject.email?
        props.handleRegister(formDataObject):   // 处理注册
        props.handleLogin(formDataObject);      //处理登陆
	};

	useEffect(() => {
		const mediaQueryList = window.matchMedia("(max-width: 1440px)");
		setIsSmallScreen(mediaQueryList.matches); // 初始状态
		window.addEventListener("resize", throttledHandleResize);
	}, []);
	return (
		<div className='login-box'>
			<div className='shell'>
				<div className={("container", "a-container")} style={{ display: phoneLogin ? "block" : "none" }} id='a-container'>
					<form onSubmit={e=>handleSubmit(e)} className='form' id='a-form'>
						<h2 className={("form_title", "title")}>创建账号</h2>
						<div className='form_icons'>
							<i className={("iconfont", "icon-QQ")}></i>
							<i className={("iconfont", "icon-weixin")}></i>
							<i className={("iconfont", "icon-bilibili-line")}></i>
						</div>
						<span className='form_span'>输入名称以及电子邮箱注册</span>
						<input required id="register" name="username" type='text' className='form_input' placeholder='Name' value={formData.username} onChange={(e)=>{handleChange(e)}} />
						<input required name="email" className='form_input' type='email' placeholder='Email' value={formData.email} onChange={handleChange} />
						<input required name="password" className='form_input' type='password' placeholder='Password' value={formData.password} onChange={handleChange} autoComplete="current-password" />
						<a className='form_link' onClick={isSmallScreen ? () => setPhoneLogin(false) : () => setIsLogin(true)}>
							已有账号？去登陆
						</a>
						<br />
						<button type="submit" className={("form_button", "button", "submit")} >
							注册
						</button>
					</form>
				</div>

				<div className={("container", "b-container")} style={{ display: isSmallScreen && phoneLogin ? "none" : "block" }} id='b-container'>
					<form onSubmit={e=>handleSubmit(e)} className='form' id='b-form'>
						<h2 className={("form_title", "title")}>登陆</h2>
						<div className='form_icons'>
							<i className={("iconfont", "icon-QQ")}></i>
							<i className={("iconfont", "icon-weixin")}></i>
							<i className={("iconfont", "icon-bilibili-line")}></i>
						</div>
						<input required name="username" type='text' className='form_input' placeholder='Name' value={formData.username} onChange={handleChange} />
                        <input required name="password" className='form_input' type='password' placeholder='Password' value={formData.password} onChange={handleChange} autoComplete="current-password" />
						<a className='form_link' onClick={isSmallScreen ? () => setPhoneLogin(true) : () => setIsLogin(false)}>
							没有账号？去注册
						</a>
						{/* TODO 登录注册移动端适配逻辑  前端接口部分  路由配置*/}
						<br />
						<button className={("form_button", "button", "submit")}>登陆</button>
					</form>
				</div>

				<div className={isLogin ? "switch_left" : "switch_right"} id='switch-cnt'>
					<div className='switch_circle'></div>
					<div className='switch_container' id='switch-c1'>
						<h2 className={("switch_title", "title")} style={{ letterSpacing: 0 }}>
							NLP内容生成系统
						</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginBox;
