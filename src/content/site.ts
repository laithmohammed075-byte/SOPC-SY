/**
 * SOPC — centralized, editable site content.
 *
 * Everything visible on the landing page lives here: company details,
 * image manifest and the English / Arabic copy. Marketing copy is DRAFT
 * text and must be reviewed by SOPC before publication.
 *
 * Contact details are intentionally `null` until official information is
 * provided. Components render a neutral "to be confirmed" placeholder for
 * any null value — never invent phone numbers, emails or addresses.
 */

export type Lang = "en" | "ar";

/** Image base path — relative in the static export so index.html also works when opened from disk. */
const IMG = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1" ? "images/" : "/images/";

export const company = {
  shortName: "SOPC",
  nameEn: "Syrian Oil & Petrochemical Company",
  nameAr: "الشركة السورية للخدمات النفطية والكيميائية",
  /** Official contact information — fill in when confirmed. */
  contact: {
    email: "Info@sopc-sy.com" as string | null,
    /**
     * Web3Forms access key: contact-form messages are emailed to info@sopc-sy.com.
     * This key is designed to be public (it only allows sending to that inbox).
     * Manage it at https://web3forms.com. Set to null to disable online sending.
     */
    formAccessKey: "9a750ba3-fa94-43f1-a631-aa0eed77fbe2" as string | null,
    phone: "+963 941 805 816" as string | null,
    address: {
      en: "Syria – Homs – Hama Road – Al-Faihaa Building – 4th Floor" as string | null,
      ar: "سوريا – حمص – طريق حماة – بناء الفيحاء – الطابق الرابع" as string | null,
    },
    hours: {
      en: "Sunday – Thursday: 8:00 AM – 4:00 PM\nClosed: Friday & Saturday" as string | null,
      ar: "الأحد – الخميس: من الساعة 8:00 صباحاً حتى 4:00 مساءً\nالعطلة الأسبوعية: الجمعة والسبت" as string | null,
    },
  },
  /**
   * Official social profiles. Only add entries with verified URLs —
   * the footer renders nothing when this list is empty.
   * Supported `network` values: "linkedin" | "facebook" | "x" | "instagram" | "youtube".
   */
  social: [] as { network: string; url: string }[],
  /** Public site URL, used for Open Graph metadata. */
  siteUrl: "https://sopc-sy.com/",
};

/** Service identifiers — used for anchors (#service-<id>) and the contact form. */
export const serviceIds = [
  "crude-oil",
  "well-maintenance",
  "pumping-stations",
  "import-export",
  "training",
] as const;
export type ServiceId = (typeof serviceIds)[number];

/**
 * Image manifest. All photographs are stored locally in /public/images and
 * were sourced from Unsplash under the Unsplash License
 * (https://unsplash.com/license — free commercial use, no attribution required).
 * Source IDs are kept here for traceability.
 */
export const images = {
  logo: `${IMG}sopc-logo.webp`,
  /** Same official logo file, kept separately so the single-file build can embed it at high resolution for the About section. */
  logoHd: `${IMG}sopc-logo-hd.webp`,
  hero: [
    { src: `${IMG}hero-petrochemical-pipework.webp`, unsplashId: "photo-1513828583688-c52646db42da" },
    // Supplied by SOPC. textSide "right": the engineer stands on the left, so the hero text moves right.
    { src: `${IMG}hero-technicians-site.webp`, source: "SOPC", textSide: "right" },
    { src: `${IMG}hero-engineering-facility.webp`, unsplashId: "photo-1610891015188-5369212db097" },
    { src: `${IMG}hero-refinery-daylight.webp`, unsplashId: "photo-1516937941344-00b4e0337589" },
  ],
  services: { src: `${IMG}services-refinery-piping.webp`, unsplashId: "photo-1513828742140-ccaa28f3eda0" },
  /**
   * One photo per service (supplied by SOPC). The full photo is the faded background
   * of the service page; `focus` is the CSS object-position that keeps the subject
   * inside the round crop on the home page circles.
   */
  serviceImages: {
    "crude-oil": { src: `${IMG}service-crude-oil.webp`, focus: "14% 50%" },
    "well-maintenance": { src: `${IMG}service-well-maintenance.webp`, focus: "18% 50%" },
    "pumping-stations": { src: `${IMG}service-pumping-stations.webp`, focus: "66% 50%" },
    "import-export": { src: `${IMG}service-import-export.webp`, focus: "22% 50%" },
    training: { src: `${IMG}service-training.webp`, focus: "40% 50%" },
  } as Record<ServiceId, { src: string; focus: string }>,
  qhse: { src: `${IMG}qhse-workers-ppe.webp`, source: "SOPC" },
};

const en = {
  meta: {
    skip: "Skip to main content",
    tbc: "To be confirmed",
  },
  nav: {
    home: "Home",
    about: "About Us",
    services: "Services",
    qhse: "QHSE",
    contact: "Contact Us",
    sendMessage: "Send a Message",
    careers: "Careers",
    getInTouch: "Get in Touch",
    whoWeAre: "Who We Are",
    whySopc: "Why SOPC",
    allServices: "All Services",
    menu: "Open menu",
    close: "Close menu",
    primary: "Primary navigation",
    language: "Language",
    darkMode: "Dark mode",
    lightMode: "Light mode",
  },
  hero: {
    eyebrow: "SOPC — Syria",
    titleA: "Your Trusted Partner",
    titleB: "in the Oil Sector.",
    description:
      "From crude oil extraction and well maintenance to pumping station operations, equipment supply and training — integrated services built on quality and safety.",
    primary: "Explore Our Services",
    secondary: "Contact Us",
    prev: "Previous slide",
    next: "Next slide",
    goTo: "Go to slide",
    pause: "Pause slideshow",
    play: "Play slideshow",
    carousel: "Featured imagery",
    slides: [
      "Stainless-steel petrochemical pipework and pumping equipment",
      "SOPC engineer in uniform and hard hat reviewing a tablet in front of oil pumpjacks",
      "Modern engineering and processing facility interior",
      "Oil refinery processing units in daylight",
    ],
  },
  about: {
    eyebrow: "Who We Are",
    title: "Welcome to SOPC",
    subtitle: "Syrian Oil & Petrochemical Company",
    body: "SOPC is focused on delivering dependable industrial, oil and gas, and petrochemical solutions. Our approach brings together technical expertise, quality-focused execution, and long-term partnerships.",
    illustration: "Illustration of refinery columns, storage tanks and pipelines",
    features: [
      { title: "Technical Expertise", text: "Engineering know-how applied with care to every stage of work." },
      { title: "Reliable Solutions", text: "Practical, dependable answers to demanding industrial needs." },
      { title: "Commitment to Quality", text: "Disciplined execution guided by clear quality standards." },
    ],
    cta: "Learn More About Us",
  },
  services: {
    eyebrow: "Our Services",
    title: "Integrated Industrial Solutions",
    intro:
      "From crude oil extraction and field operations to pumping stations, equipment supply and training, SOPC brings together the services the oil sector needs under one dependable partner.",
    imageAlt: "Bright refinery piping in an industrial plant",
    learnMore: "View details",
    discuss: "Discuss this service",
    backToServices: "All services",
    otherServices: "Other services",
    close: "Close",
    items: {
      "crude-oil": {
        title: "Crude Oil Extraction",
        short: "Crude oil extraction.",
        body: "We provide crude oil extraction services through technical and operational solutions designed to enhance production efficiency and optimize the utilization of petroleum resources. Our approach focuses on quality, safety, and effective operational practices to support continuous production and meet the evolving needs of the oil and energy sector.",
      },
      "well-maintenance": {
        title: "Oil Well Maintenance",
        short: "Oil well maintenance and field operations.",
        body: "We offer oil well maintenance and field operation services aimed at improving operational performance and ensuring production continuity. Our services include maintenance, inspection, and technical support, with a strong focus on safety, reliability, and minimizing operational downtime to enhance the efficiency of oilfield facilities.",
      },
      "pumping-stations": {
        title: "Pumping Stations",
        short: "Operation and maintenance of oil and its derivatives pumping stations.",
        body: "We provide integrated solutions for the operation and maintenance of crude oil and petroleum product pumping stations. Our services focus on improving pumping efficiency, maintaining equipment reliability, and ensuring operational continuity through technical maintenance and monitoring, while adhering to quality and safety standards.",
      },
      "import-export": {
        title: "Import & Export",
        short: "Import and export of equipment, machinery, and materials related to its operations.",
        body: "We provide import and export services for equipment, machinery, and materials related to the oil, petrochemical, and associated industrial sectors. Our goal is to deliver reliable supply solutions that meet project requirements, with a focus on product quality, efficient supply chains, and streamlined international trade operations.",
      },
      training: {
        title: "Training Consultancy",
        short: "Provision of training consultancy services.",
        body: "We provide professional training consultancy services focused on developing workforce capabilities and enhancing technical and managerial skills across the oil and industrial sectors. Our approach supports organizations in improving employee performance, strengthening safety awareness, and promoting continuous professional development in line with modern industry requirements.",
      },
    } as Record<ServiceId, { title: string; short: string; body: string }>,
  },
  qhse: {
    badge: "QHSE",
    title: "Quality, Health, Safety & Environment",
    body: "At SOPC, quality, safety, and environmental responsibility are central to our approach to industrial operations.",
    body2:
      "We aim to plan and carry out every activity with care for our people, our partners, the communities around us and the environment we share.",
    imageAlt: "SOPC team in company coveralls, hard hats and gloves climbing an industrial stairway",
    features: [
      { title: "Quality", text: "Consistent standards and careful verification at every step." },
      { title: "Safety", text: "Protecting people through planning, training and the right equipment." },
      { title: "Environment", text: "Responsible operations that respect natural resources." },
    ],
  },
  why: {
    eyebrow: "Why Choose SOPC",
    title: "A Partner Built on Expertise and Trust",
    items: [
      { title: "Engineering Expertise", text: "Technical understanding that turns complex requirements into workable plans." },
      { title: "Quality-Driven Approach", text: "Clear standards and careful execution guide everything we deliver." },
      { title: "Integrated Solutions", text: "Equipment, chemicals, trading and services coordinated through one partner." },
      { title: "Long-Term Partnerships", text: "Relationships built on reliability, transparency and shared goals." },
    ],
  },
  contact: {
    eyebrow: "Contact Us",
    title: "Let's Build the Future Together",
    description: "Connect with SOPC to discuss your industrial and energy requirements.",
    infoTitle: "Contact Information",
    infoNote: "Official contact details will be published here once confirmed.",
    email: "Email",
    phone: "Phone",
    address: "Address",
    hours: "Working Hours",
    form: {
      fullName: "Full Name",
      company: "Company",
      email: "Email",
      phone: "Phone",
      service: "Service of Interest",
      servicePlaceholder: "Select a service",
      general: "General enquiry",
      careers: "Careers",
      message: "Message",
      submit: "Send Message",
      sending: "Sending…",
      optional: "optional",
      required: "required",
      errors: {
        fullName: "Please enter your full name.",
        email: "Please enter a valid email address.",
        phone: "Please enter a valid phone number.",
        service: "Please select a service.",
        message: "Please enter a message of at least 10 characters.",
      },
      success: "Thank you — your message has been sent. We will be in touch.",
      notConfigured:
        "Online submission is not yet configured. Your message was not sent — please contact SOPC through official channels.",
      failure: "Something went wrong and your message was not sent. Please try again later.",
    },
  },
  footer: {
    about:
      "Syrian Oil & Petrochemical Company — equipment, chemicals, trading and services for the oil, gas and petrochemical sectors.",
    quickLinks: "Quick Links",
    services: "Services",
    contact: "Contact",
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },
};

export type Dict = typeof en;

const ar: Dict = {
  meta: {
    skip: "الانتقال إلى المحتوى الرئيسي",
    tbc: "سيتم التأكيد لاحقاً",
  },
  nav: {
    home: "الرئيسية",
    about: "من نحن",
    services: "خدماتنا",
    qhse: "الجودة والسلامة",
    contact: "اتصل بنا",
    sendMessage: "أرسل رسالة",
    careers: "الوظائف",
    getInTouch: "تواصل معنا",
    whoWeAre: "تعرّف علينا",
    whySopc: "لماذا SOPC",
    allServices: "جميع الخدمات",
    menu: "فتح القائمة",
    close: "إغلاق القائمة",
    primary: "التنقل الرئيسي",
    language: "اللغة",
    darkMode: "الوضع الليلي",
    lightMode: "الوضع النهاري",
  },
  hero: {
    eyebrow: "SOPC — سوريا",
    titleA: "شريككم الموثوق",
    titleB: "في قطاع النفط.",
    description:
      "من استخراج النفط الخام وصيانة الآبار، إلى تشغيل محطات الضخ وتوريد المعدات والتدريب — خدمات متكاملة قائمة على الجودة والسلامة.",
    primary: "استكشف خدماتنا",
    secondary: "تواصل معنا",
    prev: "الشريحة السابقة",
    next: "الشريحة التالية",
    goTo: "الانتقال إلى الشريحة",
    pause: "إيقاف العرض",
    play: "تشغيل العرض",
    carousel: "صور مميزة",
    slides: [
      "أنابيب ومعدات ضخ بتروكيماوية من الفولاذ المقاوم للصدأ",
      "مهندس من SOPC بلباس الشركة وخوذة يراجع جهازاً لوحياً أمام مضخات النفط",
      "منشأة هندسية ومعالجة حديثة من الداخل",
      "وحدات تكرير ومعالجة نفطية في وضح النهار",
    ],
  },
  about: {
    eyebrow: "من نحن",
    title: "مرحباً بكم في SOPC",
    subtitle: "الشركة السورية للخدمات النفطية والكيميائية",
    body: "تركّز SOPC على تقديم حلول صناعية ونفطية وبتروكيماوية يمكن الاعتماد عليها. ويجمع نهجنا بين الخبرة الفنية والتنفيذ القائم على الجودة والشراكات طويلة الأمد.",
    illustration: "رسم توضيحي لأبراج تكرير وخزانات وخطوط أنابيب",
    features: [
      { title: "خبرة فنية", text: "معرفة هندسية تُطبَّق بعناية في كل مرحلة من مراحل العمل." },
      { title: "حلول موثوقة", text: "حلول عملية يُعتمد عليها لتلبية المتطلبات الصناعية الصعبة." },
      { title: "التزام بالجودة", text: "تنفيذ منضبط تحكمه معايير جودة واضحة." },
    ],
    cta: "اعرف المزيد عنّا",
  },
  services: {
    eyebrow: "خدماتنا",
    title: "حلول صناعية متكاملة",
    intro:
      "من استخراج النفط الخام والعمل في الحقول إلى محطات الضخ وتوريد المعدات والتدريب، تجمع SOPC الخدمات التي يحتاجها القطاع النفطي لدى شريك واحد موثوق.",
    imageAlt: "أنابيب مصفاة مضيئة داخل منشأة صناعية",
    learnMore: "عرض التفاصيل",
    discuss: "ناقش هذه الخدمة",
    backToServices: "جميع الخدمات",
    otherServices: "خدمات أخرى",
    close: "إغلاق",
    items: {
      "crude-oil": {
        title: "استخراج النفط الخام",
        short: "استخراج النفط الخام.",
        body: "نقدم خدمات استخراج النفط الخام من خلال حلول فنية وتشغيلية تهدف إلى تعزيز كفاءة الإنتاج والاستفادة المثلى من الموارد النفطية. ونركز على تطبيق معايير الجودة والسلامة واعتماد أساليب عمل فعّالة تساهم في دعم استمرارية العمليات وتلبية احتياجات قطاع النفط والطاقة.",
      },
      "well-maintenance": {
        title: "صيانة الآبار النفطية",
        short: "صيانة الآبار النفطية والعمل على الحقول النفطية.",
        body: "نقدم خدمات صيانة الآبار النفطية والأعمال الفنية المرتبطة بالحقول النفطية، بهدف تحسين الأداء التشغيلي وتعزيز استمرارية الإنتاج. وتشمل خدماتنا أعمال الصيانة والفحص والدعم الفني، مع التركيز على معايير السلامة والموثوقية والحد من التوقفات التشغيلية لضمان كفاءة المنشآت النفطية.",
      },
      "pumping-stations": {
        title: "محطات ضخ النفط",
        short: "تشغيل وصيانة محطات ضخ النفط ومشتقاته.",
        body: "نوفر حلولاً متكاملة لتشغيل وصيانة محطات ضخ النفط الخام والمشتقات البترولية، بهدف تعزيز كفاءة عمليات الضخ وضمان استمرارية التشغيل. ونعمل على دعم جاهزية المعدات والأنظمة من خلال الصيانة والمتابعة الفنية، مع الالتزام بمعايير الجودة والسلامة لتحقيق أداء تشغيلي موثوق ومستدام.",
      },
      "import-export": {
        title: "الاستيراد والتصدير",
        short: "استيراد وتصدير المعدات والتجهيزات والمواد المرتبطة بنشاطها.",
        body: "نقدم خدمات استيراد وتصدير المعدات والتجهيزات والمواد المرتبطة بقطاع النفط والبتروكيماويات والأنشطة الصناعية ذات الصلة. ونسعى إلى توفير حلول توريد موثوقة تلبي المتطلبات الفنية والتشغيلية للمشاريع، مع التركيز على جودة المنتجات وكفاءة سلاسل الإمداد وتسهيل العمليات التجارية.",
      },
      training: {
        title: "استشارات التدريب",
        short: "تقديم خدمات استشارات التدريب.",
        body: "نقدم خدمات استشارية متخصصة في التدريب والتطوير المهني، تهدف إلى تنمية الكفاءات البشرية وتعزيز المهارات الفنية والإدارية في القطاعات النفطية والصناعية. ونسعى إلى دعم المؤسسات في تطوير قدرات كوادرها ورفع مستوى الأداء وتعزيز ثقافة السلامة والجودة بما يتوافق مع متطلبات بيئة العمل الحديثة.",
      },
    },
  },
  qhse: {
    badge: "QHSE",
    title: "الجودة والصحة والسلامة والبيئة",
    body: "في SOPC، تُعدّ الجودة والسلامة والمسؤولية البيئية محوراً أساسياً في نهجنا تجاه العمليات الصناعية.",
    body2:
      "نسعى إلى تخطيط كل نشاط وتنفيذه بعناية تحفظ سلامة فرقنا وشركائنا والمجتمعات من حولنا والبيئة التي نتشاركها.",
    imageAlt: "فريق SOPC بلباس الشركة والخوذ والقفازات يصعد درجاً صناعياً",
    features: [
      { title: "الجودة", text: "معايير ثابتة وتحقّق دقيق في كل خطوة." },
      { title: "السلامة", text: "حماية الأفراد بالتخطيط والتدريب والمعدات المناسبة." },
      { title: "البيئة", text: "عمليات مسؤولة تحترم الموارد الطبيعية." },
    ],
  },
  why: {
    eyebrow: "لماذا تختار SOPC",
    title: "شريك قائم على الخبرة والثقة",
    items: [
      { title: "خبرة هندسية", text: "فهم فني يحوّل المتطلبات المعقّدة إلى خطط قابلة للتنفيذ." },
      { title: "نهج قائم على الجودة", text: "معايير واضحة وتنفيذ دقيق يوجّهان كل ما نقدّمه." },
      { title: "حلول متكاملة", text: "معدات وكيماويات وتجارة وخدمات منسّقة عبر شريك واحد." },
      { title: "شراكات طويلة الأمد", text: "علاقات مبنية على الموثوقية والشفافية والأهداف المشتركة." },
    ],
  },
  contact: {
    eyebrow: "اتصل بنا",
    title: "لنبنِ المستقبل معاً",
    description: "تواصل مع SOPC لمناقشة احتياجاتك الصناعية ومتطلبات الطاقة لديك.",
    infoTitle: "معلومات التواصل",
    infoNote: "ستُنشر بيانات التواصل الرسمية هنا فور تأكيدها.",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    address: "العنوان",
    hours: "ساعات العمل",
    form: {
      fullName: "الاسم الكامل",
      company: "الشركة",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      service: "الخدمة المطلوبة",
      servicePlaceholder: "اختر خدمة",
      general: "استفسار عام",
      careers: "الوظائف",
      message: "الرسالة",
      submit: "إرسال الرسالة",
      sending: "جارٍ الإرسال…",
      optional: "اختياري",
      required: "مطلوب",
      errors: {
        fullName: "يرجى إدخال الاسم الكامل.",
        email: "يرجى إدخال بريد إلكتروني صحيح.",
        phone: "يرجى إدخال رقم هاتف صحيح.",
        service: "يرجى اختيار خدمة.",
        message: "يرجى كتابة رسالة لا تقل عن 10 أحرف.",
      },
      success: "شكراً لك — تم إرسال رسالتك وسنتواصل معك قريباً.",
      notConfigured:
        "لم يتم إعداد الإرسال الإلكتروني بعد. لم تُرسل رسالتك — يرجى التواصل مع SOPC عبر القنوات الرسمية.",
      failure: "حدث خطأ ولم تُرسل رسالتك. يرجى المحاولة لاحقاً.",
    },
  },
  footer: {
    about:
      "الشركة السورية للخدمات النفطية والكيميائية — معدات وكيماويات وتجارة وخدمات لقطاعات النفط والغاز والبتروكيماويات.",
    quickLinks: "روابط سريعة",
    services: "خدماتنا",
    contact: "التواصل",
    rights: "جميع الحقوق محفوظة.",
    backToTop: "العودة إلى الأعلى",
  },
};

export const dictionaries: Record<Lang, Dict> = { en, ar };
