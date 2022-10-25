import PostMessage from "../models/PostMessage.js"

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find()
        console.log('postMessages:', postMessages)
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

    res.send('this works')
}

export const createPost = (req, res) => {
    res.send("Post Creation")
}