module.exports = {
  redis: 'redis',
  acl_key: 'acl_key',
  acl_user_key: 'acl_user_key', // 鉴权成功后附加到headers中的key, 例如 headers.acl_user
  acl_role_key: 'acl_role_key', // 鉴权成功后附加到headers中的key, 例如 headers.acl_role
  gateway: 'gateway',
  super_role: 'super_role',
  guest_role: 'guest_role',
  user_role: 'user_role',
  default_allow: 'default_allow',
  disable_auto_init: 'disable_auto_init',
  disable_mq: 'disable_mq',
  service_name: 'service_name',
  modules: {
    'jm-server-jaeger': {
      config: {
        jaeger: 'jaeger'
      }
    }
  }
}
