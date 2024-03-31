import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const navigate = useNavigate();


  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token; // 如果存在 token 则认为用户已登录
  };

  

  
  useEffect(() => {
    if (!isAuthenticated()) {
      // 如果用户未登录，则重定向到登录页面
      message.info('请先登录');
      navigate("/login", { replace: true });
    } else if (isAuthenticated() && rest.mark === 'login') {
      // 已登录用户访问登录页面，重定向到首页或其他合适的页面
      navigate('/');
    }
  }, [navigate, rest.mark]);

  // 如果用户已登录，则渲染传递给它的元素
  return <Element {...rest} />;
};

export default PrivateRoute;
