import { Dispatch, SetStateAction, useEffect } from 'react'

import { createId } from '../modules/createId'
import { fruits } from '../modules/fruits'
import { IFruit, IFruitCur, StatisticType } from '../types'

import cls from './Field.module.scss'

interface IProps {
  currentFruit: IFruitCur
  setScore: Dispatch<SetStateAction<number>>
  fallenFruits: IFruit[]
  setFallenFruits: Dispatch<SetStateAction<IFruit[]>>
  getRandomFruit: () => number
  fruitCount: number
  setStatistics: Dispatch<SetStateAction<StatisticType[]>>
  setClickedStatistics: Dispatch<SetStateAction<StatisticType[]>>
  pause: boolean
}

export const Field = ({
  currentFruit,
  setScore,
  fallenFruits,
  setFallenFruits,
  getRandomFruit,
  fruitCount,
  setStatistics,
  setClickedStatistics,
  pause,
}: IProps) => {
  const getRandomX = () => Math.floor(Math.random() * 980) // случайное положение по X

  const getRandomSpeed = () => Math.random() * 500 + 500 // скорость падения

  const spawnFruit = () => {
    const newFruitIndex = getRandomFruit()
    const newFruit: IFruit = {
      id: createId(),
      name: fruits[newFruitIndex].name,
      img: fruits[newFruitIndex].img,
      x: getRandomX(),
      y: -40,
      speed: getRandomSpeed(),
      isFalling: true,
    }
    setFallenFruits((prev) => [...prev, newFruit])
    setStatistics((prevStatistics) => {
      const updatedStatistics = prevStatistics.map((i) => {
        if (i.id === newFruit.name) {
          return { ...i, count: Number(i.count) + 1 }
        } else {
          return i
        }
      })
      return updatedStatistics
    })
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!pause) {
        setFallenFruits((prev) =>
          prev
            .map((fruit) => ({
              ...fruit,
              y: fruit.isFalling ? fruit.y + 1000 / fruit.speed : fruit.y,
            }))
            .filter((fruit) => fruit.y < window.innerHeight)
        )

        if (fallenFruits.filter((fruit) => fruit.isFalling).length < fruitCount) {
          spawnFruit()
        }
      }
    }, 10)

    return () => clearInterval(intervalId)
  }, [fallenFruits, fruitCount, pause])

  const handleFruitClick = (fruit: IFruit) => {
    if (pause) return
    setFallenFruits((prev) => prev.map((f) => (f.id === fruit.id ? { ...f, isFalling: false } : f)))
    setScore((prev) => prev + (fruit.name === currentFruit.name ? 1 : -1))
    setClickedStatistics((prevStatistics) => {
      const updatedStatistics = prevStatistics.map((i) => {
        if (i.id === fruit.name) {
          return { ...i, count: Number(i.count) + 1 }
        } else {
          return i
        }
      })
      return updatedStatistics
    })
    spawnFruit()
  }

  return (
    <div className={cls.bg}>
      {fallenFruits.map(
        (fruit) =>
          fruit.isFalling && (
            <img
              key={fruit.id}
              src={fruit.img}
              className={cls.fruit}
              draggable={false}
              style={{
                left: `${fruit.x}px`,
                top: `${fruit.y}px`,
              }}
              onClick={() => handleFruitClick(fruit)}
            />
          )
      )}
    </div>
  )
}
