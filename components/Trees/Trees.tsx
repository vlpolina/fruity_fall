import { useEffect, useState } from 'react'

import cls from './Trees.module.scss'

const trees: string[] = [
  '/img/tree1.png',
  '/img/tree2.png',
  '/img/tree3.png',
  '/img/tree4.png',
  '/img/tree5.png',
  '/img/tree6.png',
  '/img/tree7.png',
  '/img/tree8.png',
  '/img/tree9.png',
  '/img/tree10.png',
  '/img/tree11.png',
  '/img/tree12.png',
]

export const Trees = () => {
  const [randomTrees1, setRandomTrees1] = useState<number[]>([])
  const [randomTrees2, setRandomTrees2] = useState<number[]>([])
  const [randomTrees3, setRandomTrees3] = useState<number[]>([])

  const getRandomTree = () => {
    const numbers: number[] = Array.from({ length: 12 }, (_, i) => i + 1)
    const shuffledNumbers: number[] = numbers.sort(() => Math.random() - 0.5)

    return shuffledNumbers.slice(0, 12)
  }

  useEffect(() => {
    setRandomTrees1(getRandomTree())
    setRandomTrees2(getRandomTree())
    setRandomTrees3(getRandomTree())
  }, [])

  return (
    <>
      <div className={cls.bg} />
      <div className={cls.trees}>
        {Array.from({ length: 12 }).map((_, i) => (
          <img key={i} src={trees[randomTrees1[i] - 1]} alt="tree" />
        ))}
      </div>
      <div className={cls.trees1}>
        {Array.from({ length: 12 }).map((_, i) => (
          <img key={i} src={trees[randomTrees2[i] - 1]} alt="tree" />
        ))}
      </div>
      <div className={cls.trees2}>
        {Array.from({ length: 12 }).map((_, i) => (
          <img key={i} src={trees[randomTrees3[i] - 1]} alt="tree" />
        ))}
      </div>
    </>
  )
}
