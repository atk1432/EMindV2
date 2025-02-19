export const Emotions = [
  {
    name: 'Buồn', 
    color: '#eac41c', 
    img: require("@/assets/images/howfeel/sad2.jpg")
  }, {
    name: 'Bình thường', 
    color: 'lightblue', 
    img: require("@/assets/images/howfeel/neutral2.jpg")
  }, {
    name: 'Hạnh phúc', 
    color: 'green',
    img: require("@/assets/images/howfeel/happy2.jpg")
  }, {
    name: 'Tức giận', 
    color: 'red',
    img: require("@/assets/images/howfeel/angry2.jpg")
  }, {
    name: 'Mỉm cười', 
    color: 'lightgreen',
    img: require("@/assets/images/howfeel/smile2.jpg")
  }
]

export interface EmotionsStorage {
  time: number,
  index: number
}