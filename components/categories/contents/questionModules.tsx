import React from "react"
import { CardNames } from "../CardDatas";

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
      console.log(score)
      if (score <= 13) {
        return 0
      } else if (score > 13 && score <= 26) {
        return 1
      } else {
        return 2
      }
      break
  }
}