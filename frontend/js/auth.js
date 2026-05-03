window.Auth = {
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  
  getUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  requireAuth: () => {
    if (!Auth.isAuthenticated()) {
      window.location.href = '/login.html';
    }
  },

  login: async (email, password) => {
    const res = await window.API.call('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    window.location.href = res.user.role === 'admin' ? '/admin.html' : '/dashboard.html';
  },

  register: async (name, email, password) => {
    const res = await window.API.call('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    window.location.href = '/dashboard.html';
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login.html';
  }
};
