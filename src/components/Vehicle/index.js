import React from 'react';
import './style.scss';

export default function Vehicle({ vehicle }) {
  return (
    <div data-testid="vehicle" className="Vehicle">
      <picture className="Vehicle__image">
        <source media="(min-width:768px)" srcSet={vehicle.media.desktop.url} />
        <img src={vehicle.media.mobile.url} alt={`${vehicle.id} driving on road.`} />
      </picture>
      <div className="Vehicle__body">
        <dl className="Vehicle__details">
          <dt className="Vehicle__detail-label">ID</dt>
          <dd className="Vehicle__detail-name">{vehicle.id}</dd>
          <dt className="Vehicle__detail-label">Price</dt>
          <dd className="Vehicle__detail-price">{`From ${vehicle.price}`}</dd>
          <dt className="Vehicle__detail-label">Description</dt>
          <dd className="Vehicle__detail-description">{vehicle.description}</dd>
        </dl>
      </div>
    </div>
  );
}
