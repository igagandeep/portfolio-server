const Project = require('../models/Project');

// GET all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

// POST new project
const createProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ errors });
    }

    res.status(500).json({ error: 'Failed to create project' });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(400).json({ error: 'Project not found' });
    }
    res
      .status(200)
      .json({ message: 'Project deleted successfully', project: deleted });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

// PUT update project by ID
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const updated = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(updated);
  } catch (err) {
    console.error('Error updating project:', err);
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ errors });
    }
    res.status(500).json({ error: 'Failed to update project' });
  }
};

module.exports = { getProjects, createProject, deleteProject, updateProject };
