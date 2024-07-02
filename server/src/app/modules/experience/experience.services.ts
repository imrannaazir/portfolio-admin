import { TExperience } from './experience.interface';
import Experience from './experience.model';

// add new experience
const addNewExperience = async (payload: TExperience) => {
  const result = await Experience.create(payload);
  return result;
};

const ExperienceServices = {
  addNewExperience,
};
export default ExperienceServices;
