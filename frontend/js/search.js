document.addEventListener('DOMContentLoaded', () => {
  Auth.requireAuth();

  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get('q');
  
  const input = document.getElementById('goalInput');
  const btn = document.getElementById('genBtn');
  const searchBox = document.getElementById('searchBox');
  const loadingState = document.getElementById('loadingState');
  const guideResult = document.getElementById('guideResult');
  let currentSessionId = null;

  if (initialQuery) {
    input.value = initialQuery;
    generateGuide(initialQuery);
  }

  btn.addEventListener('click', () => {
    const q = input.value.trim();
    if(q) generateGuide(q);
  });

  input.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
      const q = input.value.trim();
      if(q) generateGuide(q);
    }
  });

  async function generateGuide(goal) {
    searchBox.style.display = 'none';
    loadingState.style.display = 'block';
    guideResult.style.display = 'none';

    const textEl = document.getElementById('loadingText');
    const stages = ['Analyzing goal...', 'Structuring steps...', 'Finding resources...', 'Finalizing guide...'];
    let stageIdx = 0;
    const interval = setInterval(() => {
      stageIdx = (stageIdx + 1) % stages.length;
      textEl.innerText = stages[stageIdx];
    }, 2000);

    try {
      const res = await window.API.call('/ai/generate', {
        method: 'POST',
        body: JSON.stringify({ goal })
      });
      
      clearInterval(interval);
      loadingState.style.display = 'none';
      renderGuide(res.data, res.sessionId);
    } catch (err) {
      clearInterval(interval);
      loadingState.style.display = 'none';
      searchBox.style.display = 'block';
      // UI.js toast already handles showing the error
    }
  }

  function renderGuide(guide, sessionId) {
    currentSessionId = sessionId;
    guideResult.style.display = 'block';
    
    document.getElementById('resCategory').innerText = guide.category;
    document.getElementById('resDifficulty').innerText = guide.difficulty;
    document.getElementById('resTitle').innerText = guide.title;
    document.getElementById('resDesc').innerText = guide.shortDesc;
    document.getElementById('resTime').innerText = guide.estimatedTime || 'N/A';

    const stepsHtml = guide.steps.map(s => `
      <div class="step-container">
        <div class="step-number">${s.stepNumber}</div>
        <div class="step-content">
          <h3 class="step-title">${s.title}</h3>
          <p>${s.description}</p>
          
          ${s.tips ? `<div class="step-box box-tips"><strong>Tip:</strong> ${s.tips}</div>` : ''}
          ${s.warnings ? `<div class="step-box box-warning"><strong>Warning:</strong> ${s.warnings}</div>` : ''}
          
          ${s.checklist && s.checklist.length > 0 ? `
            <div style="margin-top: 1.5rem;">
              <h4 style="margin-bottom: 0.5rem; color: var(--text-dark);">Checklist</h4>
              ${s.checklist.map(c => `
                <label class="checklist-item">
                  <input type="checkbox"> <span>${c}</span>
                </label>
              `).join('')}
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
        </div>
      </div>
    `).join('');

    document.getElementById('resSteps').innerHTML = stepsHtml;
  }

  document.getElementById('saveBtn').addEventListener('click', async (e) => {
    if(!currentSessionId) return;
    const btn = e.target;
    try {
      btn.innerText = 'Saving...';
      btn.disabled = true;
      await window.API.call('/ai/save', {
        method: 'POST',
        body: JSON.stringify({ sessionId: currentSessionId })
      });
      UI.showToast('Guide saved to your library!');
      btn.innerText = 'Saved';
      setTimeout(() => window.location.href = '/dashboard.html', 1500);
    } catch (err) {
      btn.innerText = 'Save to Profile';
      btn.disabled = false;
    }
  });

});
