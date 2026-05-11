document.addEventListener('DOMContentLoaded', () => {
  if (typeof io !== 'undefined') {
    const socket = io();
    
    if (Auth.isAuthenticated()) {
      const user = Auth.getUser();
      socket.emit('authenticate', user._id);
      if (user.role === 'admin') socket.emit('joinAdmin');
    }

    socket.on('notification', (data) => {
      if (window.UI) window.UI.showToast(data.message, 'success');
    });

    socket.on('activeUsers', (count) => {
      const el = document.getElementById('liveUserCount');
      if (el) el.innerText = count;
    });
  }
});
