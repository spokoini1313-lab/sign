import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Award,
  FlaskConical,
  Microscope,
  Cpu,
  HeartHandshake,
  Droplets,
  Sun,
  Gem,
  Syringe,
  Leaf,
  Star,
  Quote,
  MapPin,
  Clock,
  Phone,
  Navigation,
  CalendarHeart,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

/* ============================================================
   הגדרות הקליניקה – יש לשנות כאן בלבד
   ============================================================ */
const WHATSAPP_NUMBER = "972500000000"; // פורמט בינלאומי, ללא + וללא 0 מוביל

const CLINIC = {
  name: "Lumière",
  tagline: "Skin Clinic",
  ownerName: "מיכל לוי",
  ownerTitle: "P.C.D קוסמטיקאית פרא-רפואית מוסמכת",
  ownerPhoto:
    "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80",
  phoneDisplay: "050-000-0000",
  phoneTel: "+972500000000",
  address: "רחוב הרצל 10, תל אביב",
  wazeQuery: "רחוב הרצל 10 תל אביב",
  hours: [
    { day: "ראשון – חמישי", time: "09:00 – 20:00" },
    { day: "שישי", time: "08:30 – 13:30" },
    { day: "שבת", time: "סגור" },
  ],
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    tiktok: "https://tiktok.com/",
  },
};

/* יוצר קישור וואטסאפ עם הודעה מוכנה מראש */
const waLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const MSG_GENERAL =
  "היי, הגעתי מהאתר ואשמח לתאם פגישת ייעוץ ואבחון עור בקליניקה 🌸";
const MSG_BOOKING = "היי, אשמח לקבוע תור בקליניקה. מתי יש זמינות קרובה? ✨";
const MSG_FLOATING =
  "היי! הגעתי מהאתר ואשמח לקבל פרטים נוספים על הטיפולים בקליניקה 💕";
const treatmentMsg = (title) =>
  `היי, אני מתעניינת ב"${title}" ואשמח לקבל פרטים ולתאם פגישת ייעוץ 🌿`;

/* ============================================================
   תוכן
   ============================================================ */
const NAV_LINKS = [
  { id: "about", label: "אודות" },
  { id: "services", label: "טיפולים" },
  { id: "benefits", label: "יתרונות" },
  { id: "testimonials", label: "המלצות" },
  { id: "contact", label: "יצירת קשר" },
];

const TRUST_TAGS = [
  { icon: Award, text: "מעל 10 שנות ניסיון" },
  { icon: ShieldCheck, text: "מכשור מאושר משרד הבריאות" },
  { icon: FlaskConical, text: "התאמה אישית של חומרים פעילים" },
];

const SERVICES = [
  {
    icon: Droplets,
    title: "טיפולי פנים פרא-רפואיים ואקנה",
    desc: "איזון העור, ניקוי עמוק ושיקום פוסט-אקנה בפרוטוקול מותאם אישית – לעור נקי, רגוע ובריא לאורך זמן.",
    tags: ["איזון", "ניקוי עמוק", "פוסט-אקנה"],
  },
  {
    icon: Gem,
    title: "אנטי-אייג'ינג ומיצוק העור",
    desc: "חידוש מרקם העור, גירוי ייצור קולגן וטיפול ממוקד בקמטוטים – למראה צעיר, מוצק וטבעי.",
    tags: ["חידוש מרקם", "קולגן", "קמטוטים"],
  },
  {
    icon: Sun,
    title: "פיגמנטציה והבהרה",
    desc: "טיפול ממוקד בכתמי שמש, כתמי גיל ופיגמנטציה הורמונלית, לגוון עור אחיד וזוהר.",
    tags: ["כתמי שמש", "כתמי גיל", "מלזמה"],
  },
  {
    icon: Sparkles,
    title: "טיפול זוהר לאירועים",
    desc: "Glow Treatment מיידי שמעניק לעור לחות, חיוניות וברק – בדיוק לפני האירוע החשוב שלך.",
    tags: ["Glow", "תוצאה מיידית", "לפני אירוע"],
  },
  {
    icon: Syringe,
    title: "מזותרפיה וטכנולוגיות מתקדמות",
    desc: "החדרת קוקטייל חומרים פעילים לשכבות העור באמצעות מכשור חדשני, להזנה עמוקה ותוצאות נראות לעין.",
    tags: ["מזותרפיה", "מכשור חדשני", "הזנה עמוקה"],
  },
];

const BENEFITS = [
  {
    icon: Microscope,
    title: "אבחון עור מעמיק ומדויק",
    desc: "כל טיפול מתחיל באבחון יסודי של סוג העור, מצבו והגורמים לבעיה – כדי לטפל בשורש ולא רק בסימפטום.",
  },
  {
    icon: FlaskConical,
    title: "חומרים פרא-רפואיים מאושרים",
    desc: "עבודה עם תכשירים איכותיים בעלי ריכוז גבוה של חומרים פעילים, באישור משרד הבריאות.",
  },
  {
    icon: Cpu,
    title: "מכשור טכנולוגי מתקדם",
    desc: "שילוב טכנולוגיות חדשניות ומוכחות קלינית להעצמת התוצאות וקיצור זמני ההחלמה.",
  },
  {
    icon: HeartHandshake,
    title: "יחס אישי בקליניקה פרטית",
    desc: "סביבה שקטה, סטרילית ואינטימית, עם ליווי צמוד וזמינות לכל שאלה לאורך כל התהליך.",
  },
];

// טקסט לדוגמה – יש להחליף בהמלצות אמיתיות של לקוחות (באישורן)
const TESTIMONIALS = [
  {
    name: "נועה כ.",
    treatment: "טיפול באקנה ושיקום פוסט-אקנה",
    text: "אחרי שנים של ניסיונות, סוף סוף מצאתי מישהי שבאמת הבינה את העור שלי. תוך כמה חודשים העור השתנה לגמרי ואני יוצאת מהבית בלי איפור. תודה מכל הלב!",
  },
  {
    name: "רונית ש.",
    treatment: "אנטי-אייג'ינג ומיצוק",
    text: "יחס אישי, מקצועיות ברמה הכי גבוהה והתוצאות מדברות בעד עצמן. העור שלי נראה רענן ומוצק יותר, וכולם שואלים מה עשיתי. ממליצה בחום!",
  },
  {
    name: "שירן א.",
    treatment: "טיפול זוהר לפני חתונה",
    text: "הגעתי שבוע לפני החתונה והעור פשוט זהר! האיפור ישב מושלם וקיבלתי מלא מחמאות. האווירה בקליניקה מרגיעה ומפנקת, חוויה מושלמת.",
  },
];

const PHILOSOPHY = [
  "בריאות העור קודמת לכל – טיפול מהשורש ולא רק מהמראה",
  "אבחון מדויק ובניית תוכנית טיפול אישית",
  "שימוש בתכשירים איכותיים ומוכחים בלבד",
  "ליווי אישי, הדרכה לשגרת בית ומעקב לאורך כל התהליך",
];

/* ============================================================
   אייקונים של מותגים (SVG פנימי – ללא תלות חיצונית)
   ============================================================ */
const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
  </svg>
);

const FacebookIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
  </svg>
);

const TikTokIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z" />
  </svg>
);

/* ============================================================
   רכיבי עזר
   ============================================================ */
const SectionHeading = ({ eyebrow, title, subtitle }) => (
  <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
    <span className="inline-flex items-center gap-2 text-xs md:text-sm font-medium tracking-[0.2em] text-amber-700 uppercase">
      <span className="h-px w-6 bg-amber-600/60" />
      {eyebrow}
      <span className="h-px w-6 bg-amber-600/60" />
    </span>
    <h2 className="font-display mt-3 text-3xl md:text-4xl lg:text-5xl font-semibold text-stone-900 leading-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-4 text-stone-600 text-base md:text-lg leading-relaxed">{subtitle}</p>
    )}
  </div>
);

const WhatsAppButton = ({ message, children, className = "", size = "lg" }) => {
  const sizes = {
    lg: "px-7 py-4 text-base md:text-lg",
    md: "px-5 py-3 text-sm md:text-base",
    sm: "px-4 py-2.5 text-sm",
  };
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-l from-emerald-600 to-emerald-500 font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-600/30 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 ${sizes[size]} ${className}`}
    >
      <WhatsAppIcon className="w-5 h-5 shrink-0" />
      <span>{children}</span>
    </a>
  );
};

/* ============================================================
   Header
   ============================================================ */
const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled || open
          ? "bg-[#fbf7f3]/90 backdrop-blur-md shadow-[0_1px_0_rgba(120,90,60,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl md:text-3xl font-semibold tracking-wide text-stone-900">
            {CLINIC.name}
          </span>
          <span className="mt-0.5 text-[10px] md:text-xs tracking-[0.35em] uppercase text-amber-700">
            {CLINIC.tagline}
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8" aria-label="ניווט ראשי">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="relative text-[15px] text-stone-700 transition-colors hover:text-stone-900 after:absolute after:-bottom-1 after:right-0 after:h-px after:w-0 after:bg-amber-600 after:transition-all hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={waLink(MSG_BOOKING)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2 md:px-5 md:py-2.5 text-sm font-medium text-[#fbf7f3] transition-all hover:bg-stone-800 hover:shadow-lg"
          >
            <CalendarHeart className="w-4 h-4" />
            קביעת תור
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-stone-800 hover:bg-stone-900/5"
            aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* תפריט מובייל */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-4 pb-6 pt-2 flex flex-col" aria-label="ניווט מובייל">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-stone-200/70 py-4 text-lg text-stone-800"
            >
              {l.label}
              <ArrowLeft className="w-4 h-4 text-amber-700" />
            </a>
          ))}
          <WhatsAppButton message={MSG_GENERAL} size="md" className="mt-6">
            לתיאום ייעוץ בוואטסאפ
          </WhatsAppButton>
        </nav>
      </div>
    </header>
  );
};

/* ============================================================
   Hero
   ============================================================ */
const Hero = () => (
  <section id="top" className="relative overflow-hidden pt-28 pb-16 md:pt-40 md:pb-28">
    {/* רקע דקורטיבי */}
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute -top-24 -left-24 h-80 w-80 md:h-[32rem] md:w-[32rem] rounded-full bg-rose-200/50 blur-3xl" />
      <div className="absolute top-40 -right-32 h-72 w-72 md:h-[28rem] md:w-[28rem] rounded-full bg-amber-100/70 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-stone-200/60 blur-3xl" />
    </div>

    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-7 text-center lg:text-right fade-up">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-700/20 bg-white/60 px-4 py-1.5 text-xs md:text-sm text-amber-800 backdrop-blur">
          <Leaf className="w-4 h-4" />
          קוסמטיקה פרא-רפואית מתקדמת
        </span>

        <h1 className="font-display mt-6 text-[2.35rem] leading-[1.15] sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-semibold text-stone-900">
          העור שלך ראוי
          <br />
          <span className="bg-gradient-to-l from-amber-700 via-rose-500 to-amber-600 bg-clip-text text-transparent">
            למגע המקצועי ביותר
          </span>
        </h1>

        <p className="mt-6 text-base md:text-xl text-stone-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
          אבחון עור מעמיק, מכשור חדשני וחומרים פעילים המותאמים בדיוק לעור שלך – לתוצאות
          נראות לעין, שמרגישים כבר מהטיפול הראשון.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
          <WhatsAppButton message={MSG_GENERAL} className="w-full sm:w-auto">
            לתיאום פגישת ייעוץ בוואטסאפ
          </WhatsAppButton>
          <a
            href="#services"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-stone-300 bg-white/50 px-7 py-4 text-base font-medium text-stone-800 backdrop-blur transition hover:border-stone-400 hover:bg-white"
          >
            לצפייה בטיפולים
            <ArrowLeft className="w-4 h-4" />
          </a>
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3">
          {TRUST_TAGS.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2 text-sm text-stone-700">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-amber-700/10">
                <Icon className="w-4 h-4 text-amber-700" />
              </span>
              {text}
            </li>
          ))}
        </ul>
      </div>

      {/* כרטיס ויזואלי */}
      <div className="lg:col-span-5 fade-up [animation-delay:150ms]">
        <div className="relative mx-auto max-w-sm lg:max-w-none">
          <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-amber-200/60 via-rose-100 to-transparent rotate-3" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-b from-rose-100 to-amber-50 shadow-2xl shadow-rose-900/10">
            <img
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80"
              alt="טיפול פנים בקליניקה"
              className="h-full w-full object-cover"
              loading="eager"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-stone-900/40 to-transparent" />
          </div>
          <div className="absolute -bottom-6 right-4 sm:-right-6 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur">
            <div className="flex -space-x-1 space-x-reverse">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <div className="text-xs leading-tight">
              <div className="font-semibold text-stone-900">מאות לקוחות מרוצות</div>
              <div className="text-stone-500">דירוג ממוצע 5.0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ============================================================
   About
   ============================================================ */
const About = () => {
  const [imgError, setImgError] = useState(false);
  const initials = CLINIC.ownerName
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <section id="about" className="scroll-mt-20 py-20 md:py-28 bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border border-amber-600/30" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-rose-100 via-[#f4e9df] to-amber-100 shadow-xl">
            {!imgError ? (
              <img
                src={CLINIC.ownerPhoto}
                alt={CLINIC.ownerName}
                className="h-full w-full object-cover"
                loading="lazy"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="font-display text-7xl text-amber-800/70">{initials}</span>
              </div>
            )}
          </div>
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-stone-900 px-5 py-2.5 text-sm text-[#fbf7f3] shadow-lg">
            <span className="inline-flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-300" />
              מעל 10 שנות ניסיון
            </span>
          </div>
        </div>

        <div className="text-center lg:text-right">
          <span className="text-xs md:text-sm font-medium tracking-[0.2em] text-amber-700">
            נעים להכיר
          </span>
          <h2 className="font-display mt-3 text-3xl md:text-5xl font-semibold text-stone-900">
            {CLINIC.ownerName}
          </h2>
          <p className="mt-2 text-base md:text-lg text-amber-800 font-medium">{CLINIC.ownerTitle}</p>

          <p className="mt-6 text-stone-600 leading-relaxed text-base md:text-lg">
            הקמתי את הקליניקה מתוך אמונה שעור יפה מתחיל בעור בריא. כל לקוחה מקבלת אצלי אבחון
            מקצועי ומעמיק, תוכנית טיפול שנבנית במיוחד עבורה, וליווי אישי צמוד – מהפגישה
            הראשונה ועד לתוצאה שחלמה עליה.
          </p>

          <div className="mt-8 rounded-3xl bg-[#f8f1ea] p-6 md:p-8 text-right ring-1 ring-amber-900/5">
            <h3 className="font-display text-xl md:text-2xl font-semibold text-stone-900 mb-5">
              האני מאמין המקצועי שלי
            </h3>
            <ul className="space-y-4">
              {PHILOSOPHY.map((item) => (
                <li key={item} className="flex items-start gap-3 text-stone-700">
                  <CheckCircle2 className="mt-0.5 w-5 h-5 shrink-0 text-amber-700" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   Services
   ============================================================ */
const Services = () => (
  <section id="services" className="scroll-mt-20 py-20 md:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="הטיפולים שלנו"
        title="טיפולים מובילים, תוצאות אמיתיות"
        subtitle="כל טיפול מותאם אישית לאחר אבחון עור מקצועי, עם חומרים ומכשור ברמה הגבוהה ביותר."
      />

      <div className="grid gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-6">
        {SERVICES.map(({ icon: Icon, title, desc, tags }, i) => (
          <article
            key={title}
            className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-stone-900/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-rose-900/10 hover:ring-amber-600/20 lg:col-span-2 ${
              i === 3 ? "lg:col-start-2" : ""
            } ${i === 4 ? "sm:col-span-2 sm:max-w-[calc(50%-0.75rem)] sm:mx-auto sm:w-full lg:max-w-none lg:mx-0" : ""}`}
          >
            <div className="absolute -top-16 -left-16 h-40 w-40 rounded-full bg-rose-100/0 blur-2xl transition-all duration-500 group-hover:bg-rose-100/80" />
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f6ebe1] to-rose-50 ring-1 ring-amber-700/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Icon className="w-7 h-7 text-amber-700" strokeWidth={1.6} />
              </div>
              <h3 className="font-display mt-6 text-xl md:text-2xl font-semibold text-stone-900">
                {title}
              </h3>
              <p className="mt-3 text-stone-600 leading-relaxed">{desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative mt-auto pt-7">
              <a
                href={waLink(treatmentMsg(title))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-50/60 px-5 py-3 text-sm font-semibold text-emerald-700 transition-all duration-300 hover:bg-emerald-600 hover:text-white hover:border-emerald-600"
              >
                <WhatsAppIcon className="w-4 h-4" />
                אני מתעניינת בטיפול
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

/* ============================================================
   Benefits
   ============================================================ */
const Benefits = () => (
  <section
    id="benefits"
    className="scroll-mt-20 relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-[#f3e7dc] to-[#f8efe7]"
  >
    <div aria-hidden="true" className="absolute top-0 right-1/4 h-72 w-72 rounded-full bg-white/50 blur-3xl" />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="למה לבחור בנו"
        title="מקצועיות שמרגישים בכל פרט"
        subtitle="שילוב של ידע קליני, טכנולוגיה מתקדמת ויחס אישי – בשביל העור שלך."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="group rounded-3xl bg-white/80 p-6 md:p-7 text-center backdrop-blur shadow-sm ring-1 ring-white transition-all duration-500 hover:bg-white hover:shadow-xl hover:shadow-amber-900/10 hover:-translate-y-1"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg shadow-amber-700/25 transition-transform duration-500 group-hover:scale-110">
              <Icon className="w-7 h-7 text-white" strokeWidth={1.7} />
            </div>
            <h3 className="font-display mt-5 text-lg md:text-xl font-semibold text-stone-900">
              {title}
            </h3>
            <p className="mt-3 text-sm md:text-[15px] text-stone-600 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ============================================================
   Testimonials
   ============================================================ */
const Testimonials = () => (
  <section id="testimonials" className="scroll-mt-20 py-20 md:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="המלצות"
        title="מה הלקוחות שלנו מספרות"
        subtitle="התוצאה הכי משמחת היא החיוך של הלקוחות שלנו."
      />
      <div className="flex md:grid md:grid-cols-3 gap-5 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 pb-4 md:pb-0 no-scrollbar">
        {TESTIMONIALS.map(({ name, treatment, text }) => (
          <figure
            key={name}
            className="relative flex w-[85%] shrink-0 snap-center flex-col rounded-3xl bg-white p-7 md:p-8 shadow-sm ring-1 ring-stone-900/5 md:w-auto transition-all duration-500 hover:shadow-xl hover:shadow-rose-900/10"
          >
            <Quote className="absolute top-6 left-6 w-10 h-10 text-rose-100" />
            <div className="flex gap-1" aria-label="דירוג 5 כוכבים">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <blockquote className="mt-5 flex-1 text-stone-700 leading-relaxed">“{text}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-stone-100 pt-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-amber-100 font-display text-lg font-semibold text-amber-800">
                {name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-stone-900">{name}</div>
                <div className="text-sm text-amber-700">{treatment}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

/* ============================================================
   CTA band
   ============================================================ */
const CtaBand = () => (
  <section className="px-4 sm:px-6 lg:px-8 pb-20 md:pb-28">
    <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-stone-900 px-6 py-12 md:px-16 md:py-16 text-center">
      <div aria-hidden="true" className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-rose-400/20 blur-3xl" />
      <div className="relative">
        <Sparkles className="mx-auto w-8 h-8 text-amber-300" />
        <h2 className="font-display mt-4 text-3xl md:text-4xl font-semibold text-[#fbf7f3]">
          מוכנה להתחיל את המסע לעור בריא וזוהר?
        </h2>
        <p className="mt-4 text-stone-300 md:text-lg max-w-2xl mx-auto">
          שלחי הודעה ונתאם פגישת ייעוץ ואבחון עור אישית – בלי התחייבות.
        </p>
        <WhatsAppButton message={MSG_GENERAL} className="mt-8">
          לתיאום פגישת ייעוץ בוואטסאפ
        </WhatsAppButton>
      </div>
    </div>
  </section>
);

/* ============================================================
   Contact & Footer
   ============================================================ */
const Footer = () => {
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(CLINIC.wazeQuery)}&navigate=yes`;
  const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(CLINIC.address)}&output=embed`;
  const socials = [
    { href: CLINIC.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: CLINIC.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: CLINIC.social.tiktok, label: "TikTok", Icon: TikTokIcon },
  ];

  return (
    <footer id="contact" className="scroll-mt-20 bg-[#efe3d7] pt-20 md:pt-24 pb-28 md:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="יצירת קשר" title="נשמח לראות אותך בקליניקה" />

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-3xl bg-white/80 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100">
                  <MapPin className="w-5 h-5 text-amber-800" />
                </span>
                <div>
                  <div className="font-semibold text-stone-900">כתובת הקליניקה</div>
                  <div className="mt-1 text-stone-600">{CLINIC.address}</div>
                </div>
              </div>
              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
              >
                <Navigation className="w-4 h-4" />
                ניווט עם Waze
              </a>
            </div>

            <div className="rounded-3xl bg-white/80 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100">
                  <Clock className="w-5 h-5 text-amber-800" />
                </span>
                <div className="flex-1">
                  <div className="font-semibold text-stone-900">שעות פעילות</div>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {CLINIC.hours.map((h) => (
                      <li key={h.day} className="flex justify-between gap-4 text-stone-600">
                        <span>{h.day}</span>
                        <span className="font-medium text-stone-800" dir="ltr">
                          {h.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white/80 p-6 shadow-sm">
              <a href={`tel:${CLINIC.phoneTel}`} className="flex items-center gap-4 group">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100">
                  <Phone className="w-5 h-5 text-amber-800" />
                </span>
                <div>
                  <div className="font-semibold text-stone-900">טלפון</div>
                  <div className="mt-0.5 text-stone-600 group-hover:text-amber-800" dir="ltr">
                    {CLINIC.phoneDisplay}
                  </div>
                </div>
              </a>
              <div className="mt-5 flex items-center gap-3">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-stone-900 text-[#fbf7f3] transition-all hover:-translate-y-0.5 hover:bg-amber-700"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 overflow-hidden rounded-3xl bg-white/80 shadow-sm min-h-[320px]">
            <iframe
              title="מפת הגעה לקליניקה"
              src={mapsEmbed}
              className="h-full w-full min-h-[320px] border-0 grayscale-[30%] sepia-[15%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <div className="mt-14 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-stone-900/10 pt-8 text-sm text-stone-500">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl font-semibold text-stone-900">{CLINIC.name}</span>
            <span className="tracking-[0.3em] text-xs uppercase text-amber-700">{CLINIC.tagline}</span>
          </div>
          <p>© {new Date().getFullYear()} כל הזכויות שמורות</p>
        </div>
      </div>
    </footer>
  );
};

/* ============================================================
   כפתור וואטסאפ צף
   ============================================================ */
const FloatingWhatsApp = () => (
  <a
    href={waLink(MSG_FLOATING)}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="שליחת הודעה בוואטסאפ"
    className="group fixed bottom-5 left-5 md:bottom-8 md:left-8 z-50"
  >
    <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-60 animate-ping [animation-duration:2.2s]" />
    <span className="relative flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-700/30 transition-transform duration-300 group-hover:scale-110">
      <WhatsAppIcon className="w-7 h-7 md:w-8 md:h-8" />
    </span>
    <span className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-800 shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden md:block">
      דברי איתנו בוואטסאפ 💬
    </span>
  </a>
);

/* ============================================================
   App
   ============================================================ */
export default function LandingPage() {
  return (
    <div
      dir="rtl"
      lang="he"
      className="min-h-screen bg-[#fbf7f3] font-body text-stone-800 antialiased selection:bg-rose-200/70"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@500;600;700&family=Heebo:wght@300;400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
        .font-body { font-family: 'Heebo', system-ui, sans-serif; }
        .font-display { font-family: 'Frank Ruhl Libre', 'Heebo', serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        .fade-up { animation: fadeUp .9s cubic-bezier(.2,.7,.2,1) both; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .fade-up, .animate-ping { animation: none !important; }
        }
      `}</style>

      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Benefits />
        <Testimonials />
        <CtaBand />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
