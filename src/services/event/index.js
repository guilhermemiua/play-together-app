import { getToken } from '../../helpers';
import { api } from '../api';

export const createEvent = async ({
  sport,
  local,
  state,
  city,
  date,
  start_time,
  end_time,
  players_quantity,
}) => {
  const token = await getToken();

  return api.post(
    '/event',
    {
      sport,
      local,
      state,
      city,
      date,
      start_time,
      end_time,
      players_quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
