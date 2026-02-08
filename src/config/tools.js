const categories = [
  {
    key: 'student-tools',
    name: 'Student Tools',
    tools: [
      { slug: 'pdf-to-exam-notes', title: 'PDF → Exam Notes', description: 'Turn long PDFs into concise exam-ready notes.', implemented: false },
      { slug: 'ppt-to-study-notes', title: 'PPT → Study Notes', description: 'Convert slides into focused study notes.', implemented: false },
      { slug: 'notes-to-mcqs', title: 'Notes → MCQs', description: 'Generate practice MCQs from class notes.', implemented: false },
      { slug: 'formula-extractor-pdf', title: 'Formula Extractor from PDF', description: 'Pull equations and formulas from study PDFs.', implemented: false },
      { slug: 'assignment-formatter', title: 'Assignment Formatter', description: 'Format assignments to college submission standards.', implemented: false }
    ]
  },
  {
    key: 'career-resume-tools',
    name: 'Career / Resume Tools',
    tools: [
      { slug: 'resume-pdf-optimizer', title: 'Resume PDF Optimizer', description: 'Optimize resume PDFs for readability and size.', implemented: false },
      { slug: 'ats-keyword-extractor', title: 'ATS Keyword Extractor', description: 'Extract ATS-relevant keywords from resumes.', implemented: false },
      { slug: 'jd-resume-keyword-matcher', title: 'JD → Resume Keyword Matcher', description: 'Match your resume against a job description.', implemented: false },
      { slug: 'resume-linkedin-bullet-converter', title: 'Resume → LinkedIn Bullet Converter', description: 'Rewrite resume lines into LinkedIn-style bullets.', implemented: false },
      { slug: 'cover-letter-generator', title: 'Cover Letter Generator', description: 'Create structured cover letters quickly.', implemented: false }
    ]
  },
  {
    key: 'one-click-pdf-fixes',
    name: 'One-Click PDF Fixes',
    tools: [
      { slug: 'compress-pdf', title: 'Compress PDF', description: 'Compress PDFs fast for email and uploads.', implemented: false },
      { slug: 'fix-non-selectable-pdf-text', title: 'Fix non-selectable text (OCR)', description: 'Make scanned PDF text selectable.', implemented: false },
      { slug: 'rotate-pdf-pages', title: 'Rotate pages', description: 'Rotate PDF pages in one click.', implemented: false },
      { slug: 'improve-scanned-pdf-clarity', title: 'Improve scanned PDF clarity', description: 'Enhance readability of scanned documents.', implemented: false },
      { slug: 'reduce-pdf-file-size-limit', title: 'Reduce file size for upload limits', description: 'Shrink PDFs to meet strict upload requirements.', implemented: false }
    ]
  },
  {
    key: 'ai-utility-tools',
    name: 'AI + Utility Tools',
    tools: [
      { slug: 'explain-pdf-simple-words', title: 'Explain this PDF in simple words', description: 'Get plain-language explanations from PDF content.', implemented: false },
      {
        slug: 'summarize-pdf-5-bullets',
        title: 'Summarize PDF in 5 bullets',
        description: 'Extract five exam-friendly bullet points from any PDF.',
        implemented: true,
        metaTitle: 'Summarize PDF in 5 Bullets Free | No Login Tool',
        h1: 'Summarize PDF in 5 bullets',
        faq: [
          {
            q: 'Does this tool save my PDF?',
            a: 'No. Uploaded files are processed and deleted automatically after summary generation.'
          },
          {
            q: 'Can I use this for lecture notes?',
            a: 'Yes, this tool is optimized for concise study-oriented summaries.'
          },
          {
            q: 'Do I need an account?',
            a: 'No login is required. The tool is fully free to use.'
          }
        ]
      },
      { slug: 'pdf-to-qa-converter', title: 'Convert PDF → Q&A', description: 'Convert documents into quick Q&A pairs.', implemented: false },
      { slug: 'detect-pdf-errors', title: 'Detect errors or inconsistencies in PDF', description: 'Identify potential mistakes or mismatches in documents.', implemented: false }
    ]
  }
];

const allTools = categories.flatMap((category) =>
  category.tools.map((tool) => ({ ...tool, categoryKey: category.key, categoryName: category.name }))
);

function getToolBySlug(slug) {
  return allTools.find((tool) => tool.slug === slug);
}

module.exports = {
  categories,
  allTools,
  getToolBySlug
};
