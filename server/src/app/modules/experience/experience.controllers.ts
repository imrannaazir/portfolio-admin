import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import ExperienceServices from './experience.services';

// add experience
const addNewExperience = catchAsync(async (req, res) => {
  const result = await ExperienceServices.addNewExperience(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Experience added successfully.',
    data: result,
  });
});

// get all experiences
const getAllExperiences = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ExperienceServices.getAllExperience(query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Experiences retrieved successfully.',
    meta: result.meta,
    data: result.data,
  });
});

const ExperienceControllers = {
  getAllExperiences,
  addNewExperience,
};

export default ExperienceControllers;
