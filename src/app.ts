import express from 'express'
import 'dotenv/config'
import { router } from './routes' //Passo 8
import http from 'http'
import cors from 'cors'
import { Server, Socket } from 'socket.io'

const app = express()
app.use(cors())
const serverHttp = http.createServer(app)
const io = new Server(serverHttp, {
  cors: {
    origin: '*'
  }
})
io.on('connection', Socket => {
  console.log(`Usuário conectado no socket ${Socket.id}`)
})

app.use(express.json())

app.use(router)
//** */ Configurar uma rota de login para fazer a autenticação do usuario  */
app.get('/github', (request, response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  )
  /**
   *  Se usa a crase (´) para utilizar variáveis junto com o texto
   * Para usar o "process.env"é preciso instalar a depedendencia dotenv (yarn add dotenv) para aplicação ter acesso ao conteúdo das variáveis */
})
/**Definir uma URL de callback*/
app.get('/signin/callback', (request, response) => {
  const { code } = request.query
  return response.json(code)
})
export { serverHttp, io }
