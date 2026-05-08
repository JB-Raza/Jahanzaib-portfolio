// ============================================================
// SINGLE SOURCE OF TRUTH
// Edit this file to update all content on the portfolio.
// No dashboard or backend needed — just update and deploy.
// ============================================================

export const portfolioData = {

  // ── Site Metadata ──────────────────────────────────────────────────────────
  siteMeta: {
    title: 'Jahanzaib — Software Engineer',
    description: 'Dedicated Software Engineer with 2+ years of experience in the MERN stack and Next.js ecosystem. Building high-performance web and mobile applications.',
    url: 'https://jahanzaib-raza.vercel.app',
    ogImage: '/og_image.png', // sync with index.html og:image + file in public/
  },

  // ── Personal Info ──────────────────────────────────────────────────────────
  personal: {
    name: 'Jahanzaib',
    fullName: 'Jahanzaib Raza',
    role: 'Software Engineer',
    specialization: 'MERN Stack & Next.js Developer',
    location: 'Lahore, Pakistan',
    tagline: 'Building high-performance web and mobile applications with clean code, scalable architecture, and an obsession for great user experience.',
    bio: 'Dedicated Software Engineer with over two years of professional experience specializing in the MERN stack and Next.js ecosystem. Proven expertise in developing high-performance web and mobile applications using React, React Native, and Node.js. Highly skilled in architecting scalable server-side solutions with Express and MongoDB while maintaining a performance-centric development philosophy.',
    bioExtended: 'Deep understanding of the Next.js framework, including Server-Side Rendering (SSR) and Static Site Generation (SSG) for optimal SEO and load speeds. Committed to delivering superior User Experience (UX) through clean, optimized code and highly responsive UI design. Strong technical foundation in JavaScript and TypeScript, ensuring type-safe and maintainable codebases across full-stack environments.',
    avatar: '/avatar.png',
    cvUrl: '/jahanzaib_cv.pdf',

    // Stats (shown in About section)
    yearsOfExperience: 2,
    projectsDelivered: 9,
    techStacks: 10,

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
    email: 'jraza198@gmail.com',
    github: 'https://github.com/JB-raza',
    linkedin: 'https://www.linkedin.com/in/jahanzaib-raza-developer/',
    twitter: '',
    web3formsKey: 'e8e4239d-743f-4ea9-ac30-adaba58994d4',
  },


  skills: [
    // ── Frontend ──────────────────────────────────────────
    { name: 'React', category: 'Frontend', percentage: 90, levelLabel: 'Expert' },
    { name: 'Next.js', category: 'Frontend', percentage: 90, levelLabel: 'Expert' },
    { name: 'JavaScript', category: 'Frontend', percentage: 95, levelLabel: 'Expert' },
    { name: 'TypeScript', category: 'Frontend', percentage: 82, levelLabel: 'Advanced' },
    { name: 'Tailwind CSS', category: 'Frontend', percentage: 92, levelLabel: 'Expert' },
    { name: 'Bootstrap', category: 'Frontend', percentage: 80, levelLabel: 'Advanced' },
    // ── Backend ───────────────────────────────────────────
    { name: 'Node.js', category: 'Backend', percentage: 90, levelLabel: 'Expert' },
    { name: 'Express.js', category: 'Backend', percentage: 88, levelLabel: 'Expert' },
    { name: 'REST APIs', category: 'Backend', percentage: 90, levelLabel: 'Expert' },
    // ── Mobile ────────────────────────────────────────────
    { name: 'React Native', category: 'Mobile', percentage: 82, levelLabel: 'Advanced' },
    // ── Database ──────────────────────────────────────────
    { name: 'MongoDB', category: 'Database', percentage: 88, levelLabel: 'Expert' },
    // ── Tools ─────────────────────────────────────────────
    { name: 'Git', category: 'Tools', percentage: 88, levelLabel: 'Advanced' },
    { name: 'Vercel', category: 'Tools', percentage: 85, levelLabel: 'Advanced' },
    { name: 'npm / yarn', category: 'Tools', percentage: 85, levelLabel: 'Advanced' },
  ],

  // ── Experience ─────────────────────────────────────────────────────────────
  experience: [
    {
      role: 'MERN stack Developer',
      company: 'Single Solution',
      period: 'April 2024 – Present',
      location: 'On-Site',
      type: 'Full-time',
      summary: 'My Role requires me to work on new projects while simoultanuously managing existing projects and provide Performant Solutions while meeting realistic deadlines. I have been working as Frontend Developer, Backend Developer and Full stack Developer from time to time as required by my company.',
      achievements: [
        'Integrated dual payment gateways supporting 500+ monthly transactions.',
        'Reduced brute-force attack surface by 95% through MongoDB based rate limiting.',
        'Improved perceived load speed by 40% using progressive animation strategies and made most apps look snappier even on high load.',
        'Optimized component re-renders, reducing CPU usage by 30% on low end devices.',
        'Introduced modular folder structure and centralized state pattern (Redux Toolkit) that reduced new feature development time by 25% for other developers.',
      ],
      stack: ['React JS', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'Next JS', 'Tailwind CSS', "3rd Party APIs"],
    },
    {
      role: 'MERN stack Developer',
      company: 'Freelance Projects',
      period: 'Jun 2023 – Jan 2024',
      location: 'Remote',
      type: 'Full-time',
      summary: 'I entered in the world of Freelancing and has participated in many projects from building portfolios to ecommerce projects mostly as an assistant with local clients approached via facebook and LinkedIn.',
      achievements: [
        'Resolved API contract mismatch between frontend and backend where response structure differed from expected schema.',
        'Identified and patched memory leak in React component that caused progressive slowdown after few page navigations and reduced tab crash rate by 70%.',
        'Added performant search filter functionality to existing product listing page (debounced input, category filters) which improved product discovery time by 40%.',
        'Build admin panel for ecommerce project that allowed clients to manage products, orders, users, and inventory.',
      ],
      stack: ['React', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'Node.js', "Express JS", "MongoDB"],
    },
  ],

  // ── Projects ───────────────────────────────────────────────────────────────

  projects: [
    {
      title: 'Wanderlust',
      role: 'Full Stack Developer',
      type: 'Web Application',
      summary: 'This project was developed to let consumers rent out properties (for domestic houses and commercial hotel rooms for a short time). For those Who likes to travel and find it difficult to actually get a proper living location.',
      impactPoints: [
        "Built end-to-end car rental platform with JWT authentication and role-based access (user/admin)",
        "Integrated PayPal and Stripe payment gateways with webhook simulation for order confirmation",
        "Created admin dashboard for managing car listings, viewing bookings, and updating availability",
        "Implemented booking date validation to prevent double-booking and overlapping reservations"
      ],
      stack: ["EJS", 'Node.js', 'Express', 'MongoDB', "Cloudinary", "Passport JS", "3rd Party APIs"],
      liveUrl: '',
      repoUrl: 'https://github.com/JB-raza/Wanderlust',
      featured: true,
    },
    {
      title: 'Motex Car Services',
      role: 'MERN developer',
      type: 'Web Application',
      summary: 'Car rental booking interface with dynamic UI and state management. Frontend-only demo showcasing React component architecture and Redux state handling.',
      impactPoints: [
        "Built responsive car catalog with dynamic filtering by car type, price, and seating capacity using Redux state",
        "Implemented booking flow with date picker, price calculation, and order summary (frontend simulation)",
        "Designed reusable component library (CarCard, FilterSidebar, BookingModal) with Tailwind CSS",
        "Managed global state for cart/booking items using Redux Toolkit with persistent localStorage"
      ],
      stack: ['React JS', 'Redux Toolkit', 'Tailwind CSS'],
      liveUrl: 'https://motex-car.vercel.app/',
      repoUrl: 'https://github.com/JB-Raza/motex-car',
      featured: false,
    },
    {
      title: 'E-commerce SaaS platform',
      role: 'Full Stack Developer',
      type: 'Web Application',
      summary: 'Built a white-label e-commerce platform enabling businesses to launch online stores with integrated payment processing, admin dashboard, and user management. Features include product catalog management, order tracking, and role-based access control.',
      impactPoints: [
        "Engineered admin panel with advanced filters (price, category, date range, status) reducing product search time by 60%",
        "Implemented complete user management system with role-based permissions (Admin, Vendor, Customer) supporting 3 user tiers",
        "Integrated dual payment gateways (PayPal + Stripe) with webhook handling for transaction verification",
        "Designed conditional rendering logic for dynamic checkout flows based on user location and payment method"
      ],
      stack: ['React JS', "Redux Toolkit", 'Tailwind CSS', 'Express JS', "Node JS", 'MongoDB', "3rd Party APIs", "Paypal Integration", "Stripe Integration", "Cloudinary"],
      liveUrl: 'https://saas-website-pied.vercel.app/',
      repoUrl: 'https://github.com/JB-Raza/saas-project',
      featured: true,
    },
  ],

  // ── Education ──────────────────────────────────────────────────────────────
  education: [
    {
      degree: "Bachelor's of Computer Science",
      institution: 'University of the Punjab',
      period: '2022 – Continue',
      location: 'Lahore, Pakistan',
    },
    {
      degree: 'ICS',
      institution: 'Aspire College Township',
      period: '2020 - 2022',
      location: 'Lahore, Pakistan',
    },
  ],

  // ── Certifications (optional) ──────────────────────────────────────────────
  certifications: [
    {
      title: 'Full Stack Web Developer',
      issuer: 'CORVIT Systems Lahore',
      year: 2023,
      url: 'jahanzaib-raza.vercel.app',
    },
  ],
}
