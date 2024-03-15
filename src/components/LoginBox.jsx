import React,{useState,useEffect,useCallback} from "react"
import './LoginBox.less'
import Utils from "../utils/Utils";


const LoginBox = ()=>{

    const [isLogin, setIsLogin] = React.useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const throttledHandleResize = useCallback(
        Utils.throttle(() => {
          const mediaQueryList = window.matchMedia('(max-width: 768px)');
          setIsSmallScreen(mediaQueryList.matches);
        }, 500),
        []
      );

    useEffect(() => {
        const mediaQueryList = window.matchMedia('(max-width: 768px)');
        setIsSmallScreen(mediaQueryList.matches); // 初始状态
        window.addEventListener('resize', throttledHandleResize);
      }, []);
    return (
        <div className="login-box">
        <div className="shell">
        <div className={"container","a-container"} id="a-container">
            <form action="" method="" className="form" id="a-form">
                <h2 className={"form_title","title"}>创建账号</h2>
                <div className="form_icons">
                    <i className={ "iconfont" ,"icon-QQ"}></i>
                    <i className={ "iconfont" ,"icon-weixin"}></i>
                    <i className={ "iconfont" ,"icon-bilibili-line"}></i>
                </div>
                <span className="form_span">输入名称以及电子邮箱注册</span>
                <input type="text" className="form_input" placeholder="Name"/>
                <input className="form_input" type="email" placeholder="Email" />
                <input className="form_input" type="password" placeholder="Password" />
                <a className="form_link" onClick={()=>setIsLogin(true)}>已有账号？去登陆</a>
                <br />
                <button className={"form_button","button","submit"}>注册</button>
            </form>
        </div>

        <div className={"container","b-container"} id="b-container">
            <form action="" method="" className="form" id="b-form">
                <h2 className={"form_title","title"}>登陆</h2>
                <div className="form_icons">
                    <i className={ "iconfont" ,"icon-QQ"}></i>
                    <i className={ "iconfont" ,"icon-weixin"}></i>
                    <i className={ "iconfont" ,"icon-bilibili-line"}></i>
                </div>
                <input type="text" className="form_input" placeholder="Email" />
                <input  className="form_input" type="password" placeholder="Password" />
                <a className="form_link" onClick={isSmallScreen?()=>{console.log('go')}:()=>setIsLogin(false)}>没有账号？去注册</a>
                {/* TODO 登录注册移动端适配逻辑  前端接口部分  路由配置*/}
                <br />
                <button className={"form_button","button","submit"}>登陆</button>
            </form>
        </div>

        <div className={isLogin?"switch_left":"switch_right"} id="switch-cnt">
            <div className="switch_circle"></div>
            <div className="switch_container" id="switch-c1">
            <h2 className={"switch_title","title"} style={{letterSpacing: 0}}>情感分析系统</h2>
            </div>

        </div>
        </div>
        </div>
    )
}

export default LoginBox;