document.addEventListener('DOMContentLoaded', async () => {
  Auth.requireAuth();

  const resultsGrid = document.getElementById('resultsGrid');
  const user = Auth.getUser();

  try {
    const res = await window.API.call('/schemes/match', {
      method: 'POST',
      body: JSON.stringify(user)
    });

    const matches = res.data;

    if (matches.length === 0) {
      resultsGrid.innerHTML = `
        <div class="card text-center" style="grid-column: 1 / -1; padding: 4rem;">
          <h3 style="margin-bottom: 1rem;">No schemes found</h3>
          <p style="color: var(--text-light); margin-bottom: 1.5rem;">We couldn't find any schemes matching your current profile.</p>
          <a href="/quiz.html" class="btn btn-outline">Retake Quiz</a>
        </div>
      `;
      return;
    }

    resultsGrid.innerHTML = matches.map(match => `
      <div class="card" style="display: flex; flex-direction: column;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
          <h3 style="font-size: 1.25rem; color: var(--primary);">${match.scheme.name}</h3>
          <span style="background: ${match.matchPercent >= 80 ? '#10b981' : '#f59e0b'}; color: white; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.875rem; font-weight: 600;">
            ${match.matchPercent}% Match
          </span>
        </div>
        
        <p style="color: var(--text-light); margin-bottom: 1.5rem; flex-grow: 1;">${match.scheme.shortDesc}</p>
        
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
          <h4 style="font-size: 0.875rem; color: #166534; margin-bottom: 0.5rem; text-transform: uppercase;">Key Benefit</h4>
          <p style="font-weight: 500;">${match.scheme.benefit}</p>
        </div>

        <div style="display: flex; gap: 1rem;">
          <a href="/scheme.html?id=${match.scheme._id}" class="btn btn-primary" style="flex: 1; text-align: center;">View Details</a>
          <button onclick="saveScheme('${match.scheme._id}')" class="btn btn-outline">Save</button>
        </div>
      </div>
    `).join('');

  } catch (err) {
    resultsGrid.innerHTML = `<div class="card error" style="grid-column: 1 / -1;">Failed to load matches.</div>`;
  }
});

window.saveScheme = async (schemeId) => {
  try {
    const res = await window.API.call('/user/schemes/save', {
      method: 'POST',
      body: JSON.stringify({ schemeId })
    });
    window.API.showToast('Scheme saved to dashboard!');
  } catch (err) {
    // API will show toast
  }
};
