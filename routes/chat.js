import { Router } from 'express'
import * as chatCtrl from '../controllers/chat.js'
import { decodeUserFromToken } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/', chatCtrl.index)


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', chatCtrl.create)
router.put('/:id', chatCtrl.createMessage)

export { router }