import { useState } from 'react'

import { fruits } from '../modules/fruits'

import cls from './Field.module.scss'

interface IFruit {
  id: string
  img: string
}

export const Field = () => {
  const [currentFruit, setCurrentFruit] = useState<IFruit>(fruits[0])

  return (
    <div className={cls.bg}>
      <div className={cls.game}></div>
    </div>
  )
}
