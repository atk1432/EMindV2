export type CardNames = "PSS" | "HLL" | "PHQ-9"

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
  },
  {
    type: "questions",
    name: "PHQ-9",
    title: "Câu hỏi đánh giá mức độ trầm cảm",
    content: {
      name: "PHQ-9",
      describe: "PHQ-9 là một bảng câu hỏi gồm 9 mục, được sử dụng để sàng lọc và đánh giá mức độ trầm cảm",
      image: require("@/assets/images/contents/depression.jpg"),
      questions: [
        "Bạn có ít hứng thú hoặc niềm vui trong các hoạt động không?",
        "Bạn có cảm thấy buồn bã, chán nản hoặc tuyệt vọng không?",
        "Bạn có gặp khó khăn khi ngủ, ngủ quá nhiều hoặc mất ngủ không?",
        "Bạn có cảm thấy mệt mỏi hoặc thiếu năng lượng không?",
        "Bạn có chán ăn hoặc ăn quá nhiều không?",
        "Bạn có cảm thấy mình là người tệ hại, thất bại, hoặc làm thất vọng bản thân và gia đình không?",
        "Bạn có gặp khó khăn trong việc tập trung, chẳng hạn như khi đọc báo hoặc xem TV không?",
        "Bạn có cảm thấy chậm chạp, nói hoặc di chuyển chậm hơn bình thường, hoặc ngược lại, bồn chồn và di chuyển nhiều hơn bình thường không?",
        "Bạn có suy nghĩ rằng mình muốn làm hại bản thân hoặc nghĩ rằng sẽ tốt hơn nếu mình không tồn tại không?",
      ],
      answers: [
        "Không hoặc rất nhẹ",
        "Nhẹ",
        "Trung bình",
        "Nặng vừa",
        "Nặng"
      ]
    },
    image: require("@/assets/images/categories/depression.jpg")
  }
] 

export interface ScoresStorage {
  name: CardNames,
  score: number
} 