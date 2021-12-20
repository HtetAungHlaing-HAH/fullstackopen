const http = require('http')
const express = require('express')
const dotenv = require('dotenv').config({ path: require('find-config')('.env') })
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

//DB Connection
console.log('Connecting to MongoDB')
const mongoURL = process.env.MONGODB_BLOG_URI
mongoose.connect(mongoURL)
  .then(() => {
    console.log(`Connected to MongoDB: ${mongoURL}`)
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

//schema definition
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

//model creation
const Blog = mongoose.model('Blog', blogSchema)

//get all blogs
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

//get a blog by id
app.get('/api/blogs/:id', (request, response) => {
  Blog
    .findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      }
      else {
        response.status(404).end()
      }
    })
})

//post a new blog
app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})