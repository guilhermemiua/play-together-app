import { BASE_URL } from '../../services/api';

export const getImage = (imageName) => `${BASE_URL}/uploads/${imageName}`;
