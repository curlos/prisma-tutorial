import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
app.use(express.json())

const prisma = new PrismaClient()

app.post('/', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    console.log(req.body)

    const user = await prisma.appUser.create({
      data: {
        username: username,
        password: password,
      }
    })
    res.json(user)
  } catch (err) {
    res.json({ err, })
  }
})

app.post('/createManyUsers', async (req: Request, res: Response) => {
  try {
    const { userList } = req.body

    const users = await prisma.appUser.createMany({
      data: userList,
    })
    res.json(users)
  } catch (err) {
    res.json({ err, })
  }
})

app.post('/createManyCars', async (req: Request, res: Response) => {
  const { carList } = req.body

  const cars = await prisma.car.createMany({
    data: carList,
  })
  res.json(cars)
})

app.get('/', async (req: Request, res: Response) => {
  try {
    const users = await prisma.appUser.findMany({
      include: { Car: true }
    })
    res.json(users)
  } catch (err) {
    res.json({ err, })
  }
})

app.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const user = await prisma.appUser.findUnique({
      where: {
        id: Number(id),
      },
    })
    res.json(user)
  } catch (err) {
    res.json({ err, })
  }
})

app.put('/', async (req: Request, res: Response) => {
  const { id, username } = req.body
  const updatedUser = await prisma.appUser.update({
    where: {
      id: id
    },
    data: {
      username: username,
    }
  })

  res.json(updatedUser)
})

app.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const deletedUser = await prisma.appUser.delete({
      where: {
        id: id,
      },
    })
    res.json(deletedUser)
  } catch (err) {
    res.json({ err, })
  }
})

app.listen(3001, () => {
  console.log('SERVER RUNNING ON PORT 3001')
})