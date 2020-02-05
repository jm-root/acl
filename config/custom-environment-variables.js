module.exports = {
  redis: 'redis',
  acl_key: 'acl_key',
  super_role: 'super_role',
  guest_role: 'guest_role',
  user_role: 'user_role',
  default_allow: 'default_allow',
  service_name: 'service_name',
  modules: {
    'jm-server-jaeger': {
      config: {
        jaeger: 'jaeger'
      }
    },
    'jm-acl-mq': {
      gateway: 'gateway'
    }
  }
}
