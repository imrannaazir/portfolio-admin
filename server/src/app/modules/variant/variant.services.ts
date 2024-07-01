import { TOption, TVariant } from './variant.interfaces';
import { Option, Variant } from './variant.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { TMeta } from '../../utils/sendResponse';

// create variant
const createVariant = async (payload: TVariant): Promise<TVariant> => {
  const result = await Variant.create(payload);
  return result;
};

// get all variant
const getAllVariant = async (
  query: Record<string, unknown>,
): Promise<{ result: TVariant[]; meta: TMeta }> => {
  const variantModelQuery = new QueryBuilder(Variant.find(), query)
    .search(['variant_name'])
    .filter()
    .fields()
    .sort()
    .paginate();

  const result = await variantModelQuery.modelQuery;
  const meta = await variantModelQuery.countTotal();

  return { result, meta };
};

// create option
const createOption = async (payload: TOption): Promise<TOption> => {
  const result = await Option.create(payload);
  return result;
};

// get all option
const getAllOption = async (
  query: Record<string, unknown>,
): Promise<{ result: TOption[]; meta: TMeta }> => {
  const optionModelQuery = new QueryBuilder(
    Option.find().populate('variantId'),
    query,
  )
    .search(['option_name'])
    .filter()
    .fields()
    .sort()
    .paginate();

  const result = await optionModelQuery.modelQuery;
  const meta = await optionModelQuery.countTotal();
  return { result, meta };
};

const VariantServices = {
  createVariant,
  getAllVariant,
  createOption,
  getAllOption,
};

export default VariantServices;
