export const Emotions = [
  {
    name: 'Buồn', 
    color: '#eac41c', 
    icon: "😢",
    img: require("@/assets/images/howfeel/sad2.jpg")
  }, {
    name: 'Bình thường', 
    color: 'lightblue', 
    icon: "😐",
    img: require("@/assets/images/howfeel/neutral2.jpg")
  }, {
    name: 'Hạnh phúc', 
    color: 'green',
    icon: "😊",
    img: require("@/assets/images/howfeel/happy2.jpg")
  }, {
    name: 'Tức giận', 
    color: 'red',
    icon: "😡",
    img: require("@/assets/images/howfeel/angry2.jpg")
  }, {
    name: 'Mỉm cười', 
    color: 'lightgreen',
    icon: "😃",
    img: require("@/assets/images/howfeel/smile2.jpg")
  }
]

// For store data in AsyncStorage
export interface EmotionsStorage {
  time: number,
  index: number
}