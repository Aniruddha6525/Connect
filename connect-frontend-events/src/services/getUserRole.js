export const getUserRole = async (userId) => {
  try {
    // Replace with API call to your backend
    const response = await fetch(`/api/users/role?id=${userId}`);
    const data = await response.json();
    
    return data?.role || 'student';
  } catch (error) {
    console.error('Error getting user role:', error);
    return 'student'; // Default role
  }
};


