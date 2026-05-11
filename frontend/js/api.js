const API_URL = '/api';

window.API = {
  call: async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers
    };

    try {
      const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
      const data = await res.json();
      
      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login.html';
        }
        throw new Error(data.message || 'Something went wrong');
      }
      return data;
    } catch (err) {
      if (window.UI) window.UI.showToast(err.message, 'error');
      throw err;
    }
  }
};
