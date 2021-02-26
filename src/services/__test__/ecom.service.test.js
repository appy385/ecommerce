const { createEcom } = require('../ecom.service');
const {
  Category, Item, Feature, Value, FeatureValue, ItemFeature, CategoryItem,
} = require('../../models/index');

describe('createEcom', () => {
  it('should resolve with success', async () => {
    const category = ['shoe'];
    jest.spyOn(Category, 'create').mockResolvedValue();
    jest.spyOn(Category, 'update').mockResolvedValue();
    jest.spyOn(Item, 'create').mockResolvedValue();
    jest.spyOn(Item, 'update').mockResolvedValue();
    jest.spyOn(Value, 'create').mockResolvedValue();
    jest.spyOn(Value, 'update').mockResolvedValue();
    jest.spyOn(Feature, 'create').mockResolvedValue();
    jest.spyOn(Feature, 'update').mockResolvedValue();
    jest.spyOn(FeatureValue, 'create').mockResolvedValue();
    jest.spyOn(FeatureValue, 'update').mockResolvedValue();
    jest.spyOn(ItemFeature, 'create').mockResolvedValue();
    jest.spyOn(ItemFeature, 'update').mockResolvedValue();
    jest.spyOn(CategoryItem, 'create').mockResolvedValue();
    jest.spyOn(CategoryItem, 'update').mockResolvedValue();
    const response = await createEcom(category);
    expect(response).toEqual('Success');
  });
});
