import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TMeta } from '../../utils/sendResponse';
import { Image } from '../image/image.model';
import { TProject } from './project.interface';
import Project from './project.model';
import QueryBuilder from '../../builder/QueryBuilder';

// create project
const createProject = async (payload: TProject): Promise<TProject> => {
  // check is image id is valid
  if (payload.image) {
    const isImageExist = await Image.findById(payload.image);
    if (!isImageExist) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Image not founded.');
    }
  }

  // create
  const result = await Project.create(payload);

  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create project.');
  }

  return result;
};

// get all projects
const getAllProject = async (
  query: Record<string, unknown>,
): Promise<{ data: TProject[]; meta: TMeta }> => {
  // Create a shallow copy of the query object
  const queryObj = { ...query };
  ['tags', 'technologies', ''].forEach((item) => {
    delete queryObj[item];
  });

  // Convert comma-separated string to array for each filterable field
  const tags = (query?.tags as string)?.split(',').filter(Boolean);
  const technologies = (query?.technologies as string)
    ?.split(',')
    .filter(Boolean);

  // Build the query object based on the presence of filterable fields
  if (tags?.length) {
    queryObj['tags'] = { $in: tags };
  }
  if (technologies?.length) {
    queryObj['technologies'] = { $in: technologies };
  }

  // Create a QueryBuilder instance for projects
  const projectModelQuery = new QueryBuilder(
    Project.find(queryObj)
      .populate('tags')
      .populate('image')
      .populate('createdBy'),
    queryObj,
  )
    .search(['title', 'description']) // Add searchable fields if needed
    .filter()
    .sort()
    .fields()
    .paginate();

  // Execute the query to get the data
  const data = await projectModelQuery.modelQuery;

  // Get the total count of items for pagination
  const meta = await projectModelQuery.countTotal();

  return { data, meta };
};

// delete single project
const deleteSingleProject = async (id: string): Promise<TProject | null> => {
  // check is project exist
  const isProjectExist = await Project.findById(id);
  if (!isProjectExist) {
    throw new AppError(StatusCodes.NOT_FOUND, `Project not founded.`);
  }

  const result = await Project.findByIdAndDelete(id);
  return result;
};

const ProjectService = {
  createProject,
  getAllProject,
  deleteSingleProject,
};

export default ProjectService;
