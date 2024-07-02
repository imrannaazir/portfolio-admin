import QueryBuilder from '../../builder/QueryBuilder';
import { TMeta } from '../../utils/sendResponse';
import { TExperience } from './experience.interface';
import Experience from './experience.model';

// add new experience
const addNewExperience = async (payload: TExperience) => {
  const result = await Experience.create(payload);
  return result;
};

// get all experience
const getAllExperience = async (
  query: Record<string, unknown>,
): Promise<{ data: TExperience[]; meta: TMeta }> => {
  // Create a QueryBuilder instance for experience
  const experienceModelQuery = new QueryBuilder(Experience.find(), query)
    .filter()
    .sort()
    .fields()
    .paginate();

  // Execute the query to get the data
  const data = await experienceModelQuery.modelQuery;

  // Get the total count of items for pagination
  const meta = await experienceModelQuery.countTotal();

  return { data, meta };
};

const ExperienceServices = {
  addNewExperience,
  getAllExperience,
};
export default ExperienceServices;
