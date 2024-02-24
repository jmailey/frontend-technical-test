import { areRequiredValuesValid, request } from '../helpers';

const VehicleTable = [{
  received: { price: '£60,000', id: 'ftype' },
  expected: true
}, {
  received: { price: '', id: 'ftype' },
  expected: false
},
{
  received: {},
  expected: false
},
{
  received: { price: null, id: 'ftype' },
  expected: false
},
{
  received: { price: '£60,000', id: undefined },
  expected: false
},
{
  received: { id: 'ftype' },
  expected: false
}
];

describe('helpers', () => {
  let originalFetch;

  beforeAll(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });
  test('requiredValues returns true if all required values are present', () => {
    VehicleTable.map(({ received, expected }) => {
      return expect(areRequiredValuesValid(received, ['price', 'id'])).toEqual(expected);
    });
  });

  test('request function', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ data: 'mocked data' }),
    }));

    const apiUrl = 'https://example.com/api';
    const data = await request(apiUrl);
    expect(data).toEqual({ data: 'mocked data' });
    expect(fetch).toHaveBeenCalledWith(apiUrl);
  });
});
