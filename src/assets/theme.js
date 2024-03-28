// theme.js

export default {
    '@primary-color': '#1890ff', // 修改主色
    '@link-color': '#1890ff', // 修改链接色
    '@border-radius-base': '4px', // 修改圆角

    components: {
        Input: {
            activeBorderColor: "#d9d9d9",
            hoverBorderColor: "#d9d9d9",
        },
        Button: {
            defaultHoverBorderColor: "#fff",
        },
        //折叠面板
        Collapse: {
            contentBg: "",
        },
        Popover:{
            titleMinWidth:"10rem",
        }
      },
  };
  
