const Database = require('../Configs/Database')
const Note = require('../Models/Note')

const index = async (request, response, next) => {
    try{
        const notes = await Note.find()
        return response.status(200).json({
            status: 200,
            message: "Operation successful.",
            data: notes
        })
    }catch (error){
        return response.status(500).json({
            status: 500,
            message: error.message,
            data: null
        })
    }
}

const show = async (request, response, next) => {
    try{
        const noteExists = await Note.exists({_id: request.params.id});
        if (!noteExists){
            return response.status(404).json({
                status: 404,
                message: "Note not found.",
                data: null
            })
        }
        const note = await Note.findById(request.params.id)
        if (!note){
            return response.status(404).json({
                status: 404,
                message: "Note not found.",
                data: null
            })
        }
        return response.status(200).json({
            status: 200,
            message: "Operation successful.",
            data: note
        })
    }catch (error){
        return response.status(500).json({
            status: 500,
            message: error.message,
            data: null
        })
    }
}


const store = async (request, response, next) => {
    try{
        const note = new Note({
            title: request.body.title,
            text: request.body.text,
        })
        const savedNote = await note.save()
        return response.status(201).json({
            status: 201,
            message: "Note created successfully.",
            data: savedNote
        })
    }catch (error){
        return response.status(400).json({
            status: 400,
            message: error.message,
            data: null
        })
    }
}

const update = async (request, response, next) => {
    try{
        const noteExists = await Note.exists({_id: request.params.id});
        if (!noteExists){
            return response.status(404).json({
                status: 404,
                message: "Note not found.",
                data: null
            })
        }
        await Note.findOneAndUpdate(
            {
                _id: request.params.id
            },
            {
                title: request.body.title,
                text: request.body.text
            })
        const updatedNote = await Note.findById(request.params.id)
        return response.status(200).json({
            status: 200,
            message: "Note updated successfully.",
            data: updatedNote
        })
    }catch (error){
        return response.status(404).json({
            status: 404,
            message: "Note not found. " + error.message,
            data: null
        })
    }
}

const destroy = async (request, response, next) => {
    try{
        const noteExists = await Note.exists({_id: request.params.id});
        if (!noteExists){
            return response.status(404).json({
                status: 404,
                message: "Note not found.",
                data: null
            })
        }
        const deletedNote = await Note.findByIdAndDelete(request.params.id)
        return response.status(200).json({
            status: 200,
            message: "Note deleted successfully.",
            data: deletedNote
        })
    }catch (error){
        return response.status(404).json({
            status: 404,
            message: "Note not found. " + error.message,
            data: null
        })
    }
}

module.exports = {index, show, store, update, destroy}