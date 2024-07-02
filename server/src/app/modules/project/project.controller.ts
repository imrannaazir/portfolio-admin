import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import ProjectService from './project.service';

// create project
const createProject = catchAsync(async (req, res) => {
  const result = await ProjectService.createProject(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Project created successfully.',
    data: result,
  });
});

// get all project
const getAllProject = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ProjectService.getAllProject(query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Projects retrieved successfully.',
    meta: result.meta,
    data: result.data,
  });
});

// delete single  project
const deleteSingleProject = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await ProjectService.deleteSingleProject(id);
  sendResponse(res, {
    success: true,
    message: 'Project deleted successfully.',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const ProjectController = {
  createProject,
  getAllProject,
  deleteSingleProject,
};

export default ProjectController;
