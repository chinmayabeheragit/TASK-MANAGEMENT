import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { Dashboard as DashboardIcon } from "@mui/icons-material";

// Dummy Data for Projects
const dummyProjects = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: `Project ${index + 1}`,
  status: "In Progress",
  contact: "client@example.com",
  description: "Description of the project.",
  onboardingDate: "2024-01-01",
  deadline: "2024-12-31",
  amount: 1000,
  team: ["Team A", "Team B"],
  icon: `icon-${index + 1}`,
}));

const ProjectListPage = () => {
  const [projects, setProjects] = useState(dummyProjects);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [bulkDeleteSelected, setBulkDeleteSelected] = useState([]);
  const [newProject, setNewProject] = useState({
    name: "",
    onboardingDate: "",
    deadline: "",
    amount: 0,
    description: "",
    team: "",
    status: "In Progress",
    icon: "",
  });

  const [expandedProjectId, setExpandedProjectId] = useState(null);

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle Create Project Modal
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setNewProject({
      name: "",
      onboardingDate: "",
      deadline: "",
      amount: 0,
      description: "",
      team: "",
      status: "In Progress",
      icon: "",
    });
    setSelectedProject(null); // Clear selected project on modal close
  };

  const handleCreateProject = () => {
    if (selectedProject) {
      // Update existing project
      const updatedProjects = projects.map((project) =>
        project.id === selectedProject.id ? { ...selectedProject, ...newProject } : project
      );
      setProjects(updatedProjects);
    } else {
      // Create new project
      const newId = projects.length + 1;
      setProjects([ ...projects, { ...newProject, id: newId, icon: `icon-${newId}` } ]);
    }
    handleCloseModal();
  };

  // Handle Bulk Deletion
  const handleBulkDelete = () => {
    const remainingProjects = projects.filter(
      (project) => !bulkDeleteSelected.includes(project.id)
    );
    setProjects(remainingProjects);
    setBulkDeleteSelected([]); // Clear selection after deletion
  };

  // Select project for bulk delete
  const handleBulkSelect = (id) => {
    if (bulkDeleteSelected.includes(id)) {
      setBulkDeleteSelected(bulkDeleteSelected.filter((projectId) => projectId !== id));
    } else {
      setBulkDeleteSelected([...bulkDeleteSelected, id]);
    }
  };

  // Toggle project description visibility
  const toggleProjectDescription = (id) => {
    setExpandedProjectId(expandedProjectId === id ? null : id);
  };

  return (
    <div className="container mx-auto px-6 py-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-black">Projects</h1>
        <Link to="/admin/dashboard" className="flex items-center text-black hover:text-yellow-300">
          <Button variant="outlined" startIcon={<DashboardIcon />} className="text-black border-black hover:border-yellow-300 hover:text-yellow-300">
            Dashboard
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <Button variant="contained" color="primary" onClick={handleOpenModal} className="px-6 py-3 text-lg">
          Create Project
        </Button>
        {bulkDeleteSelected.length > 0 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleBulkDelete}
            className="ml-4 px-6 py-3 text-lg"
          >
            Bulk Delete Selected Projects
          </Button>
        )}
      </div>

      <div className="space-y-6 mb-8">
        {currentProjects.map((project) => (
          <div
            key={project.id}
            className="p-6 rounded-lg shadow-md bg-white"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <span className="text-xl font-semibold text-gray-700">{project.name}</span>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    project.status === "Completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <div className="space-x-3">
                <Button variant="outlined" onClick={() => alert(`Contact: ${project.contact}`)}>
                  Contact Client
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setSelectedProject(project);
                    setNewProject({ ...project });
                    handleOpenModal();
                  }}
                >
                  Update Project
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setProjects(projects.filter((p) => p.id !== project.id))}
                >
                  Delete
                </Button>
                <Checkbox
                  checked={bulkDeleteSelected.includes(project.id)}
                  onChange={() => handleBulkSelect(project.id)}
                />
              </div>
            </div>

            {/* Project Dates */}
            <div className="mt-3 text-sm text-gray-600">
              <div>
                <strong>Onboarding Date: </strong> {project.onboardingDate}
              </div>
              <div>
                <strong>Deadline: </strong> {project.deadline}
              </div>
            </div>

            {/* Toggle Description */}
            <div className="mt-3">
              <Button
                onClick={() => toggleProjectDescription(project.id)}
                className="text-blue-600 hover:text-blue-800"
              >
                {expandedProjectId === project.id ? "Hide Description" : "Show Description"}
              </Button>
              {expandedProjectId === project.id && (
                <div className="mt-4 bg-gray-100 p-4 rounded-lg transition-all duration-500 ease-in-out">
                  <h3 className="font-semibold text-gray-800">Project Description</h3>
                  <p className="text-gray-700">{project.description}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Button
          variant="outlined"
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
          className="px-6 py-3"
        >
          Prev
        </Button>
        <span className="px-4 py-2 text-lg font-semibold">{currentPage}</span>
        <Button
          variant="outlined"
          disabled={currentPage === Math.ceil(projects.length / projectsPerPage)}
          onClick={() => paginate(currentPage + 1)}
          className="px-6 py-3"
        >
          Next
        </Button>
      </div>

      {/* Create Project Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="modal-content p-8 bg-white rounded-lg shadow-xl w-full md:w-4/5 mx-auto mt-20">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">
            {selectedProject ? "Update Project" : "Create Project"}
          </h2>
          <form className="space-y-6">
            <TextField
              label="Project Name"
              fullWidth
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              className="mt-2"
              size="large"
              placeholder="Enter project name"
            />
            <TextField
              label="Onboarding Date"
              type="date"
              fullWidth
              value={newProject.onboardingDate}
              onChange={(e) => setNewProject({ ...newProject, onboardingDate: e.target.value })}
              className="mt-2"
              size="large"
            />
            <TextField
              label="Deadline"
              type="date"
              fullWidth
              value={newProject.deadline}
              onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
              className="mt-2"
              size="large"
            />
            <TextField
              label="Amount"
              type="number"
              fullWidth
              value={newProject.amount}
              onChange={(e) => setNewProject({ ...newProject, amount: parseFloat(e.target.value) })}
              className="mt-2"
              size="large"
              placeholder="Enter the amount"
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="mt-2"
              size="large"
              placeholder="Enter project description"
            />
            <TextField
              label="Team"
              fullWidth
              value={newProject.team}
              onChange={(e) => setNewProject({ ...newProject, team: e.target.value })}
              className="mt-2"
              size="large"
              placeholder="Enter the team"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newProject.status === "Completed"}
                  onChange={() => setNewProject({ ...newProject, status: newProject.status === "Completed" ? "In Progress" : "Completed" })}
                />
              }
              label="Mark as Completed"
              className="mt-4"
            />
            <div className="mt-6 text-right">
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateProject}
                className="px-6 py-3"
              >
                {selectedProject ? "Update" : "Create"} Project
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectListPage;
