import React, { useEffect, useState } from 'react';

const ASSETS = {
  hero: '/assets/hero-dark.png',
  logo: '/assets/sn-logo.png',
  about: '/assets/about-business.png',
  founder: '/assets/founder-placeholder.jpg',
  founders: {
    satyanarayan: '/assets/cofounder-satyanarayan-mishra.jpeg',
    shrutikala: '/assets/cofounder-shrutikala-mishra.jpeg'
  },
  locationPin: '/assets/location-pin.png'
};

const address = 'Plot No - 982/34, Khata No - 375/1138, Hanuman Bazar, Kamakshya Nagar, Dhenkanal, Odisha - 759018';
const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

const locationSuggestions = [
  'Kamakshya Nagar, Dhenkanal, Odisha',
  'Dhenkanal, Odisha',
  'Angul, Odisha',
  'Bhubaneswar, Odisha',
  'Cuttack, Odisha',
  'Rourkela, Odisha',
  'Sambalpur, Odisha',
  'Puri, Odisha',
  'Balasore, Odisha',
  'Berhampur, Odisha',
  'Jajpur, Odisha',
  'Kolkata, West Bengal',
  'Ranchi, Jharkhand',
  'Jamshedpur, Jharkhand',
  'Raipur, Chhattisgarh',
  'Hyderabad, Telangana',
  'Bengaluru, Karnataka',
  'Chennai, Tamil Nadu',
  'Pune, Maharashtra',
  'Mumbai, Maharashtra',
  'Delhi NCR',
  'Ahmedabad, Gujarat'
];

const jobRoles = [
  'UI/UX Designer',
  'Video Editor',
  'Content Creator',
  'Graphic Designer',
  'Social Media Manager',
  'Electrician',
  'Automotive Technician',
  'CNC Operator',
  'Welder',
  'Construction Supervisor',
  'Doctor',
  'Nurse',
  'Physiotherapist',
  'Medical Lab Technician',
  'Pharmacist',
  'Business Analyst',
  'Digital Marketing Specialist',
  'HR Recruiter / Talent Acquisition',
  'Project Manager',
  'Financial Analyst',
  'Operations Manager',
  'AI Engineer',
  'Machine Learning Engineer',
  'Data Analyst',
  'Cybersecurity Analyst',
  'Cloud Engineer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Product Manager',
  'Scrum Master',
  'AI Product Owner',
  'Property Consultant',
  'Real Estate Sales Executive',
  'Insurance Advisor',
  'Relationship Manager',
  'Loan Sales Officer',
  'Telecaller',
  'Inside Sales Representative',
  'Lead Generation Specialist',
  'Business Development Executive (BDE)',
  'Business Development Manager (BDM)',
  'Account Manager',
  'Enterprise Sales Manager',
  'Store Sales Executive',
  'Showroom Sales Associate',
  'Fashion Sales Advisor',
  'Content Writer',
  'Copywriter',
  'Graphic Marketing Designer',
  'Video Marketing Creator',
  'Site Engineer',
  'Civil Engineer',
  'Foreman',
  'Surveyor',
  'Safety Officer',
  'Quality Inspector',
  'Vendor Coordinator',
  'Procurement Manager',
  'Contracts Manager',
  'Carpenter',
  'Mason',
  'Crane Operator',
  'HVAC Technician',
  'House Cleaner',
  'Housekeeping Staff',
  'Maid / Domestic Helper',
  'Home Cook',
  'Personal Cook',
  'Kitchen Helper',
  'Baby Sitter',
  'Nanny',
  'Care Giver',
  'Patient Attendant',
  'Live-in House Help',
  'Domestic Manager',
  'Housekeeping Associate',
  'Facility Housekeeper',
  'Security Guard',
  'Security Supervisor',
  'CCTV Operator',
  'Fire Safety Officer',
  'Cleaning Supervisor',
  'Waste Management Staff',
  'Apartment Manager',
  'Facility Manager',
  'Front Office Executive',
  'Helpdesk Coordinator',
  'Resident Relationship Executive'
];

const copy = {
  en: {
    languageLabel: 'Eng',
    nav: {
      home: 'Home',
      about: 'About',
      service: 'Service',
      leadership: 'Leadership',
      contact: 'Contact Us',
      findEmployees: 'Find Employees'
    },
    hero: {
      title: 'SN Infratech Solutions',
      subtitle: 'Powering Business by Empowering Resources',
      consultants: 'Get Consultants',
      apply: 'Apply for jobs'
    },
    about: {
      title: 'About The Company',
      body: 'SN Infratech Solutions specializes in delivering strategic and operational human resource solutions to help organizations build strong, agile, and high-performing teams. Our services span talent acquisition, workforce planning and HR process design. We are also a results-driven Project Management firm of experts in planning, execution, and delivering of complex projects across diverse industries. Our firm partners with organizations to ensure projects are delivered on time, cost efficiency, and to the highest quality standards.',
      visionTitle: 'Our Vision',
      vision: 'To redefine the future by being a trusted strategic partner, empowering organizations with transformative workforce and to set benchmarks in project execution through precision, accountability, and innovation.',
      missionTitle: 'Our Mission',
      mission: 'To deliver impactful HR and project management solutions by building high-performing teams and ensuring successful project execution through disciplined planning, efficient delivery, and strategic risk management aligned with business goals.'
    },
    valuesTitle: 'Our Values',
    values: [
      ['People & Performance', 'We believe strong people and disciplined execution are the foundation of sustainable success.'],
      ['Ownership & Accountability', 'We take full responsibility for outcomes and deliver on our commitments.'],
      ['Partnership Mindset', 'We work as trusted partners, aligned with our clients goals and long-term vision.'],
      ['Precision & Discipline', 'We apply structured processes and professional rigor to achieve consistent results.'],
      ['Integrity & Ethics', 'We operate with honesty, transparency, and uncompromising ethical standards in every engagement.'],
      ['Innovation with Impact', 'We embrace forward-thinking solutions that create measurable business value.'],
      ['Sustainable Growth', 'We focus on long-term value creation for clients, stakeholders, and communities.'],
      ['Excellence in Delivery', 'We set high standards and consistently deliver measurable results.'],
      ['Commitment to Timelines', 'We respect time as a critical business asset.'],
      ['Risk-Aware Leadership', 'We anticipate challenges and manage them proactively.']
    ],
    service: {
      title: 'Service Expertise',
      items: [
        ['Talent Acquisition', 'Executive Search • Workforce Planning • Technical Recruitment'],
        ['Planning & Strategy', 'Scheduling • Resource Allocation • Feasibility Studies'],
        ['HR Advisory', 'Process Design • Policy Formulation • Compliance Audits'],
        ['Execution Control', 'Risk Management • Cost Control • Quality Assurance'],
        ['Performance & talent management', 'Talent Management • KPI Design • Leadership Development'],
        ['Monitoring & Reporting', 'Vendor Coordination • Project Reporting • Milestone Tracking']
      ],
      chooseTitle: 'Why Choose Us?',
      choose: [
        'Experienced professionals with industry insight',
        'Customized, scalable solutions',
        'Transparent communication and measurable results',
        'Strong focus on timelines, quality, and accountability',
        'Dual expertise in people management and project execution'
      ],
      approachTitle: 'Our Approach and Methodology',
      approach: 'We follow a structured, outcome-oriented approach that combines strategic insight with practical execution. Our methodology focuses on understanding client needs, designing customized solutions, proactive risk management, and continuous performance monitoring to ensure successful delivery.',
      industriesTitle: 'Industries We Serve',
      industries: ['IT, Banking & Healthcare', 'Infrastructure & Construction', 'Corporate Services', 'Manufacturing & Engineering', 'Energy & Utilities', 'FMCG & Retail'],
      clientsTitle: 'Clients and Partnerships',
      clients: ['Wika', 'Crompton', 'Schneider Electric', 'Polycab', 'Blue Star', 'Finolex', 'Benince', 'Fixon', 'Loctite', 'Havels', 'Anchor', 'Panasonic', 'Siemens']
    },
    leadership: {
      title: 'Co-Founders',
      people: [
        ['Satyanarayan Mishra', 'Co-Founder & Managing Director', 'satyanarayan'],
        ['Shrutikala Mishra', 'Co-Founder & Director', 'shrutikala']
      ]
    },
    contact: {
      title: 'Contact Us',
      office: 'Registered Office Address:',
      phone: 'Phone: 8123318937, 8197989279, 7978038274',
      email: 'Email: Inquiry@sninfratechsolution.com',
      formTitle: 'Connect with us',
      name: 'Enter your name',
      mobile: 'Enter your Mobile number',
      emailInput: 'Enter your Email id',
      message: 'write something',
      submit: 'Get Start'
    },
    footer: {
      description: 'Powering Business by Empowering Resources. Your trusted partner for strategic HR consulting and project management across PAN India.',
      service: 'Service',
      quick: 'Quick Links',
      location: 'PAN India',
      rights: '@ 2026 SN Infratech Solutions. All rights reserved.',
      terms: 'Term and policy',
      privacy: 'Privacy policy'
    },
    apply: {
      title: 'APPLY FOR JOBS',
      subtitle: 'No resume needed. Our team will contact you directly.',
      fullName: 'Full name',
      mobile: 'Mobile number',
      location: 'Your location',
      search: 'Search Job Roles',
      suggested: 'Suggested jobs',
      description: 'Describe your job Role ........',
      submit: 'Apply',
      back: 'Back',
      placeholders: {
        name: 'Enter your name',
        mobile: '9876543210',
        location: 'Enter your location',
        search: 'Search for a job role...'
      },
      jobs: ['Plumber', 'Electrician', 'Delivery', 'Construction', 'Housekeeping', 'IT Jobs', 'Other Jobs']
    },
    employees: {
      title: 'REQUEST FOR EMPLOYEES',
      subtitle: 'Find the right employees for your business.',
      companyName: 'Company name',
      mobile: 'Mobile number',
      jobType: 'Type of Jobs',
      employeeCount: 'No. of employee',
      cancel: 'Cancel',
      confirm: 'Confirm',
      placeholders: {
        companyName: 'Enter your company name',
        mobile: '7777777777',
        jobType: 'eg. sale & marketing',
        employeeCount: 'eg. 12'
      }
    },
    form: {
      required: 'Please fill all required fields.',
      invalidText: 'Use letters only for text fields.',
      invalidPhone: 'Mobile number must contain exactly 10 digits.',
      invalidEmail: 'Please enter a valid email address.',
      invalidEmployeeCount: 'Number of employees must be between 1 and 100.',
      missingUrl: 'Form endpoint is not configured yet. Add VITE_GOOGLE_SCRIPT_URL after deploying Google Apps Script.',
      success: 'Submitted successfully. Our team will contact you soon.',
      error: 'Something went wrong. Please try again.'
    }
  },
  hi: {
    languageLabel: 'हिंदी',
    nav: {
      home: 'होम',
      about: 'हमारे बारे में',
      service: 'सेवाएं',
      leadership: 'नेतृत्व',
      contact: 'संपर्क करें',
      findEmployees: 'कर्मचारी खोजें'
    },
    hero: {
      title: 'एसएन इन्फ्राटेक सॉल्यूशंस',
      subtitle: 'संसाधनों को सशक्त बनाकर व्यवसाय को आगे बढ़ाना',
      consultants: 'सलाहकार प्राप्त करें',
      apply: 'नौकरी के लिए आवेदन'
    },
    about: {
      title: 'कंपनी के बारे में',
      body: 'एसएन इन्फ्राटेक सॉल्यूशंस संगठनों को मजबूत, चुस्त और उच्च प्रदर्शन वाली टीम बनाने में मदद करने के लिए रणनीतिक और परिचालन मानव संसाधन समाधान प्रदान करता है। हमारी सेवाओं में प्रतिभा अधिग्रहण, कार्यबल योजना और एचआर प्रक्रिया डिजाइन शामिल हैं। हम विविध उद्योगों में जटिल परियोजनाओं की योजना, निष्पादन और समय पर डिलीवरी में विशेषज्ञ परिणाम-केंद्रित परियोजना प्रबंधन फर्म भी हैं।',
      visionTitle: 'हमारा विजन',
      vision: 'एक भरोसेमंद रणनीतिक भागीदार बनकर भविष्य को फिर से परिभाषित करना, संगठनों को परिवर्तनकारी कार्यबल से सशक्त बनाना और सटीकता, जवाबदेही और नवाचार के माध्यम से परियोजना निष्पादन में मानक स्थापित करना।',
      missionTitle: 'हमारा मिशन',
      mission: 'उच्च प्रदर्शन वाली टीम बनाकर और अनुशासित योजना, कुशल डिलीवरी तथा व्यवसायिक लक्ष्यों से जुड़े रणनीतिक जोखिम प्रबंधन के माध्यम से प्रभावी एचआर और परियोजना प्रबंधन समाधान देना।'
    },
    valuesTitle: 'हमारे मूल्य',
    values: [
      ['लोग और प्रदर्शन', 'हम मानते हैं कि मजबूत लोग और अनुशासित निष्पादन स्थायी सफलता की नींव हैं।'],
      ['स्वामित्व और जवाबदेही', 'हम परिणामों की पूरी जिम्मेदारी लेते हैं और अपने वादों को पूरा करते हैं।'],
      ['साझेदारी दृष्टिकोण', 'हम ग्राहकों के लक्ष्यों और दीर्घकालिक दृष्टि के साथ भरोसेमंद भागीदार के रूप में काम करते हैं।'],
      ['सटीकता और अनुशासन', 'हम लगातार परिणामों के लिए संरचित प्रक्रियाओं और पेशेवर अनुशासन का पालन करते हैं।'],
      ['ईमानदारी और नैतिकता', 'हम हर कार्य में ईमानदारी, पारदर्शिता और मजबूत नैतिक मानकों के साथ काम करते हैं।'],
      ['प्रभावी नवाचार', 'हम ऐसे आधुनिक समाधान अपनाते हैं जो मापनीय व्यवसायिक मूल्य बनाते हैं।'],
      ['सतत विकास', 'हम ग्राहकों, हितधारकों और समुदायों के लिए दीर्घकालिक मूल्य निर्माण पर ध्यान देते हैं।'],
      ['डिलीवरी में उत्कृष्टता', 'हम उच्च मानक तय करते हैं और लगातार मापनीय परिणाम देते हैं।'],
      ['समयसीमा के प्रति प्रतिबद्धता', 'हम समय को महत्वपूर्ण व्यवसायिक संपत्ति मानते हैं।'],
      ['जोखिम-सचेत नेतृत्व', 'हम चुनौतियों का पूर्वानुमान लगाते हैं और उन्हें सक्रिय रूप से संभालते हैं।']
    ],
    service: {
      title: 'सेवा विशेषज्ञता',
      items: [
        ['प्रतिभा अधिग्रहण', 'कार्यकारी खोज • कार्यबल योजना • तकनीकी भर्ती'],
        ['योजना और रणनीति', 'शेड्यूलिंग • संसाधन आवंटन • व्यवहार्यता अध्ययन'],
        ['एचआर सलाहकार', 'प्रक्रिया डिजाइन • नीति निर्माण • अनुपालन ऑडिट'],
        ['निष्पादन नियंत्रण', 'जोखिम प्रबंधन • लागत नियंत्रण • गुणवत्ता आश्वासन'],
        ['प्रदर्शन और प्रतिभा प्रबंधन', 'प्रतिभा प्रबंधन • KPI डिजाइन • नेतृत्व विकास'],
        ['निगरानी और रिपोर्टिंग', 'वेंडर समन्वय • परियोजना रिपोर्टिंग • माइलस्टोन ट्रैकिंग']
      ],
      chooseTitle: 'हमें क्यों चुनें?',
      choose: [
        'उद्योग समझ वाले अनुभवी पेशेवर',
        'कस्टमाइज्ड और स्केलेबल समाधान',
        'पारदर्शी संचार और मापनीय परिणाम',
        'समयसीमा, गुणवत्ता और जवाबदेही पर मजबूत ध्यान',
        'लोगों के प्रबंधन और परियोजना निष्पादन में दोहरी विशेषज्ञता'
      ],
      approachTitle: 'हमारा दृष्टिकोण और कार्यप्रणाली',
      approach: 'हम एक संरचित और परिणाम-केंद्रित दृष्टिकोण अपनाते हैं, जिसमें रणनीतिक समझ और व्यावहारिक निष्पादन शामिल है। हमारी कार्यप्रणाली ग्राहक की जरूरतों को समझने, अनुकूल समाधान बनाने, जोखिम प्रबंधन और निरंतर प्रदर्शन निगरानी पर केंद्रित है।',
      industriesTitle: 'हम जिन उद्योगों की सेवा करते हैं',
      industries: ['आईटी, बैंकिंग और हेल्थकेयर', 'इन्फ्रास्ट्रक्चर और कंस्ट्रक्शन', 'कॉर्पोरेट सेवाएं', 'मैन्युफैक्चरिंग और इंजीनियरिंग', 'ऊर्जा और यूटिलिटीज', 'FMCG और रिटेल'],
      clientsTitle: 'ग्राहक और साझेदारियां',
      clients: ['Wika', 'Crompton', 'Schneider Electric', 'Polycab', 'Blue Star', 'Finolex', 'Benince', 'Fixon', 'Loctite', 'Havels', 'Anchor', 'Panasonic', 'Siemens']
    },
    leadership: {
      title: 'सह-संस्थापक',
      people: [
        ['सत्यनारायण मिश्रा', 'सह-संस्थापक और प्रबंध निदेशक', 'satyanarayan'],
        ['श्रुतिकला मिश्रा', 'सह-संस्थापक और निदेशक', 'shrutikala']
      ]
    },
    contact: {
      title: 'संपर्क करें',
      office: 'पंजीकृत कार्यालय पता:',
      phone: 'फोन: 8123318937, 8197989279, 7978038274',
      email: 'ईमेल: Inquiry@sninfratechsolution.com',
      formTitle: 'हमसे जुड़ें',
      name: 'अपना नाम दर्ज करें',
      mobile: 'अपना मोबाइल नंबर दर्ज करें',
      emailInput: 'अपना ईमेल दर्ज करें',
      message: 'कुछ लिखें',
      submit: 'भेजें'
    },
    footer: {
      description: 'संसाधनों को सशक्त बनाकर व्यवसाय को आगे बढ़ाना। पूरे भारत में रणनीतिक एचआर सलाह और परियोजना प्रबंधन के लिए आपका भरोसेमंद भागीदार।',
      service: 'सेवा',
      quick: 'त्वरित लिंक',
      location: 'पूरे भारत में',
      rights: '@ 2026 एसएन इन्फ्राटेक सॉल्यूशंस। सर्वाधिकार सुरक्षित।',
      terms: 'नियम और नीति',
      privacy: 'गोपनीयता नीति'
    },
    apply: {
      title: 'नौकरी के लिए आवेदन',
      subtitle: 'रिज्यूमे की जरूरत नहीं। हमारी टीम आपसे सीधे संपर्क करेगी।',
      fullName: 'पूरा नाम',
      mobile: 'मोबाइल नंबर',
      location: 'आपका स्थान',
      search: 'नौकरी भूमिका खोजें',
      suggested: 'सुझाई गई नौकरियां',
      description: 'अपनी नौकरी भूमिका लिखें ........',
      submit: 'आवेदन करें',
      back: 'वापस',
      placeholders: {
        name: 'अपना नाम दर्ज करें',
        mobile: '9876543210',
        location: 'अपना स्थान दर्ज करें',
        search: 'नौकरी भूमिका खोजें...'
      },
      jobs: ['प्लंबर', 'इलेक्ट्रीशियन', 'डिलीवरी', 'कंस्ट्रक्शन', 'हाउसकीपिंग', 'आईटी जॉब्स', 'अन्य जॉब्स']
    },
    employees: {
      title: 'कर्मचारियों के लिए अनुरोध',
      subtitle: 'अपने व्यवसाय के लिए सही कर्मचारी खोजें।',
      companyName: 'कंपनी का नाम',
      mobile: 'मोबाइल नंबर',
      jobType: 'नौकरी का प्रकार',
      employeeCount: 'कर्मचारियों की संख्या',
      cancel: 'रद्द करें',
      confirm: 'कन्फर्म',
      placeholders: {
        companyName: 'अपनी कंपनी का नाम दर्ज करें',
        mobile: '7777777777',
        jobType: 'जैसे सेल्स और मार्केटिंग',
        employeeCount: 'जैसे 12'
      }
    },
    form: {
      required: 'कृपया सभी आवश्यक जानकारी भरें।',
      invalidText: 'टेक्स्ट फील्ड में केवल अक्षर दर्ज करें।',
      invalidPhone: 'मोबाइल नंबर ठीक 10 अंकों का होना चाहिए।',
      invalidEmail: 'कृपया सही ईमेल पता दर्ज करें।',
      invalidEmployeeCount: 'कर्मचारियों की संख्या 1 से 100 के बीच होनी चाहिए।',
      missingUrl: 'फॉर्म endpoint अभी सेट नहीं है। Google Apps Script deploy करने के बाद VITE_GOOGLE_SCRIPT_URL जोड़ें।',
      success: 'सफलतापूर्वक सबमिट हो गया। हमारी टीम जल्द ही आपसे संपर्क करेगी।',
      error: 'कुछ गलत हुआ। कृपया फिर कोशिश करें।'
    }
  }
};

const iconPaths = {
  users: 'M7 20a4 4 0 0 1 8 0M9 7a3 3 0 1 0 0 .1M17 11a3 3 0 1 0 0 .1M17 20a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3',
  chart: 'M4 19V5M4 19h16M8 16l4-4 3 3 5-7',
  file: 'M6 3h8l4 4v14H6zM14 3v5h5M9 13h6M9 17h6',
  shield: 'M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z',
  gauge: 'M4 15a8 8 0 1 1 16 0M12 15l3-4',
  sliders: 'M5 7h14M5 17h14M8 5v4M16 15v4',
  company: 'M3 21h18M5 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M9 8h1M13 8h1M9 12h1M13 12h1M9 16h1M13 16h1M18 21v-8h1a2 2 0 0 1 2 2v6',
  star: 'M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2-4.5-4.4 6.2-.9z',
  handshake: 'M8 12l3-3 4 4M3 13l5 5 3-3M21 13l-5 5-3-3M7 9h4l2-2h4l4 4',
  compass: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15 9l-2 5-5 2 2-5z',
  award: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM9 14v7l3-2 3 2v-7',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  eye: 'M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  monitor: 'M4 5h16v11H4zM9 21h6M12 16v5',
  building: 'M6 21V5h8v16M14 9h4v12M9 8h2M9 12h2M9 16h2',
  settings: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7z',
  person: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  phone: 'M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4c0 1-1 2-2 2A16 16 0 0 1 3 6c0-1 1-2 2-2z',
  location: 'M12 21s7-4.8 7-11a7 7 0 1 0-14 0c0 6.2 7 11 7 11zM12 10a2.4 2.4 0 1 0 0-.1',
  search: 'M10 18a8 8 0 1 1 5.7-2.3L21 21',
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  back: 'M19 12H5M11 6l-6 6 6 6',
  close: 'M6 6l12 12M18 6L6 18',
  mic: 'M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zM5 11a7 7 0 0 0 14 0M12 18v4'
};

function Icon({ name, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path d={iconPaths[name]} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LocationPinImage({ compact = false }) {
  return <img className={compact ? 'location-pin-img compact' : 'location-pin-img'} src={ASSETS.locationPin} alt="" aria-hidden="true" />;
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [lang, setLang] = useState('en');
  const [modalOpen, setModalOpen] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (nextPath) => {
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id) => {
    if (path !== '/') {
      window.history.pushState({}, '', '/');
      setPath('/');
      window.setTimeout(() => scrollToId(id), 80);
      return;
    }
    scrollToId(id);
  };

  return (
    <>
      <Header t={t} lang={lang} setLang={setLang} navigate={navigate} scrollTo={scrollTo} openModal={() => setModalOpen(true)} />
      {path === '/apply-for-jobs' ? (
        <ApplyPage t={t} lang={lang} navigate={navigate} openModal={() => setModalOpen(true)} />
      ) : (
        <MainPage t={t} lang={lang} navigate={navigate} scrollTo={scrollTo} />
      )}
      {modalOpen && <EmployeeModal t={t} lang={lang} closeModal={() => setModalOpen(false)} />}
    </>
  );
}

function scrollToId(id) {
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Header({ t, lang, setLang, navigate, scrollTo, openModal }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    ['home', t.nav.home],
    ['about', t.nav.about],
    ['service', t.nav.service],
    ['leadership', t.nav.leadership],
    ['contact', t.nav.contact]
  ];

  const handleNav = (id) => {
    setMenuOpen(false);
    scrollTo(id);
  };

  const handleEmployeeClick = () => {
    setMenuOpen(false);
    openModal();
  };

  return (
    <header className="site-header">
      <div className="header-shell">
        <button className="brand" type="button" onClick={() => handleNav('home')} aria-label="SN Infratech Solutions home">
          <img src={ASSETS.logo} alt="SN Infratech Solutions" />
        </button>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
        <nav id="primary-navigation" className={menuOpen ? 'nav open' : 'nav'}>
          {navItems.map(([id, label]) => (
            <button type="button" key={id} onClick={() => handleNav(id)}>
              {label}
            </button>
          ))}
          <select value={lang} onChange={(event) => setLang(event.target.value)} aria-label="Language">
            <option value="en">Eng</option>
            <option value="hi">Hindi</option>
          </select>
          <button className="primary-nav" type="button" onClick={handleEmployeeClick}>
            {t.nav.findEmployees}
            <Icon name="arrow" size={18} />
          </button>
        </nav>
      </div>
    </header>
  );
}

function MainPage({ t, lang, navigate, scrollTo }) {
  return (
    <main id="home">
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>{t.hero.title}</h1>
          <p>{t.hero.subtitle}</p>
          <div className="hero-actions">
            <button className="outline-button" type="button" onClick={() => scrollTo('contact')}>
              {t.hero.consultants}
            </button>
            <button className="gold-button" type="button" onClick={() => navigate('/apply-for-jobs')}>
              {t.hero.apply}
              <Icon name="arrow" size={18} />
            </button>
          </div>
        </div>
      </section>
      <AboutSection t={t} />
      <ValuesSection t={t} />
      <ServicesSection t={t} />
      <LeadershipSection t={t} />
      <ContactSection t={t} lang={lang} />
      <Footer t={t} scrollTo={scrollTo} />
    </main>
  );
}

function SectionTitle({ children, light = false }) {
  return <h2 className={light ? 'section-title light' : 'section-title'}>{children}</h2>;
}

function AboutSection({ t }) {
  return (
    <section id="about" className="about-section section-pad">
      <div className="container about-grid">
        <div>
          <SectionTitle>{t.about.title}</SectionTitle>
          <p className="body-copy">{t.about.body}</p>
        </div>
        <img className="about-image" src={ASSETS.about} alt="" />
      </div>
      <div className="container vision-grid">
        <InfoCard title={t.about.visionTitle} text={t.about.vision} />
        <InfoCard title={t.about.missionTitle} text={t.about.mission} />
      </div>
    </section>
  );
}

function InfoCard({ title, text }) {
  return (
    <article className="info-card">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function ValuesSection({ t }) {
  const icons = ['users', 'star', 'handshake', 'compass', 'shield', 'bolt', 'chart', 'award', 'clock', 'eye'];
  return (
    <section className="values-section section-pad">
      <div className="container">
        <SectionTitle>{t.valuesTitle}</SectionTitle>
        <div className="value-grid">
          {t.values.map(([title, text], index) => (
            <article className="value-card" key={title}>
              <div className="round-icon">
                <Icon name={icons[index]} size={22} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ t }) {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const serviceIcons = ['users', 'chart', 'file', 'shield', 'gauge', 'sliders'];
  const industryIcons = ['monitor', 'building', 'users', 'settings', 'shield', 'building'];
  const marqueeClients = [...t.service.clients, ...t.service.clients];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndustry((index) => (index + 1) % t.service.industries.length);
    }, 1700);
    return () => window.clearInterval(timer);
  }, [t.service.industries.length]);

  return (
    <>
      <section id="service" className="service-section section-pad dark-band">
        <div className="container">
          <SectionTitle light>{t.service.title}</SectionTitle>
          <div className="service-grid">
            {t.service.items.map(([title, text], index) => (
              <article className="service-item" key={title}>
                <Icon name={serviceIcons[index]} size={34} />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="choose-section section-pad">
        <div className="container choose-card">
          <SectionTitle>{t.service.chooseTitle}</SectionTitle>
          <ul className="choose-list">
            {t.service.choose.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="approach-section section-pad dark-band">
        <div className="container narrow">
          <SectionTitle light>{t.service.approachTitle}</SectionTitle>
          <p>{t.service.approach}</p>
        </div>
      </section>
      <section className="industries-section section-pad">
        <div className="container">
          <SectionTitle>{t.service.industriesTitle}</SectionTitle>
          <div className="industry-grid">
            {t.service.industries.map((item, index) => (
              <article
                className={activeIndustry === index ? 'industry-card active' : 'industry-card'}
                key={item}
                onMouseEnter={() => setActiveIndustry(index)}
                onFocus={() => setActiveIndustry(index)}
                tabIndex={0}
              >
                <Icon name={industryIcons[index]} size={26} />
                <h3>{item}</h3>
              </article>
            ))}
          </div>
          <SectionTitle>{t.service.clientsTitle}</SectionTitle>
          <div className="client-strip">
            <div className="client-track">
              {marqueeClients.map((client, index) => (
                <span key={`${client}-${index}`}>{client}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function LeadershipSection({ t }) {
  return (
    <section id="leadership" className="leadership-section section-pad">
      <div className="container">
        <SectionTitle>{t.leadership.title}</SectionTitle>
        <div className="leader-grid">
          {t.leadership.people.map(([name, role, imageKey]) => (
            <article className="leader-card" key={name}>
              <div className={`leader-image leader-image-${imageKey}`}>
                <img src={ASSETS.founders[imageKey] || ASSETS.founder} alt={name} />
              </div>
              <h3>{name}</h3>
              <p>{role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({ t, lang }) {
  return (
    <section id="contact" className="contact-section section-pad">
      <div className="container">
        <SectionTitle>{t.contact.title}</SectionTitle>
        <div className="contact-grid">
          <div className="map-block">
            <iframe title="SN Infratech Solutions map" src={mapUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <p><strong>{t.contact.office}</strong> {address}</p>
            <p>{t.contact.phone}<br />{t.contact.email}</p>
          </div>
          <ContactForm t={t} lang={lang} />
        </div>
      </div>
    </section>
  );
}

function ContactForm({ t, lang }) {
  const initial = { name: '', mobile: '', email: '', message: '' };
  const [fields, setFields] = useState(initial);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    const validationError = validateContactFields(fields, t);
    if (validationError) {
      setStatus({ type: 'error', message: validationError });
      return;
    }
    await submitForm({ formType: 'contact', fields, lang, t, setStatus, setBusy, onSuccess: () => setFields(initial) });
  };

  return (
    <form className="contact-form" onSubmit={submit}>
      <h3>{t.contact.formTitle}</h3>
      <Input value={fields.name} placeholder={t.contact.name} onChange={(value) => setFields({ ...fields, name: cleanText(value) })} />
      <Input value={fields.mobile} inputMode="numeric" maxLength={10} placeholder={t.contact.mobile} onChange={(value) => setFields({ ...fields, mobile: cleanDigits(value, 10) })} />
      <Input value={fields.email} type="email" placeholder={t.contact.emailInput} onChange={(value) => setFields({ ...fields, email: value })} />
      <textarea value={fields.message} placeholder={t.contact.message} onChange={(event) => setFields({ ...fields, message: event.target.value })} />
      <button className="gold-button full" type="submit" disabled={busy}>
        {busy ? '...' : t.contact.submit}
        <Icon name="arrow" size={18} />
      </button>
      <StatusMessage status={status} />
    </form>
  );
}

function ApplyPage({ t, lang, navigate, openModal }) {
  return (
    <main className="apply-page">
      <section className="apply-section section-pad">
        <button className="back-button" type="button" onClick={() => navigate('/')} aria-label={t.apply.back}>
          <Icon name="back" size={32} />
        </button>
        <div className="container">
          <h1>{t.apply.title}</h1>
          <p className="apply-subtitle">{t.apply.subtitle}</p>
          <ApplyForm t={t} lang={lang} />
        </div>
      </section>
      <Footer t={t} scrollTo={(id) => {
        navigate('/');
        window.setTimeout(() => scrollToId(id), 100);
      }} openModal={openModal} />
    </main>
  );
}

function ApplyForm({ t, lang }) {
  const initial = { fullName: '', mobile: '', location: '', roleSearch: '', suggestedJob: '', description: '' };
  const [fields, setFields] = useState(initial);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [busy, setBusy] = useState(false);
  const [detectedLocation, setDetectedLocation] = useState('');
  const otherJobLabel = t.apply.jobs[t.apply.jobs.length - 1];
  const showDescription = fields.suggestedJob === otherJobLabel;

  const submit = async (event) => {
    event.preventDefault();
    const validationError = validateApplyFields(fields, t);
    if (validationError) {
      setStatus({ type: 'error', message: validationError });
      return;
    }
    await submitForm({ formType: 'apply', fields, lang, t, setStatus, setBusy, onSuccess: () => setFields(initial) });
  };

  return (
    <form className="apply-form" onSubmit={submit}>
      <div className="form-two">
        <LabeledInput label={t.apply.fullName} icon="person" value={fields.fullName} placeholder={t.apply.placeholders.name} onChange={(value) => setFields({ ...fields, fullName: cleanText(value) })} />
        <LabeledInput label={t.apply.mobile} icon="phone" value={fields.mobile} inputMode="numeric" maxLength={10} placeholder={t.apply.placeholders.mobile} helper="10 digit mobile number" onChange={(value) => setFields({ ...fields, mobile: cleanDigits(value, 10) })} />
      </div>
      <LocationInput
        label={t.apply.location}
        value={fields.location}
        placeholder={t.apply.placeholders.location}
        detectedLocation={detectedLocation}
        setDetectedLocation={setDetectedLocation}
        onChange={(value) => setFields({ ...fields, location: cleanLocation(value) })}
      />
      <JobRoleSearch
        label={t.apply.search}
        value={fields.roleSearch}
        placeholder={t.apply.placeholders.search}
        onChange={(value) => setFields({ ...fields, roleSearch: cleanJobRole(value) })}
      />
      <div className="suggested-block">
        <label>{t.apply.suggested}</label>
        <div className="job-chips">
          {t.apply.jobs.map((job, index) => (
            <button
              className={fields.suggestedJob === job ? 'chip selected' : 'chip'}
              key={job}
              type="button"
              onClick={() => setFields({
                ...fields,
                roleSearch: job,
                suggestedJob: job,
                description: job === otherJobLabel ? fields.description : ''
              })}
            >
              <Icon name={['settings', 'bolt', 'chart', 'person', 'building', 'monitor', 'sliders'][index]} size={16} />
              {job}
            </button>
          ))}
        </div>
      </div>
      {showDescription && (
        <textarea value={fields.description} placeholder={t.apply.description} onChange={(event) => setFields({ ...fields, description: event.target.value })} />
      )}
      <button className="gold-button apply-submit" type="submit" disabled={busy}>{busy ? '...' : t.apply.submit}</button>
      <StatusMessage status={status} />
    </form>
  );
}

function JobRoleSearch({ label, value, placeholder, onChange }) {
  const [open, setOpen] = useState(false);
  const query = value.trim().toLowerCase();
  const matches = jobRoles.filter((role) => role.toLowerCase().includes(query));
  const suggestions = query ? matches : jobRoles;

  const chooseRole = (role) => {
    onChange(role);
    setOpen(false);
  };

  return (
    <label className="field-label role-field">
      <span>{label}</span>
      <div className="input-wrap">
        <Icon name="search" size={18} />
        <input
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          onChange={(event) => {
            onChange(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 140)}
        />
        <Icon name="mic" size={18} />
      </div>
      {open && suggestions.length > 0 && (
        <div className="role-menu">
          {suggestions.map((role) => (
            <button type="button" key={role} onMouseDown={(event) => event.preventDefault()} onClick={() => chooseRole(role)}>
              {role}
            </button>
          ))}
        </div>
      )}
    </label>
  );
}

function LocationInput({ label, value, placeholder, detectedLocation, setDetectedLocation, onChange }) {
  const [open, setOpen] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const query = value.trim().toLowerCase();
  const matches = locationSuggestions
    .filter((location) => location.toLowerCase().includes(query))
    .slice(0, 6);
  const suggestions = detectedLocation && !matches.includes(detectedLocation)
    ? [detectedLocation, ...matches].slice(0, 6)
    : matches;

  const chooseLocation = (nextLocation) => {
    onChange(nextLocation);
    setOpen(false);
  };

  const detectLocation = () => {
    if (!navigator.geolocation) return;
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const fallback = `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}`);
          const data = await response.json();
          const addressParts = data.address || {};
          const label = [
            addressParts.city || addressParts.town || addressParts.village || addressParts.suburb,
            addressParts.state,
            addressParts.country
          ].filter(Boolean).join(', ') || fallback;
          setDetectedLocation(label);
          chooseLocation(label);
        } catch (error) {
          setDetectedLocation(fallback);
          chooseLocation(fallback);
        } finally {
          setDetecting(false);
        }
      },
      () => setDetecting(false),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  };

  return (
    <label className="field-label location-field">
      <span>{label}</span>
      <div className="input-wrap">
        <LocationPinImage />
        <input
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          onChange={(event) => {
            onChange(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 140)}
        />
      </div>
      {open && (
        <div className="location-menu">
          <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={detectLocation}>
            <LocationPinImage compact />
            {detecting ? 'Detecting location...' : 'Use my current location'}
          </button>
          {suggestions.map((location) => (
            <button type="button" key={location} onMouseDown={(event) => event.preventDefault()} onClick={() => chooseLocation(location)}>
              <LocationPinImage compact />
              {location}
            </button>
          ))}
        </div>
      )}
    </label>
  );
}

function EmployeeModal({ t, lang, closeModal }) {
  const initial = { companyName: '', mobile: '', jobType: '', employeeCount: '' };
  const [fields, setFields] = useState(initial);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') closeModal();
    };
    document.body.classList.add('modal-active');
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('modal-active');
      window.removeEventListener('keydown', onKey);
    };
  }, [closeModal]);

  const submit = async (event) => {
    event.preventDefault();
    const validationError = validateEmployeeFields(fields, t);
    if (validationError) {
      setStatus({ type: 'error', message: validationError });
      return;
    }
    await submitForm({
      formType: 'employees',
      fields,
      lang,
      t,
      setStatus,
      setBusy,
      onSuccess: () => {
        setFields(initial);
        window.setTimeout(closeModal, 900);
      }
    });
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="employees-title">
      <form className="employee-modal" onSubmit={submit}>
        <button className="modal-close" type="button" onClick={closeModal} aria-label="Close">
          <Icon name="close" size={22} />
        </button>
        <h2 id="employees-title">{t.employees.title}</h2>
        <p>{t.employees.subtitle}</p>
        <div className="form-two">
          <LabeledInput label={t.employees.companyName} icon="company" value={fields.companyName} placeholder={t.employees.placeholders.companyName} onChange={(value) => setFields({ ...fields, companyName: cleanCompany(value) })} />
          <LabeledInput label={t.employees.mobile} icon="phone" value={fields.mobile} inputMode="numeric" maxLength={10} placeholder={t.employees.placeholders.mobile} onChange={(value) => setFields({ ...fields, mobile: cleanDigits(value, 10) })} />
          <LabeledInput label={t.employees.jobType} icon="file" value={fields.jobType} placeholder={t.employees.placeholders.jobType} onChange={(value) => setFields({ ...fields, jobType: cleanJobRole(value) })} />
          <LabeledInput label={t.employees.employeeCount} icon="users" value={fields.employeeCount} inputMode="numeric" maxLength={3} placeholder={t.employees.placeholders.employeeCount} onChange={(value) => setFields({ ...fields, employeeCount: cleanDigits(value, 3) })} />
        </div>
        <div className="modal-actions">
          <button className="cancel-button" type="button" onClick={closeModal}>{t.employees.cancel}</button>
          <button className="gold-button" type="submit" disabled={busy}>{busy ? '...' : t.employees.confirm}</button>
        </div>
        <StatusMessage status={status} />
      </form>
    </div>
  );
}

function Footer({ t, scrollTo }) {
  const quickLinks = [
    ['about', t.nav.about],
    ['service', t.nav.service],
    ['service', 'Industries'],
    ['leadership', t.nav.leadership]
  ];

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h2>SN Infratech Solutions</h2>
          <p>{t.footer.description}</p>
        </div>
        <div>
          <h3>{t.footer.service}</h3>
          <p>HR Consulting</p>
          <p>Project Management</p>
          <p>Talent Acquisition</p>
          <p>Workforce Planning</p>
        </div>
        <div>
          <h3>{t.footer.quick}</h3>
          {quickLinks.map(([id, label], index) => (
            <button key={`${id}-${index}`} type="button" onClick={() => scrollTo(id)}>{label}</button>
          ))}
        </div>
        <div className="footer-contact">
          <p><Icon name="location" size={20} /><span>{t.footer.location}</span></p>
          <p><Icon name="mail" size={20} /><span>Inquiry@sninfratechsolution.com</span></p>
          <p><Icon name="phone" size={20} /><span>8123318937, 8197989279, 7978038274</span></p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>{t.footer.rights}</span>
        <div>
          <span>{t.footer.terms}</span>
          <span>{t.footer.privacy}</span>
        </div>
      </div>
    </footer>
  );
}

function Input({ value, onChange, placeholder, type = 'text', inputMode, maxLength }) {
  return <input type={type} inputMode={inputMode} maxLength={maxLength} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />;
}

function LabeledInput({ label, icon, suffix, value, placeholder, helper, inputMode, maxLength, onChange }) {
  return (
    <label className="field-label">
      <span>{label}</span>
      <div className="input-wrap">
        <Icon name={icon} size={18} />
        <input value={value} inputMode={inputMode} maxLength={maxLength} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
        {suffix && <Icon name={suffix} size={18} />}
      </div>
      {helper && <small>{helper}</small>}
    </label>
  );
}

function StatusMessage({ status }) {
  if (!status.message) return null;
  return <p className={`status ${status.type}`}>{status.message}</p>;
}

function cleanDigits(value, maxLength) {
  return value.replace(/\D/g, '').slice(0, maxLength);
}

function cleanText(value) {
  return value.replace(/[^\p{L}\s.'-]/gu, '');
}

function cleanCompany(value) {
  return value.replace(/[^\p{L}\p{N}\s.&,'()/-]/gu, '');
}

function cleanJobRole(value) {
  return value.replace(/[^\p{L}\p{N}\s.&,'()/+-]/gu, '');
}

function cleanLocation(value) {
  return value.replace(/[^\p{L}\p{N}\s.,'/-]/gu, '');
}

function hasRequired(values) {
  return values.every((value) => String(value || '').trim());
}

function isText(value) {
  return /^[\p{L}\s.'-]+$/u.test(String(value || '').trim());
}

function isCompany(value) {
  return /^[\p{L}\p{N}\s.&,'()/-]+$/u.test(String(value || '').trim());
}

function isJobRole(value) {
  return /^[\p{L}\p{N}\s.&,'()/+-]+$/u.test(String(value || '').trim());
}

function isPhone(value) {
  return /^\d{10}$/.test(String(value || '').trim());
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

function isEmployeeCount(value) {
  const normalized = String(value || '').trim();
  const count = Number(normalized);
  return /^\d+$/.test(normalized) && count >= 1 && count <= 100;
}

function validateContactFields(fields, t) {
  if (!hasRequired([fields.name, fields.mobile, fields.email, fields.message])) return t.form.required;
  if (!isText(fields.name)) return t.form.invalidText;
  if (!isPhone(fields.mobile)) return t.form.invalidPhone;
  if (!isEmail(fields.email)) return t.form.invalidEmail;
  return '';
}

function validateApplyFields(fields, t) {
  const otherJobLabel = t.apply.jobs[t.apply.jobs.length - 1];
  const requiresDescription = fields.suggestedJob === otherJobLabel;
  if (!hasRequired([fields.fullName, fields.mobile, fields.location, fields.roleSearch])) return t.form.required;
  if (requiresDescription && !hasRequired([fields.description])) return t.form.required;
  if (!isText(fields.fullName) || !isJobRole(fields.roleSearch)) return t.form.invalidText;
  if (!isPhone(fields.mobile)) return t.form.invalidPhone;
  return '';
}

function validateEmployeeFields(fields, t) {
  if (!hasRequired([fields.companyName, fields.mobile, fields.jobType, fields.employeeCount])) return t.form.required;
  if (!isCompany(fields.companyName) || !isJobRole(fields.jobType)) return t.form.invalidText;
  if (!isPhone(fields.mobile)) return t.form.invalidPhone;
  if (!isEmployeeCount(fields.employeeCount)) return t.form.invalidEmployeeCount;
  return '';
}

async function submitForm({ formType, fields, lang, t, setStatus, setBusy, onSuccess }) {
  const endpoint = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
  const submissionFields = formType === 'employees'
    ? {
        ...fields,
        fullName: fields.companyName,
        name: fields.companyName
      }
    : fields;
  const employeePayload = formType === 'employees'
    ? {
        companyName: fields.companyName,
        companyNameValue: fields.companyName,
        company: fields.companyName,
        company_name: fields.companyName,
        fullName: fields.companyName,
        name: fields.companyName,
        'Company Name': fields.companyName,
        mobile: fields.mobile,
        jobType: fields.jobType,
        employeeCount: fields.employeeCount
      }
    : {};

  if (!endpoint) {
    setStatus({ type: 'error', message: t.form.missingUrl });
    return;
  }

  setBusy(true);
  setStatus({ type: '', message: '' });

  try {
    await fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        formType,
        language: lang,
        fields: submissionFields,
        ...employeePayload,
        submittedAt: new Date().toISOString()
      })
    });
    setStatus({ type: 'success', message: t.form.success });
    onSuccess?.();
  } catch (error) {
    setStatus({ type: 'error', message: t.form.error });
  } finally {
    setBusy(false);
  }
}

export default App;
