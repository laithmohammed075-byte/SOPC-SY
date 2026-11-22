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
    email: null as string | null,
    phone: null as string | null,
    address: { en: null as string | null, ar: null as string | null },
    hours: { en: null as string | null, ar: null as string | null },
  },
  /**
   * Official social profiles. Only add entries with verified URLs —
   * the footer renders nothing when this list is empty.
   * Supported `network` values: "linkedin" | "facebook" | "x" | "instagram" | "youtube".
   */
  social: [] as { network: string; url: string }[],
  /** Public site URL, used for Open Graph metadata. */
  siteUrl: "https://laithmohammed075-byte.github.io/SOPC-SY/",
};

/** Service identifiers — used for anchors (#service-<id>) and the contact form. */
export const serviceIds = [
  "oil-gas",
  "petrochemical",
  "engineering",
  "fabrication",
  "technical-commercial",
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
    sendMessage: "Send a Message",
    qhse: "QHSE",
    careers: "Careers",
    contact: "Contact Us",
    getInTouch: "Get in Touch",
    whoWeAre: "Who We Are",
    whySopc: "Why SOPC",
    allServices: "All Services",
    menu: "Open menu",
    close: "Close menu",
    primary: "Primary navigation",
    language: "Language",
  },
  hero: {
    eyebrow: "Welcome to SOPC",
    titleA: "Engineering Energy.",
    titleB: "Empowering the Future.",
    description:
      "Delivering reliable oil, gas, petrochemical, and industrial solutions through engineering expertise, innovation, and a commitment to excellence.",
    primary: "Explore Our Services",
    secondary: "Discover SOPC",
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
      "From upstream support to plant engineering and commercial services, SOPC brings together the capabilities industrial clients need under one dependable partner.",
    imageAlt: "Bright refinery piping in an industrial plant",
    learnMore: "View details",
    draftNote: "Draft description — official service details to be provided by SOPC.",
    discuss: "Discuss this service",
    backToServices: "All services",
    otherServices: "Other services",
    close: "Close",
    items: {
      "oil-gas": {
        title: "Oil & Gas Services",
        short: "Support for oil and gas operations and field activities.",
        body: "Placeholder: an overview of SOPC's oil and gas service offering will be published here once official details are confirmed.",
      },
      petrochemical: {
        title: "Petrochemical Solutions",
        short: "Solutions for petrochemical plants and processes.",
        body: "Placeholder: an overview of SOPC's petrochemical solutions will be published here once official details are confirmed.",
      },
      engineering: {
        title: "Engineering Projects",
        short: "Engineering support for industrial projects.",
        body: "Placeholder: an overview of SOPC's engineering project capabilities will be published here once official details are confirmed.",
      },
      fabrication: {
        title: "Industrial Fabrication",
        short: "Fabrication for industrial applications.",
        body: "Placeholder: an overview of SOPC's industrial fabrication services will be published here once official details are confirmed.",
      },
      "technical-commercial": {
        title: "Technical & Commercial Services",
        short: "Equipment, chemicals, trading and technical services.",
        body: "Placeholder: an overview of SOPC's technical and commercial services — including equipment, chemicals and trading — will be published here once official details are confirmed.",
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
  careers: {
    eyebrow: "Careers",
    title: "Grow With SOPC",
    text: "We value engineers, technicians and specialists who share our commitment to quality and safety. Open positions will be announced here.",
    cta: "Express Your Interest",
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
  floating: {
    open: "Open contact options",
    close: "Close contact options",
    title: "How can we help?",
    text: "Send us a message and the SOPC team will get back to you.",
    cta: "Write to us",
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
    sendMessage: "أرسل رسالة",
    qhse: "الجودة والسلامة",
    careers: "الوظائف",
    contact: "اتصل بنا",
    getInTouch: "تواصل معنا",
    whoWeAre: "تعرّف علينا",
    whySopc: "لماذا SOPC",
    allServices: "جميع الخدمات",
    menu: "فتح القائمة",
    close: "إغلاق القائمة",
    primary: "التنقل الرئيسي",
    language: "اللغة",
  },
  hero: {
    eyebrow: "مرحباً بكم في SOPC",
    titleA: "نهندس الطاقة.",
    titleB: "ونمكّن المستقبل.",
    description:
      "نقدّم حلولاً موثوقة في مجالات النفط والغاز والبتروكيماويات والصناعة، بخبرة هندسية وروح ابتكار والتزام راسخ بالتميّز.",
    primary: "استكشف خدماتنا",
    secondary: "تعرّف على SOPC",
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
      "من دعم العمليات النفطية إلى هندسة المنشآت والخدمات التجارية، تجمع SOPC القدرات التي يحتاجها العملاء الصناعيون لدى شريك واحد موثوق.",
    imageAlt: "أنابيب مصفاة مضيئة داخل منشأة صناعية",
    learnMore: "عرض التفاصيل",
    draftNote: "وصف مبدئي — ستزوّدنا SOPC بالتفاصيل الرسمية للخدمة.",
    discuss: "ناقش هذه الخدمة",
    backToServices: "جميع الخدمات",
    otherServices: "خدمات أخرى",
    close: "إغلاق",
    items: {
      "oil-gas": {
        title: "خدمات النفط والغاز",
        short: "دعم عمليات النفط والغاز والأنشطة الميدانية.",
        body: "نص مؤقت: سيُنشر هنا عرض لخدمات SOPC في مجال النفط والغاز بعد تأكيد التفاصيل الرسمية.",
      },
      petrochemical: {
        title: "الحلول البتروكيماوية",
        short: "حلول للمنشآت والعمليات البتروكيماوية.",
        body: "نص مؤقت: سيُنشر هنا عرض للحلول البتروكيماوية التي تقدّمها SOPC بعد تأكيد التفاصيل الرسمية.",
      },
      engineering: {
        title: "المشاريع الهندسية",
        short: "دعم هندسي للمشاريع الصناعية.",
        body: "نص مؤقت: سيُنشر هنا عرض لقدرات SOPC في المشاريع الهندسية بعد تأكيد التفاصيل الرسمية.",
      },
      fabrication: {
        title: "التصنيع الصناعي",
        short: "أعمال تصنيع للتطبيقات الصناعية.",
        body: "نص مؤقت: سيُنشر هنا عرض لخدمات التصنيع الصناعي لدى SOPC بعد تأكيد التفاصيل الرسمية.",
      },
      "technical-commercial": {
        title: "الخدمات الفنية والتجارية",
        short: "المعدات والكيماويات والتجارة والخدمات الفنية.",
        body: "نص مؤقت: سيُنشر هنا عرض للخدمات الفنية والتجارية لدى SOPC — بما فيها المعدات والكيماويات والتجارة — بعد تأكيد التفاصيل الرسمية.",
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
  careers: {
    eyebrow: "الوظائف",
    title: "انمُ مع SOPC",
    text: "نقدّر المهندسين والفنيين والمتخصصين الذين يشاركوننا التزامنا بالجودة والسلامة. سيتم الإعلان عن الوظائف المتاحة هنا.",
    cta: "أبدِ اهتمامك",
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
  floating: {
    open: "فتح خيارات التواصل",
    close: "إغلاق خيارات التواصل",
    title: "كيف يمكننا مساعدتك؟",
    text: "أرسل لنا رسالة وسيتواصل معك فريق SOPC.",
    cta: "راسلنا",
  },
};

export const dictionaries: Record<Lang, Dict> = { en, ar };
