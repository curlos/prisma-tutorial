import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
app.use(express.json())

const prisma = new PrismaClient()

app.post('/', async (req: Request, res: Response) => {
  const { username, password } = req.body
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
    }
  })
})

app.get('/', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.put('/', async (req: Request, res: Response) => {
  const { id, username } = req.body
  const updatedUser = await prisma.user.update({
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
  const id = Number(req.params.id)
  const deletedUser = await prisma.user.delete({
    where: {
      id: id,
    },
  })
  res.json(deletedUser)
})

app.listen(3001, () => {
  console.log('SERVER RUNNING ON PORT 3001')
})