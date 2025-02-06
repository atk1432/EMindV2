export interface ContentQuestionProps {
  describe?: string,
  image?: any,
  questions: string[],
  answers: string[]
}

export interface CardsProp {
  type: "questions",
  name: string,
  title: string,
  content: ContentQuestionProps,
  describe?: string,
  image: any
}

export const Cards : CardsProp[] = [
  {
    type: "questions",
    name: "PSS",
    title: "Câu hỏi đánh giá stress (PSS-10)",
    content: {
      describe: "PSS-10 là công cụ để đánh giá stress",
      image: require("@/assets/images/contents/stress.jpg"),
      questions: [
        "Cảm thấy khó chịu vì những điều bất ngờ xảy ra trong cuộc sống?",
        "Cảm thấy mất kiểm soát đối với những điều quan trọng trong cuộc sống?",
        "Cảm thấy căng thẳng và áp lực?",
        "Cảm thấy tự tin về khả năng kiểm soát những vấn đề cá nhân?",
        "Cảm thấy rằng mọi thứ đang diễn ra theo đúng ý bạn?",
        "Cho rằng bạn không thể kiểm soát được những điều khiến bạn tức giận?",
        "Cảm thấy rằng bạn đang kiểm soát được mọi thứ?",
        "Cảm thấy khó khăn khi đối phó với tất cả những việc bạn phải làm?",
        "Không thể kiểm soát những lo lắng của bản thân?",
        "Cảm thấy rằng mọi thứ không suôn sẻ như bạn mong đợi?"
      ],
      answers: [
        "Không bao giờ",
        "Hiếm khi",
        "Thỉnh thoảng",
        "Thường xuyên",
        "Rất thường xuyên"
      ]
    },
    image: require("@/assets/images/categories/stress.jpg")
  }
] 