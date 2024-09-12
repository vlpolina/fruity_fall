import { dbConnect } from '../../lib/dbConnect'

// import Game from '../../models/game'

export default async function handler(req: Request, res: Response) {
  await dbConnect()

  //   if (req.method === 'GET') {
  //     const games = await Game.find({})
  //     res.status(200).json(users)
  //   } else if (req.method === 'POST') {
  //     const user = new Game(req.body)
  //     await user.save()
  //     res.status(201).json(user)
  //   } else {
  //     res.setHeader('Allow', ['GET', 'POST'])
  //     res.status(405).end('Method ${req.method} Not Allowed')
  //   }
}
