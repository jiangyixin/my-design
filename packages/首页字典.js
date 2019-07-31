const paperItemsContent = {
  // 智能单双列
  'app:course-list': {
    title: '标题',
    subtitle: '副标题',
    type: 'category', // 类型 分类/手动  category/manual
    showType: 'single', // 展示类型 单列/双列  single/double
    category: 55, // 当type = category 时传入
    showCount: 5, // 展示数量
    courseIds: '123,456', // 当type = manual 传入课程ids
    order: 'createdTime,DESC', // 排序，ASC升序，DESC降序 sales DESC/createdTime DESC
    isMore: 0, // 是否开启查看更多功能 1/0
  },
  // 轮播图模块
  'app:picture-carousel': {
    title: '标题',
    subtitle: '副标题',
    pictureList: [
      {
        picture: '图片链接',
        jumpUrl: '跳转链接',
      },
    ],
  },
  // 第三方课程
  'app:third-party-course': {
    title: '标题',
    subtitle: '副标题',
    courseIds: '123,124', // 当type = manual 传入课程ids
    isMore: 0, // 是否开启查看更多功能 1/0
    jumpUrl: '跳转链接', // 链接跳转至哪？
  },
  // 免费课程模块(列表内容是课时)
  'app:free-course': {
    title: '标题',
    subtitle: '副标题',
    type: 'category', // 类型 分类/手动  category/manual
    category: 55, // 当type = category 时传入
    showCount: 1, // 展示数量
    lessonIds: '123,123', // 当type = manual 传入课程ids
    order: 'createdTime,DESC', // 排序，ASC升序，DESC降序 sales DESC/createdTime DESC
    isChange: 0, // 是否开启换一换功能 1/0
    isMore: 0, // 是否开启查看更多功能 1/0
    startTime: '1234567890123,1234567890123', // 课时直播开始时间筛选, type = category
  },
  // 课时模块
  'app:course-lesson': {
    title: '标题',
    subtitle: '副标题',
    type: 'category', // 类型 分类/手动  category/manual
    category: 55, // 当type = category 时传入
    showCount: 1, // 展示数量
    lessonIds: '123,123', // 当type = manual 传入课程ids
    order: 'createdTime,DESC', // 排序，ASC升序，DESC降序 sales DESC/createdTime DESC
    isMore: 0, // 是否开启查看更多功能 1/0
  },
  // 微课模块
  'app:micro-course': {
    title: '标题',
    subtitle: '副标题',
    type: 'category', // 类型 分类/手动  category/manual
    category: 55, // 当type = category 时传入
    showCount: 1, // 展示数量
    courseIds: '123,124', // 当type = manual 传入课程ids
    order: 'createdTime,DESC', // 排序，ASC升序，DESC降序 sales DESC/createdTime DESC
    price: '123,555', // 价格区间（闭区间）
    isMore: 0, // 是否开启查看更多功能 1/0
  },
  // 资讯模块1
  'app:article-one': {
    title: '模块标题',
    showCount: 2, // 展示数量
    isChange: 0, // 是否开启换一换功能 1/0
    articleIds: '123,123', // 存储文章ids
  },
  // 资讯模块2
  'app:article-two': {
    title: '模块标题',
    articleIds: '123,123', // 存储文章ids
    isChange: 0, // 是否开启换一换功能 1/0
    isMore: 0, // 是否开启查看更多功能 1/0
  },
  // 标题模块
  'app:title': {
    content: '内容',
    jumpUrl: '跳转链接',
  },
  // 文本框模块  （常用模块什么意思）
  'app:text-box': {
    content: '内容',
    jumpUrl: '跳转链接',
  },
  // 图片模块
  'app:picture': {
    title: '标题',
    picture: '图片链接',
    jumpUrl: '跳转页面',
  },
  // 学员评价
  'app:student-appraise': [
    {
      name: '名字',
      avatar: '头像',
      content: '内容',
    },
  ],
  // 人物介绍，包含老师与学生介绍
  'app:perpon-introduce': [
    {
      name: '名字',
      title: '头衔',
      avatar: '头像',
      content: '内容',
      jumpUrl: '跳转链接',
    },
  ],
}

const pageType = [
  'apphome', // 鲸选
  'profession', // 专业
  'collegeIntroduced', // 学院介绍
]
