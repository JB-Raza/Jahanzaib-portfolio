// ============================================================
// SINGLE SOURCE OF TRUTH
// Edit this file to update all content on the portfolio.
// No dashboard or backend needed — just update and deploy.
// ============================================================

export const portfolioData = {

  // ── Site Metadata ──────────────────────────────────────────────────────────
  siteMeta: {
    title:       'Jahanzaib — Software Engineer',
    description: 'Dedicated Software Engineer with 2+ years of experience in the MERN stack and Next.js ecosystem. Building high-performance web and mobile applications.',
    url:         'https://jahanzaib.dev',         // TODO: Update with your actual domain
    ogImage:     '/og-image.png',                 // TODO: Add your OG image to public/
  },

  // ── Personal Info ──────────────────────────────────────────────────────────
  personal: {
    name:             'Jahanzaib',
    fullName:         'Jahanzaib Raza',                
    role:             'Software Engineer',
    specialization:   'MERN Stack & Next.js Developer',
    location:         'Lahore, Pakistan',                 
    tagline:          'Building high-performance web and mobile applications with clean code, scalable architecture, and an obsession for great user experience.',
    bio:              'Dedicated Software Engineer with over two years of professional experience specializing in the MERN stack and Next.js ecosystem. Proven expertise in developing high-performance web and mobile applications using React, React Native, and Node.js. Highly skilled in architecting scalable server-side solutions with Express and MongoDB while maintaining a performance-centric development philosophy.',
    bioExtended:      'Deep understanding of the Next.js framework, including Server-Side Rendering (SSR) and Static Site Generation (SSG) for optimal SEO and load speeds. Committed to delivering superior User Experience (UX) through clean, optimized code and highly responsive UI design. Strong technical foundation in JavaScript and TypeScript, ensuring type-safe and maintainable codebases across full-stack environments.',
    avatar:           '/images/avatar.jpg',       // TODO: Add your photo → public/images/avatar.jpg
    cvUrl:            '/cv/jahanzaib-cv.pdf',     // TODO: Add your CV → public/cv/jahanzaib-cv.pdf

    // Stats (shown in About section)
    yearsOfExperience: 2,
    projectsDelivered: 9,
    techStacks:        10,

    // Core strengths (shown in About section highlight list)
    highlights: [
      'MERN Stack & Next.js Architecture',
      'SSR / SSG & Performance Optimization',
      'Type-safe Codebases with TypeScript',
      'Responsive & Accessible UI/UX Design',
      'Full-cycle Project Delivery',
      'API Performance & Database Optimization',
    ],
  },

  // ── Contact ────────────────────────────────────────────────────────────────
  contact: {
    email:         'jraza198@gmail.com',
    github:        'https://github.com/jahanzaib',       // TODO: Your GitHub profile URL
    linkedin:      'https://linkedin.com/in/jahanzaib',  // TODO: Your LinkedIn URL
    twitter:       '',
    web3formsKey:  'e8e4239d-743f-4ea9-ac30-adaba58994d4',
  },

  
  skills: [
    // ── Frontend ──────────────────────────────────────────
    { name: 'React',        category: 'Frontend',  percentage: 90, levelLabel: 'Expert'       },
    { name: 'Next.js',      category: 'Frontend',  percentage: 90, levelLabel: 'Expert'       },
    { name: 'JavaScript',   category: 'Frontend',  percentage: 95, levelLabel: 'Expert'       },
    { name: 'TypeScript',   category: 'Frontend',  percentage: 82, levelLabel: 'Advanced'     },
    { name: 'Tailwind CSS', category: 'Frontend',  percentage: 92, levelLabel: 'Expert'       },
    { name: 'Bootstrap',    category: 'Frontend',  percentage: 80, levelLabel: 'Advanced'     },
    // ── Backend ───────────────────────────────────────────
    { name: 'Node.js',      category: 'Backend',   percentage: 90, levelLabel: 'Expert'       },
    { name: 'Express.js',   category: 'Backend',   percentage: 88, levelLabel: 'Expert'       },
    { name: 'REST APIs',    category: 'Backend',   percentage: 90, levelLabel: 'Expert'       },
    // ── Mobile ────────────────────────────────────────────
    { name: 'React Native', category: 'Mobile',    percentage: 82, levelLabel: 'Advanced'     },
    // ── Database ──────────────────────────────────────────
    { name: 'MongoDB',      category: 'Database',  percentage: 88, levelLabel: 'Expert'       },
    // ── Tools ─────────────────────────────────────────────
    { name: 'Git',          category: 'Tools',     percentage: 88, levelLabel: 'Advanced'     },
    { name: 'Vercel',       category: 'Tools',     percentage: 85, levelLabel: 'Advanced'     },
    { name: 'npm / yarn',   category: 'Tools',     percentage: 85, levelLabel: 'Advanced'     },
  ],

  // ── Experience ─────────────────────────────────────────────────────────────
  experience: [
    {
      role:         'MERN stack Developer',
      company:      'Single Solution',
      period:       'April 2024 – Present',
      location:     'On-Site',
      type:         'Full-time',
      summary:      'My Role requires me to work on new projects while simoultanuously managing existing projects and provide Performant Solutions while meeting realistic deadlines. I have been working as Frontend Developer, Backend Developer and Full stack Developer from time to time as required by my company.',
      achievements: [
        'TODO: I was able to work on .',
        'TODO: Include a measurable impact, e.g. reduced load time by 40% or handled 10K+ daily users.',
        'TODO: Add another notable responsibility or cross-functional collaboration.',
        'TODO: Add a fourth point if applicable — architecture decision, mentorship, etc.',
      ],
      stack: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'React Native'],
    },
    {
      role:         'MERN stack Developer',
      company:      'Freelance Projects',
      period:       'Jun 2023 – Jan 2024',
      location:     'Remote',
      type:         'Full-time',
      summary:      'I entered in the world of Freelancing and has participated in many projects from building portfolios to ecommerce projects mostly as an assistant with local clients approached via facebook and LinkedIn.',
      achievements: [
        'TODO: Key achievement or project delivered here.',
        'TODO: Technical ownership or leadership contribution.',
        'TODO: Outcome or improvement you drove.',
      ],
      stack: ['React', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'Node.js'],
    },
  ],

  // ── Projects ───────────────────────────────────────────────────────────────

  projects: [
    {
      title:        'Wanderlust',
      role:         'Full Stack Developer',
      type:         'Web Application',
      summary:      'This project was developed to let consumers rent out properties (for domestic houses and commercial hotel rooms for a short time). For those Who likes to travel and find it difficult to actually get a proper living location.',
      impactPoints: [ // TODO
        'TODO: Add a measurable outcome, e.g. Processed 10K+ file transfers per day at peak.',
        'TODO: Add a technical achievement, e.g. Implemented chunked upload with progress tracking.',
        'TODO: Add a business or UX impact.',
      ],
      stack:    ["React JS", 'Node.js', 'Express', 'MongoDB', "Cloudinary"],
      liveUrl:  '',                                 // TODO: Add live/demo URL
      repoUrl:  '',                                 // TODO: Add GitHub repo URL
      featured: true,
    },
    {
      title:        'Motex Car Services',
      role:         'MERN developer',
      type:         'Web Application',
      summary:      'Local Car rental Services provider for all kinds of cars, proper booking system, authentication and authorization with secure payment transations with paypal and stripe.',
      impactPoints: [             // TODO
        'TODO: Measurable impact — downloads, active users, performance gain, etc.',
        'TODO: Technical highlight — architecture, integrations, or performance work.',
        'TODO: Delivery or quality achievement.',
      ],
      stack:    ['React JS', 'Node.js', 'MongoDB', 'Express', "Cloudinary", "Paypal", "Stripe"],
      liveUrl:  '',                                 // TODO: App Store / Play Store URL
      repoUrl:  '',                                 // TODO: GitHub repo URL
      featured: true,
    },
    {
      title:        'Project Three',               // TODO: Replace with actual project name
      role:         'Full Stack Developer',
      type:         'Web Application',
      summary:      'TODO: Short description of this project and its purpose.',
      impactPoints: [
        'TODO: Key impact point.',
        'TODO: Technical achievement.',
      ],
      stack:    ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB'],
      liveUrl:  '',
      repoUrl:  '',
      featured: false,
    },
  ],

  // ── Education ──────────────────────────────────────────────────────────────
  education: [
    {
      degree:      "Bachelor's of Computer Science",
      institution: 'University of the Punjab',
      period:      '2022 – Continue',
      location:    'Lahore, Pakistan',
    },
    {
      degree:      'ICS',
      institution: 'Aspire College Township',
      period:      '2020 - 2022',
      location:    'Lahore, Pakistan',
    },
  ],

  // ── Certifications (optional) ──────────────────────────────────────────────
  certifications: [
    {
      title:    'Full Stack Web Developer',
      issuer:   'CORVIT Systems Lahore',
      year:     2023,
      url:      '', // TODO
    },
  ],
}
