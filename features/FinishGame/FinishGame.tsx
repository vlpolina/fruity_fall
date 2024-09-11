import { useRouter } from 'next/router'

import { Trees } from '@shared/Trees/Trees'

import cls from './FinishGame.module.scss'

export const FinishGame = () => {
  const router = useRouter()

  const score = 0
  const name = 'Polina'

  return (
    <div className={cls.bg}>
      <Trees />
      <p className={cls.title}>Fruity Fall</p>
      <p className={cls.gameOver}>Игра окончена!</p>
      <div className={cls.score}>
        <p>Поздравляем, {name}, вы набрали:</p>
        <p>{score} очков!</p>
      </div>
      <div className={cls.play}>
        <p>Что, понравилась игра? Тогда</p>
        <button onClick={() => router.push('/')}>Играть ещё!</button>
      </div>
    </div>
  )
}
