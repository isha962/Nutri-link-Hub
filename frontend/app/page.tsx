import { CaseStudyImage } from "./components/case-study-image";

const imageAssets = {
  hero: "https://www.thegoodplace.care/resources/users/9012/png-Warm-realistic-scene-of-a-Black-female-caregiver-i-cRP6ec-20260320013037-1920x1080.webp",
  problem: "https://uwaaa.org/wp-content/uploads/shutterstock_6892276-1.jpg",
  solution: "https://www.thegoodplace.care/resources/users/9012/png-A-realistic-scene-in-a-softly-lit-bedroom-where-a--aLMtLC-20260326112735-1920x1080.webp",
};

const sectionNav = [
  { label: "Overview", href: "#overview" },
  { label: "Problem", href: "#problem" },
  { label: "Research", href: "#research" },
  { label: "Solution", href: "#solution" },
  { label: "Iterations", href: "#iterations" },
  { label: "Strategy", href: "#strategy" },
  { label: "Metrics", href: "#metrics" },
  { label: "Reflection", href: "#reflection" },
];

const sectionAnchorClass = "scroll-mt-44 lg:scroll-mt-52";

const heroMetrics = [
  { value: "20+", label: "stakeholder interviews" },
  { value: "7+", label: "product iterations" },
  { value: "NYC", label: "senior nutrition access" },
];

type IconName =
  | "network"
  | "mobility"
  | "digital"
  | "culture"
  | "coordination"
  | "navigator"
  | "matcher"
  | "meal"
  | "hub"
  | "referral"
  | "timeline"
  | "strategy"
  | "metrics"
  | "feedback"
  | "reflection";

type IconCardTone = "sage" | "gold" | "mint" | "stone" | "sky";

const iconPaths: Record<IconName, string[]> = {
  network: ["M7 17a4 4 0 1 1 8 0", "M10 13a3 3 0 1 1 0-6 3 3 0 0 1 0 6z", "M16.5 8.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"],
  mobility: ["M6 17h12", "M8 17a2 2 0 1 1 4 0", "M12 17V9l4 2", "M9 6h3l2 3"],
  digital: ["M7 5h10v12H7z", "M9 8h6", "M9 11h4", "M11 17h2"],
  culture: ["M5 15c2-4 4-6 7-6s5 2 7 6", "M7 10c.5-2 2-3 5-3s4.5 1 5 3", "M9 6c0-1.5 1-3 3-3s3 1.5 3 3"],
  coordination: ["M5 12h14", "M12 5v14", "M8 8l-3 4 3 4", "M16 8l3 4-3 4"],
  navigator: ["M12 3l6 18-6-3-6 3z", "M12 10l4 8", "M12 10l-4 8"],
  matcher: ["M5 7h14", "M5 12h14", "M5 17h9", "M17 7v10"],
  meal: ["M5 6h14", "M7 6v12", "M10 10h4", "M11 13h3"],
  hub: ["M12 4l8 7-8 9-8-9z", "M12 4v16", "M4 11h16"],
  referral: ["M6 13l4 4 8-10", "M5 5h6", "M13 19h6"],
  timeline: ["M5 7h14", "M5 12h14", "M5 17h9", "M16 7v10"],
  strategy: ["M8 16l4-12 4 12", "M6 12h12", "M10 8h4"],
  metrics: ["M6 17V9", "M10 17V6", "M14 17v-8", "M18 17V11"],
  feedback: ["M6 7h12v8H9l-3 3z", "M8 10h8", "M8 13h5"],
  reflection: ["M12 4l2.1 4.2 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7z"],
};

const overviewCards = [
  {
    title: "Human-first navigation",
    body: "One trusted entry point that works for walk-in and call-in support.",
    icon: "navigator" as IconName,
    tone: "sage" as IconCardTone,
  },
  {
    title: "AI-assisted matching",
    body: "Guided eligibility and program matching to reduce search burden.",
    icon: "matcher" as IconName,
    tone: "sky" as IconCardTone,
  },
  {
    title: "Community hub model",
    body: "Senior centers, churches, clinics, and food partners working together.",
    icon: "hub" as IconName,
    tone: "mint" as IconCardTone,
  },
];

const problemPoints = [
  {
    title: "Fragmented services",
    body: "Food assistance, benefits, and referrals are spread across agencies and nonprofits, forcing seniors to piece together help on their own.",
    icon: "network" as IconName,
    tone: "sage" as IconCardTone,
  },
  {
    title: "Mobility barriers",
    body: "Many older adults cannot easily travel to pantries, markets, or appointment-based services, especially when transit or energy is limited.",
    icon: "mobility" as IconName,
    tone: "stone" as IconCardTone,
  },
  {
    title: "Digital exclusion",
    body: "App-first systems assume smartphones, digital literacy, and confidence that many seniors simply do not have.",
    icon: "digital" as IconName,
    tone: "sky" as IconCardTone,
  },
  {
    title: "Cultural and health mismatch",
    body: "Food access only works when meals reflect health needs, cultural preferences, and household routines seniors recognize.",
    icon: "culture" as IconName,
    tone: "gold" as IconCardTone,
  },
  {
    title: "Lack of coordination",
    body: "Without a shared intake model, seniors get bounced between systems instead of receiving a coordinated path to support.",
    icon: "coordination" as IconName,
    tone: "mint" as IconCardTone,
  },
];

const personas = [
  {
    title: "Low-income seniors on fixed incomes",
    body: "Older adults who need consistent, affordable, and dignified access to food without adding another system to navigate.",
  },
  {
    title: "Caregivers and family members",
    body: "People coordinating meals, benefits, and appointments on behalf of a parent or relative, often across multiple channels at once.",
  },
  {
    title: "Community organizations and providers",
    body: "Senior centers, churches, clinics, nonprofits, and local food partners that can help deliver trusted support at neighborhood scale.",
  },
];

const insights = [
  "Seniors need trusted human support, not app-only solutions.",
  "Existing programs are fragmented and difficult to navigate.",
  "Food access must account for culture, health, mobility, and digital literacy.",
  "Community hubs are more trusted than purely digital services.",
];

const beforeAfter = [
  {
    before: "Before: seniors juggle multiple programs and forms.",
    after: "After: one navigator helps identify the best path in a single conversation.",
  },
  {
    before: "Before: generic meals ignore culture and health needs.",
    after: "After: matching respects dietary constraints and familiar food preferences.",
  },
];

const solutionPillars = [
  {
    title: "Walk-in / call-in nutrition navigator",
    body: "A human-first entry point for older adults and caregivers who prefer in-person or phone support over self-serve digital tools.",
    icon: "navigator" as IconName,
    tone: "sage" as IconCardTone,
  },
  {
    title: "AI-assisted eligibility matcher",
    body: "A guided matching layer that helps navigators and users identify the right food programs, benefits, and next steps faster.",
    icon: "matcher" as IconName,
    tone: "sky" as IconCardTone,
  },
  {
    title: "Culturally relevant recommendations",
    body: "Meal and grocery suggestions that respect health needs, taste preferences, and community food norms.",
    icon: "meal" as IconName,
    tone: "gold" as IconCardTone,
  },
  {
    title: "Community hub coordination",
    body: "A neighborhood operating model that connects senior centers, churches, clinics, and food partners into one trusted access point.",
    icon: "hub" as IconName,
    tone: "mint" as IconCardTone,
  },
  {
    title: "Healthcare referral support",
    body: "A pathway for clinicians and discharge teams to refer seniors into food support without adding another handoff burden.",
    icon: "referral" as IconName,
    tone: "stone" as IconCardTone,
  },
];

const flow = [
  "Senior or caregiver reaches out",
  "Navigator intake",
  "AI-assisted matching",
  "Food, benefits, or referral options",
  "Pickup, delivery, or community hub support",
  "Follow-up and outcome tracking",
];

const iterations = [
  {
    version: "V1",
    title: "Broad food access directory",
    body: "We started with a simple list of programs and services to test whether a single entry point was useful at all.",
  },
  {
    version: "V2",
    title: "Added senior-specific personas",
    body: "We narrowed the design to the realities of low-income older adults, caregivers, and neighborhood providers.",
  },
  {
    version: "V3",
    title: "Shifted from app-first to human-first access",
    body: "Feedback made it clear that the product had to work through people, not require them to become self-serve app users.",
  },
  {
    version: "V4",
    title: "Added the community hub model",
    body: "We moved the concept into trusted spaces where seniors already go and where support can feel familiar.",
  },
  {
    version: "V5",
    title: "Added culturally relevant meal matching",
    body: "We designed around food that fits cultural preference and medical need instead of generic nutrition guidance.",
  },
  {
    version: "V6",
    title: "Added healthcare referral pathway",
    body: "We connected the product to clinicians and discharge workflows so nutrition support can begin earlier.",
  },
  {
    version: "V7",
    title: "Added metrics, rollout strategy, and sustainability model",
    body: "The concept matured into a service with clear growth logic, operating metrics, and a path to long-term viability.",
  },
];

const strategyCards = [
  {
    title: "Business model",
    body: "Blend public funding, nonprofit partnerships, healthcare referrals, and local vendor relationships to support a sustainable service layer.",
  },
  {
    title: "Stakeholder ecosystem",
    body: "Coordinate seniors, caregivers, senior centers, clinics, agencies, and food providers around a shared support network.",
  },
  {
    title: "Go-to-market / rollout",
    body: "Launch in a few high-need neighborhoods, prove repeat usage, then expand through trusted community anchors.",
  },
  {
    title: "Pricing and sustainability",
    body: "Keep access low or no-cost for seniors while recovering operating costs through partnerships and service contracts.",
  },
  {
    title: "Success metrics",
    body: "Track repeat usage, successful referrals, benefits completion, access reliability, cost-to-serve, and health outcomes.",
  },
];

const metricCards = [
  { title: "Repeat usage", body: "How often seniors return after their first successful interaction." },
  { title: "Successful referrals", body: "How many people are matched to a real next step, not just a resource list." },
  { title: "Benefits enrollment completion", body: "How often assistance leads to completed food or support benefits." },
  { title: "Food access reliability", body: "Whether people can get meals and support consistently over time." },
  { title: "Cost-to-serve", body: "How efficiently the service can operate as demand grows." },
  { title: "Health outcome tracking", body: "Whether nutrition support connects to better health and fewer crises." },
];

const feedbackRows = [
  {
    feedback: "Seniors may not trust app-only tools",
    decision: "Added walk-in/call-in navigator model",
    impact: "Reduced digital exclusion and made the service feel human and familiar.",
  },
  {
    feedback: "Food options need to match culture and health needs",
    decision: "Added culturally relevant meal matching",
    impact: "Increased relevance, dignity, and likelihood of adoption.",
  },
  {
    feedback: "Programs are too fragmented",
    decision: "Unified food, benefits, and referral navigation",
    impact: "Reduced search burden and clarified the path to help.",
  },
  {
    feedback: "Community trust matters",
    decision: "Embedded hubs in senior centers, churches, and clinics",
    impact: "Increased adoption potential through familiar local institutions.",
  },
];

const reflectionPoints = [
  "Product discovery gets stronger when research shapes the delivery model, not just the interface.",
  "The clearest feedback was about trust: the best product is the one people can actually use on a hard day.",
  "The concept now feels like a service system, not a feature list.",
  "This work made accessible AI feel less like automation and more like coordination with care.",
];

const footerLinks = [
  { label: "Resume", href: "https://portfolio-isha962s-projects.vercel.app", icon: "resume" as const },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/isha-kookanapalli-math-aa4494257", icon: "linkedin" as const },
  { label: "GitHub", href: "https://github.com/isha962", icon: "github" as const },
];

type FooterIconName = "resume" | "linkedin" | "github";

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.38em] text-emerald-700">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{description}</p>
    </div>
  );
}

function IconBadge({
  name,
  tone = "sage",
  className = "",
}: {
  name: IconName;
  tone?: IconCardTone;
  className?: string;
}) {
  const toneClasses: Record<IconCardTone, string> = {
    sage: "bg-emerald-100 text-emerald-700",
    gold: "bg-amber-100 text-amber-700",
    mint: "bg-teal-100 text-teal-700",
    stone: "bg-slate-100 text-slate-700",
    sky: "bg-sky-100 text-sky-700",
  };

  return (
    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${toneClasses[tone]} ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[1.7]">
        {iconPaths[name].map((path) => (
          <path key={path} d={path} strokeLinecap="round" strokeLinejoin="round" />
        ))}
      </svg>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-emerald-100/80 bg-gradient-to-b from-white to-emerald-50/60 px-4 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
      <div className="text-2xl font-semibold tracking-tight text-slate-950">{value}</div>
      <div className="mt-1 text-sm leading-5 text-slate-600">{label}</div>
    </div>
  );
}

function InfoCard({
  title,
  body,
  icon,
  tone,
  className = "",
}: {
  title?: string;
  body: string;
  icon?: IconName;
  tone?: IconCardTone;
  className?: string;
}) {
  return (
    <div className={`rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] ${className}`}>
      {icon ? (
        <div className="mb-4">
          <IconBadge name={icon} tone={tone} />
        </div>
      ) : null}
      {title ? <h3 className="text-lg font-semibold tracking-tight text-slate-950">{title}</h3> : null}
      <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
    </div>
  );
}

function TimelineCard({
  version,
  title,
  body,
}: {
  version: string;
  title: string;
  body: string;
}) {
  return (
    <div className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_1px_0_rgba(15,23,42,0.03)]">
      <div className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
        {version}
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
    </div>
  );
}

function QuoteCallout() {
  return (
    <div className="rounded-[2rem] border border-emerald-100 bg-[linear-gradient(135deg,rgba(236,253,245,0.95),rgba(255,250,240,0.95))] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">Representative insight</p>
      <p className="mt-4 max-w-3xl text-xl leading-8 text-slate-800">
        “I do not need another app. I need one person who can point me to the right help the first time.”
      </p>
    </div>
  );
}

function BeforeAfterPanel() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {beforeAfter.map((item) => (
        <div key={item.before} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Before</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{item.before}</p>
          <div className="my-4 h-px w-full bg-slate-200" />
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">After</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{item.after}</p>
        </div>
      ))}
    </div>
  );
}

function FlowDiagram() {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">Product flow</p>
          <p className="mt-2 text-sm text-slate-600">A simple intake-to-outcome journey designed around trust.</p>
        </div>
        <div className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">
          How it works
        </div>
      </div>
      <div className="grid gap-3 lg:grid-cols-6">
        {flow.map((step, index) => (
          <div key={step} className="relative rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-sm font-semibold text-emerald-800">
                0{index + 1}
              </div>
              {index < flow.length - 1 ? <span className="hidden text-slate-300 lg:block">→</span> : null}
            </div>
            <p className="mt-4 text-sm font-semibold leading-6 text-slate-950">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FooterLinkIcon({ name }: { name: FooterIconName }) {
  const common = "h-4 w-4 shrink-0";

  if (name === "resume") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={common}>
        <path d="M8 4h5l5 5v11a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M13 4v5h5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M10 13h4M10 16h6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={common}>
        <rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 10v6M8 8.4v.2M11 16v-3a2 2 0 0 1 4 0v3M11 10v6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={common}>
      <path d="M9 19c-4.5 1.5-4.5-2.5-6-3M15 22v-3.3c0-.9.3-1.5-.7-2.4 2.3-.2 4.7-1.1 4.7-5A4.1 4.1 0 0 0 18 8.5a3.8 3.8 0 0 0-.1-2.7s-.9-.2-2.9 1a10 10 0 0 0-5 0c-2-1.2-2.9-1-2.9-1A3.8 3.8 0 0 0 7 8.5a4.1 4.1 0 0 0-1.2 2.8c0 3.9 2.4 4.8 4.7 5-.5.5-.7 1.1-.7 2.1V22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.09),_transparent_26%),radial-gradient(circle_at_85%_10%,_rgba(96,165,250,0.08),_transparent_24%),linear-gradient(180deg,#fbfbf8_0%,#f4f1e8_100%)] text-slate-950">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <section id="overview" className={`overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur ${sectionAnchorClass}`}>
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:p-10">
            <div className="relative">
              <div className="absolute -left-10 top-6 h-28 w-28 rounded-full bg-emerald-200/40 blur-3xl" aria-hidden="true" />
              <div className="absolute left-24 top-36 h-20 w-20 rounded-full bg-amber-200/30 blur-3xl" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.38em] text-emerald-700">NutriLink Hub</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                NutriLink Hub
              </h1>
              <p className="mt-5 max-w-2xl text-xl leading-8 text-slate-700">
                A human-centered nutrition access platform for NYC seniors.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                NutriLink Hub combines human navigators, AI-assisted matching, local food partners, and healthcare and
                community referrals into one senior-friendly access point. The goal is simple: reduce the burden of
                finding help and make nutrition support feel coordinated, trusted, and usable.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {heroMetrics.map((metric) => (
                  <StatCard key={metric.label} value={metric.value} label={metric.label} />
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#solution"
                  className="inline-flex items-center justify-center rounded-full border border-emerald-700 bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(16,185,129,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-500"
                >
                  View Case Study
                </a>
                <a
                  href="#solution"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
                >
                  View Solution
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 top-10 h-40 w-40 rounded-full bg-emerald-200/35 blur-3xl" aria-hidden="true" />
              <div className="absolute -right-6 bottom-8 h-32 w-32 rounded-full bg-amber-200/30 blur-3xl" aria-hidden="true" />
              <div className="relative rounded-[2rem] border border-emerald-100 bg-[linear-gradient(180deg,rgba(236,253,245,0.95),rgba(255,250,240,0.96))] p-4 shadow-[0_24px_70px_rgba(15,23,42,0.09)]">
                <CaseStudyImage
                  alt="Senior nutrition support and caregiver navigation"
                  caption="Human-centered access designed for seniors and caregivers."
                  className="rounded-[1.6rem] border border-white/80 bg-white/60"
                  fallbackLabel="Hero visual"
                  aspectRatio="16 / 10"
                  fit="cover"
                  imageClassName="w-full h-full"
                  position="center 18%"
                  src={imageAssets.hero}
                  title="NutriLink Hub"
                />

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {overviewCards.map((card) => (
                    <InfoCard key={card.title} title={card.title} body={card.body} icon={card.icon} tone={card.tone} className="p-4 shadow-none" />
                  ))}
                </div>

                <div className="mt-5 rounded-[1.5rem] border border-emerald-100 bg-white/85 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Product thesis</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    The opportunity is not another resource directory. It is a trusted neighborhood layer that makes
                    existing programs usable for seniors who are most likely to be left out.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="sticky top-10 z-50 mt-10 mb-10">
          <div className="rounded-full border border-slate-200 bg-white/90 px-3 py-3 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex gap-2 overflow-x-auto whitespace-nowrap [scrollbar-width:none]">
              {sectionNav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="inline-flex shrink-0 items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-20 py-14 sm:py-18">
          <section id="problem" className={`space-y-8 ${sectionAnchorClass}`}>
            <SectionHeading
              eyebrow="THE PROBLEM"
              title="NYC seniors face a system that is too fragmented to be dependable."
              description="Older adults in New York City often need food support, benefits, and referrals at the same time, but the system around them is scattered across agencies, nonprofits, and digital tools that do not coordinate well."
            />

            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
              <div className="grid gap-6 p-5 lg:grid-cols-[0.42fr_0.58fr] lg:items-start lg:p-6">
                <div className="space-y-4 lg:self-start">
                  <CaseStudyImage
                    alt="Community food support and grocery access"
                    caption="Programs exist, but they are hard to access without a guide."
                    className="relative overflow-hidden rounded-[1.6rem] border border-white/80 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
                    fallbackLabel="Problem visual"
                    aspectRatio="4 / 5"
                    fit="cover"
                    imageClassName="w-full h-full"
                    position="center 20%"
                    src={imageAssets.problem}
                    title="Community support gap"
                  />
                  <div className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50/70 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">Key insight</p>
                    <p className="mt-3 text-sm leading-6 text-slate-700">
                      Seniors do not need another directory. They need one calm, trusted path through a confusing system.
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
                      Human support first
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
                      One intake, one handoff
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {problemPoints.map((point, index) => (
                      <InfoCard
                        key={point.title}
                        title={`${String(index + 1).padStart(2, "0")} ${point.title}`}
                        body={point.body}
                        icon={point.icon}
                        tone={point.tone}
                        className="p-4"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="research" className={`space-y-8 ${sectionAnchorClass}`}>
            <SectionHeading
              eyebrow="RESEARCH"
              title="The team interviewed across the care and food ecosystem."
              description="Insights came from conversations with seniors, caregivers, nonprofits, healthcare stakeholders, and community food partners. The research consistently pointed toward one conclusion: this is a trust problem as much as it is an access problem."
            />

            <div className="grid gap-6 lg:grid-cols-[0.94fr_1.06fr]">
              <div className="space-y-5">
                <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Methods</p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                    <li>20+ stakeholder interviews across seniors, caregivers, and service providers</li>
                    <li>Program mapping to understand where navigation breaks down</li>
                    <li>Iteration reviews to test whether the product should be digital-first or human-first</li>
                  </ul>
                </div>
                <QuoteCallout />
              </div>

              <div className="grid gap-4">
                {insights.map((insight, index) => (
                  <div
                    key={insight}
                    className="flex items-start gap-3 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white">
                      0{index + 1}
                    </div>
                    <p className="text-sm leading-6 text-slate-700">{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-2">
              <BeforeAfterPanel />
            </div>
          </section>

          <section id="solution" className={`space-y-8 ${sectionAnchorClass}`}>
            <SectionHeading
              eyebrow="OUR SOLUTION"
              title="NutriLink Hub turns fragmented support into one coordinated access point."
              description="The final concept combines service design and matching logic so seniors and caregivers can move from need to action with fewer handoffs."
            />

            <div className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.07)]">
              <div className="grid gap-6 p-5 lg:grid-cols-[0.92fr_1.08fr] lg:grid-rows-[auto_auto] lg:items-start lg:p-6">
                <div className="relative lg:row-span-2 h-full">
                  <CaseStudyImage
                    alt="Senior receiving food and community support"
                    caption="Warm, local, and human-first."
                    className="relative h-full min-h-[760px] rounded-[1.6rem] border border-white/80 bg-white shadow-[0_24px_50px_rgba(15,23,42,0.08)]"
                    fallbackLabel="Solution visual"
                    fit="cover"
                    imageClassName="h-full w-full"
                    position="center 20%"
                    src={imageAssets.solution}
                    title="Community support in one place"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {solutionPillars.map((item) => (
                    <InfoCard
                      key={item.title}
                      title={item.title}
                      body={item.body}
                      icon={item.icon}
                      tone={item.tone}
                      className={`bg-gradient-to-b ${
                        item.tone === "sage"
                          ? "from-emerald-50 to-white border-emerald-100"
                          : item.tone === "gold"
                          ? "from-amber-50 to-white border-amber-100"
                          : item.tone === "mint"
                          ? "from-teal-50 to-white border-teal-100"
                          : item.tone === "sky"
                          ? "from-sky-50 to-white border-sky-100"
                          : "from-slate-50 to-white border-slate-200"
                      }`}
                    />
                  ))}
                </div>

                <div className="lg:col-start-2">
                  <FlowDiagram />
                </div>
              </div>
            </div>
          </section>

          <section id="iterations" className={`space-y-8 ${sectionAnchorClass}`}>
            <SectionHeading
              eyebrow="ITERATIONS"
              title="Seven iterations moved the concept from directory to service."
              description="Each round of feedback pushed the product away from a broad information tool and toward a more trusted neighborhood operating model."
            />

            <div className="overflow-x-auto pb-2">
              <div className="grid min-w-[1180px] grid-cols-7 gap-4">
                {iterations.map((item, index) => (
                  <div key={item.version} className="relative">
                    <TimelineCard version={item.version} title={item.title} body={item.body} />
                    {index < iterations.length - 1 ? (
                      <div className="absolute right-[-18px] top-1/2 hidden h-px w-8 -translate-y-1/2 bg-emerald-200 lg:block" />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="strategy" className={`space-y-8 ${sectionAnchorClass}`}>
            <SectionHeading
              eyebrow="STRATEGY"
              title="The strategy is built around trust, density, and sustainable partnerships."
              description="The strongest version of the product is not just a single interface. It is a repeatable service model that can scale through neighborhood anchors and measurable outcomes."
            />

            <div className="grid gap-4 lg:grid-cols-3">
              {strategyCards.map((card) => (
                <InfoCard
                  key={card.title}
                  title={card.title}
                  body={card.body}
                  icon="strategy"
                  tone="sage"
                />
              ))}
            </div>
          </section>

          <section id="metrics" className={`space-y-8 ${sectionAnchorClass}`}>
            <SectionHeading
              eyebrow="METRICS"
              title="Success should be measured by use, reliability, and outcomes."
              description="These KPIs make it possible to evaluate whether the service is actually helping seniors stay connected to food and support."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {metricCards.map((metric) => (
                <InfoCard key={metric.title} title={metric.title} body={metric.body} icon="metrics" tone="sage" />
              ))}
            </div>
          </section>

          <section className={`space-y-8 ${sectionAnchorClass}`}>
            <SectionHeading
              eyebrow="FEEDBACK"
              title="The product changed when the research challenged the first instinct."
              description="The table below shows how concrete feedback reshaped the service model, not just the wording."
            />

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <div className="overflow-x-auto">
                <table className="min-w-[760px] w-full border-collapse text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-[0.24em] text-slate-500">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Feedback</th>
                      <th className="px-6 py-4 font-semibold">Product Decision</th>
                      <th className="px-6 py-4 font-semibold">Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbackRows.map((row) => (
                      <tr key={row.feedback} className="border-t border-slate-200">
                        <td className="px-6 py-5 align-top font-medium text-slate-900">{row.feedback}</td>
                        <td className="px-6 py-5 align-top leading-6 text-slate-600">{row.decision}</td>
                        <td className="px-6 py-5 align-top leading-6 text-slate-600">{row.impact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="concept" className={`space-y-8 ${sectionAnchorClass}`}>
            <SectionHeading
              eyebrow="PRODUCT DIRECTION"
              title="One trusted point of access for food, benefits, and community support."
              description="NutriLink Hub combines human navigators, AI-assisted matching, local food partners, and healthcare and community referrals into a senior-friendly service that feels personal and coordinated."
            />

            <div className="rounded-[2rem] border border-emerald-100 bg-[linear-gradient(135deg,rgba(236,253,245,0.95),rgba(255,255,255,1))] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">Service statement</p>
                  <p className="mt-4 max-w-2xl text-xl leading-8 text-slate-800">
                    NutriLink Hub makes the existing nutrition ecosystem usable by combining human support, intelligent
                    matching, and trusted neighborhood partners into one accessible experience.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {["Human navigators", "AI-assisted matching", "Local food partners", "Healthcare referrals"].map((item) => (
                    <div key={item} className="rounded-2xl border border-emerald-100 bg-white px-4 py-4 text-sm font-medium text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="reflection" className={`space-y-8 ${sectionAnchorClass}`}>
            <SectionHeading
              eyebrow="REFLECTION"
              title="The biggest lesson was that accessibility is a service decision."
              description="This project made the case that public-interest AI works best when the intelligence is supporting a trustworthy human system rather than replacing it."
            />

            <div className="grid gap-4 lg:grid-cols-2">
              {reflectionPoints.map((point) => (
                <InfoCard key={point} title="" body={point} icon="reflection" tone="sage" className="p-5" />
              ))}
            </div>
          </section>
        </div>

        <footer className="border-t border-slate-200 py-10">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Additional context from NYU Design Strategies, kept here as a small note only.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                <FooterLinkIcon name={link.icon} />
                {link.label}
                <span className="ml-0.5 text-slate-400 transition group-hover:text-emerald-700" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}
