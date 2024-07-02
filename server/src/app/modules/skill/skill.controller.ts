import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import SkillServices from "./skill.service";

// create bulk skill
const createBulkSkill = catchAsync(async (req, res) => {
  const payload = req.body.skills;
  const result = await SkillServices.createBulkSkills(payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Bulk Skill created successfully.",
    data: result,
  });
});

// create single skill
const createSingleSkill = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await SkillServices.createSingleSkill(payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Skill created successfully.",
    data: result,
  });
});

// get all skills
const getAllSkills = catchAsync(async (req, res) => {
  const result = await SkillServices.getAllSkills();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Skills fetched successfully.",
    data: result,
  });
});
const SkillController = {
  createBulkSkill,
  createSingleSkill,
  getAllSkills,
};

export default SkillController;
