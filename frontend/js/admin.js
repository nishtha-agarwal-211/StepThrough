document.addEventListener('DOMContentLoaded', () => {
  Auth.requireAuth();
  const user = Auth.getUser();
  if(user.role !== 'admin') return window.location.href = '/dashboard.html';

  window.switchSection = (sec) => {
    document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
    event.target.classList.add('active');
    
    ['dashboard', 'guides', 'users', 'notify'].forEach(s => {
      document.getElementById(`sec-${s}`).style.display = s === sec ? 'block' : 'none';
    });

    if(sec === 'dashboard') loadStats();
    if(sec === 'guides') loadGuides();
    if(sec === 'users') loadUsers();
  };

  const loadStats = async () => {
    try {
      const res = await window.API.call('/admin/stats');
      const { totalUsers, totalGuides, aiGensToday } = res.data;
      document.getElementById('statsGrid').innerHTML = `
        <div class="card stat-card">
          <p class="stat-label">Total Users</p>
          <p class="stat-value">${totalUsers}</p>
        </div>
        <div class="card stat-card">
          <p class="stat-label">Guides</p>
          <p class="stat-value">${totalGuides}</p>
        </div>
        <div class="card stat-card">
          <p class="stat-label">AI Gens Today</p>
          <p class="stat-value">${aiGensToday}</p>
        </div>
        <div class="card stat-card">
          <p class="stat-label">Live Online</p>
          <p class="stat-value" id="liveUserCount" style="color: var(--success);">0</p>
        </div>
      `;
    } catch(e) {}
  };

  const loadGuides = async () => {
    try {
      const res = await window.API.call('/admin/guides');
      document.getElementById('guidesList').innerHTML = res.data.map(g => `
        <div class="card" style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
              <span class="badge ${g.isPublished ? 'badge-success' : 'badge-advanced'}">${g.isPublished ? 'Published' : 'Draft'}</span>
              ${g.isAIGenerated ? `<span class="badge" style="background:var(--ai-color); color:white;">AI Generated</span>` : ''}
            </div>
            <h3 style="margin-bottom: 0.5rem;">${g.title}</h3>
            <p style="font-size: 0.9rem;">Category: ${g.category}</p>
          </div>
          <div style="display: flex; gap: 1rem;">
            ${!g.isPublished ? `<button class="btn btn-primary" onclick="publishGuide('${g._id}')">Publish</button>` : ''}
            <button class="btn btn-outline" style="border-color: var(--danger); color: var(--danger);" onclick="deleteGuide('${g._id}')">Delete</button>
          </div>
        </div>
      `).join('');
    } catch(e) {}
  };

  const loadUsers = async () => {
    try {
      const res = await window.API.call('/admin/users');
      document.getElementById('usersTable').innerHTML = res.data.map(u => `
        <tr style="border-bottom: 1px solid var(--border);">
          <td style="padding: 1rem;">${u.name}</td>
          <td style="padding: 1rem;">${u.email}</td>
          <td style="padding: 1rem;">${new Date(u.createdAt).toLocaleDateString()}</td>
        </tr>
      `).join('');
    } catch(e) {}
  };

  window.publishGuide = async (id) => {
    try {
      await window.API.call(`/admin/guides/${id}/publish`, { method: 'PUT' });
      UI.showToast('Guide published!');
      loadGuides();
    } catch(e) {}
  };

  window.deleteGuide = async (id) => {
    if(!confirm('Delete this guide?')) return;
    try {
      await window.API.call(`/admin/guides/${id}`, { method: 'DELETE' });
      UI.showToast('Guide deleted');
      loadGuides();
    } catch(e) {}
  };

  document.getElementById('notifyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const msg = document.getElementById('notifyMsg').value;
    try {
      btn.innerText = 'Sending...';
      btn.disabled = true;
      await window.API.call('/admin/notify', {
        method: 'POST',
        body: JSON.stringify({ message: msg })
      });
      UI.showToast('Broadcast sent successfully');
      document.getElementById('notifyMsg').value = '';
    } catch(e) {}
    finally {
      btn.innerText = 'Send to All Users';
      btn.disabled = false;
    }
  });

  loadStats();
});
