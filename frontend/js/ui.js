window.UI = {
  showToast: (message, type = 'success') => {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  showSpinner: (containerId) => {
    const el = document.getElementById(containerId);
    if(el) el.innerHTML = '<div class="spinner" style="margin: 2rem auto;"></div>';
  },

  clearSpinner: (containerId) => {
    const el = document.getElementById(containerId);
    if(el) el.innerHTML = '';
  }
};
