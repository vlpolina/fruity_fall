import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Cookies from 'js-cookie'

import { Trees } from '@components/Trees/Trees'

import cls from './FinishGame.module.scss'

export const FinishGame = () => {
  const router = useRouter()
  const [name, setName] = useState<string>('')
  const [score, setScore] = useState<string>('')
  const [fruitCount, setFruitCount] = useState<string>('')
  const [timer, setTimer] = useState<string>('')

  useEffect(() => {
    setName(Cookies.get('user') || '')
    setScore(Cookies.get('score') || '0')
    setTimer(Cookies.get('timer') || '00:00')
    setFruitCount(Cookies.get('fruitCount') || '0')
  }, [])

  return (
    <div className={cls.bg}>
      <Trees />
      <p className={cls.title}>Fruity Fall</p>
      <p className={cls.gameOver}>Игра окончена!</p>
      <div className={cls.score}>
        <p>
          Поздравляем, {name}, за {timer} при условии, что максимум падало {fruitCount} фруктов, вы
          набрали
        </p>
        <p>{score} очков!</p>
      </div>
      <div className={cls.play}>
        <p>Понравилась игра? Тогда</p>
        <button onClick={() => router.push('/')}>Играть ещё!</button>
      </div>
    </div>
  )
}
