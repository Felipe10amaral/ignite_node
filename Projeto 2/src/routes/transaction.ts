import crypto, { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { nex } from '../database'
import { z } from 'zod'

export async function registerTransactions(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createTransactions = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    // validando para saber se a requisição tem o mesmo padrão exigido pela api
    const { title, amount, type } = createTransactions.parse(request.body)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
      })
    }

    await nex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.code(201).send()
  })

  app.get('/', async () => {
    const dataTransactions = await nex('transactions').select('*')

    return {
      dataTransactions,
    }
  })

  app.get('/:id', async (request) => {
    const getTransactions = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactions.parse(request.params)

    const dataTransactions = await nex('transactions').where('id', id).first()

    return {
      dataTransactions,
    }
  })

  app.get('/summary', async () => {
    const summary = await nex('transactions')
      .sum('amount', { as: 'amount' })
      .first()

    return {
      summary,
    }
  })
}
