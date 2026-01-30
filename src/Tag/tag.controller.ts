import { tagService } from './tag.service'
import { CreateTagChecked, TagControllerContract, UpdateTagChecked } from './tag.types'

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
    },

    createTag: async (req, res) => {
        const data: CreateTagChecked = req.body
        console.log(data)
        if (!data || !data.name) { 
            res.status(400).json('Name must be a string')
            return
        }
        if (typeof data.name !== 'string'){ 
            res.status(400).json('Name must be a string')
            return
        }
        const responseDataTag = await tagService.createTag(data)
        if (!responseDataTag){                            
            res.status(500).json("There was something wrong")
            return
        } 
        res.status(201).json(responseDataTag)
    }, 

    updateTag: async (req, res) => {
            const id = Number(req.params.id)
            const data: UpdateTagChecked = req.body
            console.log(data)

            if (Number.isNaN(id)) {
                res.status(400).json("Id must be a number")
                return;
            }
            if (typeof data === 'undefined') {
                res.status(422).json('There is lack of data to update')
                return;
            }
            const responseDataUpdate = await tagService.updateTag(id, data)
            if (!responseDataUpdate) {
                res.status(500).json("There was something wrong")
                return
            } 
            res.status(200).json(responseDataUpdate)
    },

    deleteTag: async (req, res) => {
        const id = Number(req.params.id)
        if (Number.isNaN(id)) {
            res.status(400).json("Id must be a number")
            return
        }
        const responseDataDelete = await tagService.deleteTag(id)

        if (!responseDataDelete) {
            res.status(500).json("There was something wrong")
            return
        }
        res.status(200).json(responseDataDelete)
    }
}

