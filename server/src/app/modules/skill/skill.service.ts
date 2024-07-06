import QueryBuilder from '../../builder/QueryBuilder';
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
const getAllSkills = async (query: Record<string, unknown>) => {
  // Create a QueryBuilder instance for skill
  const skillModelQuery = new QueryBuilder(
    Skill.find(query).populate('image'),
    query,
  )
    .filter()
    .sort()
    .fields()
    .paginate();

  // Execute the query to get the data
  const data = await skillModelQuery.modelQuery;

  return data;
};

const SkillServices = {
  createBulkSkills,
  createSingleSkill,
  getAllSkills,
};

export default SkillServices;
