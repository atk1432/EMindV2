export interface ContentQuestionProps {
  describe?: string,
  image?: any
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
      image: require("@/assets/images/contents/stress.jpg")
    },
    image: require("@/assets/images/categories/stress.jpg")
  }
] 