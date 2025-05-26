const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['Web App', 'Mobile App', 'Other'],
    required: [true, 'Project type is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  techStack: {
    type: [String],
    required: [true, 'Tech stack is required'],
    validate: {
      validator: function (arr) {
        return arr.length > 0
      },
      message: 'At least one technology is required'
    }
  },
  liveLink: {
    type: String,
    required: [true, 'Live link is required'],
    match: [/^https?:\/\/.+/, 'Must be a valid URL']
  },
  coverImage: {
    type: String,
    required: [true, 'Cover image URL is required'],
    match: [/^https?:\/\/.+/, 'Cover image must be a valid URL']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Project', projectSchema)
