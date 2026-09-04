-- ============================================================
-- UniqueAI Seed Data
-- TEMPORARY seed content for development/setup.
-- Replace with real content via Admin CMS before production.
-- ============================================================

-- ── Site Settings ────────────────────────────────────────────

INSERT INTO site_settings (
  company_name, legal_name, tagline, description,
  email, phone, whatsapp,
  social_links, seo_title, seo_description,
  homepage_config
) VALUES (
  'UniqueAI',
  'UniqueAI Technologies Pvt. Ltd.',
  'Technology for a Smarter Tomorrow',
  'UniqueAI delivers innovative software, intelligent automation, and market technology that helps businesses grow, operate efficiently, and stay ahead in a digital world.',
  'contact@uniqueai.com',
  '+91 9876 543 210',
  '+919876543210',
  '{"linkedin": "", "twitter": "", "facebook": "", "instagram": ""}'::jsonb,
  'UniqueAI — Technology for a Smarter Tomorrow',
  'UniqueAI delivers innovative software, AI automation, and market technology solutions for modern businesses.',
  '{
    "hero": {
      "eyebrow": "1200+ Completed • Trusted by 1500+ Clients",
      "title": "Technology that empowers every business.",
      "highlight_text": "empowers every",
      "description": "UniqueAI delivers innovative software, intelligent automation and market technology that helps businesses grow, operate efficiently and stay ahead in a digital world.",
      "primary_cta_label": "Explore Solutions",
      "primary_cta_url": "/solutions",
      "secondary_cta_label": "Talk to Our Experts",
      "secondary_cta_url": "/contact",
      "trust_labels": ["Secure", "Scalable", "Smart Automation", "Reliable Support"]
    },
    "why_choose": {
      "title": "Why Businesses Choose UniqueAI?",
      "benefits": [
        {"icon": "Shield", "title": "100% Secure", "description": "Your data is safe with enterprise-grade security protocols."},
        {"icon": "Settings", "title": "Custom Solutions", "description": "Tailored software that fits your exact business needs."},
        {"icon": "Users", "title": "Expert Team", "description": "15+ years of experience across multiple domains."},
        {"icon": "Headphones", "title": "24/7 Support", "description": "With you at every step of your journey."},
        {"icon": "TrendingUp", "title": "Proven Results", "description": "Trusted by 1500+ businesses across India."}
      ]
    },
    "process": {
      "title": "Our Proven Process",
      "subtitle": "From idea to impact — we build technology that offers real results.",
      "steps": [
        {"number": 1, "title": "Discover", "description": "We understand your business needs."},
        {"number": 2, "title": "Plan", "description": "We create a strategy tailored to your needs."},
        {"number": 3, "title": "Design", "description": "We design beautiful experiences."},
        {"number": 4, "title": "Develop", "description": "We build scalable and reliable solutions."},
        {"number": 5, "title": "Deploy & Support", "description": "We launch and support for growth."}
      ]
    },
    "stats": [
      {"value": "1000+", "label": "Happy Clients", "order": 1},
      {"value": "150+", "label": "Projects Delivered", "order": 2},
      {"value": "10+", "label": "Years of Experience", "order": 3},
      {"value": "99.9%", "label": "System Uptime", "order": 4},
      {"value": "24/7", "label": "Expert Support", "order": 5}
    ],
    "capabilities": [
      {"icon": "Globe", "title": "Web & Mobile Development", "order": 1},
      {"icon": "Cloud", "title": "Cloud & DevOps Solutions", "order": 2},
      {"icon": "BarChart3", "title": "Data Analytics & Reporting", "order": 3},
      {"icon": "Link2", "title": "API & System Integration", "order": 4},
      {"icon": "Palette", "title": "UI/UX Design & Branding", "order": 5},
      {"icon": "Wrench", "title": "Maintenance & Tech Support", "order": 6}
    ]
  }'::jsonb
);

-- ── Services ─────────────────────────────────────────────────

INSERT INTO services (title, slug, short_description, description, features, display_order, is_featured, is_published) VALUES
(
  'E-Commerce Development',
  'e-commerce-development',
  'Scalable online stores that drive sales and deliver great customer experiences.',
  'Build powerful, conversion-optimized e-commerce platforms with advanced analytics, inventory management, and seamless payment integration.',
  '[
    {"title": "Custom Storefront Design", "description": "Tailored UI/UX for your brand identity"},
    {"title": "Payment Gateway Integration", "description": "Multiple payment options including UPI, cards, and wallets"},
    {"title": "Inventory Management", "description": "Real-time stock tracking and automated alerts"},
    {"title": "Analytics Dashboard", "description": "Comprehensive sales and customer behavior insights"}
  ]'::jsonb,
  1, true, true
),
(
  'Stock Market Software Solutions',
  'stock-market-software',
  'Real-time tools and analytics for smarter trading and informed market decisions.',
  'Advanced trading platforms with real-time data feeds, algorithmic trading support, and comprehensive market analysis tools.',
  '[
    {"title": "Real-time Market Data", "description": "Live feeds with millisecond latency"},
    {"title": "Technical Analysis Tools", "description": "Advanced charting and indicator libraries"},
    {"title": "Automated Trading", "description": "Algorithm-based order execution systems"},
    {"title": "Risk Management", "description": "Position sizing and portfolio risk analysis"}
  ]'::jsonb,
  2, true, true
),
(
  'ERP Solutions for Enterprises',
  'erp-solutions',
  'Streamline operations, reduce costs and improve productivity with unified systems.',
  'Enterprise resource planning solutions that integrate all business processes into a single, efficient system.',
  '[
    {"title": "Financial Management", "description": "Complete accounting and financial reporting"},
    {"title": "HR & Payroll", "description": "Employee lifecycle and payroll management"},
    {"title": "Supply Chain", "description": "End-to-end supply chain visibility"},
    {"title": "CRM Integration", "description": "Unified customer relationship management"}
  ]'::jsonb,
  3, true, true
),
(
  'AI & Automation Services',
  'ai-automation',
  'Intelligent automation and AI solutions tailored to your business processes.',
  'Leverage artificial intelligence and machine learning to automate workflows, gain insights, and drive efficiency.',
  '[
    {"title": "Process Automation", "description": "RPA and intelligent workflow automation"},
    {"title": "Predictive Analytics", "description": "ML-powered business forecasting"},
    {"title": "Natural Language Processing", "description": "Chatbots and document processing"},
    {"title": "Computer Vision", "description": "Image recognition and quality inspection"}
  ]'::jsonb,
  4, true, true
),
(
  'Custom Software Development',
  'custom-software',
  'Bespoke software solutions designed and built for your unique business challenges.',
  'From concept to deployment, we build custom software that solves your specific business problems with modern technology stacks.',
  '[
    {"title": "Requirements Analysis", "description": "Deep understanding of your business needs"},
    {"title": "Agile Development", "description": "Iterative development with regular deliverables"},
    {"title": "Quality Assurance", "description": "Comprehensive testing and quality control"},
    {"title": "Ongoing Support", "description": "Post-launch maintenance and feature updates"}
  ]'::jsonb,
  5, false, true
);

-- ── Blog Categories ──────────────────────────────────────────

INSERT INTO blog_categories (name, slug) VALUES
  ('AI & Automation', 'ai-automation'),
  ('Market Guides', 'market-guides'),
  ('Business', 'business'),
  ('Technology', 'technology'),
  ('E-Commerce', 'e-commerce');

-- ── Offices ──────────────────────────────────────────────────

INSERT INTO offices (name, address, city, state, country, postal_code, phone, email, display_order) VALUES
(
  'Delhi, India',
  'Connaught Place',
  'New Delhi',
  'Delhi',
  'India',
  '110001',
  '+91 11 4000 7070',
  'delhi@uniqueai.com',
  1
),
(
  'Bangalore, Karnataka',
  'MG Road',
  'Bangalore',
  'Karnataka',
  'India',
  '560001',
  '+91 80 4000 8080',
  'bangalore@uniqueai.com',
  2
);
