
const mockData = {
    analysisList: [
        {
          id: 1,
          content_id: 1,
          sentiment_score: 0.51,
          sentiment_label: [1, 2, 4, 7],
          user_id: 10001,
          title: '分析1'
        },
        {
          id: 2,
          content_id: 2,
          sentiment_score: 0.72,
          sentiment_label: [3, 5, 6],
          user_id: 10001,
          title: '分析2'
        },
        {
          id: 3,
          content_id: 3,
          sentiment_score: 0.89,
          sentiment_label: [2, 4, 6],
          user_id: 10001,
          title: '分析3'
        },
        {
          id: 4,
          content_id: 4,
          sentiment_score: 0.68,
          sentiment_label: [1, 3, 5, 7],
          user_id: 10001,
          title: '分析4'
        },
        {
          id: 5,
          content_id: 5,
          sentiment_score: 0.75,
          sentiment_label: [2, 4, 6],
          user_id: 10001,
          title: '分析5'
        },
        {
          id: 6,
          content_id: 6,
          sentiment_score: 0.82,
          sentiment_label: [1, 3, 5, 7],
          user_id: 10001,
          title: '分析6'
        },
        {
          id: 7,
          content_id: 7,
          sentiment_score: 0.59,
          sentiment_label: [2, 4, 6],
          user_id: 10001,
          title: '分析7'
        },
        {
          id: 8,
          content_id: 8,
          sentiment_score: 0.93,
          sentiment_label: [1, 2, 4, 7],
          user_id: 10001,
          title: '分析8'
        },
        {
          id: 9,
          content_id: 9,
          sentiment_score: 0.47,
          sentiment_label: [3, 5, 6],
          user_id: 10001,
          title: '分析9'
        },
        {
          id: 10,
          content_id: 10,
          sentiment_score: 0.64,
          sentiment_label: [2, 4, 6],
          user_id: 10001,
          title: '分析10'
        }
      ],

   contentList: [
    {
      id: 11,
      user_id: 10001,
      content_data: "这是一段一小段聊天内容。",
      content_time: new Date("2024-03-11T08:00:00"),
      title: "关于嗡嗡嗡嗡嗡嗡嗡嗡嗡嗡嗡嗡嗡嗡嗡嗡嗡嗡的情感分析"
    },
    {
      id: 12,
      user_id: 10001,
      content_data: "又是一段聊天内容。",
      content_time: new Date("2024-03-21T09:00:00"),
      title: "分析二"
    },
    {
      id: 13,
      user_id: 10001,
      content_data: "继续聊天内容。",
      content_time: new Date("2024-03-28T10:00:00"),
      title: "分析三"
    },
    {
      id: 14,
      user_id: 10001,
      content_data: "更多聊天内容。",
      content_time: new Date("2024-03-31T11:00:00"),
      title: "分析四"
    },
    {
      id: 15,
      user_id: 10001,
      content_data: "一些聊天内容。",
      content_time: new Date("2024-03-31T12:00:00"),
      title: "分析五"
    }
  ]

}

  

  export default mockData;