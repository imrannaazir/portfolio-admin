import { TSkill } from './skill.interface';
import Skill from './skill.model';

// Create bulk skills
const createBulkSkills = async (payload: TSkill[]) => {
  const result = await Skill.insertMany(payload);
  return result;
};

// Create single skill
const createSingleSkill = async (payload: TSkill) => {
  const result = await new Skill(payload).save();
  return result;
};

// Get all skills
const getAllSkills = async () => {
  const skills = await Skill.find().exec();
  return skills;
};

const SkillServices = {
  createBulkSkills,
  createSingleSkill,
  getAllSkills,
};

export default SkillServices;
