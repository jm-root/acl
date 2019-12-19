---
theme : "white"
---

# acl

通用鉴权系统

<small>作者：[鱼哥](https://github.com/jammacn)</small>

---

## 目标

- 统一权限管理

---

## features

- 用户 user

- 角色 role, 支持角色继承和用户自定义角色

- 资源 resource, 支持资源树

- 权限 permission

- 存储 redis 

---

## 配置

基本配置 请参考 [jm-server](https://github.com/jm-root/ms/tree/master/packages/jm-server)

| 配置项 | 默认值 | 描述 |
| :-: | :-: | :-: |
|redis||必填, redis数据库uri|
|acl_key|'acl:'|redis key前缀|
|acl_user_key|'acl_user'| 鉴权成功后附加到headers中的key, 例如 headers.acl_user|
|super_role|'root'|超级角色|
|guest_role|'guest'|游客角色|
|user_role|'user'|登录用户角色|
|default_allow|false|是否默认允许访问未登记的资源或者权限|
|no_auto_init|false|是否禁止自动初始化|
|gateway||Gateway服务器Uri|
|service_name|'acl'|jaeger服务器Uri|
|jaeger||jaeger服务器Uri|

## jm-acl

鉴权库

## main

鉴权服务，依赖jm-acl
