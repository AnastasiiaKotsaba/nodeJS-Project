import { Router } from 'express'
import { tagController } from './tag.controller' 

const tagRouter = Router() 

tagRouter.get('/tags', tagController.getAllTags)
tagRouter.get('/tags/:id', tagController.getTagById)

export default tagRouter