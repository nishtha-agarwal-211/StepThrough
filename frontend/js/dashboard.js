document.addEventListener('DOMContentLoaded', () => {
  Auth.requireAuth();
  const user = Auth.getUser();
  document.getElementById('welcomeText').innerText = `Welcome back, ${user.name.split(' ')[0]}`;

  window.switchTab = (tab) => {
    document.querySelectorAll('.side-nav a').forEach(a => a.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('tab-saved').style.display = tab === 'saved' ? 'block' : 'none';
    document.getElementById('tab-ai').style.display = tab === 'ai' ? 'block' : 'none';
    
    if(tab === 'ai') loadAIHistory();
  };

  const loadSavedGuides = async () => {
    try {
      const res = await window.API.call('/user/saved');
      const grid = document.getElementById('savedGrid');
      
      if(res.data.length === 0) {
        grid.innerHTML = `<div class="card text-center" style="grid-column: 1/-1;"><p>No saved guides yet.</p><a href="/library.html" class="btn btn-primary" style="margin-top:1rem;">Browse Library</a></div>`;
        return;
      }

      grid.innerHTML = res.data.map(item => {
        const g = item.guideId;
        if(!g) return ''; // If guide was deleted
        return `
          <div class="card" style="display: flex; flex-direction: column;">
            <h3 style="color: var(--primary); margin-bottom: 0.5rem;">${g.title}</h3>
            <p style="font-size: 0.9rem; flex-grow: 1; margin-bottom: 1rem;">${g.shortDesc}</p>
            
            <div style="margin-bottom: 1rem;">
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
                <span>Progress</span>
                <span>${item.progress}%</span>
              </div>
              <div style="height: 6px; background: var(--border); border-radius: 999px; overflow: hidden;">
                <div style="height: 100%; width: ${item.progress}%; background: var(--success);"></div>
              </div>
            </div>

            <div style="display: flex; gap: 1rem;">
              <a href="/guide.html?slug=${g.slug}" class="btn btn-primary" style="flex: 1; text-align: center;">Continue</a>
              <button onclick="removeSaved('${g._id}')" class="btn btn-outline" style="padding: 0.75rem; border-color: var(--danger); color: var(--danger);">✕</button>
            </div>
          </div>
        `;
      }).join('');
    } catch(e) {}
  };

  window.removeSaved = async (guideId) => {
    if(!confirm('Remove this guide from your dashboard?')) return;
    try {
      await window.API.call(`/guides/save/${guideId}`, { method: 'DELETE' });
      UI.showToast('Guide removed');
      loadSavedGuides();
    } catch(e) {}
  };

  const loadAIHistory = async () => {
    try {
      const res = await window.API.call('/ai/history');
      const grid = document.getElementById('aiGrid');
      if(res.data.length === 0) {
        grid.innerHTML = `<div class="card text-center"><p>No AI guides generated yet.</p></div>`;
        return;
      }

      grid.innerHTML = res.data.map(item => `
        <div class="card" style="margin-bottom: 1rem;">
          <h3 style="margin-bottom: 0.5rem; color: var(--primary);">${item.query}</h3>
          <p style="font-size: 0.9rem; margin-bottom: 1rem;">Generated on ${new Date(item.createdAt).toLocaleDateString()}</p>
          <p style="font-size: 0.9rem; color: var(--text-dark);"><strong>Result:</strong> ${item.generatedGuide.title}</p>
          ${item.saved ? `<span class="badge badge-success" style="margin-top:1rem;">Saved to Library</span>` : ''}
        </div>
      `).join('');
    } catch(e) {}
  };

  loadSavedGuides();
});
