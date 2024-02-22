import { request, isFulfilledWithValidValues } from './helpers';

/**
 * Pull vehicles information
 *
 * @return {Promise<Array.<vehicleSummaryPayload>>}
 */
export default async function getData() {
  const vehicles = await request('/api/vehicles.json');
  const apiUrls = vehicles.map(({ apiUrl }) => apiUrl);
  const vehicleDetailsResponse = await Promise
    .allSettled(apiUrls.map((url) => request(url)));

  const vehicleDetails = vehicleDetailsResponse
    .filter(isFulfilledWithValidValues)
    .map(({ value }) => (value));

  const mergeMedia = (details) => vehicles
    .filter((vehicle) => vehicle.id === details.id)
    .map((vehicle) => ({ mobile: vehicle.media[1], desktop: vehicle.media[0] }))[0];

  const vehicleSummaryPayload = vehicleDetails.map((details) => ({ ...details, media: mergeMedia(details) }));
  return vehicleSummaryPayload;
}
