import { NextResponse } from 'next/server';
import { allSchemes } from '@/lib/schemes-data';

// Custom details and steps for high-priority popular queries
const customGuides: Record<string, { steps: string[]; documents: string[] }> = {
  'apply-for-fresh-passport': {
    steps: [
      'Register on the official Passport Seva Online Portal (passportindia.gov.in).',
      'Log in and click "Apply for Fresh Passport/Reissue of Passport".',
      'Fill in the online form with correct personal, family, and address details.',
      'Schedule an appointment at your nearest PSK (Passport Seva Kendra) and pay the processing fee online (₹1500).',
      'Print the application receipt and visit the PSK on your appointed date/time with all original documents.',
      'Undergo physical document verification and biometric scan at the PSK.',
      'Police verification will be scheduled and conducted at your registered address.'
    ],
    documents: [
      'Proof of Address (Aadhaar Card, Water/Electricity Bill, Bank Passbook)',
      'Proof of Date of Birth (Birth Certificate, 10th Standard Passing Certificate)',
      'Photo ID Proof (Voter ID, PAN Card)',
      'Non-ECR Category proof (if applicable, e.g., 10th certificate or higher education degree)'
    ]
  },
  'pm-vidyalakshmi-scholarship': {
    steps: [
      'Create an account on the official Vidya Lakshmi Portal (vidyalakshmi.co.in).',
      'Log in and fill up the Common Education Loan Application Form (CELAF) with personal, relationship, academic, and course fee details.',
      'Upload the mandatory scanned copies of educational, admission, and income documents.',
      'Search for suitable educational loan schemes offered by partner national/private banks matching your college.',
      'Apply directly to the chosen schemes online through the portal.',
      'Track your application status via the "Application Status" tab in your portal dashboard.',
      'Once approved, the bank will contact you to sign the loan agreement, and funds will be disbursed directly to the college/university.'
    ],
    documents: [
      'Letter of Admission from the College/University',
      'Detailed Fee Structure Breakup certified by the institution',
      'Academic Marksheets (10th, 12th, and Graduation if applicable)',
      'Income Proof of parents/co-borrower (Salary Slips, Form 16, or ITR)',
      'KYC documents of both applicant and co-borrower (Aadhaar, PAN Card, Voter ID)',
      'Passport size photographs of applicant and co-borrower'
    ]
  },
  'skill-india-nsdc-certification': {
    steps: [
      'Visit the official Skill India Digital Portal (skillindiadigital.gov.in).',
      'Register using your mobile number and verify via OTP.',
      'Complete your basic e-KYC using your Aadhaar card.',
      'Search and browse through thousands of available skill courses, apprenticeship opportunities, and nearby training centers.',
      'Select a course that aligns with your career goals and enroll online.',
      'Attend the classes, participate in practical sessions, and complete the coursework.',
      'Pass the final assessment conducted by independent assessment agencies to receive your NSDC Government Skill Certificate.'
    ],
    documents: [
      'Aadhaar Card (for mandatory e-KYC)',
      'Educational Qualification Certificate/Marksheet (minimum requirement depends on the course)',
      'Passport size photographs',
      'Active Bank Account Passbook (required for direct bank transfer of travel/stipend allowances)'
    ]
  },
  'national-scholarship-portal': {
    steps: [
      'Go to the National Scholarship Portal (scholarships.gov.in) and register as a new user.',
      'Provide your state of domicile, scholarship category (pre-matric/post-matric), name, DOB, mobile number, and bank account details.',
      'Log in using the temporary Student ID and Password sent to your mobile.',
      'Change the default password and fill out the comprehensive scholarship application form (academic details, parents\' occupation, and income).',
      'Upload high-resolution scans of your income, caste, and academic certificates.',
      'Review all fields carefully and click "Final Submit".',
      'The application goes through institution verification first, then district/state level approvals, before direct bank transfer (DBT) disbursement.'
    ],
    documents: [
      'Previous Class/Semester Academic Marksheet',
      'Official Family Income Certificate issued by competent authority',
      'Caste/Category Certificate (if applying for SC/ST/OBC/Minority quotas)',
      'Duly signed Bonafide Student Certificate from your school/college',
      'Fee receipt of the current academic year',
      'Aadhaar Card and Student Bank Passbook'
    ]
  }
};

// Generic fallback step generators based on scheme category
function getFallbackDetails(scheme: any) {
  const cat = scheme.category || 'general';
  
  if (cat === 'identity') {
    return {
      steps: [
        `Visit the official portal or designated registration center for ${scheme.title}.`,
        'Download or fill out the application form online with precise biographical information.',
        'Attach required documents verifying your identity, date of birth, and residential address.',
        'Book an appointment at the nearest enrollment center/office if physical biometrics or photo is required.',
        'Submit the application, pay any nominal fee (if applicable), and obtain the acknowledgment slip.',
        `Track the application status online using your enrollment number until the card/document is generated.`
      ],
      documents: [
        'Proof of Identity (PAN Card, Voter ID, or Passport)',
        'Proof of Address (Utility Bill, Rent Agreement, or Bank Statement)',
        'Proof of Date of Birth (Birth Certificate or 10th class marksheet)',
        'Recent Passport size photographs'
      ]
    };
  }

  if (cat === 'finance') {
    return {
      steps: [
        `Log in or register on the official portal of the providing department (${scheme.provider}).`,
        'Select the appropriate application/registration option corresponding to your status (individual/business).',
        'Fill in financial details, bank account details, and PAN details carefully.',
        'Upload supporting financial documents (income certificates, bank statements, or business proofs).',
        'Authenticate your submission using an OTP-based electronic signature (e-sign) or digital signature.',
        'Keep the acknowledgement receipt safe for auditing and tracking purposes.'
      ],
      documents: [
        'Aadhaar Card and PAN Card (Mandatory)',
        'Active Bank Account Details (Passbook copy or Cancelled Cheque)',
        'Income Certificate / Form 16 / Salary slips',
        'Business Registration Details (if applying for business loans or tax registration)'
      ]
    };
  }

  if (cat === 'welfare' || cat === 'housing') {
    return {
      steps: [
        `Access the dedicated scheme portal or visit your local Gram Panchayat/Municipal Corporation office.`,
        'Check your eligibility criteria (income threshold, rural/urban category, family status) against the scheme guidelines.',
        'Obtain and fill in the detailed application form, ensuring your bank account is linked to your Aadhaar card.',
        'Upload or submit documents proving your BPL/socio-economic category and property/residential status.',
        'The local administrative officer (Patwari, Block Development Officer, or Municipal Commissioner) will verify your credentials.',
        'Upon successful verification, direct bank transfers (DBT) or subsidies will be credited to your Aadhaar-seeded bank account.'
      ],
      documents: [
        'Aadhaar Card and Voter ID Card',
        'BPL Card / Ration Card / SECC Data Reference Number',
        'Income Certificate and Caste Certificate (if applicable)',
        'Bank Account Passbook (Aadhaar linked)',
        'For housing: Land ownership document or proof of kutcha house'
      ]
    };
  }

  if (cat === 'health') {
    return {
      steps: [
        `Visit the official portal or walk into any empanelled public or private hospital / Jan Aushadhi center.`,
        'Request the Arogya Mitra or helper desk for assistance regarding the scheme benefits.',
        'Verify your family name in the eligibility database using your Ration Card or SECC details.',
        'Get your digital health card or account generated instantly after mobile OTP verification.',
        'Use the card at hospital desks to avail cashless diagnostics, treatments, surgery, or heavily discounted generic medicines.'
      ],
      documents: [
        'Aadhaar Card of the applicant and all family members',
        'Ration Card / PM-JAY letter or card',
        'Active mobile number linked to Aadhaar',
        'Disability Certificate (if applying for disability schemes)'
      ]
    };
  }

  if (cat === 'business') {
    return {
      steps: [
        `Go to the official registration portal (${scheme.provider}).`,
        'Click on New Registration and sign up with your PAN and Mobile Number.',
        'Enter enterprise details (name of business, type of organization, plant/office address, bank details).',
        'Provide main business activities, employee count, and investment in plant/machinery.',
        'Submit the form using mobile OTP and instantly download the registration/recognition certificate.',
        'Use this certificate to claim collateral-free loans, interest subventions, or tax exemptions.'
      ],
      documents: [
        'Aadhaar Card of the entrepreneur/promoter',
        'PAN Card of the entrepreneur and the enterprise (if partnership/company)',
        'Bank Account Details (Passbook or cancelled cheque)',
        'Proof of Business Address (Utility Bill, GSTIN, or rent agreement)'
      ]
    };
  }

  // General default fallback
  return {
    steps: [
      `Navigate to the official website of ${scheme.provider}.`,
      'Read the detailed eligibility requirements and guidelines documents.',
      'Click on the registration link and fill out the online form step-by-step.',
      'Scan and upload the required documents as per size and format specifications.',
      'Pay any online fees if applicable, and review your inputs.',
      'Submit the form and record your application reference number for tracking.'
    ],
    documents: [
      'Aadhaar Card (Identity & Address Proof)',
      'Active Bank Account Passbook',
      'Educational Marksheets / Certificates (if applicable)',
      'Income Certificate (if applying for subsidies/loans)'
    ]
  };
}

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Question is required and must be a string.' },
        { status: 400 }
      );
    }

    const query = question.trim().toLowerCase();
    
    // Stopwords to filter out high-frequency low-signal terms
    const STOPWORDS = new Set([
      'how', 'why', 'what', 'where', 'who', 'when', 'the', 'for', 'and', 'are',
      'you', 'can', 'need', 'get', 'apply', 'will', 'with', 'from', 'this',
      'that', 'your', 'about', 'want', 'have', 'does', 'please', 'here', 'should',
      'some', 'been', 'were', 'their', 'them', 'these', 'into', 'both', 'only', 'i', 'do', 'a'
    ]);

    const queryTokens = query.split(/[^a-zA-Z0-9]+/).filter(t => t.length > 1 && !STOPWORDS.has(t));

    let matchedScheme = null;
    let maxScore = 0;

    // Smart matching algorithm
    for (const scheme of allSchemes) {
      let score = 0;
      const titleLower = scheme.title.toLowerCase();
      const taglineLower = scheme.tagline.toLowerCase();

      // 1. Direct matches of the entire title inside the query, or vice-versa
      if (query.includes(titleLower) || titleLower.includes(query)) {
        score += 80;
      }

      // 2. Direct matches of query inside tagline
      if (taglineLower.includes(query)) {
        score += 40;
      }

      // 3. Match individual key search tokens
      for (const token of queryTokens) {
        if (titleLower.includes(token)) {
          // Boost exact word match in title
          const words = titleLower.split(/[^a-zA-Z0-9]+/);
          if (words.includes(token)) {
            score += 40;
          } else {
            score += 20;
          }
        }
        if (taglineLower.includes(token)) score += 10;
        if (scheme.provider.toLowerCase().includes(token)) score += 10;
        
        // Match tags
        if (scheme.tags.some(tag => tag.toLowerCase() === token)) {
          score += 50; // Exact tag match is high-value
        } else if (scheme.tags.some(tag => tag.toLowerCase().includes(token))) {
          score += 20;
        }
      }

      // Keep scheme with highest score, tie-break with popularity
      if (score > maxScore || (score === maxScore && score >= 20 && scheme.popularity > (matchedScheme?.popularity || 0))) {
        maxScore = score;
        matchedScheme = scheme;
      }
    }

    // Generate response text
    let answerText = '';

    if (matchedScheme) {
      // Get guide steps and documents checklist
      const custom = customGuides[matchedScheme.slug];
      const details = custom || getFallbackDetails(matchedScheme);

      answerText = `### 🏛️ ${matchedScheme.title}\n`;
      answerText += `*Provided by ${matchedScheme.provider}*\n\n`;
      answerText += `**"${matchedScheme.tagline}"**\n\n`;
      answerText += `--- \n\n`;
      answerText += `#### 📊 Quick Overview\n`;
      answerText += `- 💵 **Processing Fee:** ${matchedScheme.fee}\n`;
      answerText += `- ⏱️ **Estimated Time:** ${matchedScheme.estimatedTime}\n`;
      answerText += `- ⚡ **Difficulty:** ${matchedScheme.difficulty.charAt(0).toUpperCase() + matchedScheme.difficulty.slice(1)}\n`;
      answerText += `- 🔥 **Popularity Index:** ${matchedScheme.popularity}/100\n\n`;
      answerText += `--- \n\n`;
      answerText += `#### 📋 Step-by-Step Application Process\n`;
      details.steps.forEach((step, idx) => {
        answerText += `${idx + 1}. ${step}\n`;
      });
      answerText += `\n--- \n\n`;
      answerText += `#### 📎 Required Documents Checklist\n`;
      details.documents.forEach(doc => {
        answerText += `- [ ] ${doc}\n`;
      });
      answerText += `\n--- \n\n`;
      answerText += `#### 🚀 Ready to start?\n`;
      answerText += `You can begin tracking this scheme's application process! Head over to the **Catalog** tab, search for **"${matchedScheme.title}"**, and click **Start Journey**. This will add a step-by-step interactive roadmap directly to your **Roadmaps** dashboard!`;
    } else {
      // Fallback: search by category
      let categoryMatch = '';
      if (query.includes('passport') || query.includes('visa') || query.includes('travel')) {
        categoryMatch = 'passport';
      } else if (query.includes('identity') || query.includes('aadhaar') || query.includes('pan') || query.includes('kyc') || query.includes('voter')) {
        categoryMatch = 'identity';
      } else if (query.includes('tax') || query.includes('itr') || query.includes('finance') || query.includes('invest') || query.includes('saving')) {
        categoryMatch = 'finance';
      } else if (query.includes('education') || query.includes('scholarship') || query.includes('student') || query.includes('college') || query.includes('school')) {
        categoryMatch = 'education';
      } else if (query.includes('welfare') || query.includes('farmer') || query.includes('poor') || query.includes('ration') || query.includes('kisan')) {
        categoryMatch = 'welfare';
      } else if (query.includes('health') || query.includes('hospital') || query.includes('insurance') || query.includes('medicine')) {
        categoryMatch = 'health';
      } else if (query.includes('job') || query.includes('career') || query.includes('work') || query.includes('employment')) {
        categoryMatch = 'employment';
      } else if (query.includes('business') || query.includes('startup') || query.includes('msme') || query.includes('loan')) {
        categoryMatch = 'business';
      } else if (query.includes('certificate') || query.includes('birth') || query.includes('death') || query.includes('caste') || query.includes('legal')) {
        categoryMatch = 'legal';
      }

      if (categoryMatch) {
        const matchingSchemes = allSchemes
          .filter(s => s.category === categoryMatch)
          .slice(0, 3);

        answerText = `I found some excellent government schemes related to your query in our **${categoryMatch.toUpperCase()}** catalog:\n\n`;
        matchingSchemes.forEach(s => {
          answerText += `* **${s.title}** (${s.provider})\n  *"${s.tagline}"*\n  [Fee: ${s.fee} | Est. Time: ${s.estimatedTime}]\n\n`;
        });
        answerText += `Try asking me specifically about any of these schemes (e.g. *"How do I apply for ${matchingSchemes[0]?.title}?"*) to get a complete step-by-step roadmap and document checklist!`;
      } else {
        // Broad search fallback
        const partialMatches = allSchemes
          .filter(s => 
            s.title.toLowerCase().split(/\s+/).some(word => query.includes(word) && word.length > 3) ||
            s.tags.some(tag => query.includes(tag))
          )
          .slice(0, 3);

        if (partialMatches.length > 0) {
          answerText = `I couldn't find an exact match for your question, but these related schemes might help you:\n\n`;
          partialMatches.forEach(s => {
            answerText += `* **${s.title}** (${s.provider})\n  *"${s.tagline}"*\n\n`;
          });
          answerText += `You can ask me details about any of them, or head over to the **Catalog** tab to explore all available public services.`;
        } else {
          // Completely general fallback
          answerText = `Hello! I'm your StepThrough AI Mentor. I can help guide you through complex government application processes such as Passport, Aadhaar Card, PAN, Scholarships, and Welfare Schemes.\n\n`;
          answerText += `I wasn't able to match your query. Could you try rephrasing or asking one of these popular questions?\n\n`;
          answerText += `* *"How do I apply for a fresh passport?"*\n`;
          answerText += `* *"Am I eligible for PM Vidyalakshmi?"*\n`;
          answerText += `* *"What documents do I need for NSDC/Skill India?"*\n`;
          answerText += `* *"Find scholarship schemes for students."*\n\n`;
          answerText += `You can also browse all categories and schemes in the **Catalog**!`;
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        answer: answerText
      }
    });

  } catch (err) {
    console.error('Error in /api/schemes/ask:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing query' },
      { status: 500 }
    );
  }
}
