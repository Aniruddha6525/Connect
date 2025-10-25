import { api } from './api';

export const getUserRole = async (userId) => {
  try {
    const data = await api.get('/api/users/role', { params: { id: userId } });
    return data?.role || 'mentee';
  } catch (error) {
    console.error('Error getting user role:', error);
    return 'mentee';
  }
};

export const getUserDetails = async (userId) => {
  try {
    const data = await api.get('/api/users/details', { params: { id: userId } });
    return {
      role: data?.role || 'mentee',
      fullName: data?.fullName || null,
      email: data?.email || null,
    };
  } catch (error) {
    console.error('Error getting user details:', error);
    return {
      role: 'mentee',
      fullName: null,
      email: null,
    };
  }
};


