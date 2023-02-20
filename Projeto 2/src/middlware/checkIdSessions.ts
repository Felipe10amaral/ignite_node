import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkIdSessions(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const session = request.cookies.sessionId

  if (!session) {
    return reply.status(401).send({
      error: 'Não autorizado',
    })
  }
}
