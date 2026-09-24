/* ==========================================================================
   PORTFOLIO V3 — LAKSHAY VAISHNAV (2026 EDITION)
   Client-side Logic: Dev Console, System Map, SchemeAI Simulator,
   Evidence-Based Stack Inspector, Accessible Modals, & Micro-interactions.
   Zero external dependencies. High performance.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initDevConsole();
  initHeroTabs();
  initSystemMap();
  initSchemeSimulator();
  initStackInspector();
  initCaseStudyModals();
  initResumeModal();
  initClipboard();
  initScrollSpy();
});

/* ==========================================================================
   1. NAVIGATION & SCROLL
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Sticky navbar with blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile drawer toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileToggle.classList.toggle('open');
      mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ==========================================================================
   2. HERO INTERACTIVE DEV CONSOLE
   ========================================================================== */
const terminalDatabase = {
  './about': {
    output: `
      <div class="term-result">
        <div><span class="res-hl">Lakshay Vaishnav</span> — Computer Engineering Undergraduate</div>
        <div>Institution: <span class="res-cyan">State Institute of Engineering & Technology (SIET), Nilokheri</span></div>
        <div>University: <span class="res-hl">Kurukshetra University</span> (Batch 2025–2029)</div>
        <div>Academic Record: <span class="res-green">SGPA: 8.76 / 10</span> (Semester 1)</div>
        <div>Focus: <span class="res-cyan">Software Engineering • AI/ML • Rule-Based NLP</span></div>
        <div>Location: Palwal, Haryana, India</div>
      </div>
    `
  },
  './currently_building': {
    output: `
      <div class="term-result">
        <div><span class="res-cyan">●</span> <span class="res-hl">AI-powered products</span> — Exploring local LLM workflows & generative APIs</div>
        <div><span class="res-cyan">●</span> <span class="res-hl">NLP systems</span> — Bilingual rule-based token parsing with 100% offline uptime</div>
        <div><span class="res-cyan">●</span> <span class="res-hl">Full-stack experiments</span> — High-performance zero-bloat web interfaces</div>
        <div><span class="res-cyan">●</span> <span class="res-hl">Hackathon prototypes</span> — Rapid problem-solving for national competitions</div>
      </div>
    `
  },
  './stack': {
    output: `
      <div class="term-result">
        <div><span class="res-hl">Languages:</span> C, Python, JavaScript, HTML, CSS, SQL</div>
        <div><span class="res-hl">Databases:</span> MySQL, Microsoft SQL Server (T-SQL)</div>
        <div><span class="res-hl">AI / ML:</span> Generative AI APIs (Claude, Gemini), NLP Pipelines, Rule-Based Bilingual NLP</div>
        <div><span class="res-hl">Frameworks & Tools:</span> FastAPI, TypeScript, Canvas API, Git, GitHub, VS Code, GitHub Pages</div>
      </div>
    `
  },
  './projects': {
    output: `
      <div class="term-result">
        <div><span class="res-cyan">01 — SchemeAI</span> [AI • NLP • PWA • Samsung Solve for Tomorrow 2026] (73+ schemes)</div>
        <div><span class="res-cyan">02 — ForgeBrain AI</span> [GenAI • Industrial Intelligence • ET AI Hackathon 2026]</div>
        <div><span class="res-cyan">03 — Personal Portfolio</span> [Accessible Frontend • Responsive Design • Dark/Light]</div>
        <div><span class="res-cyan">04 — Modern Restaurant</span> [Client-Side State • Dynamic DOM • Zero-Framework]</div>
      </div>
    `
  },
  './proof': {
    output: `
      <div class="term-result">
        <div><span class="res-green">✔ 73+</span> Schemes covered in SchemeAI offline engine</div>
        <div><span class="res-green">✔ 8.76/10</span> Semester 1 SGPA at SIET Nilokheri</div>
        <div><span class="res-green">✔ 2026</span> Samsung Solve for Tomorrow Official Participant</div>
        <div><span class="res-green">✔ 100K+</span> CampusCrew Milestone Honor recognition</div>
      </div>
    `
  },
  './contact': {
    output: `
      <div class="term-result">
        <div>Email: <a href="mailto:vaishnavlakshay640@gmail.com" class="res-cyan">vaishnavlakshay640@gmail.com</a></div>
        <div>Phone: <span class="res-hl">+91-8570097499</span></div>
        <div>GitHub: <a href="https://github.com/lakshay-vaishnav" target="_blank" rel="noopener" class="res-cyan">github.com/lakshay-vaishnav</a></div>
        <div>LinkedIn: <a href="https://linkedin.com/in/lakshay-vaishnav-951b8b3b6" target="_blank" rel="noopener" class="res-cyan">linkedin.com/in/lakshay-vaishnav-951b8b3b6</a></div>
      </div>
    `
  },
  'help': {
    output: `
      <div class="term-result">
        <div>Available commands:</div>
        <div><span class="res-cyan">./about</span> — Engineering profile & academic standing</div>
        <div><span class="res-cyan">./currently_building</span> — Current active focus areas</div>
        <div><span class="res-cyan">./stack</span> — Technical languages, databases & APIs</div>
        <div><span class="res-cyan">./projects</span> — Selected production & hackathon work</div>
        <div><span class="res-cyan">./proof</span> — Real verifiable signals & metrics</div>
        <div><span class="res-cyan">./contact</span> — Direct communication coordinates</div>
        <div><span class="res-cyan">clear</span> — Clear console output</div>
      </div>
    `
  }
};

function initDevConsole() {
  const scrollArea = document.getElementById('terminal-scroll');
  const termInput = document.getElementById('terminal-input');
  const chipButtons = document.querySelectorAll('.term-chip');

  if (!scrollArea || !termInput) return;

  function executeCommand(cmd) {
    const cleanCmd = cmd.trim();
    if (!cleanCmd) return;

    if (cleanCmd.toLowerCase() === 'clear') {
      scrollArea.innerHTML = '';
      termInput.value = '';
      return;
    }

    // Append command line
    const cmdLine = document.createElement('div');
    cmdLine.className = 'term-line';
    cmdLine.innerHTML = `
      <div class="term-cmd-row">
        <span class="term-prompt">lakshay@portfolio:~$</span>
        <span class="term-cmd">${escapeHtml(cleanCmd)}</span>
      </div>
    `;
    scrollArea.appendChild(cmdLine);

    // Append response
    const lookup = terminalDatabase[cleanCmd] || terminalDatabase[cleanCmd.toLowerCase()];
    const resultBox = document.createElement('div');
    resultBox.className = 'term-line';

    if (lookup) {
      resultBox.innerHTML = lookup.output;
    } else {
      resultBox.innerHTML = `
        <div class="term-result">
          <div style="color: #ef4444;">command not found: ${escapeHtml(cleanCmd)}</div>
          <div>Type <span class="res-cyan">help</span> to view available commands.</div>
        </div>
      `;
    }
    scrollArea.appendChild(resultBox);

    // Scroll to bottom
    scrollArea.scrollTop = scrollArea.scrollHeight;
    termInput.value = '';
  }

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(termInput.value);
    }
  });

  chipButtons.forEach(chip => {
    chip.addEventListener('click', () => {
      const command = chip.getAttribute('data-cmd');
      if (command) {
        termInput.value = command;
        executeCommand(command);
      }
    });
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ==========================================================================
   3. HERO TABS (TERMINAL CONSOLE vs SYSTEM MAP)
   ========================================================================== */
function initHeroTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const terminalView = document.getElementById('terminal-view');
  const systemMapView = document.getElementById('system-map-view');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-target');
      if (target === 'terminal') {
        terminalView.classList.add('active');
        systemMapView.classList.remove('active');
      } else if (target === 'system-map') {
        terminalView.classList.remove('active');
        systemMapView.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. SYSTEM MAP (TECHNICAL ECOSYSTEM GRAPH)
   ========================================================================== */
function initSystemMap() {
  const nodeGroups = document.querySelectorAll('.node-group');
  const tipText = document.getElementById('system-map-status');

  const nodeTargetMap = {
    'CODE': { section: 'stack', desc: 'Core languages: C, Python, JavaScript, SQL' },
    'AI': { section: 'work', desc: 'Generative AI APIs, LLM integration, ET AI Hackathon 2026' },
    'NLP': { section: 'schemeai-card', desc: 'Offline Rule-Based Bilingual NLP (Hindi/English) in SchemeAI' },
    'WEB': { section: 'work', desc: 'PWA, responsive design, client state machines, Canvas API' },
    'DATABASES': { section: 'stack', desc: 'MySQL, Microsoft SQL Server, relational schema design' },
    'HACKATHONS': { section: 'work', desc: 'Samsung Solve for Tomorrow & ET AI Hackathon 2026' },
    'OPEN SOURCE': { section: 'github-section', desc: 'Public repositories and version-controlled projects on GitHub' }
  };

  nodeGroups.forEach(node => {
    node.addEventListener('click', () => {
      const nodeName = node.getAttribute('data-node');
      nodeGroups.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const info = nodeTargetMap[nodeName];
      if (info && tipText) {
        tipText.innerHTML = `<span style="color: var(--accent-cyan); font-weight:600;">[${nodeName}]</span> ${info.desc}`;
        const targetEl = document.getElementById(info.section);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

/* ==========================================================================
   5. SCHEMEAI INTERACTIVE PIPELINE SIMULATOR
   ========================================================================== */
const simulatorData = {
  'scholarship': {
    query: 'Scholarship for 12th pass students',
    lang: 'English (Detected via Latin Tokenizer)',
    education: '12th Pass / Undergraduate Candidate',
    tokens: '["scholarship", "12th", "pass", "student", "undergraduate"]',
    score: '96.8% Relevance Match',
    matchedScheme: 'Central Sector Scheme of Scholarship for College and University Students',
    benefit: 'Financial assistance of ₹12,000 to ₹20,000 per annum for higher studies based on merit.'
  },
  'farmer': {
    query: 'किसान सोलर पंप योजना (Solar pump subsidy for farmers)',
    lang: 'Hindi / Bilingual (Devanagari + English Script)',
    education: 'All Education Levels / Agricultural Landholder',
    tokens: '["किसान", "सोलर", "पंप", "योजना", "farmer", "solar", "pump", "irrigation"]',
    score: '98.4% Relevance Match',
    matchedScheme: 'PM-KUSUM (Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan)',
    benefit: 'Up to 60% government subsidy on standalone solar agriculture pumps with zero grid electricity reliance.'
  },
  'entrepreneur': {
    query: 'Women entrepreneur small business micro credit',
    lang: 'English (Industrial / Commercial Substring Match)',
    education: 'No Minimum Barrier / Self-Employed Category',
    tokens: '["women", "entrepreneur", "small", "business", "micro", "credit"]',
    score: '94.2% Relevance Match',
    matchedScheme: 'Stand-Up India & PM Mudra Yojana (Shishu / Kishore)',
    benefit: 'Collateral-free micro loans from ₹50,000 to ₹10 Lakh for greenfield business enterprises.'
  }
};

function initSchemeSimulator() {
  const chips = document.querySelectorAll('.sim-chip');
  const pipelineSteps = document.querySelectorAll('.pipeline-step');
  const outputBox = document.getElementById('sim-output-content');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const type = chip.getAttribute('data-sim');
      const data = simulatorData[type];
      if (!data) return;

      // Animate steps sequentially
      pipelineSteps.forEach((step, index) => {
        setTimeout(() => {
          pipelineSteps.forEach(s => s.classList.remove('active-step'));
          step.classList.add('active-step');
        }, index * 120);
      });

      // Show final result
      setTimeout(() => {
        outputBox.innerHTML = `
          <div style="display:flex; flex-direction:column; gap:0.4rem;">
            <div style="color:var(--accent-cyan); font-weight:600;">> QUERY: "${escapeHtml(data.query)}"</div>
            <div><span style="color:var(--text-muted);">● Language:</span> <span style="color:var(--text-primary);">${data.lang}</span></div>
            <div><span style="color:var(--text-muted);">● Criteria:</span> <span style="color:var(--text-primary);">${data.education}</span></div>
            <div><span style="color:var(--text-muted);">● Tokens:</span> <code style="color:var(--accent-emerald); font-size:0.7rem;">${data.tokens}</code></div>
            <div><span style="color:var(--text-muted);">● Confidence:</span> <span style="color:var(--accent-cyan); font-weight:700;">${data.score}</span> (100% Offline Rule Engine)</div>
            <div style="border-top:1px solid var(--border-dim); padding-top:0.4rem; margin-top:0.3rem;">
              <span style="color:var(--text-primary); font-weight:600;">Matched:</span> <span style="color:#ffffff;">${data.matchedScheme}</span>
              <div style="color:var(--text-secondary); font-size:0.72rem; margin-top:0.2rem;">${data.benefit}</div>
            </div>
          </div>
        `;
      }, pipelineSteps.length * 120 + 50);
    });
  });
}

/* ==========================================================================
   6. ENGINEERING STACK (EVIDENCE-BASED SKILL INSPECTOR)
   ========================================================================== */
const skillsEvidence = {
  'JavaScript': {
    category: 'Languages',
    title: 'JavaScript (ES6+)',
    desc: 'Core language used across all client-side platforms. Built offline rule-based bilingual NLP parsing in SchemeAI, API communication in ForgeBrain AI, client state management in the Restaurant application, and interactive DOM orchestration for Portfolio V3.',
    projects: ['SchemeAI', 'ForgeBrain AI', 'Personal Portfolio', 'Modern Restaurant Website']
  },
  'C': {
    category: 'Languages',
    title: 'C Programming',
    desc: 'Foundational systems and algorithmic language studied extensively in B.Tech Semester 1 at SIET Nilokheri (SGPA: 8.76/10). Strong foundation in memory layout, pointers, structures, and algorithmic efficiency.',
    projects: ['SIET Nilokheri Coursework', 'Competitive Programming Foundations']
  },
  'Python': {
    category: 'Languages',
    title: 'Python',
    desc: 'Applied for prototyping, algorithm analysis, backend API exploration (FastAPI), and NLP experimentation scripts.',
    projects: ['NLP Pipelines', 'API Prototyping', 'Academic Problem Solving']
  },
  'SQL': {
    category: 'Languages',
    title: 'SQL / Relational Queries',
    desc: 'Schema design, complex joins, indexing, and transactional querying across relational databases.',
    projects: ['SIET Database Coursework', 'Backend Data Models']
  },
  'HTML': {
    category: 'Languages',
    title: 'Semantic HTML5',
    desc: 'Accessible, semantic markup structure with strict ARIA conformance, native <dialog> implementation, and zero unneeded container elements.',
    projects: ['SchemeAI', 'ForgeBrain AI', 'Personal Portfolio', 'Modern Restaurant Website']
  },
  'CSS': {
    category: 'Languages',
    title: 'Modern CSS3',
    desc: 'Container queries, :has() selectors, CSS custom properties, responsive fluid typography, dark obsidian theme design, and hardware-accelerated animations.',
    projects: ['Portfolio V3', 'SchemeAI', 'Modern Restaurant Website']
  },
  'MySQL': {
    category: 'Databases',
    title: 'MySQL',
    desc: 'Relational database schema modeling, primary/foreign key relationships, and query optimization.',
    projects: ['Database Management Systems Coursework']
  },
  'Microsoft SQL Server': {
    category: 'Databases',
    title: 'Microsoft SQL Server',
    desc: 'Enterprise database server environment used with SQL Server Management Studio (SSMS) for procedural SQL scripts and database modeling.',
    projects: ['SSMS Laboratory & Enterprise Database Work']
  },
  'T-SQL': {
    category: 'Databases',
    title: 'T-SQL (Transact-SQL)',
    desc: 'Stored procedures, control-of-flow logic, and structured relational querying on Microsoft SQL Server.',
    projects: ['Microsoft SQL Server Implementations']
  },
  'Generative AI APIs': {
    category: 'AI / ML',
    title: 'Generative AI APIs',
    desc: 'Integrated generative models for domain-specific industrial problem solving in ForgeBrain AI for ET AI Hackathon 2026. Handled prompt construction and JSON responses.',
    projects: ['ForgeBrain AI (ET AI Hackathon 2026)']
  },
  'Anthropic Claude': {
    category: 'AI / ML',
    title: 'Anthropic Claude API',
    desc: 'Utilized for deep reasoning workflows, technical documentation synthesis, and prompt engineering.',
    projects: ['AI Prototyping & Workflow Synthesis']
  },
  'Gemini API': {
    category: 'AI / ML',
    title: 'Google Gemini API',
    desc: 'Exploration and integration of multimodal and structured developer endpoints for intelligent product features.',
    projects: ['AI Explorations & Hackathon Work']
  },
  'NLP Pipelines': {
    category: 'AI / ML',
    title: 'NLP Pipelines',
    desc: 'End-to-end tokenization, stopword filtering, n-gram matching, and relevance score calculation pipelines designed to run with sub-millisecond latency.',
    projects: ['SchemeAI (7-stage pipeline)']
  },
  'Rule-Based Bilingual NLP': {
    category: 'AI / ML',
    title: 'Rule-Based Bilingual NLP Engine',
    desc: 'Engineered an offline-first bilingual natural language processor handling Hindi (Devanagari) and English queries with education-level detection and zero external API dependencies.',
    projects: ['SchemeAI (Samsung Solve for Tomorrow 2026)']
  },
  'FastAPI': {
    category: 'Frameworks / APIs',
    title: 'FastAPI',
    desc: 'Python-based asynchronous backend framework for designing clean RESTful microservices with auto-generated OpenAPI documentation.',
    projects: ['Backend API Experiments']
  },
  'TypeScript': {
    category: 'Frameworks / APIs',
    title: 'TypeScript (Beginner)',
    desc: 'Static typing, interface definitions, and typed JavaScript development.',
    projects: ['Modern Web Architecture Experiments']
  },
  'Canvas API': {
    category: 'Frameworks / APIs',
    title: 'HTML5 Canvas API',
    desc: 'Hardware-accelerated 2D graphics rendering. Built custom animated branding and interactive technical visuals.',
    projects: ['SchemeAI Animated Canvas Logo', 'Portfolio Visuals']
  },
  'PWA': {
    category: 'Tools & Platforms',
    title: 'Progressive Web Apps (PWA)',
    desc: 'Configured web app manifests, service worker caching strategies, and standalone display capability for 100% offline usability.',
    projects: ['SchemeAI (PWA Deployment)']
  },
  'Git': {
    category: 'Tools & Platforms',
    title: 'Git Version Control',
    desc: 'Branching, clean commit discipline, merge resolution, and distributed repository maintenance.',
    projects: ['All Public & Private Repositories']
  },
  'GitHub': {
    category: 'Tools & Platforms',
    title: 'GitHub',
    desc: 'Repository hosting, README documentation, issue tracking, and collaborative version control.',
    projects: ['github.com/lakshay-vaishnav']
  },
  'GitHub Pages': {
    category: 'Tools & Platforms',
    title: 'GitHub Pages',
    desc: 'Production deployment target for zero-latency static web products and hackathon projects.',
    projects: ['SchemeAI', 'ForgeBrain AI', 'Portfolio V3']
  },
  'VS Code': {
    category: 'Tools & Platforms',
    title: 'VS Code',
    desc: 'Primary engineering IDE with customized workspace settings, linters, and developer toolchains.',
    projects: ['Core Development Environment']
  },
  'SSMS': {
    category: 'Tools & Platforms',
    title: 'SQL Server Management Studio (SSMS)',
    desc: 'Administration, query execution plan analysis, and database schema creation for Microsoft SQL Server.',
    projects: ['Database Laboratory Work']
  },
  'Lovable': {
    category: 'AI & Productivity',
    title: 'Lovable',
    desc: 'Modern AI-driven full-stack design and prototyping platform utilized for rapid interface scaffolding.',
    projects: ['Product Ideation & Rapid UI Prototyping']
  },
  'Gamma AI': {
    category: 'AI & Productivity',
    title: 'Gamma AI',
    desc: 'AI-assisted technical slide decks, architecture presentations, and hackathon project pitch design.',
    projects: ['ET AI Hackathon Presentation Materials']
  },
  'NotebookLM': {
    category: 'AI & Productivity',
    title: 'NotebookLM',
    desc: 'Source-grounded research, document synthesis, and technical comprehension tool for complex engineering specifications.',
    projects: ['Research & Government Scheme Analysis']
  },
  'ChatGPT': {
    category: 'AI & Productivity',
    title: 'ChatGPT',
    desc: 'Iterative problem decomposition, code refactoring review, and prompt experimentation.',
    projects: ['Engineering Workflow Acceleration']
  },
  'Simplilearn': {
    category: 'AI & Productivity',
    title: 'Simplilearn AI Coursework',
    desc: 'Completed structured coursework: Introduction to Generative AI (LLMs, Prompt Engineering, Practical Application Development).',
    projects: ['Generative AI Fundamentals Certification 2026']
  }
};

function initStackInspector() {
  const pills = document.querySelectorAll('.stack-pill');
  const titleEl = document.getElementById('evidence-skill-title');
  const catEl = document.getElementById('evidence-skill-cat');
  const tagEl = document.getElementById('evidence-skill-tag');
  const descEl = document.getElementById('evidence-skill-desc');
  const projectsListEl = document.getElementById('evidence-projects-list');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const skillName = pill.getAttribute('data-skill');
      const data = skillsEvidence[skillName];
      if (!data) return;

      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      titleEl.textContent = data.title;
      catEl.textContent = data.category;
      tagEl.textContent = data.category.toUpperCase();
      descEl.textContent = data.desc;

      projectsListEl.innerHTML = '';
      data.projects.forEach(proj => {
        const item = document.createElement('div');
        item.className = 'evidence-project-item';
        item.textContent = proj;
        projectsListEl.appendChild(item);
      });
    });
  });
}

/* ==========================================================================
   7. ACCESSIBLE CASE STUDY MODALS
   ========================================================================== */
const caseStudiesData = {
  'schemeai': {
    badge: 'Samsung Solve for Tomorrow 2026 Submission',
    title: 'SchemeAI — Government Scheme Discovery Platform',
    category: 'AI • NLP • PWA • HACKATHON',
    overview: 'SchemeAI is an AI-powered Indian government scheme discovery platform covering 73+ welfare schemes. It was designed to bridge the awareness gap for rural citizens, students, and farmers who struggle with bureaucratic portals and language barriers.',
    problem: 'India offers hundreds of welfare schemes, but citizens cannot find them due to complex criteria, lack of internet reliability in rural zones, and language barriers. External AI APIs introduce latency, recurring token costs, and catastrophic failures when offline.',
    thinking: 'Instead of relying on heavy cloud LLMs with frequent outages and latency, I engineered a 100% offline, local rule-based bilingual NLP scoring engine. This eliminated all external dependencies, dropped response time to under 10 milliseconds, and enabled offline PWA usage in remote regions.',
    architecture: `
      1. User Query Input (Text or voice transcription in Hindi/English)<br>
      2. Bilingual Script & Language Detection (Devanagari vs Latin alphabet parser)<br>
      3. Education & Demographic Extraction (Filters for 10th/12th/Graduate/Farmer)<br>
      4. Tokenization & Stopword Elimination (Extracts high-entropy domain terms)<br>
      5. Relevance Scoring Engine (Weighted frequency against indexed scheme profiles)<br>
      6. Scheme Matching (Evaluates eligibility criteria across 73+ schemes)<br>
      7. Ranked Output (Direct actionable cards with benefits and official links)
    `,
    implementation: [
      'Engineered token-based relevance scoring engine with education-level detection.',
      'Bilingual (Hindi/English) NLP parsing built entirely offline with zero external API dependencies.',
      'Replaced live AI API calls with local rule engine for 100% uptime and instant results.',
      'Added PWA meta tags, service worker cache, animated HTML5 canvas branding, and responsive mobile layout.',
      'Successfully deployed on GitHub Pages as a national submission for Samsung Solve for Tomorrow 2026.'
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Rule-Based NLP', 'PWA (Service Workers)', 'Canvas API', 'GitHub Pages'],
    verifiedLinks: {
      github: 'https://github.com/lakshay-vaishnav',
      demo: 'https://lakshay-vaishnav.github.io/PORTFOLIO'
    }
  },
  'forgebrain': {
    badge: 'ET AI Hackathon 2026 (Problem Statement 8)',
    title: 'ForgeBrain AI — Industrial Knowledge Intelligence',
    category: 'GENERATIVE AI • INDUSTRIAL INTELLIGENCE • HACKATHON',
    overview: 'ForgeBrain AI is an industrial knowledge intelligence web platform engineered for ET AI Hackathon 2026 to tackle Problem Statement 8: resolving complex manufacturing queries and domain knowledge retrieval.',
    problem: 'Industrial equipment operators and plant engineers deal with massive technical manuals, safety protocols, and troubleshooting guides that make fast diagnostic lookup nearly impossible during plant floor emergencies.',
    thinking: 'Built a specialized interface integrating Generative AI APIs with structured industrial knowledge indexing. The platform retrieves relevant domain specifications and guides operators through structured technical diagnostics with clear safety caveats.',
    architecture: `
      1. User Query (Industrial equipment symptom, error code, or maintenance inquiry)<br>
      2. Generative AI API Integration (Prompt structured with industrial domain context)<br>
      3. Domain Knowledge Retrieval (Pre-indexed troubleshooting trees & safety parameters)<br>
      4. Knowledge Verification & Context Injection<br>
      5. Intelligent Diagnostic Response (Actionable steps, safety alerts, and component diagrams)
    `,
    implementation: [
      'Integrated Generative AI API to enable intelligent industrial query resolution and domain-specific knowledge retrieval.',
      'Built a dark, high-contrast industrial dashboard optimized for factory floor visibility.',
      'Delivered full project lifecycle: system design, code implementation, GitHub Pages deployment, demo video script, LinkedIn project write-up, and submission documentation.',
      'Structured technical error handling and offline fallbacks.'
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Generative AI API', 'Industrial Domain Retrieval', 'GitHub Pages'],
    verifiedLinks: {
      github: 'https://github.com/lakshay-vaishnav'
    }
  },
  'portfolio': {
    badge: 'Developer Experience & Accessibility',
    title: 'Personal Portfolio (Third Generation)',
    category: 'FRONTEND • ACCESSIBILITY • DESIGN SYSTEM',
    overview: 'Modern, high-performance developer portfolio built to showcase engineering depth, factual proof of work, and project architecture without bloated dependencies.',
    problem: 'Traditional student portfolios rely on generic templates, fake skill percentage circles, bloated animation libraries, and exaggerated claims that recruiters immediately disregard.',
    thinking: 'Constructed an editorial, technical experience inspired by 2026 AI product engineers. Features an interactive developer console, interactive system map, evidence-based stack inspector, and 100% factual alignment with my resume.',
    architecture: 'Semantic HTML5 structure + Modern CSS custom property tokens + Zero-dependency JavaScript micro-modules + Native accessible <dialog> API.',
    implementation: [
      'Responsive editorial layouts with obsidian dark theme and electric cyan technical accents.',
      'Iterated through multiple UI themes and implemented dark-to-light design migration for enhanced visual accessibility.',
      'Built interactive REPL developer console with real-time command processing.',
      'Embedded PDF resume viewer modal, interactive SchemeAI simulator, and 1-click email clipboard feedback.',
      'Zero external JavaScript frameworks, ensuring instant loading (<50ms) and 100/100 performance scores.'
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript (Native)', 'Canvas API', 'Accessible Dialogs', 'GitHub Pages'],
    verifiedLinks: {
      github: 'https://github.com/lakshay-vaishnav',
      demo: 'https://lakshay-vaishnav.github.io/PORTFOLIO'
    }
  },
  'restaurant': {
    badge: 'State Machine & DOM Engineering',
    title: 'Modern Restaurant Web Platform',
    category: 'WEB APPLICATION • CLIENT-SIDE STATE • DOM MANIPULATION',
    overview: 'A responsive modern dining website featuring an interactive menu explorer, dynamic category filtering, table reservation flow, and zero-framework client-side state management.',
    problem: 'Many small web applications load heavy front-end frameworks (React/Vue) simply to manage basic filtering and interactive forms, leading to slow mobile performance and unnecessary bundle sizes.',
    thinking: 'Demonstrated deep fluency in native browser APIs by creating a clean client-side state management pattern using vanilla JavaScript and direct DOM manipulation with zero external runtime dependencies.',
    architecture: 'Modular JavaScript state store -> Reactive DOM event bindings -> CSS transition transforms -> Client-side form validation.',
    implementation: [
      'Designed and developed a fully responsive restaurant website with interactive menu and reservation booking flow.',
      'Implemented client-side state management and dynamic DOM manipulation without any external frameworks.',
      'Built smooth UI animations, tab transitions, and accessible form inputs.',
      'Tested across various mobile device viewports for zero-overflow touch performance.'
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'State Management', 'DOM APIs'],
    verifiedLinks: {
      github: 'https://github.com/lakshay-vaishnav'
    }
  }
};

function initCaseStudyModals() {
  const modal = document.getElementById('case-study-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const triggerBtns = document.querySelectorAll('.open-case-study');

  if (!modal || !closeBtn) return;

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const data = caseStudiesData[projectId];
      if (!data) return;

      document.getElementById('modal-badge').textContent = data.badge;
      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-category').textContent = data.category;
      document.getElementById('modal-overview').textContent = data.overview;
      document.getElementById('modal-problem').textContent = data.problem;
      document.getElementById('modal-thinking').textContent = data.thinking;
      document.getElementById('modal-architecture').innerHTML = data.architecture;

      // Implementation bullets
      const listEl = document.getElementById('modal-impl-list');
      listEl.innerHTML = '';
      data.implementation.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        listEl.appendChild(li);
      });

      // Tech tags
      const techEl = document.getElementById('modal-tech-tags');
      techEl.innerHTML = '';
      data.tech.forEach(t => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = t;
        techEl.appendChild(tag);
      });

      // Actions / Links
      const githubLink = document.getElementById('modal-github-link');
      githubLink.href = data.verifiedLinks.github;

      modal.showModal();
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.close();
  });

  modal.addEventListener('click', (e) => {
    const rect = modal.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      modal.close();
    }
  });
}

/* ==========================================================================
   8. RESUME MODAL & VIEWER
   ========================================================================== */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const openBtns = document.querySelectorAll('.open-resume-btn');
  const closeBtn = document.getElementById('resume-close-btn');

  if (!resumeModal || !closeBtn) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      resumeModal.showModal();
    });
  });

  closeBtn.addEventListener('click', () => {
    resumeModal.close();
  });

  resumeModal.addEventListener('click', (e) => {
    const rect = resumeModal.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      resumeModal.close();
    }
  });
}

/* ==========================================================================
   9. CLIPBOARD COPY WITH TOAST NOTIFICATION
   ========================================================================== */
function initClipboard() {
  const copyBtns = document.querySelectorAll('.copy-email-btn');
  const toast = document.getElementById('toast-notice');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = 'vaishnavlakshay640@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Copied vaishnavlakshay640@gmail.com to clipboard');
      }).catch(() => {
        showToast('Email: vaishnavlakshay640@gmail.com');
      });
    });
  });

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

/* ==========================================================================
   10. SCROLL SPY FOR NAVIGATION
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(sec => observer.observe(sec));
}

