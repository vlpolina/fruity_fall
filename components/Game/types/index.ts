export interface IFruitCur {
  id: string
  img: string
}

export interface IFruit extends IFruitCur {
  x: number
  y: number
  speed: number
  isFalling?: boolean
}
