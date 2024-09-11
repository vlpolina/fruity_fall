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
  const [pause, setPause] = useState<boolean>(false)

  const changePlaying = () => {
    setPause(!pause)
  }

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
          <img className={cls.currentFruit} src={currentFruit.img} alt={currentFruit.id} />
          <div className={cls.outputs}>{timerValue}</div>
          <button className={cls.pause} onClick={() => changePlaying()}>
            {pause ? 'Пауза' : 'Играть'}
          </button>
        </div>

        <Field />
      </div>
    </div>
  )
}
