document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');
  if(!slug) return window.location.href = '/library.html';

  let currentGuide = null;
  let savedData = null;
  let completedStepsSet = new Set();

  try {
    // 1. Fetch Guide
    const res = await window.API.call(`/guides/${slug}`);
    currentGuide = res.data;
    
    // 2. Fetch Progress if logged in
    if (Auth.isAuthenticated()) {
      try {
        const progRes = await window.API.call('/user/progress');
        const match = progRes.data.find(s => s.guideId === currentGuide._id || s.guideId._id === currentGuide._id);
        if (match) {
          savedData = match;
          completedStepsSet = new Set(match.completedSteps);
          document.getElementById('saveTopBtn').innerText = 'Saved';
          document.getElementById('saveTopBtn').disabled = true;
        }
      } catch(e) {}
    }

    renderHeader();
    renderSteps();
    updateProgressUI();

  } catch (err) {
    document.getElementById('guideHeader').innerHTML = `<div class="card error">Guide not found.</div>`;
  }

  function renderHeader() {
    const g = currentGuide;
    document.getElementById('guideHeader').innerHTML = `
      <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
        <span class="badge badge-category" style="text-transform: capitalize;">${g.category}</span>
        <span class="badge badge-${g.difficulty}">${g.difficulty}</span>
      </div>
      <h1 style="color: var(--primary); margin-bottom: 1rem;">${g.title}</h1>
      <p style="font-size: 1.1rem; color: var(--text-dark); margin-bottom: 1.5rem;">${g.shortDesc}</p>
      ${g.fullDesc ? `<p style="margin-bottom: 1.5rem;">${g.fullDesc}</p>` : ''}
      <div style="display: flex; gap: 2rem; color: var(--text-light); font-size: 0.9rem;">
        <span>⏱ Time: ${g.estimatedTime || 'N/A'}</span>
        <span>🔖 ${g.saves} users saved this</span>
      </div>
    `;
  }

  function renderSteps() {
    const html = currentGuide.steps.map((s, index) => {
      const isCompleted = completedStepsSet.has(index);
      return `
        <div class="step-card ${isCompleted ? 'completed' : ''}" id="step-${index}">
          <div class="step-number">${isCompleted ? '✓' : s.stepNumber}</div>
          <div class="card">
            <h3 style="margin-bottom: 1rem; color: var(--primary);">${s.title}</h3>
            <p style="margin-bottom: 1rem;">${s.description}</p>
            
            ${s.tips ? `<div class="step-box box-tips"><strong>Tip:</strong> ${s.tips}</div>` : ''}
            ${s.warnings ? `<div class="step-box box-warning"><strong>Warning:</strong> ${s.warnings}</div>` : ''}
            
            ${s.checklist && s.checklist.length > 0 ? `
              <div style="margin-top: 1.5rem;">
                <h4 style="margin-bottom: 0.5rem; color: var(--text-dark);">Checklist</h4>
                ${s.checklist.map(c => `<label class="checklist-item"><input type="checkbox"> <span>${c}</span></label>`).join('')}
              </div>
            ` : ''}

            ${s.resources && s.resources.length > 0 ? `
              <div style="margin-top: 1.5rem;">
                <h4 style="margin-bottom: 0.5rem; color: var(--text-dark);">Resources</h4>
                <ul style="list-style: disc inside; color: var(--primary);">
                  ${s.resources.map(r => `<li><a href="${r.url}" target="_blank" style="text-decoration: underline;">${r.label} ↗</a></li>`).join('')}
                </ul>
              </div>
            ` : ''}

            <div style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1rem;">
              <button class="btn ${isCompleted ? 'btn-outline' : 'btn-primary'} btn-mark" data-idx="${index}">
                ${isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    document.getElementById('guideSteps').innerHTML = html;

    document.querySelectorAll('.btn-mark').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        if (!Auth.isAuthenticated()) return UI.showToast('Login to track progress', 'error');
        if (!savedData) await handleSave(); // Auto save if they click complete

        const idx = parseInt(e.target.dataset.idx);
        if (completedStepsSet.has(idx)) {
          completedStepsSet.delete(idx);
          document.getElementById(`step-${idx}`).classList.remove('completed');
          e.target.innerText = 'Mark Complete';
          e.target.classList.replace('btn-outline', 'btn-primary');
        } else {
          completedStepsSet.add(idx);
          document.getElementById(`step-${idx}`).classList.add('completed');
          e.target.innerText = 'Mark Incomplete';
          e.target.classList.replace('btn-primary', 'btn-outline');
        }
        
        updateProgressUI();
        syncProgress();
      });
    });
  }

  function updateProgressUI() {
    if(!currentGuide) return;
    const total = currentGuide.steps.length;
    const completed = completedStepsSet.size;
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
    
    document.getElementById('progText').innerText = `Progress: ${pct}%`;
    document.getElementById('progFill').style.width = `${pct}%`;
  }

  async function syncProgress() {
    if (!savedData) return;
    const total = currentGuide.steps.length;
    const progress = total === 0 ? 0 : Math.round((completedStepsSet.size / total) * 100);
    
    try {
      await window.API.call(`/user/progress/${currentGuide._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          progress,
          completedSteps: Array.from(completedStepsSet)
        })
      });
    } catch(e) {}
  }

  async function handleSave() {
    if (!Auth.isAuthenticated()) return UI.showToast('Login to save', 'error');
    if (savedData) return;
    try {
      const res = await window.API.call('/guides/save', {
        method: 'POST',
        body: JSON.stringify({ guideId: currentGuide._id })
      });
      savedData = res.data;
      document.getElementById('saveTopBtn').innerText = 'Saved';
      document.getElementById('saveTopBtn').disabled = true;
      UI.showToast('Guide saved to Dashboard!');
    } catch(e) {}
  }

  document.getElementById('saveTopBtn').addEventListener('click', handleSave);
});
