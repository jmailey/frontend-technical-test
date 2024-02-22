import React from 'react';
import useData from './useData';
import './style.scss';
import Vehicle from '../Vehicle';

export default function VehicleList() {
  const [loading, error, vehicles] = useData();

  if (loading) {
    return <div data-testid="loading">Loading</div>;
  }

  if (error) {
    return <div data-testid="error">{error}</div>;
  }

  return (
    <div data-testid="results" className="VehicleList">
      {vehicles.map((vehicle) => (<Vehicle vehicle={vehicle} key={vehicle.id} />))}
    </div>
  );
}
