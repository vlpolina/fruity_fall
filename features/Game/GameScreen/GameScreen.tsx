import { useRouter } from 'next/router'
import { useState } from 'react'

import { Field } from '../Field/Field'
import { fruits } from '../modules/fruits'

import cls from './GameScreen.module.scss'

interface IFruit {
  id: string
  img: string
}

export const GameScreen = () => {
  const router = useRouter()

  const [name, setName] = useState<string>('Polina')
  const [fruitCount, setFruitCount] = useState<number>(10)
  const [timer, setTimer] = useState<number>(90)
  const [timerValue, setTimerValue] = useState<string>('00:00')
  const [score, setScore] = useState<number>(0)
  const [currentFruit, setCurrentFruit] = useState<IFruit>(fruits[0])

  // setInterval({
  //   setTimerValue()
  // }, timer)

  return (
    <div className={cls.bg}>
      <div className={cls.wrapper}>
        <p className={cls.title}>Fruity Fall</p>

        <div className={cls.control}>
          <img className={cls.currentFruit} src={currentFruit.img} alt={currentFruit.id} />
          <div className={cls.timer}>{timerValue}</div>
          <div className={cls.timer}>{name}</div>
          <button className={cls.timer}>pause</button>

          <div className={cls.score}>Очки: {score}</div>
        </div>

        <Field />
      </div>
    </div>
  )
}
