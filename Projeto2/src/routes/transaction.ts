import crypto, { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { nex } from '../database'
import { z } from 'zod'
import { checkIdSessions } from '../middlware/checkIdSessions'

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

  app.get('/', { preHandler: [checkIdSessions] }, async (request, reply) => {
    const { sessionId } = request.cookies
    const dataTransactions = await nex('transactions')
      .where('session_id', sessionId)
      .select('*')

    return {
      dataTransactions,
    }
  })

  app.get('/:id', { preHandler: [checkIdSessions] }, async (request) => {
    const { sessionId } = request.cookies
    const getTransactions = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactions.parse(request.params)

    const dataTransactions = await nex('transactions')
      .where({ session_id: sessionId, id })
      .first()

    return {
      dataTransactions,
    }
  })

  app.get('/summary', { preHandler: [checkIdSessions] }, async (request) => {
    const { sessionId } = request.cookies
    const summary = await nex('transactions')
      .where('session_id', sessionId)
      .sum('amount', { as: 'amount' })
      .first()

    return {
      summary,
    }
  })
}
