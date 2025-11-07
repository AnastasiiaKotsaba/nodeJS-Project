import { tagService } from './tag.service'
import { TagControllerContract } from './tag.types'

export const tagController: TagControllerContract = {
    getAllTags: async (req, res) => {
        // Отримуємо query-параметри і одразу задаємо їм тип або число, або undefined (Якщо вони не були задані)
        const skip = Number(req.query.skip) || undefined
        const take = Number(req.query.take) || undefined

        if ((req.query.skip && Number.isNaN(skip)) || (req.query.take && Number.isNaN(take))) {
            res.status(400).json("Query params must be numbers")
            return;
        }

        const responseData = await tagService.getAllTags(skip, take)
        res.status(200).json(responseData);
    },


    getTagById: async (req, res) => {
        const id = Number(req.params.id)

        if (isNaN(id)){ 
            res.status(400).json('id must be a number')
            return;
        }
        const responseIdData = await tagService.getTagById(id)

        if (!responseIdData){                            
			res.status(500).json("There was something wrong")
			return
		} 
        res.status(200).json(responseIdData)
    }
}

