import React from "react"
import { CardNames } from "../CardDatas";


const LevelProps = [
  { name: "Nhẹ", color: "green"} ,  
  { name: "Vừa", color: "#ffdd39"} , 
  { name: "Nặng", color: "red"}
]

interface ResultScoreProps {
  score?: number,
  level?: typeof LevelProps[0],
  describe?: string
}

/**
 * Set scores inside ref object
 * 
 * @param scores: Ref object need to set (number type)
 * @param questionIndex: Question index, start from zero
 * @param answerIndex: Answer index, start from zero
 * @param name: Name of type question, follow CardNames type
 */
export function setScoreForQuestion(
  scores: React.MutableRefObject<any>,
  questionIndex: number,
  answerIndex: number,
  name: CardNames
) {
  switch (name) {
    case 'PSS':
      if ([ 3, 4, 6 ].includes(questionIndex)) {
        scores.current[questionIndex] = [4, 3, 2, 1, 0][answerIndex]
      } else {
        scores.current[questionIndex] = answerIndex
      }
      break
  }
}

export function getResultFromScores(
  scores: React.MutableRefObject<any>,
  name: CardNames 
) {
  switch (name) {
    case 'PSS':
      const score: any = Object.values(scores.current).reduce((a: any, b: any) => a + b, 0)
      var results: ResultScoreProps
      if (score <= 13) {
        results = {
          level: LevelProps[0],
          describe: ''
        }
      } else if (score > 13 && score <= 26) {
        results = {
          level: LevelProps[1]
        }
      } else {
        results = {
          level: LevelProps[2]
        }
      }

      results.score = score

      return results
  }
}