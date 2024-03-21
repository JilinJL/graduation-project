# 毕业设计项目后端

## 项目简介

该项目是我的毕业设计项目的后端部分，采用 Spring Boot 框架结合 MyBatis-Plus 和 MySQL 数据库。

## 技术栈

- Spring Boot：用于构建基于 Java 的 Web 应用程序的框架。
- MyBatis-Plus：基于 MyBatis 的增强工具，简化了与数据库的交互。
- MySQL：关系型数据库，用于存储和管理数据。

## 项目结构

```
bashCopy codesrc/
├── main/
│   ├── java/
│   │   └── com/
│   │       └── example/
│   │           ├── config/        # 配置类目录
│   │           ├── controller/    # 控制器类目录
│   │           ├── entity/        # 实体类目录
│   │           ├── mapper/        # Mapper接口目录
│   │           └── service/       # 服务接口和实现目录
│   └── resources/
│       ├── application.properties    # 应用程序配置文件
│       └── mapper/                    # MyBatis Mapper XML 文件目录
└── test/                              # 测试类目录
```

## 快速开始

1. 克隆项目代码：

```
git clone https://github.com/your-username/your-project.git
```

1. 导入项目到 IntelliJ IDEA 或其他 Java 开发工具中。
2. 配置 MySQL 数据库连接信息，修改 `src/main/resources/application.yml` 文件中的数据库连接配置。
3. 运行项目，在开发工具中启动应用程序。