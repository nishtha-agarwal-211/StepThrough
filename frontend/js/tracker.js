document.addEventListener('DOMContentLoaded', async () => {
  Auth.requireAuth();
  const trackerList = document.getElementById('trackerList');

  try {
    const res = await window.API.call('/user/schemes');
    const schemes = res.data.filter(s => s.schemeId.deadline && s.status !== 'applied' && s.status !== 'approved');

    if (schemes.length === 0) {
      trackerList.innerHTML = `<div class="card"><p>No upcoming deadlines for your saved schemes!</p></div>`;
      return;
    }

    // Sort by deadline
    schemes.sort((a, b) => new Date(a.schemeId.deadline) - new Date(b.schemeId.deadline));

    trackerList.innerHTML = schemes.map(item => {
      const deadline = new Date(item.schemeId.deadline);
      const today = new Date();
      const diffTime = deadline - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      let colorClass = 'success';
      if (diffDays < 7) colorClass = 'danger';
      else if (diffDays < 30) colorClass = 'accent';

      return `
        <div class="card" style="display: flex; justify-content: space-between; align-items: center; border-left: 4px solid var(--${colorClass});">
          <div>
            <h3 style="color: var(--primary);">${item.schemeId.name}</h3>
            <p style="color: var(--text-light); font-size: 0.875rem;">Deadline: ${deadline.toLocaleDateString()}</p>
          </div>
          <div style="text-align: right;">
            <h2 style="color: var(--${colorClass}); margin-bottom: 0.5rem;">${diffDays > 0 ? diffDays + ' days left' : 'Passed'}</h2>
            <a href="/scheme.html?id=${item.schemeId._id}" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.875rem;">Apply Now</a>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    trackerList.innerHTML = `<div class="card error">Failed to load tracker.</div>`;
  }
});
