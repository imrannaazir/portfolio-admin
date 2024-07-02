import { TSkillAttributes } from "./skill.interface";
import Skill from "./skill.model";

// create bulk skill
const createBulkSkills = async (payload: TSkillAttributes[]) => {
  const result = await Skill.bulkCreate(payload);
  return result;
};

// create single skill
const createSingleSkill = async (payload: TSkillAttributes) => {
  const result = await Skill.create(payload);
  return result;
};

// get all skills
const getAllSkills = async () => {
  const skills = await Skill.findAll();

  return skills;
};
const SkillServices = {
  createBulkSkills,
  createSingleSkill,
  getAllSkills,
};
export default SkillServices;
