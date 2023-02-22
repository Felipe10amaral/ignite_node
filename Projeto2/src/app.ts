import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { registerTransactions } from './routes/transaction'

export const app = fastify()

app.register(cookie)

app.register(registerTransactions, {
  prefix: 'transactions',
})
