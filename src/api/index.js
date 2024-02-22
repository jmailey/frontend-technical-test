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
  const vehicleSummaryPayload = vehicleDetailsResponse.filter(isFulfilledWithValidValues).map(({ value }) => (value));
  return vehicleSummaryPayload;
}
