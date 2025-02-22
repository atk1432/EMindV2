export type CardNames = "PSS" | "HLL"

export interface ContentQuestionProps {
  describe?: string,
  image?: any,
  questions: string[],
  answers: string[],
  name: CardNames
}

export interface CardsProp {
  type: "questions",
  name: CardNames,
  title: string,
  content: ContentQuestionProps,
  describe?: string,
  image: any
}


export const Cards : CardsProp[] = [
  {
    type: "questions",
    name: "PSS",
    title: "Câu hỏi đánh giá stress",
    content: {
      name: "PSS",
      describe: "PSS-10 (Perceived Stress Scale - 10 items) là một công cụ đo lường mức độ căng thẳng được cảm nhận trong cuộc sống hàng ngày. Nó được phát triển bởi Sheldon Cohen và đồng nghiệp vào năm 1983 và được sử dụng rộng rãi trong nghiên cứu tâm lý học để đánh giá mức độ căng thẳng chủ quan của một người trong khoảng 1 tháng qua",
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

export interface ScoresStorage {
  name: CardNames,
  score: number
} 