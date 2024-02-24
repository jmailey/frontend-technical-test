// eslint-disable-next-line import/no-extraneous-dependencies
import { renderHook, act } from '@testing-library/react-hooks';
import useData from '../useData';
import getData from '../../../api/index';

jest.mock('../../../api/index', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('useData hook', () => {
  it('fetches data correctly', async () => {
    const mockData = [{ id: 'ftype', price: '£30,000' }, { id: 'fpace', price: '£40,000' }];
    getData.mockResolvedValueOnce(mockData);

    await act(async () => {
      const { result, waitForNextUpdate } = renderHook(() => useData());
      const [initialLoading] = result.current;
      expect(initialLoading).toBe(true);

      await waitForNextUpdate();
      const [loading, error, vehicles] = result.current;

      expect(loading).toBe(false);
      expect(error).toBe('');
      expect(vehicles).toEqual(mockData);
    });
  });

  it('handles error correctly', async () => {
    const mockError = 'Failed to fetch data';
    getData.mockRejectedValueOnce(mockError);
    await act(async () => {
      const { result, waitForNextUpdate } = renderHook(() => useData());
      const [initialLoading] = result.current;
      expect(initialLoading).toBe(true);

      await waitForNextUpdate();
      const [loading, error, vehicles] = result.current;
      expect(loading).toBe(false);
      expect(error).toBe(mockError);
      expect(vehicles).toEqual([]);
    });
  });
});
