const service = require('../../services/ecom.service');
const { createEcomHandler } = require('../ecom.handler');

describe('createEcom', () => {
  let mockSend;
  let mockResponse;
  beforeEach(() => {
    mockSend = jest.fn();
    mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
  });
  it('should resolve with success', async () => {
    const mockRequestObject = {
      query: {
        name: '["hey"]',
      },
    };
    jest.spyOn(service, 'createEcom').mockResolvedValue('Succcess');
    await createEcomHandler(mockRequestObject, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith('Succcess');
  });
  it('should go to catch block return status 500', async () => {
    const mockRequestObject = {
      query: {
        name: '["hey"]',
      },
    };
    jest.spyOn(service, 'createEcom').mockImplementation(() => { throw new Error('error'); });

    await createEcomHandler(mockRequestObject, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });
});
