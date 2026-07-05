const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Ensure output folder exists
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const doc = new PDFDocument({
  size: 'A4',
  margins: {
    top: 45,
    bottom: 45,
    left: 45,
    right: 45
  }
});

const outputPath = path.join(publicDir, 'Delator_Caleb_CV.pdf');
const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Colors (Corporate Slate/Blue matching our palette)
const primaryColor = '#0f172a';    // Slate 900
const secondaryColor = '#2563eb';  // Blue 600
const textColor = '#334155';       // Slate 700
const lightTextColor = '#64748b';  // Slate 500
const dividerColor = '#e2e8f0';    // Slate 200

// Font settings
doc.font('Helvetica');

// Header Block
doc.fillColor(primaryColor).fontSize(22).font('Helvetica-Bold').text('DELATOR CALEB EDUDZI', { align: 'left' });
doc.fontSize(11).fillColor(secondaryColor).font('Helvetica-Bold').text('FullStack AI Engineer & Developer', { align: 'left' });
doc.moveDown(0.4);

// Contact Grid
doc.fontSize(8.5).fillColor(textColor).font('Helvetica');
doc.text('Email: delatorcaleb3@gmail.com   |   GitHub: github.com/IncreasonJr   |   LinkedIn: linkedin.com/in/caleb-delator-78675b411');
doc.moveDown(1.2);

// Draw divider line
let currentY = doc.y;
doc.strokeColor(dividerColor).lineWidth(1.5).moveTo(45, currentY).lineTo(550, currentY).stroke();
doc.moveDown(1);

// Section: Summary
doc.fontSize(11).fillColor(primaryColor).font('Helvetica-Bold').text('PROFESSIONAL SUMMARY');
doc.moveDown(0.3);
doc.fontSize(9).fillColor(textColor).font('Helvetica').lineGap(3).text(
  'A result-driven FullStack AI Engineer specialized in training and integrating machine learning models with responsive full-stack architectures. Proven expertise in building safe agentic tools, vector search indices, predictive systems, and developer extensions. Strong collaborator focused on solving complex challenges using Python, TypeScript, and modern AI pipelines.',
  { width: 505 }
);
doc.moveDown(1);

// Section: Core Skills
doc.fontSize(11).fillColor(primaryColor).font('Helvetica-Bold').text('TECHNICAL SKILLS');
doc.moveDown(0.3);

const skillGroups = [
  { name: 'Core Languages', skills: 'JavaScript, TypeScript, Python, PHP, Java, C++, HTML5' },
  { name: 'AI, ML & Data Science', skills: 'PyTorch, scikit-learn, Pandas, NumPy, Matplotlib, HuggingFace, LangChain, RAG, NVIDIA NIM, Vector Databases' },
  { name: 'Frontend & Backend', skills: 'React, Next.js, Node.js, FastAPI, Flask, Express, PostgreSQL, Docker, REST APIs, WebSockets' },
  { name: 'DevOps & Tools', skills: 'Render, VS Code Extension API, Git, Vercel, Railway, AWS' }
];

skillGroups.forEach(g => {
  doc.fontSize(9).font('Helvetica-Bold').fillColor(textColor).text(`${g.name}: `, { continued: true })
     .font('Helvetica').fillColor(textColor).text(g.skills);
  doc.moveDown(0.15);
});
doc.moveDown(0.8);

// Section: Experience
doc.fontSize(11).fillColor(primaryColor).font('Helvetica-Bold').text('PROFESSIONAL EXPERIENCE');
doc.moveDown(0.3);

const experience = [
  {
    role: 'Freelance AI Engineer / Full-Stack Developer',
    company: 'Self-Employed',
    period: '2026',
    bullets: [
      'Architected and deployed APEX, an autonomous agent router that parses complex nested queries and dynamically connects API execution blocks.',
      'Developed CLUTCH, a predictive machine learning engine utilizing historic team performance and training data to output win/loss probabilities.',
      'Built Auto Commit Gen, a VS Code Extension generating standard git commit messages from staged diffs using local LLMs (Ollama) and cloud APIs.'
    ]
  },
  {
    role: 'Software Developer',
    company: 'Previous Role',
    period: '2025',
    bullets: [
      'Built data pipelines and responsive client layouts using React, Node.js, Python, and relational databases (PostgreSQL, SQL).',
      'Optimized query speeds by implementing indices and query tuning, improving load speeds of dashboard layouts by 25%.'
    ]
  },
  {
    role: 'Computer Science Student / Self-Taught Developer',
    company: 'Academics & Personal Projects',
    period: '2024',
    bullets: [
      'Mastered fundamentals of programming languages, algorithms, data structures, relational schemas, and networking architectures.',
      'Created BookNest, a library queue system, and Landmark Legacy School layouts.'
    ]
  }
];

experience.forEach(exp => {
  doc.fontSize(9.5).font('Helvetica-Bold').fillColor(textColor).text(exp.role, { continued: true })
     .font('Helvetica').fillColor(lightTextColor).text(`  |  ${exp.company} (${exp.period})`);
  doc.moveDown(0.2);
  
  exp.bullets.forEach(b => {
    doc.fontSize(8.5).font('Helvetica').fillColor(textColor).text(`• ${b}`, { indent: 12, lineGap: 2 });
  });
  doc.moveDown(0.4);
});
doc.moveDown(0.5);

// Section: Projects
doc.fontSize(11).fillColor(primaryColor).font('Helvetica-Bold').text('NOTABLE PROJECTS');
doc.moveDown(0.3);

const projects = [
  { name: 'APEX', desc: 'Custom LLM Router resolving nested developer queries into structured API pipelines (Python, pgvector, LangChain).' },
  { name: 'CLUTCH', desc: 'Predictive scoring engine utilizing historical and live event inputs to forecast sport probabilities (PyTorch, scikit-learn, FastAPI).' },
  { name: 'Slide App Pro', desc: 'Offline-first slide presentation app featuring touch gestures, Service Worker caching, and IndexedDB local state (React, PWA, TS).' }
];

projects.forEach(p => {
  doc.fontSize(9).font('Helvetica-Bold').fillColor(textColor).text(`${p.name}: `, { continued: true })
     .font('Helvetica').fillColor(textColor).text(p.desc);
  doc.moveDown(0.15);
});

doc.end();

writeStream.on('finish', () => {
  console.log('PDF CV generated successfully at public/Delator_Caleb_CV.pdf');
});
