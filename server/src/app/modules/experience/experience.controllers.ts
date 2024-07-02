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

const ExperienceControllers = {
  addNewExperience,
};

export default ExperienceControllers;
