import { useRouter } from 'next/router'
import { useState } from 'react'

import { Cross } from '@shared/Cross'

import cls from './Start.module.scss'

export const Start = () => {
  const router = useRouter()

  const [name, setName] = useState<string>('')
  const [fruitCount, setFruitCount] = useState<number>(10)
  const [timer, setTimer] = useState<number>(90)
  const [modal, setModal] = useState<boolean>(false)

  return (
    <div className={cls.bg}>
      <div className={cls.wrapper}>
        <p className={cls.title}>Fruity Fall</p>

        <div className={cls.data}>
          <div className={cls.inputs}>
            <label>Введите ваше имя</label>
            <input placeholder="Ваше имя" value={name} onChange={(v) => setName(v.target.value)} />
          </div>
          <div className={cls.inputs}>
            <label>Максимально возможное одновременное количество фруктов на игровом поле</label>
            <input
              type="number"
              value={fruitCount}
              onChange={(v) => Number(v.target.value) >= 0 && setFruitCount(Number(v.target.value))}
            />
          </div>
          <div className={cls.inputs}>
            <label>Значение таймера обратного отсчёта, секунд</label>
            <input
              type="number"
              value={timer}
              onChange={(v) => Number(v.target.value) >= 0 && setTimer(Number(v.target.value))}
            />
          </div>

          <button
            className={cls.button}
            disabled={name === '' || fruitCount < 0 || timer < 0}
            onClick={() => router.push('/game')}
          >
            Начать игру
          </button>

          <button className={cls.help} onClick={() => setModal(true)}>
            Как играть?
          </button>
        </div>
      </div>
      {modal && (
        <div className={cls.overlay}>
          <div className={cls.popup}>
            <div className={cls.row}>
              <p className={cls.rulesTitle}>Правила игры</p>
              <button className={cls.crossButton} title="Закрыть" onClick={() => setModal(false)}>
                <Cross />
              </button>
            </div>
            <div className={cls.rules}>
              <p>
                Игра заключается в том, чтобы ловить мышкой-корзинкой падающие фрукты. <br />
                После клика по кнопке &quot;Начать игру&quot; вы попадёте в фруктовый сад, где
                пришло время собирать урожай. В верхнем окошке будет отображаться тот фрукт, который
                нужно собирать сейчас. Вы должны набрать максимальное количество баллов, кликая на
                такие же фрукты.
              </p>
              <ul className={cls.ul}>
                <li>Получаете очки, кликая по нужному фрукту; </li>
                <li>Теряете очки, кликая не по тем фруктам;</li>
              </ul>
              <p>После клика по нужному фрукту, он исчезает, а вы получаете очки.</p>
              <p>
                Каждый фрукт движется со случайной скоростью сверху вниз. Одновременно на одном
                игровом поле может находиться не более N фруктов (задаётся через специальное поле).
              </p>
              <b>
                Пишите своё имя, устанавливайте таймер и количество фруктов на экране, и вперёд!
              </b>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
