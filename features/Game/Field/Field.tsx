import { useEffect, useState } from 'react'

import { fruits } from '../modules/fruits'

import cls from './Field.module.scss'

interface IFruit {
  id: string
  img: string
}

// music

export const Field = () => {
  const [currentFruit, setCurrentFruit] = useState<IFruit>(fruits[0])

  const getRandomFruit = () => {
    const numbers: number[] = Array.from({ length: 12 }, (_, i) => i + 1)
    const shuffledNumber: number = numbers.sort(() => Math.random() - 0.5)[0]

    return shuffledNumber
  }

  useEffect(() => {
    setCurrentFruit(fruits[getRandomFruit()])
  }, [])

  return (
    <div className={cls.bg}>
      <img src={currentFruit.img} className={cls.fruit} />
    </div>
  )
}
