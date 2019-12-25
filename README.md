---
theme : "white"
---

# acl

通用鉴权系统

Access control lists

<small>作者：[鱼哥](https://github.com/jammacn)</small>

---

## 部署

采用docker部署，容器默认监听80端口

环境变量见后面的[环境变量](#环境变量)说明
```
// 请用自己的redis url 替换 localhost
docker run -d --name acl  -e redis=redis://localhost jamma/acl
```

---

## <a name="环境变量">环境变量</a>

- jm-server

- jm-acl

- jm-acl-mq

- jm-server-jaeger

--

### jm-server

请参考 [jm-server](https://github.com/jm-root/ms/tree/master/packages/jm-server)

--

### jm-acl

| 配置项 | 默认值 | 描述 |
| :-: | :-: | :-: |
|redis| |必填, redis数据库uri|
|acl_key|"acl:"|redis key前缀|
|super_role|"root"|超级角色|
|guest_role|"guest"|游客角色|
|user_role|"user"|登录用户角色|
|default_allow|false|允许访问未登记的资源或权限|
|acl_user_key|"acl_user"| headers中的user key|
|acl_role_key|"acl_role"| headers中的role key|

--

### jm-acl-mq

| 配置项 | 默认值 | 描述 |
| :-: | :-: | :-: |
|gateway|"http://gateway"|Gateway服务器Uri| jm-acl-mq 使用

--

### jm-server-jaeger

| 配置项 | 默认值 | 描述 |
| :-: | :-: | :-: |
|service_name|"acl"| 链路追踪登记的服务名称 |
|jaeger| |jaeger服务器Uri| 链路追踪服务器

---

## Features

- [RBAC3](http://directory.apache.org/fortress/user-guide/1.3-what-rbac-is.html)+

- 支持资源树

- 存储 redis 

--

## RBAC3

带有角色继承的RBAC

![](http://directory.apache.org/fortress/user-guide/images/RbacDSD.png)

图片来自Apache Directory

--

## RBAC3+

带有资源继承的RBAC3

![](http://static.jamma.cn/images/rbac3+.svg)

--

### 权限 Permissions

```
  [ 
    {'id': 'post', 'title': '增'},
    {'id': 'delete', 'title': '删'},
    {'id': 'put', 'title': '改'},
    {'id': 'get', 'title': '查'}
  ]

```

--

### 资源 Resources

```
  [ 
    { 
      'id': '/acl', 'title': '权限', 'permissions': ['get'],
      'noRecursion': 1, // 是否向下传递
      'children': [
            {'id': '/isAllowed','title': '用户鉴权','permissions': ['get']},
            ...
       },
    },
    ...
  ]
```

--

### 角色 Roles

```

  [ 
    {
      'id': 'guest', 'title': '访客', 'description': '访客',
      'resources': [{
        'id': '/acl', 'permissions': ['get'],
        'children': [
          {'id': '/isAllowed', 'permissions': ['get']},
        ]
      }]   
    },
    {'id': 'user', 'title': '用户',parents: ['guest]},
    ...
  ]
```

--

### 用户 Users

```
  [
    {"id": "5d9d5af874050000c7006b43","nick": "admin","roles": ["admin"]},
    ...
  ]
```

---

## 实现原理

1. load和save方法，从redis加载或保存RBAC配置

1. 加载或保存时，自动调用validateAclConfig检查配置, 只要配置有任何变化，进入下面的步骤。

1. 如果资源变化，基于资源树创建鉴权路由，实现areAnyRolesAllowed, isAllowed方法

1. 如果角色变化，基于node-acl库的memoryBackend，动态生成node-acl的实例acl

--

### 关键流程图

![](http://static.jamma.cn/images/acl_flowsheet.svg)

---

## 模块

- 核心 jm-acl

- 消息 jm-acl-mq

- 主入口 main

---

## 常见使用场景

1. ACL管理用户, 用户的角色信息由ACL负责管理，通过 isAllowed 接口对于指定用户鉴权。


1. ACL不管理用户, 用户的角色信息由其他服务负责管理，通过 areAnyRoleAllowed 接口对于指定角色鉴权。

1. 自定义角色，用户把自己拥有的权限分配给自定义的角色

--

### ACL管理用户

```
// 保存用户角色
put /acl/user/users/用户id {roles: ['admin']}

// 鉴权
get /acl/isAllowed {user: '用户id', resource: '资源id', permissions: ['权限id']}

// 例如
get /acl/isAllowed {user: '326482', resource: '/sso', permissions: ['get']}

```

--

### ACL不管理用户

```

// 鉴权
get /acl/areAnyRoleAllowed {roles: ['角色id'], resource: '资源id', permissions: ['权限id']}

// 例如
get /acl/areAnyRoleAllowed {roles: ['admin'], resource: '/sso', permissions: ['get']}

```

--

### 自定义角色

ACL不管理用户，新建服务管理用户自定义角色。

```
// 查询自己的角色拥有的权限
get /acl/roles/:role/resources

// 在自建服务创建自定义角色
post /servcie/roles {id:'自定义角色id', name: '自定义角色名称'}

// 在 acl 新建自定义角色
put /acl/roles/自定义角色id {resources:{}}

```

