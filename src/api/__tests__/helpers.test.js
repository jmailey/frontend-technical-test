import { areRequiredValuesValid } from '../helpers';

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
  test('requiredValues returns true if all required values are present', () => {
    VehicleTable.map(({ received, expected }) => {
      return expect(areRequiredValuesValid(received, ['price', 'id'])).toEqual(expected);
    });
  });
});
