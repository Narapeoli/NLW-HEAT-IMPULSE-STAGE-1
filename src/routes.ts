import { Router } from 'express'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'
import { AuthenticateUserController } from '../src/controllers/AuthenticateUserControllers'
import { CreateMessageController } from '../src/controllers/CreateMessageController'
import { Get3LastMessagesController } from './controllers/GetLast3MessagesController'
import { ProfileUserController } from './controllers/ProfileUserController'

const router = Router()

router.post('/authenticate', new AuthenticateUserController().handle)
router.post(
  '/messages',
  ensureAuthenticated,
  new CreateMessageController().handle
)

router.get('/messages/last3', new Get3LastMessagesController().handle)
router.get('/profile', ensureAuthenticated, new ProfileUserController().handle)
export { router }
