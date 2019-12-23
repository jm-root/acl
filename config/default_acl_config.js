module.exports = {
  'version': 1,
  'permissions': [
    {
      'id': 'post',
      'title': '增'
    },
    {
      'id': 'delete',
      'title': '删'
    },
    {
      'id': 'put',
      'title': '改'
    },
    {
      'id': 'get',
      'title': '查'
    }
  ],
  'resources': [
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
            'put',
            'delete',
            'post',
            'get'
          ]
        },
        {
          'id': '/roles',
          'title': '角色',
          'permissions': [
            'put',
            'delete',
            'post',
            'get'
          ]
        },
        {
          'id': '/users',
          'title': '系统用户',
          'permissions': [
            'put',
            'delete',
            'post',
            'get'
          ],
          'children': [
            {
              'id': '/:id',
              'title': '指定系统用户',
              'permissions': [
                'put',
                'delete',
                'post',
                'get'
              ],
              'children': [
                {
                  'id': '/roles',
                  'title': '指定用户的角色',
                  'permissions': [
                    'get'
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      'id': '/passport',
      'title': 'Passport',
      'permissions': [
        'get',
        'post'
      ],
      'children': [
        {
          'id': '/register',
          'title': '注册',
          'permissions': [
            'post'
          ]
        },
        {
          'id': '/login',
          'title': '登陆',
          'permissions': [
            'post'
          ]
        },
        {
          'id': '/wechat',
          'title': '微信公众号登录',
          'permissions': [
            'post'
          ]
        },
        {
          'id': '/weapp',
          'title': '微信小程序登录',
          'permissions': [
            'post'
          ]
        }
      ]
    },
    {
      'id': '/sso',
      'title': 'SSO',
      'permissions': [
        'get'
      ]
    },
    {
      'id': '/user',
      'title': '用户',
      'permissions': [
        'get'
      ],
      'noRecursion': 1,
      'children': [
        {
          'id': '/users',
          'title': '用户列表',
          'permissions': [
            'post',
            'delete',
            'get',
            'put'
          ],
          'children': [
            {
              'id': '/:id',
              'title': '指定用户',
              'permissions': [
                'post',
                'delete',
                'get',
                'put'
              ],
              'children': [
                {
                  'id': '/password',
                  'title': '修改指定用户密码',
                  'permissions': [
                    'post',
                    'put'
                  ]
                },
                {
                  'id': '/exists',
                  'title': '指定用户是否存在',
                  'permissions': [
                    'get'
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      'id': '/bank',
      'title': 'Bank',
      'permissions': [
        'get'
      ],
      'noRecursion': 1,
      'children': [
        {
          'id': '/transfer',
          'title': '转账',
          'permissions': [
            'post'
          ]
        },
        {
          'id': '/users',
          'title': '用户',
          'permissions': [
            'put',
            'delete',
            'post',
            'get'
          ],
          'children': [
            {
              'id': '/:id',
              'title': '指定用户',
              'permissions': [
                'put',
                'delete',
                'post',
                'get'
              ]
            }
          ]
        },
        {
          'id': '/accounts',
          'title': '账户',
          'permissions': [
            'put',
            'delete',
            'post',
            'get'
          ],
          'children': [
            {
              'id': '/:id',
              'title': '指定账户',
              'permissions': [
                'put',
                'delete',
                'post',
                'get'
              ]
            }
          ]
        },
        {
          'id': '/transfers',
          'title': '转帐记录',
          'permissions': [
            'put',
            'delete',
            'post',
            'get'
          ],
          'children': [
            {
              'id': '/:id',
              'title': '指定转帐记录',
              'permissions': [
                'put',
                'delete',
                'post',
                'get'
              ]
            }
          ]
        },
        {
          'id': '/balances',
          'title': '余额',
          'permissions': [
            'put',
            'delete',
            'post',
            'get'
          ],
          'children': [
            {
              'id': '/:id',
              'title': '指定余额',
              'permissions': [
                'put',
                'delete',
                'post',
                'get'
              ]
            }
          ]
        },
        {
          'id': '/cts',
          'title': '货币',
          'permissions': [
            'put',
            'delete',
            'post',
            'get'
          ],
          'children': [
            {
              'id': '/:id',
              'title': '指定货币',
              'permissions': [
                'put',
                'delete',
                'post',
                'get'
              ]
            }
          ]
        }
      ]
    },
    {
      'id': '/shop',
      'title': 'Shop',
      'permissions': [
        'get'
      ],
      'noRecursion': 1,
      'children': [
        {
          'id': '/products',
          'title': '产品',
          'permissions': [
            'put',
            'delete',
            'post',
            'get'
          ],
          'children': [
            {
              'id': '/:id',
              'title': '指定产品',
              'permissions': [
                'put',
                'delete',
                'post',
                'get'
              ]
            }
          ]
        },
        {
          'id': '/orders',
          'title': '订单',
          'permissions': [
            'put',
            'delete',
            'post',
            'get'
          ],
          'children': [
            {
              'id': '/:id',
              'title': '指定订单',
              'permissions': [
                'put',
                'delete',
                'post',
                'get'
              ]
            }
          ]
        }
      ]
    },
    {
      'id': '/cny',
      'title': 'CNY',
      'permissions': [
        'get'
      ],
      'noRecursion': 1,
      'children': [
        {
          'id': '/:id',
          'title': '指定余额',
          'permissions': [
            'post',
            'get'
          ],
          'children': [
            {
              'id': '/transfer',
              'title': '转账',
              'permissions': [
                'post'
              ]
            },
            {
              'id': '/records',
              'title': '账单',
              'permissions': [
                'get'
              ]
            }
          ]
        }
      ]
    },
    {
      'id': '/tb',
      'title': 'TB',
      'permissions': [
        'get'
      ],
      'noRecursion': 1,
      'children': [
        {
          'id': '/:id',
          'title': '指定余额',
          'permissions': [
            'post',
            'get'
          ],
          'children': [
            {
              'id': '/transfer',
              'title': '转账',
              'permissions': [
                'post'
              ]
            },
            {
              'id': '/records',
              'title': '账单',
              'permissions': [
                'get'
              ]
            }
          ]
        }
      ]
    },
    {
      'id': '/wechat',
      'title': '微信公众号',
      'permissions': [
        'get'
      ],
      'noRecursion': 1
    },
    {
      'id': '/weapp',
      'title': '微信小程序',
      'permissions': [
        'post',
        'get'
      ],
      'noRecursion': 1
    },
    {
      'id': '/pay',
      'title': '支付',
      'permissions': [
        'get'
      ],
      'noRecursion': 1,
      'children': [
        {
          'id': '/prepay',
          'title': '预支付',
          'permissions': [
            'post'
          ]
        }
      ]
    },
    {
      'id': '/agent',
      'title': '代理',
      'permissions': [
        'get'
      ],
      'noRecursion': 1,
      'children': [
        {
          'id': '/agents',
          'title': '代理列表',
          'permissions': [
            'post',
            'get',
            'put'
          ],
          'children': [
            {
              'id': '/:id',
              'title': '指定代理',
              'permissions': [
                'post',
                'delete',
                'get',
                'put'
              ]
            }
          ]
        }
      ]
    },
    {
      'id': '/log',
      'title': '日志',
      'permissions': [
        'get'
      ],
      'noRecursion': 1,
      'children': [
        {
          'id': '/logs',
          'title': '日志列表',
          'permissions': [
            'post',
            'delete',
            'get',
            'put'
          ]
        }
      ]
    },
    {
      'id': '/verifycode',
      'title': '验证',
      'permissions': [
        'get'
      ],
      'children': [
        {
          'id': '/:key/check',
          'title': '验证验证码',
          'permissions': [
            'get'
          ]
        },
        {
          'id': '/:key',
          'title': '获取验证码',
          'permissions': [
            'get'
          ]
        }
      ]
    }
  ],
  'roles': [
    {
      'id': 'root',
      'title': '超级管理员',
      'description': '超级管理员'
    },
    {
      'id': 'guest',
      'title': '访客',
      'description': '访客',
      'resources': [
        {
          'id': '/acl',
          'permissions': [
            'get'
          ],
          'children': [
            {
              'id': '/isAllowed',
              'permissions': [
                'get'
              ]
            },
            {
              'id': '/areAnyRolesAllowed',
              'permissions': [
                'get'
              ]
            }
          ]
        },
        {
          'id': '/passport',
          'permissions': [
            'get',
            'post'
          ]
        },
        {
          'id': '/sso',
          'permissions': [
            'get'
          ]
        },
        {
          'id': '/user',
          'permissions': [
            'get'
          ]
        },
        {
          'id': '/bank',
          'permissions': [
            'get'
          ]
        },
        {
          'id': '/cny',
          'permissions': [
            'get'
          ]
        },
        {
          'id': '/tb',
          'permissions': [
            'get'
          ]
        },
        {
          'id': '/wechat',
          'permissions': [
            'get'
          ]
        },
        {
          'id': '/pay',
          'permissions': [
            'get'
          ],
          'children': [
            {
              'id': '/prepay',
              'permissions': [
                'post'
              ]
            }
          ]
        },
        {
          'id': '/agent',
          'permissions': [
            'get'
          ]
        }
      ]
    },
    {
      'id': 'user',
      'title': '用户',
      'description': '已登陆用户',
      'parents': [
        'guest'
      ],
      'resources': [
        {
          'id': '/user',
          'children': [
            {
              'id': '/users',
              'children': [
                {
                  'id': '/:id',
                  'permissions': [
                    'delete',
                    'post',
                    'put'
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      'id': 'admin',
      'title': '系统管理员',
      'description': '系统管理员',
      'parents': [
        'user'
      ],
      'resources': []
    }
  ]
}
