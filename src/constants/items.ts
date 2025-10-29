import {
  FaCog,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaLock,
  FaTwitter,
  FaUser,
  FaYoutube,
} from 'react-icons/fa';
import {
  FiHome,
  FiUser,
  FiSettings,
  FiBriefcase,
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiClock,
  FiHelpCircle,
} from 'react-icons/fi';
import { NewsItem } from '../types/newsTypes';
import { CallToAction, Feature, MissionContent } from '../types/about.types';
import { FeaturedResource, ResourceCategory } from '../types/resourse.types';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const menuItems = [
  { id: 1, name: 'Home', path: '/', icon: FiHome },
  { id: 2, name: 'About', path: '/about-us', icon: FiUser },
  { id: 3, name: 'Resources', path: '/resource', icon: FiSettings },
  { id: 4, name: 'Portfolio', path: '/portfolio', icon: FiBriefcase },
  { id: 5, name: 'Contact', path: '/contact', icon: FiMail },
];

export const footerMenus = [
  {
    title: 'Quick Links',
    links: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Services', path: '/services' },
      { name: 'Portfolio', path: '/portfolio' },
      { name: 'Contact', path: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'Help Center', path: '/help' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'FAQ', path: '/faq' },
    ],
  },
];

export const socialLinks = [
  { name: 'Facebook', icon: FaFacebook, url: 'https://facebook.com' },
  { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com' },
  { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com' },
  { name: 'LinkedIn', icon: FaLinkedin, url: 'https://linkedin.com' },
  { name: 'GitHub', icon: FaGithub, url: 'https://github.com' },
  { name: 'YouTube', icon: FaYoutube, url: 'https://youtube.com' },
];

export const helpCategories = [
  {
    icon: FiHelpCircle,
    title: 'Getting Started',
    description: 'New to our platform? Learn the basics here.',
    links: ['Account Setup', 'First Steps', 'Basic Features'],
  },
  {
    icon: FiMessageSquare,
    title: 'Account & Billing',
    description: 'Manage your account and billing information.',
    links: ['Update Profile', 'Payment Methods', 'Billing History'],
  },
  {
    icon: FiClock,
    title: 'Troubleshooting',
    description: 'Solutions for common issues and problems.',
    links: ['Login Issues', 'Feature Problems', 'Error Messages'],
  },
];

export const contactMethods = [
  {
    icon: FiMail,
    title: 'Email Support',
    description: "Send us an email and we'll respond within 24 hours",
    contact: 'support@sanjay.dev',
    action: 'mailto:support@sanjay.dev',
  },
  {
    icon: FiPhone,
    title: 'Phone Support',
    description: 'Call us during business hours for immediate help',
    contact: '+1 (555) 123-HELP',
    action: 'tel:+15551234567',
  },
  {
    icon: FiMessageSquare,
    title: 'Live Chat',
    description: 'Chat with our support team in real-time',
    contact: 'Available 9AM-6PM EST',
    action: '#chat',
  },
];

export const sidebarMenu = [
  { id: 'profile', label: 'User Profile', icon: FaUser },
  { id: 'change-password', label: 'Change Password', icon: FaLock },
  // { id: "update-account", label: "Update Account", icon: FaCog },
];

export const faqData: FAQItem[] = [
  {
    question: 'How do I create an account?',
    answer:
      "To create an account, click on the 'Register' button in the top navigation, fill out the required information including your email and password, and follow the verification process.",
    category: 'account',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for certain services.',
    category: 'billing',
  },
  {
    question: 'How can I reset my password?',
    answer:
      "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password. The link will expire in 24 hours for security reasons.",
    category: 'account',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      'Yes, we offer a 30-day money-back guarantee for all our premium plans. Contact our support team to initiate a refund request.',
    category: 'billing',
  },
  {
    question: 'How do I contact customer support?',
    answer:
      'You can contact our support team through email at support@sanjay.dev, phone at +1 (555) 123-HELP, or use the live chat feature on our website during business hours.',
    category: 'support',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Yes, we use industry-standard encryption and security measures to protect your data. We regularly update our security protocols and conduct security audits.',
    category: 'security',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer:
      'Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period.',
    category: 'billing',
  },
  {
    question: 'Do you offer custom solutions?',
    answer:
      'Yes, we offer custom solutions for enterprise clients. Contact our sales team to discuss your specific requirements and get a customized quote.',
    category: 'services',
  },
];

export const categories = [
  { id: 'all', name: 'All Questions' },
  { id: 'account', name: 'Account' },
  { id: 'billing', name: 'Billing' },
  { id: 'support', name: 'Support' },
  { id: 'security', name: 'Security' },
  { id: 'services', name: 'Services' },
];

export const sections = [
  {
    title: 'Information We Collect',
    content: `We collect information you provide directly to us, such as when you create an account, fill out a form, or contact us for support. This may include your name, email address, and any other information you choose to provide.`,
  },
  {
    title: 'How We Use Your Information',
    content: `We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect our company and our users. We also use this information to offer you tailored content and to communicate with you.`,
  },
  {
    title: 'Information Sharing',
    content: `We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website.`,
  },
  {
    title: 'Cookies and Tracking',
    content: `We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.`,
  },
  {
    title: 'Data Security',
    content: `We implement appropriate technical and organizational security measures designed to protect your personal data. However, please note that no method of transmission over the Internet is 100% secure.`,
  },
  {
    title: 'Your Rights',
    content: `You have the right to access, update, or delete the information we have on you. Whenever made possible, you can access, update, or request deletion of your personal data directly within your account settings section.`,
  },
  {
    title: 'Changes to This Policy',
    content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.`,
  },
];

export const sectionstrems = [
  {
    title: 'Agreement to Terms',
    content: `By accessing and using our service, you accept and agree to be bound by the terms and provision of this agreement.`,
  },
  {
    title: 'Use License',
    content: `Permission is granted to temporarily use our service for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.`,
  },
  {
    title: 'User Accounts',
    content: `When you create an account with us, you must provide accurate and complete information. You are responsible for safeguarding the password and for all activities that occur under your account.`,
  },
  {
    title: 'Prohibited Uses',
    content: `You may not use our service for any illegal or unauthorized purpose nor may you, in the use of the service, violate any laws in your jurisdiction.`,
  },
  {
    title: 'Termination',
    content: `We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation.`,
  },
  {
    title: 'Limitation of Liability',
    content: `In no event shall we be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence, or other tort.`,
  },
  {
    title: 'Governing Law',
    content: `These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.`,
  },
];


export const missionContent: MissionContent = {
  title: "About Mentorly",
  paragraphs: [
    "To combat unemployment in India's youth society and introduce a new education system, Mentorly has embarked on a transformative journey. In today's competitive world, practical skills and mentorship are more valuable than theoretical knowledge alone. We recognize that many talented individuals fall behind due to lack of proper guidance and industry-relevant training.",
    "Our vision is to revolutionize education in India by creating a platform where students can discover their passions, master in-demand skills under expert guidance, and build successful careers. We're committed to transforming every learner into a industry-ready professional through personalized mentorship and hands-on learning experiences."
  ]
};

export const callToAction: CallToAction = {
  title: "Start Your Learning Journey",
  content: "Develop market-relevant skills, accelerate your career growth, and join us in building a skilled, empowered youth community in India.",
  highlight: "Mentorly - Your Gateway to Professional Excellence"
};

export const features: Feature[] = [
  {
    title: "Industry-Relevant Courses",
    description: "Our curriculum is designed in collaboration with industry experts to ensure you learn the most current and demanded skills. Each course combines theoretical knowledge with practical projects that simulate real-world challenges.",
    icon: "course"
  },
  {
    title: "Expert Mentors & Trainers",
    description: "Learn from seasoned professionals and industry veterans who bring years of practical experience. Our mentors provide personalized guidance, career advice, and industry connections to help you succeed.",
    icon: "trainer"
  }
];


export const featuredResources: FeaturedResource[] = [
  {
    title: "Complete Web Development Bootcamp",
    description: "Master HTML, CSS, JavaScript, and modern frameworks with hands-on projects",
    icon: "💻",
    category: "Web Development",
    level: "Beginner"
  },
  {
    title: "Data Science Fundamentals",
    description: "Learn Python, statistics, and machine learning concepts from scratch",
    icon: "📊",
    category: "Data Science",
    level: "Intermediate"
  },
  {
    title: "Mobile App Development",
    description: "Build cross-platform apps with React Native and Flutter & I os Development",
    icon: "📱",
    category: "App Development",
    level: "Intermediate"
  },
  {
    title: "UI/UX Design Masterclass",
    description: "Create stunning user interfaces and exceptional user experiences",
    icon: "🎨",
    category: "Design",
    level: "Beginner"
  }
];

export const resourceCategories: ResourceCategory[] = [
  {
    title: "Web Development",
    icon: "🌐",
    description: "Frontend, Backend & Full Stack Resources",
    items: [
      "HTML5, CSS3, JavaScript Fundamentals",
      "React, Vue, Angular Frameworks",
      "Node.js, Express, MongoDB Backend",
      "Responsive Design & Web Performance",
      "API Development & Integration"
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Data Science & AI",
    icon: "🤖",
    description: "Machine Learning & Analytics Resources",
    items: [
      "Python Programming & Libraries",
      "Data Analysis with Pandas & NumPy",
      "Machine Learning Algorithms",
      "Deep Learning & Neural Networks",
      "Data Visualization Tools"
    ],
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Mobile Development",
    icon: "📱",
    description: "iOS, Android & Cross-Platform",
    items: [
      "React Native & Flutter Development",
      "Native iOS (Swift) & Android (Kotlin)",
      "Mobile UI/UX Design Principles",
      "App Store Deployment Guides",
      "Performance Optimization"
    ],
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "UI/UX Design",
    icon: "🎨",
    description: "Design Thinking & Visual Design",
    items: [
      "Figma, Adobe XD & Sketch Tutorials",
      "User Research & Persona Development",
      "Wireframing & Prototyping",
      "Design Systems & Component Libraries",
      "Accessibility & Inclusive Design"
    ],
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Cloud & DevOps",
    icon: "☁️",
    description: "Infrastructure & Deployment",
    items: [
      "AWS, Azure & Google Cloud Platforms",
      "Docker & Kubernetes Containerization",
      "CI/CD Pipeline Implementation",
      "Infrastructure as Code (Terraform)",
      "Monitoring & Logging Solutions"
    ],
    color: "from-yellow-500 to-amber-500"
  },
  {
    title: "Career Growth",
    icon: "🚀",
    description: "Soft Skills & Professional Development",
    items: [
      "Technical Interview Preparation",
      "Resume Building & Portfolio Development",
      "Networking & LinkedIn Optimization",
      "Salary Negotiation Strategies",
      "Freelancing & Remote Work Guides"
    ],
    color: "from-indigo-500 to-purple-500"
  }
];