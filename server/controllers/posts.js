import PostMessage from "../models/PostMessage.js"
import mongoose from 'mongoose'
export const getPosts = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get start index every page
        const total = await PostMessage.countDocuments()

        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex)
        res.status(200).json({
            data: posts,
            currentPage: Number(page),
            numberOfPages: Math.ceil(total / LIMIT)
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}
export const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await PostMessage.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

export const getPostsBySearch = async (req, res) => {
    const { search, tags } = req.query;
    console.log('req.query:', req.query)
    const searchParamsLength = Object.entries(req.query).filter((item) => item[1] !== '').length
    try {
        const title = new RegExp(search, 'i') // Test or TEST or test  => test
        const posts = await PostMessage.find({
            [`${searchParamsLength > 1 ? '$and' : '$or'}`]: [
                { title: search ? title : null },
                { tags: { $in: tags.split(',') } },
            ]
        })
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}


export const createPost = async (req, res) => {
    const post = req.body
    const newPost = await PostMessage.create(post)
    try {
        await newPost.save()
        res.status(201).json({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
    } catch (error) {
        res.status(409).json({
            message: error.message
        })
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params
    const post = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true })
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully' })

}

export const likePost = async (req, res) => {
    const { id } = req.params

    if (!req.userId) return res.json({ message: 'Unauthenticated' })

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

    const post = await PostMessage.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId))

    console.log('index', index);
    if (index == -1) {
        //like a post
        post.likes.push(req.userId)
    } else {
        //deslike a post
        post.likes = post.likes.filter((id) => id != String(req.userId));

    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })

    res.json(updatedPost)


}