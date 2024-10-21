import { fruits } from '../modules/fruits'
import { StatisticType } from '../types'

import cls from './Statistics.module.scss'

export const Statistics = ({
  statistics,
  clickedStatistics,
}: {
  statistics: StatisticType[]
  clickedStatistics: StatisticType[]
}) => {
  return (
    <div className={cls.wrapper}>
      <p>Статистика</p>
      {fruits.map((fruit) => (
        <div key={fruit.name} className={cls.fruit}>
          <img src={fruit.img} alt={fruit.name} />
          <p>
            {clickedStatistics ? clickedStatistics.find((i) => i.id === fruit.name)?.count : 0} /{' '}
            {statistics ? statistics.find((i) => i.id === fruit.name)?.count : 0}
          </p>
        </div>
      ))}
    </div>
  )
}
