document.addEventListener('DOMContentLoaded', () => {
  Auth.requireAuth();

  const questions = [
    { id: 'age', title: 'What is your age?', type: 'number', placeholder: 'e.g. 25' },
    { id: 'gender', title: 'What is your gender?', type: 'select', options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' }
    ]},
    { id: 'state', title: 'Which state do you live in?', type: 'select', options: [
      { value: 'Maharashtra', label: 'Maharashtra' },
      { value: 'Delhi', label: 'Delhi' },
      { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
      { value: 'Karnataka', label: 'Karnataka' },
      { value: 'Gujarat', label: 'Gujarat' },
      { value: 'Tamil Nadu', label: 'Tamil Nadu' }
    ]},
    { id: 'income', title: 'What is your annual family income (in ₹)?', type: 'number', placeholder: 'e.g. 150000' },
    { id: 'category', title: 'What is your category?', type: 'select', options: [
      { value: 'general', label: 'General' },
      { value: 'obc', label: 'OBC' },
      { value: 'sc', label: 'SC' },
      { value: 'st', label: 'ST' },
      { value: 'ews', label: 'EWS' }
    ]},
    { id: 'occupation', title: 'What is your occupation?', type: 'select', options: [
      { value: 'student', label: 'Student' },
      { value: 'farmer', label: 'Farmer' },
      { value: 'salaried', label: 'Salaried Employee' },
      { value: 'self-employed', label: 'Self Employed/Business' },
      { value: 'unemployed', label: 'Unemployed' }
    ]},
    { id: 'differentlyAbled', title: 'Are you differently abled?', type: 'radio', options: [
      { value: 'true', label: 'Yes' },
      { value: 'false', label: 'No' }
    ]},
    { id: 'landOwner', title: 'Do you own any agricultural land?', type: 'radio', options: [
      { value: 'true', label: 'Yes' },
      { value: 'false', label: 'No' }
    ]}
  ];

  let currentStep = 0;
  const answers = {};

  const quizForm = document.getElementById('quizForm');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const progressFill = document.getElementById('progressFill');

  const renderQuestions = () => {
    quizForm.innerHTML = questions.map((q, idx) => {
      let inputHtml = '';
      if (q.type === 'number') {
        inputHtml = `<input type="number" id="${q.id}" class="quiz-input" placeholder="${q.placeholder}" style="width: 100%; padding: 1rem; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 1.1rem; margin-top: 1rem;">`;
      } else if (q.type === 'select') {
        inputHtml = `
          <select id="${q.id}" class="quiz-input" style="width: 100%; padding: 1rem; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 1.1rem; margin-top: 1rem;">
            <option value="" disabled selected>Select an option...</option>
            ${q.options.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}
          </select>
        `;
      } else if (q.type === 'radio') {
        inputHtml = `
          <div class="options-grid">
            ${q.options.map(o => `
              <label class="option-btn">
                <input type="radio" name="${q.id}" value="${o.value}" style="margin-right: 10px;">
                ${o.label}
              </label>
            `).join('')}
          </div>
        `;
      }

      return `
        <div class="question-slide ${idx === 0 ? 'active' : ''}" id="slide-${idx}">
          <h2 style="font-size: 1.5rem; color: #1e293b;">${q.title}</h2>
          ${inputHtml}
        </div>
      `;
    }).join('');
  };

  const updateUI = () => {
    document.querySelectorAll('.question-slide').forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentStep);
    });

    progressFill.style.width = `${((currentStep) / questions.length) * 100}%`;

    prevBtn.classList.toggle('hidden', currentStep === 0);
    
    if (currentStep === questions.length - 1) {
      nextBtn.textContent = 'Submit & Find Matches';
    } else {
      nextBtn.textContent = 'Next';
    }
  };

  const saveCurrentAnswer = () => {
    const q = questions[currentStep];
    if (q.type === 'radio') {
      const selected = document.querySelector(`input[name="${q.id}"]:checked`);
      if (selected) answers[q.id] = selected.value === 'true';
    } else {
      const el = document.getElementById(q.id);
      if (el && el.value) {
        answers[q.id] = q.type === 'number' ? Number(el.value) : el.value;
      }
    }
  };

  prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      updateUI();
    }
  });

  nextBtn.addEventListener('click', async () => {
    saveCurrentAnswer();
    
    // Simple validation
    const q = questions[currentStep];
    if (answers[q.id] === undefined || answers[q.id] === '') {
      window.API.showToast('Please provide an answer to continue.', 'error');
      return;
    }

    if (currentStep < questions.length - 1) {
      currentStep++;
      updateUI();
    } else {
      // Submit
      try {
        nextBtn.innerHTML = '<div class="spinner"></div> Processing...';
        nextBtn.disabled = true;
        
        await window.API.call('/user/profile', {
          method: 'PUT',
          body: JSON.stringify(answers)
        });
        
        // Let's go to results
        progressFill.style.width = '100%';
        window.location.href = '/results.html';
      } catch (err) {
        nextBtn.innerHTML = 'Submit & Find Matches';
        nextBtn.disabled = false;
      }
    }
  });

  renderQuestions();
  updateUI();
});
