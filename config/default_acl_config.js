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
      'noRecursion': true
    },
    {
      'id': '/acl',
      'title': '权限',
      'permissions': [
        'get'
      ],
      'noRecursion': true,
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
              ],
              'description': '',
              'noRecursion': false
            }
          ],
          'description': '',
          'noRecursion': false
        }
      ]
    },
    {
      'id': '/passport',
      'title': 'Passport',
      'permissions': [
        'get'
      ],
      'children': [
        {
          'id': '/register',
          'title': '账号注册',
          'permissions': [
            'post'
          ],
          'description': '',
          'noRecursion': false
        },
        {
          'id': '/login',
          'title': '账号登陆',
          'permissions': [
            'post'
          ],
          'description': '',
          'noRecursion': false
        },
        {
          'id': '/mobile',
          'title': '手机验证码登录',
          'description': '',
          'permissions': [
            'get',
            'post'
          ],
          'noRecursion': false,
          'children': []
        },
        {
          'id': '/wechat',
          'title': '微信公众号',
          'permissions': [
            'post',
            'get'
          ],
          'description': '',
          'noRecursion': true,
          'children': [
            {
              'id': '/login',
              'title': '登录',
              'description': '',
              'permissions': [
                'post'
              ],
              'noRecursion': false
            }
          ]
        },
        {
          'id': '/weapp',
          'title': '微信小程序',
          'permissions': [
            'post',
            'get'
          ],
          'description': '',
          'noRecursion': true,
          'children': [
            {
              'id': '/login',
              'title': '登录',
              'description': '',
              'permissions': [
                'post'
              ],
              'noRecursion': false
            }
          ]
        }
      ],
      'description': '',
      'noRecursion': true
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
      'noRecursion': true,
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
      'id': '/log',
      'title': '日志',
      'permissions': [
        'get'
      ],
      'noRecursion': true,
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
      'title': '数字验证码',
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
      ],
      'description': '纯数字，不会生成图片',
      'noRecursion': true
    },
    {
      'id': '/captcha',
      'title': '图形验证码',
      'description': '生成图形',
      'permissions': [
        'get'
      ],
      'noRecursion': false
    },
    {
      'id': '/wechat',
      'title': '微信公众号',
      'permissions': [
        'get'
      ],
      'noRecursion': true
    },
    {
      'id': '/weapp',
      'title': '微信小程序',
      'permissions': [
        'post',
        'get'
      ],
      'noRecursion': true
    },
    {
      'id': '/bank',
      'title': 'Bank',
      'permissions': [
        'get'
      ],
      'noRecursion': true,
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
      'noRecursion': true,
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
      'noRecursion': true,
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
      'noRecursion': true,
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
      'id': '/pay',
      'title': '支付',
      'permissions': [
        'get'
      ],
      'noRecursion': true,
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
      'noRecursion': true,
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
            'get'
          ],
          'children': [
            {
              'id': '/register',
              'permissions': [
                'post'
              ]
            },
            {
              'id': '/login',
              'permissions': [
                'post'
              ]
            },
            {
              'id': '/wechat',
              'permissions': [
                'post',
                'get'
              ],
              'children': [
                {
                  'id': '/login',
                  'permissions': [
                    'post'
                  ]
                }
              ]
            },
            {
              'id': '/weapp',
              'permissions': [
                'post',
                'get'
              ],
              'children': [
                {
                  'id': '/login',
                  'permissions': [
                    'post'
                  ]
                }
              ]
            },
            {
              'id': '/mobile',
              'permissions': [
                'post',
                'get'
              ]
            }
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
        },
        {
          'id': '/',
          'permissions': [
            'get'
          ]
        },
        {
          'id': '/verifycode',
          'permissions': [
            'get'
          ]
        },
        {
          'id': '/captcha',
          'permissions': [
            'get'
          ]
        },
        {
          'id': '/log',
          'permissions': [
            'get'
          ]
        },
        {
          'id': '/weapp',
          'permissions': [
            'get',
            'post'
          ]
        },
        {
          'id': '/shop',
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
