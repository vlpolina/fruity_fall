import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Cookies from 'js-cookie'

import { Field } from '../Field/Field'
import { fruits } from '../modules/fruits'
import { IFruit, IFruitCur } from '../types'

import cls from './GameScreen.module.scss'

export const GameScreen = () => {
  const router = useRouter()

  const [name, setName] = useState<string>('')
  const [fruitCount, setFruitCount] = useState<number>(0)
  const [timer, setTimer] = useState<string>('')
  const [score, setScore] = useState<number>(0)
  const [currentFruit, setCurrentFruit] = useState<IFruitCur>(fruits[0])
  const [pause, setPause] = useState<boolean>(false)
  const [fallenFruits, setFallenFruits] = useState<IFruit[]>([])

  const changePlaying = () => {
    setPause(!pause)
  }

  const getRandomFruit = () => {
    const numbers: number[] = Array.from({ length: 12 }, (_, i) => i + 1)
    const shuffledNumber: number = numbers.sort(() => Math.random() - 0.5)[0] - 1

    return shuffledNumber
  }

  useEffect(() => {
    setName(Cookies.get('user') || '')
    setTimer(Cookies.get('timer') || '00:00')
    setFruitCount(Number(Cookies.get('fruitCount')) || 0)
  }, [])

  useEffect(() => {
    setCurrentFruit(fruits[getRandomFruit()])
  }, [])

  // setInterval({
  //   setTimerValue()
  // }, timer)

  return (
    <div className={cls.bg}>
      <div className={cls.wrapper}>
        <p className={cls.title}>Fruity Fall</p>

        <div className={cls.control}>
          <div className={cls.outputs}>Игрок: {name}</div>
          <div className={cls.outputs}>Очки: {score}</div>
          {currentFruit && (
            <img className={cls.currentFruit} src={currentFruit.img} alt={currentFruit.id} />
          )}
          <div className={cls.outputs}>{timer}</div>
          <button className={cls.pause} onClick={() => changePlaying()}>
            {pause ? 'Пауза' : 'Играть'}
          </button>
        </div>

        <Field
          currentFruit={currentFruit}
          setScore={setScore}
          fallenFruits={fallenFruits}
          setFallenFruits={setFallenFruits}
          getRandomFruit={getRandomFruit}
          fruitCount={fruitCount}
        />
      </div>
    </div>
  )
}
