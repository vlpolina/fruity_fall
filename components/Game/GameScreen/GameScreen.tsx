import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Cookies from 'js-cookie'

import { Field } from '../Field/Field'
import { Statistics } from '../Statistics/Statistics'
import { fruits } from '../modules/fruits'
import { initStat } from '../modules/initialStates'
import { IFruit, IFruitCur, StatisticType } from '../types'

import cls from './GameScreen.module.scss'

export const GameScreen = () => {
  const router = useRouter()

  const [name, setName] = useState<string>('')
  const [fruitCount, setFruitCount] = useState<number>(0)
  const [timer, setTimer] = useState<string>('00:00')
  const [score, setScore] = useState<number>(0)
  const [currentFruit, setCurrentFruit] = useState<IFruitCur>(fruits[0])
  const [pause, setPause] = useState<boolean>(false)
  const [fallenFruits, setFallenFruits] = useState<IFruit[]>([])
  const [statistics, setStatistics] = useState<StatisticType[]>(initStat)
  const [clickedStatistics, setClickedStatistics] = useState<StatisticType[]>(initStat)

  const changePlaying = () => {
    setPause(!pause)
  }

  const getRandomFruit = () => {
    const numbers: number[] = Array.from({ length: 12 }, (_, i) => i + 1)
    const shuffledNumber: number = numbers.sort(() => Math.random() - 0.5)[0] - 1

    return shuffledNumber
  }

  const getRandomInterval = () => Math.floor(Math.random() * 1000 + 10000)

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault()
  }

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  useEffect(() => {
    setName(Cookies.get('user') || '')
    setTimer(Cookies.get('timer') || '00:00')
    setFruitCount(Number(Cookies.get('fruitCount')) || 0)
  }, [])

  useEffect(() => {
    setCurrentFruit(fruits[getRandomFruit()])
  }, [])

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    const changeFruit = () => {
      intervalId = setInterval(() => {
        setCurrentFruit(fruits[getRandomFruit()])
      }, getRandomInterval())
    }

    if (!pause) {
      changeFruit()
    }

    return () => clearInterval(intervalId)
  }, [pause])

  useEffect(() => {
    let timerId: NodeJS.Timeout

    const startTimer = () => {
      timerId = setInterval(() => {
        const [minutes, seconds] = timer.split(':').map(Number)

        if (seconds > 0) {
          setTimer(
            `${minutes.toString().padStart(2, '0')}:${(seconds - 1).toString().padStart(2, '0')}`
          )
        } else if (minutes > 0) {
          setTimer(`${(minutes - 1).toString().padStart(2, '0')}:59`)
        } else {
          Cookies.set('score', score.toString())
          router.push('/end')
          clearInterval(timerId)
        }
      }, 1000)
    }

    if (!pause) {
      startTimer()
    }

    return () => {
      clearInterval(timerId)
    }
  }, [pause, timer, setTimer])

  return (
    <>
      <div className={cls.bg}>
        <div className={cls.wrapper}>
          <p className={cls.title}>Fruity Fall</p>

          <div className={cls.control}>
            <div className={cls.outputs}>Игрок: {name}</div>
            <div className={cls.outputs}>Очки: {score}</div>
            {currentFruit && (
              <img className={cls.currentFruit} src={currentFruit.img} alt={currentFruit.name} />
            )}
            <div className={cls.outputs}>{timer}</div>
            <button className={cls.pause} onClick={() => changePlaying()}>
              {pause ? 'Играть' : 'Пауза'}
            </button>
          </div>
          <p>
            Внимание! После перезагрузки страницы игровой прогресс будет сброшен, и игра начнется
            заново.
          </p>
          <div className={cls.field}>
            <Statistics statistics={statistics} clickedStatistics={clickedStatistics} />
            <Field
              currentFruit={currentFruit}
              setScore={setScore}
              fallenFruits={fallenFruits}
              setFallenFruits={setFallenFruits}
              getRandomFruit={getRandomFruit}
              fruitCount={fruitCount}
              setStatistics={setStatistics}
              setClickedStatistics={setClickedStatistics}
              pause={pause}
            />
          </div>
        </div>
      </div>
    </>
  )
}
