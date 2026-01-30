import { Router } from 'express'
import { tagController } from './tag.controller' 

const tagRouter = Router() 

tagRouter.get('/tags', tagController.getAllTags)
tagRouter.get('/tags/:id', tagController.getTagById)
tagRouter.post('/tags', tagController.createTag)
tagRouter.patch('/tags/:id', tagController.updateTag)
tagRouter.delete('/tags/:id', tagController.deleteTag)

export default tagRouter