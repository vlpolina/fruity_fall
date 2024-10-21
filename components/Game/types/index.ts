export interface IFruitCur {
  name: string
  img: string
}

export interface IFruit extends IFruitCur {
  id: string
  x: number
  y: number
  speed: number
  isFalling?: boolean
}

export type StatisticType = { id?: string; count?: number }
