define({ api: [
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/leagues?limit=12&gameType=1&page=1",
    "title": "获取赛事列表",
    "name": "GetLeagues",
    "group": "Leagues",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "field": "gameType",
            "optional": false,
            "description": "<p>游戏类型【CSGO：1， LOL: 2, DOTA2: 3】</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "limit",
            "optional": false,
            "description": "<p>每页显示条目数（步长）默认为 20</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "page",
            "optional": false,
            "description": "<p>当前页数 &gt; = 1</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>请求结果</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "data.leagues",
            "optional": false,
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.leagues.gameType",
            "optional": false,
            "description": "<p>游戏类型</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.leagues.leagueName",
            "optional": false,
            "description": "<p>赛事名称</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.leagues.level",
            "optional": false,
            "description": "<p>赛事等级</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.leagues.riskFund",
            "optional": false,
            "description": "<p>赛事风险金</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.leagues.payCeiling",
            "optional": false,
            "description": "<p>赛事单注赔付上限</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n{\n \"msg\": \"success\",\n \"status\": 1,\n \"data\": {\n   \"leagues\": [\n     {\n       \"gameType\": \"CSGO\",\n       \"leagueName\": \"CS:GO - Assembly AMD Challenge\",\n       \"level\": 1,\n       \"leagueSource\": 2,\n       \"riskFund\": 10000,\n       \"payCeiling\": 1000,\n       \"leagueStatus\": 2,\n       \"createdAt\": \"2017-04-19T08:31:16.291Z\",\n       \"leagueId\": \"58f70f261b00bbf93204fea7\"\n     }\n   ],\n   \"count\": 1\n }\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "NotFound",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"NotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/league.js"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/users/:userId",
    "title": "获取用户信息",
    "name": "GetUserInfo",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "userId",
            "optional": false,
            "description": "<p>[userId, me]参数为me时，获取登陆用户自己的信息</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>请求结果</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.username",
            "optional": false,
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.nickname",
            "optional": false,
            "description": "<p>昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.avatar",
            "optional": false,
            "description": "<p>用户头像</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.role",
            "optional": false,
            "description": "<p>用户角色</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n{\n   \"msg\": \"success\",\n     \"status\": 1,\n     \"data\": {\n       \"salt\": \"J14RTuneqmJMBD8/d/Jm3gTA6sjbaXNyI1HJIfiEuyo=\",\n       \"username\": \"15911020373\",\n       \"avatar\": \"http://192.168.2.29:3000/test1_avatar.jpg\",\n       \"updatedAt\": \"2017-03-27 10:27:15\",\n       \"createdAt\": \"2017-03-27 10:27:15\",\n       \"role\": 0,\n       \"nickname\": \"yusi\",\n       \"userId\": \"58d878838b81190732fdd202\"\n     }\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "NotFound",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"NotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/user.js"
  },
  {
    "version": "1.0.0",
    "type": "post",
    "url": "/login",
    "title": "登陆",
    "name": "login",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "username",
            "optional": false,
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "password",
            "optional": false,
            "description": "<p>用户密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>请求结果</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.username",
            "optional": false,
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.nickname",
            "optional": false,
            "description": "<p>昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.avatar",
            "optional": false,
            "description": "<p>用户头像</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data.design",
            "optional": false,
            "description": "<p>用户设计思路文稿</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.design.title",
            "optional": false,
            "description": "<p>用户设计标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.design.content",
            "optional": false,
            "description": "<p>用户设计内容</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.design.img",
            "optional": false,
            "description": "<p>用户设计图</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.role",
            "optional": false,
            "description": "<p>用户角色</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.gender",
            "optional": false,
            "description": "<p>{ 0 未知，1 男 2 女 } 用户性别.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 201 OK\n{\n   \"msg\": \"success\",\n     \"status\": 1,\n     \"data\": {\n       \"salt\": \"J14RTuneqmJMBD8/d/Jm3gTA6sjbaXNyI1HJIfiEuyo=\",\n       \"username\": \"15911020373\",\n       \"avatar\": \"http://192.168.2.29:3000/test1_avatar.jpg\",\n       \"updatedAt\": \"2017-03-27 10:27:15\",\n       \"createdAt\": \"2017-03-27 10:27:15\",\n       \"role\": \"0\",\n       \"nickname\": \"yusi\",\n       \"userId\": \"58d878838b81190732fdd202\"\n     }\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "NotFound",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"NotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/user.js"
  },
  {
    "version": "1.0.0",
    "type": "post",
    "url": "/register",
    "title": "用户注册",
    "name": "register",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "username",
            "optional": false,
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "password",
            "optional": false,
            "description": "<p>用户密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "nickname",
            "optional": false,
            "description": "<p>用户密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>请求结果</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.username",
            "optional": false,
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.nickname",
            "optional": false,
            "description": "<p>昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.avatar",
            "optional": false,
            "description": "<p>用户头像</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.role",
            "optional": false,
            "description": "<p>用户角色</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 201 OK\n{\n   \"msg\": \"success\",\n     \"status\": 1,\n     \"data\": {\n       \"salt\": \"J14RTuneqmJMBD8/d/Jm3gTA6sjbaXNyI1HJIfiEuyo=\",\n       \"username\": \"15911020373\",\n       \"avatar\": \"http://192.168.2.29:3000/test1_avatar.jpg\",\n       \"updatedAt\": \"2017-03-27 10:27:15\",\n       \"createdAt\": \"2017-03-27 10:27:15\",\n       \"role\": \"0\",\n       \"nickname\": \"yusi\",\n       \"userId\": \"58d878838b81190732fdd202\"\n     }\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "NotFound",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"NotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/user.js"
  },
  {
    "version": "1.0.0",
    "type": "post",
    "url": "/requestSmsCode",
    "title": "获取短信验证码",
    "name": "requestSmsCode",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "username",
            "optional": false,
            "description": "<p>用户名</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>请求结果</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 201 OK\n{\n   \"msg\": \"获取短信验证码成功\",\n     \"status\": 1,\n     \"data\": {\n     }\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "NotFound",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"NotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/user.js"
  },
  {
    "version": "1.0.0",
    "type": "put",
    "url": "/users/:userId",
    "title": "更新用户信息",
    "name": "updateUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "userId",
            "optional": false,
            "description": "<p>用户信息Id∑</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request-Example:",
        "content": "{\n\"userId\":\"58d878838b81190732fdd202\",\n\"nickname\": \"昵称\",\n\"avatar\": \"avatar.jpg\",\n}\n",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>请求结果</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n{\n    \"msg\": \"更新成功！\",\n    \"status\": 1,\n    \"data\": {}\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "NotFound",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"NotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/user.js"
  },
  {
    "version": "1.0.0",
    "type": "post",
    "url": "/verifySmsCode",
    "title": "验证短信验证码",
    "name": "verifySmsCode",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "username",
            "optional": false,
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "smsCode",
            "optional": false,
            "description": "<p>短信验证码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>请求结果</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 201 OK\n{\n   \"msg\": \"验证成功\",\n     \"status\": 1,\n     \"data\": {\n     }\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "NotFound",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"NotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/user.js"
  }
] });