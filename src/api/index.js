import { request, isFulfilledWithValidValues } from './helpers';

/**
 * Pull vehicles information
 *
 * @return {Promise<Array.<vehicleSummaryPayload>>}
 */
export default async function getData() {
  try {
    const vehicles = await request('/api/vehicles.json');
    const apiUrls = vehicles.map(({ apiUrl }) => apiUrl);
    const vehicleDetailsResponse = await Promise
      .allSettled(apiUrls.map((url) => request(url)));

    const mergeMedia = (value) => {
      const matchingVehicle = vehicles.find((vehicle) => vehicle.id === value.id);
      if (!matchingVehicle || !matchingVehicle.media?.[0] || !matchingVehicle.media?.[1]) {
        return null;
      }
      return {
        mobile: matchingVehicle.media[1],
        desktop: matchingVehicle.media[0],
      };
    };

    const vehicleSummaryPayload = vehicleDetailsResponse
      .filter(isFulfilledWithValidValues)
      .map(({ value }) => ({ ...value, media: mergeMedia(value) }));

    return vehicleSummaryPayload;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
