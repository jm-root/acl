module.exports = {
  version: 1,
  permissions: [
    {
      id: 'post',
      title: '增'
    },
    {
      id: 'delete',
      title: '删'
    },
    {
      id: 'put',
      title: '改'
    },
    {
      id: 'get',
      title: '查'
    }
  ],
  resources: [
    {
      'id': 'global',
      'title': '全局权限',
      'permissions': [
        'post',
        'delete',
        'put',
        'get'
      ],
      'children': [
        {
          'id': '/search',
          'title': '搜索',
          'permissions': [
            'get'
          ]
        }
      ]
    },
    {
      'id': '/',
      'title': '根目录',
      'permissions': [
        'get'
      ],
      'noRecursion': 1
    },
    {
      'id': '/acl',
      'title': '权限',
      'permissions': [
        'get'
      ],
      'noRecursion': 1,
      'children': [
        {
          'id': '/isAllowed',
          'title': '用户鉴权',
          'permissions': [
            'get'
          ]
        },
        {
          'id': '/areAnyRolesAllowed',
          'title': '角色鉴权',
          'permissions': [
            'get'
          ]
        },
        {
          'id': '/resources',
          'title': '资源',
          'permissions': [
            'post',
            'delete',
            'put',
            'get'
          ]
        },
        {
          'id': '/roles',
          'title': '角色',
          'permissions': [
            'post',
            'delete',
            'put',
            'get'
          ]
        }
      ]
    }
  ],
  roles: [
    {
      id: 'root',
      title: '超级管理员',
      description: '超级管理员'
    },
    {
      id: 'guest',
      title: '访客',
      description: '访客',
      resources: [
        {
          id: 'share'
        },
        {
          id: '/acl',
          permissions: ['get', 'post'],
          children: [
            {
              id: '/isAllowed',
              permissions: ['get']
            },
            {
              id: '/areAnyRolesAllowed',
              permissions: ['get']
            }
          ]
        }
      ]
    },
    {
      id: 'user',
      title: '用户',
      description: '已登陆用户',
      parents: ['guest']
    },
    {
      id: 'admin',
      title: '管理员',
      description: '系统管理员',
      parents: ['user'],
      resources: [
        {
          'id': 'global',
          'permissions': [
            'put',
            'delete',
            'post',
            'get'
          ],
          'children': [
            {
              'id': '/search',
              'title': '搜索',
              'permissions': [
                'get'
              ]
            }
          ]
        }
      ]
    }
  ]
}
