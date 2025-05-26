const Project = require('../models/Project')

// GET all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.json(projects)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
}

// POST new project
const createProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body)
    res.status(201).json(newProject)
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message)
      return res.status(400).json({ errors })
    }

    res.status(500).json({ error: 'Failed to create project' })
  }
}

module.exports = { getProjects, createProject }
