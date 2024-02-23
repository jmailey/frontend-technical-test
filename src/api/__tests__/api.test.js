import getData from '..';
import { request } from '../helpers';

jest.mock('../helpers', () => ({
  ...jest.requireActual('../helpers'),
  request: jest.fn(),
}));

describe('getData Tests', () => {
  const safelyCallApi = async () => {
    try {
      return await getData();
    } catch (e) {
      return null;
    }
  };

  it('Should fail if initial api call is failed', () => {
    request.mockRejectedValueOnce('An error occurred');

    return expect(() => getData()).rejects.not.toBeFalsy();
  });

  it('Should make an api call to receive a list of general vehicle information', async () => {
    expect.assertions(1);
    request.mockResolvedValueOnce([]);
    await safelyCallApi();

    return expect(request).toBeCalledWith('/api/vehicles.json');
  });

  it('Should traverse and make further api calls on main results', async () => {
    expect.assertions(3);
    request.mockResolvedValueOnce([{ apiUrl: '/api/vehicle_ftype.json' }, { apiUrl: '/api/vehicle_xj.json' }]);
    request.mockResolvedValueOnce({ id: 'ftype', price: '£36,000' });
    request.mockResolvedValueOnce({ id: 'xj', price: '£40,000' });
    await safelyCallApi();

    expect(request).toBeCalledWith('/api/vehicles.json');
    expect(request).toBeCalledWith('/api/vehicle_ftype.json');
    expect(request).toBeCalledWith('/api/vehicle_xj.json');
  });

  it('Should ignore failed API calls during traversing', () => {
    request.mockResolvedValueOnce([{ apiUrl: '/api/vehicle_ftype.json' }, { apiUrl: '/api/vehicle_xj.json' }]);
    request.mockResolvedValueOnce({ id: 'ftype', price: '£36,000', media: null });
    request.mockRejectedValueOnce('An error occurred');

    expect(safelyCallApi()).resolves.toEqual([
      { id: 'ftype', price: '£36,000', media: null }
    ]);
  });

  it('Should ignore vehicles without valid price during traversing', () => {
    request.mockResolvedValueOnce([
      { id: 'ftype', apiUrl: '/api/ftype.json' },
      { id: 'xe', apiUrl: '/api/xe.json', },
      { id: 'xj', apiUrl: '/api/xj.json' }
    ]);
    request.mockResolvedValueOnce({ id: 'ftype', price: '£40,000' });
    request.mockResolvedValueOnce({ id: 'xe' });
    request.mockResolvedValueOnce({ id: 'xj', price: '' });

    expect(safelyCallApi()).resolves.toEqual([
      {
        id: 'ftype',
        price: '£40,000',
        media: null
      }
    ]);
  });

  it('Should merge media into payload if matching vehicle', () => {
    request.mockResolvedValueOnce([{
      id: 'ftype',
      apiUrl: '/api/ftype.json',
      media: [
        {
          name: 'vehicle',
          url: '/images/16x9/ftype_k17.jpg'
        },
        {
          name: 'vehicle',
          url: '/images/1x1/ftype_k17.jpg'
        }
      ]
    }, {
      id: 'xe',
      apiUrl: '/api/xe.json',
      media: [
        {
          name: 'vehicle',
          url: '/images/16x9/ftype_k17.jpg'
        },
        {
          name: 'vehicle',
          url: '/images/1x1/ftype_k17.jpg'
        }
      ]
    }, {
      id: 'xj',
      apiUrl: '/api/xj.json',
      media: [
        {
          name: 'vehicle',
          url: '/images/16x9/ftype_k17.jpg'
        },
        {
          name: 'vehicle',
          url: '/images/1x1/ftype_k17.jpg'
        }
      ]
    }]);
    request.mockResolvedValueOnce({ id: 'ftype', price: '' });
    request.mockResolvedValueOnce({ id: 'xe' });
    request.mockResolvedValueOnce({ id: 'xj', price: '£40,000' });

    expect(safelyCallApi()).resolves.toEqual([
      {
        id: 'xj',
        price: '£40,000',
        media: {
          desktop: { name: 'vehicle', url: '/images/16x9/ftype_k17.jpg' },
          mobile: { name: 'vehicle', url: '/images/1x1/ftype_k17.jpg' }
        }
      }
    ]);
  });

  it('Should return with media key as null if no media or if not all media is present', () => {
    request.mockResolvedValueOnce([
      {
        id: 'ftype',
        apiUrl: '/api/ftype.json',
        media: [{
          name: 'vehicle',
          url: '/images/16x9/ftype_k17.jpg'
        }]
      },
      { id: 'xj', apiUrl: '/api/xj.json' }
    ]);
    request.mockResolvedValueOnce({ id: 'ftype', price: '£30,000' });
    request.mockResolvedValueOnce({ id: 'xj', price: '£40,000' });

    expect(safelyCallApi()).resolves.toEqual([
      {
        id: 'ftype',
        price: '£30,000',
        media: null
      },
      {
        id: 'xj',
        price: '£40,000',
        media: null
      }
    ]);
  });
});
