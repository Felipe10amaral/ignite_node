import { FastifyInstance } from "fastify"
import { nex } from "../database"


export async function registerTransactions(app: FastifyInstance) {
    app.get("/transactions", async () => {
        const transactions = await nex('transactions').select('*').returning('*')

        return transactions;
    })
}
