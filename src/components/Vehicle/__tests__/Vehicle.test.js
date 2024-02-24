import React from 'react';
import { render } from '@testing-library/react';
import Vehicle from '..';

const mockVehicle = {
  id: 'fpace',
  description: "Jaguar's luxury performance SUV.",
  price: '£40,000',
  meta: {
    passengers: 5,
    drivetrain: [
      'AWD',
      'RWD'
    ],
    bodystyles: [
      'SUV'
    ],
    emissions: {
      template: 'CO2 Emissions $value g/km',
      value: 100
    }
  },
  media: {
    mobile: {
      name: 'vehicle',
      url: '/images/1x1/fpace_k17.jpg'
    },
    desktop: {
      name: 'vehicle',
      url: '/images/16x9/fpace_k17.jpg'
    }
  }
};

describe('<Vehicle /> Tests', () => {
  it('renders vehicle component', () => {
    const { queryByTestId } = render(<Vehicle vehicle={mockVehicle} />);
    expect(queryByTestId('vehicle')).not.toBeNull();
  });

  it('renders vehicle image', () => {
    const { getByAltText } = render(<Vehicle vehicle={mockVehicle} />);
    expect(getByAltText(`${mockVehicle.id}`)).not.toBeNull();
    expect(getByAltText(`${mockVehicle.id}`)).toHaveProperty('src', 'http://localhost/images/1x1/fpace_k17.jpg');
  });

  it('renders vehicle name, price and description', () => {
    const { getByTestId } = render(<Vehicle vehicle={mockVehicle} />);
    expect(getByTestId('vehicle-id')).not.toBeNull();
    expect(getByTestId('vehicle-price')).not.toBeNull();
    expect(getByTestId('vehicle-description')).not.toBeNull();
  });
});
