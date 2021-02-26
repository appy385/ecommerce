const fetch = require('node-fetch');
// const { Json } = require('sequelize/types/lib/utils');
const { fetchItemData, fetchCategoryData } = require('../fetch.util');

const { Response } = jest.requireActual('node-fetch');

jest.mock('node-fetch');
describe('fetchCategoryData', () => {
  it('should return quotes data ', async () => {
    const response = JSON.stringify({
      name: 'shoes',
      description: 'radiant shoes',
      itemMetadata: [
        {
          id: 'shoe_1',
          name: 'nike air',
          description: 'jordan made these famous!',
        },
      ],
    });
    fetch.mockReturnValue(Promise.resolve(new Response(response)));
    const result = await fetchCategoryData();
    expect(result).toEqual(JSON.parse(response));
  });
  it('should throw error', async () => {
    fetch.mockImplementation(() => { throw new Error('error'); });
    try {
      const result = await fetchCategoryData();
    } catch (error) {
      expect(error.message).toBe('error');
    }
  });
});
describe('fetchItemData', () => {
  it('should return quotes data ', async () => {
    const mockID = '-0DZUCVFcb';
    const response = JSON.stringify({
      imageUrl: 'random image',
      features: [
        {
          name: 'Color',
          value: 'Red',
        },
      ],
    });
    fetch.mockReturnValue(Promise.resolve(new Response(response)));
    const result = await fetchItemData();
    expect(result).toEqual(JSON.parse(response));
  });
  it('should throw error', async () => {
    fetch.mockImplementation(() => { throw new Error('error'); });
    try {
      const result = await fetchItemData();
    } catch (error) {
      expect(error.message).toBe('error');
    }
  });
});
