export interface PainPoint {
  icon: string
  title: string
  desc: string
}

export interface FAQ {
  q: string
  a: string
}

// ─── PAIN POINTS ────────────────────────────────────────────────────────────

const interiorDesignPainPoints: PainPoint[] = [
  {
    icon: 'photo_camera_off',
    title: 'Beautiful work, invisible online',
    desc: 'Your portfolio sits in a folder. Your Instagram hasn’t been posted on in 3 weeks. The work deserves better.',
  },
  {
    icon: 'schedule',
    title: 'No time between projects',
    desc: 'You’re busy designing spaces — not writing captions, editing reels, or planning content calendars.',
  },
  {
    icon: 'trending_down',
    title: 'Low engagement despite great work',
    desc: 'Posts go up, get a few likes, nothing converts. The algorithm isn’t the problem — the strategy is.',
  },
  {
    icon: 'person_search',
    title: 'Clients can’t find you online',
    desc: 'New clients Google you. If your digital presence doesn’t match your work quality, you lose them before they call.',
  },
]

export const painPointsMap: Record<string, PainPoint[]> = {
  'interior-design': interiorDesignPainPoints,
  architecture: interiorDesignPainPoints,
  'solar-energy': [
    {
      icon: 'help_outline',
      title: 'Customers don’t understand the product',
      desc: 'Solar is complex. Without clear education content, prospects stall before they even enquire.',
    },
    {
      icon: 'visibility_off',
      title: 'No online visibility in your city',
      desc: 'Competitors with inferior products rank above you because they invested in digital — you didn’t.',
    },
    {
      icon: 'thumb_down',
      title: 'Low trust from new leads',
      desc: 'High-ticket purchases need trust. Without social proof and content, leads ghost you.',
    },
    {
      icon: 'schedule',
      title: 'Sales team doing too much educating',
      desc: 'Your sales calls spend 30 minutes on basics that content could handle before the call even happens.',
    },
  ],
  'wellness-clinic': [
    {
      icon: 'reviews',
      title: 'No system for patient testimonials',
      desc: 'Happy patients leave — and take their stories with them. You have no process to capture social proof.',
    },
    {
      icon: 'edit_off',
      title: 'Generic content that looks like every clinic',
      desc: 'Stock photos and generic health tips make you invisible in a crowded market.',
    },
    {
      icon: 'person_search',
      title: 'New patients can’t find you',
      desc: 'People search for clinics on Instagram before Google. If you’re not posting, they’re booking elsewhere.',
    },
    {
      icon: 'schedule',
      title: 'Staff too busy to manage social',
      desc: 'Doctors and front desk staff have real jobs. Social media falls to whoever has 5 minutes — which means it never gets done right.',
    },
  ],
  'yoga-fitness': [
    {
      icon: 'group_off',
      title: 'Hard to build community online',
      desc: 'Your in-person vibe is incredible. But online, you look like every other studio — no personality, no depth.',
    },
    {
      icon: 'trending_down',
      title: 'Low class bookings from social',
      desc: 'Posting selfies and schedules doesn’t fill classes. Content needs a strategy tied to conversions.',
    },
    {
      icon: 'edit_off',
      title: 'No consistent content rhythm',
      desc: 'You post 3 times one week, nothing the next. Inconsistency kills your algorithmic reach.',
    },
    {
      icon: 'photo_camera_off',
      title: 'No video content despite being visual',
      desc: 'Yoga and fitness are made for video. But producing reels feels overwhelming without a system.',
    },
  ],
  coaching: [
    {
      icon: 'person_search',
      title: 'You’re an expert — but no one knows it',
      desc: 'Your knowledge is deep. Your online presence doesn’t reflect it. You’re losing clients to less qualified coaches.',
    },
    {
      icon: 'edit_off',
      title: 'Content feels salesy',
      desc: 'Every post either feels too pushy or too vague. You don’t know how to add value without giving everything away.',
    },
    {
      icon: 'trending_down',
      title: 'Low enquiries from content',
      desc: 'You post but DMs don’t come. The missing piece is a content strategy built around your funnel.',
    },
    {
      icon: 'schedule',
      title: 'Spending hours on content, getting nothing back',
      desc: 'You write posts, record videos, and still see minimal growth. The effort-to-result ratio is broken.',
    },
  ],
  restaurants: [
    {
      icon: 'photo_camera_off',
      title: 'Food looks better in person than online',
      desc: 'Your dishes are incredible — but your photos are taken on a phone at bad angles with harsh lighting.',
    },
    {
      icon: 'trending_down',
      title: 'Footfall not growing despite good reviews',
      desc: 'Happy customers leave 5-star reviews but don’t share. You have no system to turn diners into content creators.',
    },
    {
      icon: 'edit_off',
      title: 'No consistent posting schedule',
      desc: 'The kitchen is busy. Social falls behind. Inconsistency makes you look closed even when you’re packed.',
    },
    {
      icon: 'person_search',
      title: 'New customers don’t discover you',
      desc: 'Instagram is the new Google for restaurants. If you’re not showing up, competitors are taking your customers.',
    },
  ],
  fashion: [
    {
      icon: 'photo_camera_off',
      title: 'Catalogue exists. Content doesn’t.',
      desc: 'You have product photos but no storytelling — no context, no emotion, no reason for someone to buy.',
    },
    {
      icon: 'trending_down',
      title: 'High reach, low conversion',
      desc: 'Followers exist but don’t buy. The gap between audience and customer is a strategy problem.',
    },
    {
      icon: 'edit_off',
      title: 'Brand voice is inconsistent',
      desc: 'Sometimes formal, sometimes casual, sometimes silent. Your feed sends mixed signals.',
    },
    {
      icon: 'person_search',
      title: 'Lost in a crowded market',
      desc: 'Fashion is one of the most competitive niches on Instagram. Without a distinctive content identity, you disappear.',
    },
  ],
  'real-estate': [
    {
      icon: 'photo_camera_off',
      title: 'Properties photographed, not marketed',
      desc: 'Listings go up with basic photos. No story, no lifestyle, no emotional pull for the buyer.',
    },
    {
      icon: 'person_search',
      title: 'Buyers and sellers don’t know you exist',
      desc: 'Referrals are unpredictable. A strong digital presence gives you a consistent inbound pipeline.',
    },
    {
      icon: 'trending_down',
      title: 'Low engagement on property posts',
      desc: 'Static images of empty rooms don’t perform. Video walkthroughs and lifestyle content do.',
    },
    {
      icon: 'schedule',
      title: 'No time to manage content between deals',
      desc: 'You’re closing deals, not editing Reels. Content gets ignored until the pipeline dries up.',
    },
  ],
  gyms: [
    {
      icon: 'group_off',
      title: 'Members join but don’t stay',
      desc: 'Retention is a community problem. If members don’t feel connected beyond the gym floor, they cancel.',
    },
    {
      icon: 'photo_camera_off',
      title: 'Transformation stories untold',
      desc: 'Your members are getting incredible results. None of it is captured or shared — that’s wasted social proof.',
    },
    {
      icon: 'trending_down',
      title: 'Low new member enquiries from social',
      desc: 'Posting equipment and schedules doesn’t bring new members. Story-driven content does.',
    },
    {
      icon: 'edit_off',
      title: 'No energy online despite high energy offline',
      desc: 'Your gym floor is electric. Your Instagram looks like a price list. The vibe isn’t translating.',
    },
  ],
  hospitals: [
    {
      icon: 'reviews',
      title: 'No patient success stories online',
      desc: 'Recoveries happen daily — none are captured. You’re missing the most powerful trust-builders you have.',
    },
    {
      icon: 'edit_off',
      title: 'Generic health content anyone could post',
      desc: 'Reposting health tips from the internet doesn’t differentiate you from every other hospital page.',
    },
    {
      icon: 'person_search',
      title: 'Patients choosing competitors they see online',
      desc: 'When people need a hospital, they search. If you’re invisible online, they book elsewhere.',
    },
    {
      icon: 'schedule',
      title: 'No dedicated team for digital communication',
      desc: 'Medical staff are focused on care. Digital presence gets handled by whoever is available — inconsistently.',
    },
  ],
  schools: [
    {
      icon: 'photo_camera_off',
      title: 'Campus life unrepresented online',
      desc: 'Events happen, achievements are earned, moments are created — and none of it reaches prospective parents.',
    },
    {
      icon: 'person_search',
      title: 'Admissions rely only on word of mouth',
      desc: 'Parents research schools online before visiting. If your digital presence is weak, you lose them first.',
    },
    {
      icon: 'trending_down',
      title: 'Low engagement on school posts',
      desc: 'Posting notices and exam dates doesn’t build community. Storytelling content does.',
    },
    {
      icon: 'edit_off',
      title: 'No consistent communication with parent community',
      desc: 'Parents feel out of the loop. A strong social media presence builds trust with the community you serve.',
    },
  ],
}

export const defaultPainPoints: PainPoint[] = [
  {
    icon: 'edit_off',
    title: 'Inconsistent posting kills reach',
    desc: 'Sporadic content tells the algorithm — and your audience — that you’re not serious. Consistency is everything.',
  },
  {
    icon: 'trending_down',
    title: 'Low engagement despite effort',
    desc: 'You post regularly but get little response. The missing link is a strategy that connects content to your business goals.',
  },
  {
    icon: 'help_outline',
    title: 'No clear content strategy',
    desc: 'Without a strategy, you’re guessing. Every post is a shot in the dark with no direction or measurable outcome.',
  },
  {
    icon: 'schedule',
    title: 'No time to do it properly',
    desc: 'You’re running a business. Creating quality content, editing videos, and writing captions isn’t where your hours should go.',
  },
]

// ─── CONTENT TYPES ──────────────────────────────────────────────────────────

const interiorDesignContentTypes = [
  'Project Reveal Reels',
  'Before & After Carousels',
  'Behind the Scenes',
  'Client Testimonial Clips',
  'Mood Board Posts',
  'Process Videos',
  '3D Render Showcases',
  'Designer Q&A Reels',
  'Room Transformation Videos',
  'Material & Texture Spotlights',
]

export const contentTypesMap: Record<string, string[]> = {
  'interior-design': interiorDesignContentTypes,
  architecture: interiorDesignContentTypes,
  'solar-energy': [
    'How Solar Works Explainers',
    'Installation Process Reels',
    'Customer ROI Stories',
    'Before & After Savings Posts',
    'Tech Explainer Carousels',
    'Testimonial Videos',
    'Government Scheme Updates',
    'FAQ Reels',
    'Site Survey Reels',
    'Team Spotlights',
  ],
  'wellness-clinic': [
    'Patient Education Posts',
    'Doctor Q&A Reels',
    'Treatment Explainers',
    'Wellness Tips Carousels',
    'Facility Tour Videos',
    'Staff Introduction Reels',
    'Myth vs Fact Posts',
    'Testimonial Clips',
    'Health Awareness Content',
    'Behind the Care Reels',
  ],
  'yoga-fitness': [
    'Class Highlight Reels',
    'Transformation Stories',
    'Instructor Spotlights',
    'Technique Tutorial Reels',
    'Morning Routine Content',
    'Community Posts',
    'Challenge Videos',
    'Schedule Carousels',
    'Mindfulness Content',
    'Event Coverage',
  ],
  coaching: [
    'Value-First Tip Reels',
    'Client Transformation Stories',
    'Framework Carousels',
    'Behind the Coaching Scenes',
    'Podcast Clips',
    'Q&A Sessions',
    'Myth Busting Posts',
    'Book & Resource Recommendations',
    'Live Session Clips',
    'Authority Content',
  ],
  restaurants: [
    'Dish Reveal Reels',
    'Chef Behind the Scenes',
    'Preparation Process Videos',
    'Customer Reaction Clips',
    'Menu Launch Posts',
    'Event Coverage',
    'Ingredient Story Posts',
    'Table Setup Aesthetics',
    'Staff Spotlights',
    'Special Offers Content',
  ],
  fashion: [
    'New Drop Reels',
    'Styling Tips Carousels',
    'Behind the Collection',
    'Model Shoot BTS',
    'Customer Styling Videos',
    'Fabric & Detail Spotlights',
    'Lookbook Posts',
    'Founder Story Content',
    'Festival & Season Campaigns',
    'Try-On Reels',
  ],
  'real-estate': [
    'Property Tour Reels',
    'Neighbourhood Guides',
    'Before & After Renovation',
    'Client Move-In Stories',
    'Market Update Carousels',
    'Agent Introduction Videos',
    'Project Launch Announcements',
    'Investment Tip Posts',
    'Floor Plan Explainers',
    'Testimonial Clips',
  ],
  gyms: [
    'Member Transformation Reels',
    'Workout Tutorial Videos',
    'Coach Spotlights',
    'Gym Tour Videos',
    'Challenge Content',
    'Event & Competition Coverage',
    'Nutrition Tips',
    'Community Posts',
    'Equipment Feature Reels',
    'Motivation Content',
  ],
  hospitals: [
    'Patient Recovery Stories',
    'Doctor Expertise Reels',
    'Department Spotlight Videos',
    'Health Awareness Campaigns',
    'FAQ Posts',
    'Facility Tour Content',
    'Medical Myth Busting',
    'Community Health Events',
    'Staff Introduction Reels',
    'Technology Explainers',
  ],
  schools: [
    'Campus Life Reels',
    'Achievement Spotlights',
    'Teacher Introduction Videos',
    'Event Coverage',
    'Parent Testimonials',
    'Student Success Stories',
    'Facilities Tour Content',
    'Annual Day Highlights',
    'Admissions FAQ Posts',
    'Cultural Event Reels',
  ],
}

export const defaultContentTypes: string[] = [
  'Brand Story Reels',
  'Behind the Scenes',
  'Product & Service Spotlights',
  'Client Testimonial Videos',
  'FAQ Carousels',
  'Team Introduction Posts',
  'Milestone Announcements',
  'Tips & Value Posts',
  'Community Engagement Content',
  'Event Coverage',
]

// ─── FAQS ───────────────────────────────────────────────────────────────────

const interiorDesignFaqs: FAQ[] = [
  {
    q: 'Do you understand the interior design aesthetic?',
    a: 'Yes. We study your portfolio, brand references, and target clientele before creating any content. We don’t post generic home decor — we build content that reflects your specific design language.',
  },
  {
    q: 'Can you create content without a shoot?',
    a: 'Absolutely. We use your existing project photos, AI-enhanced visuals, and creative direction to build content. For shoots, we can coordinate with your team.',
  },
  {
    q: 'How many posts per month do we get?',
    a: 'Depending on your plan — Starter (12 posts + reels/month), Growth (25+ pieces), Premium (unlimited). All include captions, hashtags, and scheduling.',
  },
  {
    q: 'Will I need to be involved in content creation?',
    a: 'Minimal involvement needed. We handle strategy, creation, and scheduling. You just approve content via our client portal before it goes live.',
  },
]

const wellnessClinicFaqs: FAQ[] = [
  {
    q: 'Can you handle sensitive medical content responsibly?',
    a: 'Yes. All health content is created with accuracy and sensitivity in mind. We never make medical claims — we educate, inform, and build trust without crossing ethical lines.',
  },
  {
    q: 'Do we need to provide patient photos?',
    a: 'Only with patient consent. We can work with staff, facility visuals, and educational content without needing patient imagery.',
  },
  {
    q: 'How do you handle our brand tone as a healthcare provider?',
    a: 'We develop a brand tone guide specific to your clinic — professional yet approachable, credible yet warm. Every piece of content follows this guide.',
  },
  {
    q: 'How soon can we start seeing results?',
    a: 'Typically brands see improved engagement and enquiries within 60-90 days of consistent content. We share monthly analytics reports.',
  },
]

const solarEnergyFaqs: FAQ[] = [
  {
    q: 'Can you explain technical solar concepts simply?',
    a: 'That’s exactly what we specialise in. We translate complex concepts — net metering, ROI timelines, panel types — into content that educates and builds buyer confidence.',
  },
  {
    q: 'Do you handle B2B and B2C both?',
    a: 'Yes. We create separate content streams for residential customers and commercial/industrial clients — different messaging, different platforms.',
  },
  {
    q: 'Can content help generate actual leads?',
    a: 'Yes — content builds awareness and trust which shortens the sales cycle. We also design content specifically to drive enquiries and DMs.',
  },
  {
    q: 'What platforms do you manage for solar brands?',
    a: 'Primarily Instagram and LinkedIn (for B2B). We can also manage YouTube Shorts and Facebook based on your audience.',
  },
]

export const defaultFaqs: FAQ[] = [
  {
    q: 'How quickly can you start?',
    a: 'Onboarding typically takes 5-7 days. We gather your brand assets, run a strategy session, and begin content production in the first week.',
  },
  {
    q: 'Do I need to sign a long-term contract?',
    a: 'We offer flexible monthly plans. Most clients stay 6+ months because results build over time — but we don’t lock you in.',
  },
  {
    q: 'How do I review content before it goes live?',
    a: 'Through our client portal. You get a preview of every post before publishing. Nothing goes live without your approval.',
  },
  {
    q: 'What makes Rogue Studio different from other agencies?',
    a: 'We don’t use templates. Every strategy is built from scratch for your specific brand, audience, and goals — with an in-house team based in Jaipur.',
  },
]

export const faqsMap: Record<string, FAQ[]> = {
  'interior-design': interiorDesignFaqs,
  architecture: interiorDesignFaqs,
  'wellness-clinic': wellnessClinicFaqs,
  hospitals: wellnessClinicFaqs,
  'solar-energy': solarEnergyFaqs,
}
