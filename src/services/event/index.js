import { getToken } from '../../helpers';
import { api } from '../api';

export const createEvent = async ({
  sport,
  local,
  state_id,
  city_id,
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
      state_id,
      city_id,
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

export const editEvent = async (
  eventId,
  { local, state_id, city_id, date, start_time, end_time, players_quantity }
) => {
  const token = await getToken();

  return api.put(
    `/event/${eventId}`,
    {
      local,
      state_id,
      city_id,
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

export const deleteEvent = async (eventId) => {
  const token = await getToken();

  return api.delete(`/event/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const joinEvent = async (eventId) => {
  const token = await getToken();

  return api.post(
    '/event/join',
    {
      event_id: eventId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const disjoinEvent = async (eventId) => {
  const token = await getToken();

  return api.post(
    '/event/disjoin',
    {
      event_id: eventId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getEvents = async ({ offset, limit }) => {
  const token = await getToken();

  return api.get(`/event?offset=${offset}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getEvent = async (eventId) => {
  const token = await getToken();

  return api.get(`/event/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};