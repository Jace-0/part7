const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    author: String,
    url: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    comments : {
        type: [String],
        default: []  // This ensures existing documents get an empty array
    }
  })
  
blogSchema.set('toJSON', {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        // console.log(returnedObject.id)
        delete returnedObject._id
        delete returnedObject.__v
    }
})
const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog