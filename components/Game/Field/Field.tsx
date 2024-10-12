import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { fruits } from '../modules/fruits'
import { IFruit, IFruitCur } from '../types'

import cls from './Field.module.scss'

interface IProps {
  currentFruit: IFruitCur
  setScore: Dispatch<SetStateAction<number>>
  fallenFruits: IFruit[]
  setFallenFruits: Dispatch<SetStateAction<IFruit[]>>
  getRandomFruit: () => number
  fruitCount: number
}

// music

export const Field = ({
  currentFruit,
  setScore,
  fallenFruits,
  setFallenFruits,
  getRandomFruit,
  fruitCount,
}: IProps) => {
  const [spawnTimeout, setSpawnTimeout] = useState(null)

  const getRandomX = () => {
    return Math.floor(Math.random() * (650 - 40)) // 40 - ширина фрукта
  }

  const getRandomSpeed = () => {
    return Math.random() * 5000 + 2000 // случайная скорость от 2 до 7 секунд
  }

  const spawnFruit = () => {
    const newFruit = getRandomFruit()
    const newSpeed = getRandomSpeed()
    setFallenFruits([
      ...fallenFruits,
      {
        id: fruits[newFruit].id,
        img: fruits[newFruit].img,
        x: getRandomX(),
        y: -40,
        speed: newSpeed,
        isFalling: true,
      },
    ])
    return { id: fruits[newFruit].id, timeout: newSpeed }
  }

  const intervalId = setInterval(() => {
    if (fallenFruits.filter((fruit) => fruit.isFalling).length < fruitCount) {
      spawnFruit()
    }
  }, 2000)

  useEffect(() => {
    const handleSpawn = () => {
      if (fallenFruits.filter((fruit) => fruit.isFalling).length < fruitCount) {
        const { id, timeout } = spawnFruit()
        setSpawnTimeout(
          //@ts-expect-error ffff
          setTimeout(() => {
            setFallenFruits((prevFallenFruits) =>
              prevFallenFruits.map((fruit) =>
                fruit.id === id ? { ...fruit, isFalling: false } : fruit
              )
            )
          }, timeout)
        )
      }
    }

    handleSpawn()

    return () => {
      //@ts-expect-error ffff
      clearTimeout(spawnTimeout)
    }
  }, [fallenFruits, fruitCount])

  useEffect(() => {
    return () => clearInterval(intervalId)
  }, [])

  // console.log(fallenFruits)

  return (
    <div className={cls.bg}>
      {fallenFruits.map((fruit, index) => (
        <img
          key={index}
          src={fruit.img}
          className={cls.fruit}
          draggable={false}
          style={{
            left: `${fruit.x}px`,
            top: `${fruit.y}px`,
            animationDuration: `${fruit.speed}ms`,
            animationPlayState: fruit.isFalling ? 'running' : 'paused',
          }}
          onClick={() => {
            if (fruit.id === currentFruit.id) setScore((prev) => prev + 1)
            else setScore((prev) => prev - 1)
            setFallenFruits(
              fallenFruits.map((f) => {
                if (f.id === fruit.id) f.isFalling = false
                return f
              })
            )
          }}
        />
      ))}
    </div>
  )
}
