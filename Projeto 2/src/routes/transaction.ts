import crypto from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { nex } from '../database'
import { z } from 'zod'

export async function registerTransactions(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createTransactions = z.object({
      text: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    // validando para saber se a requisição tem o mesmo padrão exigido pela api
    const { text, amount, type } = createTransactions.parse(request.body)

    await nex('transactions').insert({
      id: crypto.randomUUID(),
      text,
      amount: type === 'credit' ? amount : amount * -1,
    })

    return reply.code(201).send()
  })
}
