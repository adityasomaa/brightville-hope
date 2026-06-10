export const school = {
  name: "Brightville Hope School",
  shortName: "Brightville Hope",
  tagline: "Bright minds. Boundless hope.",
  founded: 2024,
  grades: "PreK – Grade 12",
  address: "1840 N Clybourn Ave, Chicago, IL 60614",
  neighborhood: "Lincoln Park, Chicago",
  phone: "+1 (312) 642-7350",
  email: "hello@brightvillehope.org",
  admissionsEmail: "admissions@brightvillehope.org",
  campusNote:
    "Our flagship campus on Clybourn Avenue is under construction and opens Fall 2027. Until then, classes run at our Welcome Center two blocks north.",
  timeZone: "America/Chicago",
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; note?: string }[];
};

export const nav: NavItem[] = [
  {
    label: "Who We Are",
    href: "/about",
    children: [
      { label: "Mission & Values", href: "/about", note: "What we believe" },
      { label: "Leadership", href: "/about/leadership", note: "The people guiding us" },
      { label: "Contact", href: "/contact", note: "Visit or write to us" },
    ],
  },
  {
    label: "Learning",
    href: "/academics",
    children: [
      { label: "Academics Overview", href: "/academics", note: "PreK through Grade 12" },
      { label: "Lower School", href: "/academics/lower-school", note: "PreK – Grade 4" },
      { label: "Middle School", href: "/academics/middle-school", note: "Grades 5 – 8" },
      { label: "Upper School", href: "/academics/upper-school", note: "Grades 9 – 12" },
    ],
  },
  {
    label: "Student Life",
    href: "/student-life",
    children: [
      { label: "Life at Brightville", href: "/student-life", note: "Clubs, trips, traditions" },
      { label: "Arts", href: "/arts", note: "Studio, stage, sound" },
      { label: "Athletics", href: "/athletics", note: "The Beacons" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    children: [
      { label: "Why Brightville", href: "/admissions", note: "Start here" },
      { label: "Apply & Visit", href: "/admissions/apply", note: "Process and dates" },
      { label: "Tuition & Aid", href: "/admissions/tuition", note: "Affordability" },
    ],
  },
  { label: "News", href: "/news" },
];

export const values = [
  {
    title: "Curiosity",
    body: "Questions come before answers here. We protect the instinct to wonder, in a four-year-old and in a senior writing her thesis.",
  },
  {
    title: "Courage",
    body: "Students try things they might fail at — on stage, in the lab, on the page — because growth lives just past comfort.",
  },
  {
    title: "Community",
    body: "Small by design. Every child is known by name, by strength, and by the thing that makes them light up.",
  },
  {
    title: "Character",
    body: "Bright minds matter most when they are kind. Integrity is taught, practiced, and expected — daily.",
  },
];

export const stats = [
  { value: "11:1", label: "Student-teacher ratio" },
  { value: "14", label: "Average class size" },
  { value: "38+", label: "Clubs & activities" },
  { value: "2027", label: "New campus opens" },
];

export type Division = {
  slug: string;
  name: string;
  grades: string;
  tagline: string;
  intro: string;
  art: "sunrise" | "arch" | "field" | "orbit" | "ribbon";
  pillars: { title: string; body: string }[];
  day: { time: string; activity: string }[];
  signature: string[];
};

export const divisions: Division[] = [
  {
    slug: "lower-school",
    name: "Lower School",
    grades: "PreK – Grade 4",
    tagline: "Where wonder gets a daily schedule.",
    intro:
      "The early years set the tone for everything after. Our Lower School blends structured literacy and math with long stretches of play, making, and outdoor time — because five-year-olds learn with their whole bodies, not just their eyes.",
    art: "sunrise",
    pillars: [
      {
        title: "Literacy that sticks",
        body: "A phonics-first reading program paired with a classroom library of 1,200+ titles per grade. Children read aloud to a teacher every single day.",
      },
      {
        title: "Math you can hold",
        body: "Manipulatives, number talks, and games before worksheets. Concepts are built with hands first, symbols second.",
      },
      {
        title: "The Wonder Block",
        body: "Ninety protected minutes each week for child-led projects — bridges, puppet shows, beetle observation logs. Teachers follow, not lead.",
      },
    ],
    day: [
      { time: "8:15", activity: "Morning meeting & greeting circle" },
      { time: "8:45", activity: "Reading workshop" },
      { time: "10:00", activity: "Outdoor recess — rain or shine" },
      { time: "10:45", activity: "Math with manipulatives" },
      { time: "12:00", activity: "Lunch, family-style tables" },
      { time: "1:00", activity: "Wonder Block or specials (art, music, Spanish)" },
      { time: "2:30", activity: "Story & reflection, dismissal at 3:00" },
    ],
    signature: ["Daily read-alouds", "Spanish from PreK", "Forest Fridays in Lincoln Park", "Buddy program with Grade 8"],
  },
  {
    slug: "middle-school",
    name: "Middle School",
    grades: "Grades 5 – 8",
    tagline: "Big questions for the in-between years.",
    intro:
      "Middle schoolers are wired to test ideas, identities, and limits. We give them real intellectual work worth pushing against — debate, design, field research — inside a culture warm enough to fail safely in.",
    art: "orbit",
    pillars: [
      {
        title: "Advisory at the core",
        body: "Every student belongs to an advisory of ten, meeting daily with one adult who tracks their whole story — academic, social, and otherwise.",
      },
      {
        title: "City as classroom",
        body: "Chicago is the textbook: river ecology sampling, architecture walks, oral-history projects in our own neighborhood.",
      },
      {
        title: "Public products",
        body: "Each trimester ends with work presented to a real audience — exhibitions, published zines, recorded podcasts — not just a grade.",
      },
    ],
    day: [
      { time: "8:10", activity: "Advisory check-in" },
      { time: "8:35", activity: "Humanities block" },
      { time: "10:05", activity: "Math & science labs" },
      { time: "12:00", activity: "Lunch & club hour" },
      { time: "1:00", activity: "Electives: robotics, theater, journalism" },
      { time: "2:20", activity: "Athletics or studio time" },
      { time: "3:30", activity: "Dismissal · homework lab until 5:00" },
    ],
    signature: ["Grade 7 Mississippi River expedition", "Student-run school store", "Annual debate tournament", "1:1 device program"],
  },
  {
    slug: "upper-school",
    name: "Upper School",
    grades: "Grades 9 – 12",
    tagline: "Scholarship with a spine.",
    intro:
      "Our Upper School asks students to do the work of the disciplines, not just read about them: original research, seminar-table argument, studio critique. Graduates leave with a transcript — and a body of work.",
    art: "arch",
    pillars: [
      {
        title: "Seminar over lecture",
        body: "Classes cap at 16 around a table. Students learn to build an argument, defend it, and — harder — revise it in public.",
      },
      {
        title: "The Capstone",
        body: "A year-long senior project with an outside mentor: published research, a venture, a documentary, a recital. Defended before a panel.",
      },
      {
        title: "College counseling from Grade 9",
        body: "A four-year arc, one counselor per 24 students, focused on fit over prestige — and essays that sound like the student wrote them.",
      },
    ],
    day: [
      { time: "8:30", activity: "First seminar block" },
      { time: "10:10", activity: "Lab sciences / language intensives" },
      { time: "11:50", activity: "Community lunch & office hours" },
      { time: "12:50", activity: "Afternoon seminars" },
      { time: "2:30", activity: "Capstone studio / free study" },
      { time: "3:45", activity: "Athletics, theater, ensembles" },
      { time: "5:30", activity: "Campus closes" },
    ],
    signature: ["Senior Capstone defense", "January term in Washington D.C.", "12 AP & honors pathways", "Student investment fund"],
  },
];

export const leadership = [
  { name: "Dr. Amara Whitfield", role: "Head of School", bio: "Twenty-two years in independent schools, most recently in Evanston. Believes report cards should read like letters, and writes many herself.", seed: "whitfield" },
  { name: "Marcus Oyelaran", role: "Assistant Head, Academics", bio: "Former physics teacher who still keeps chalk in his jacket pocket. Architect of the seminar-table curriculum.", seed: "oyelaran" },
  { name: "Elena Vasquez-Reed", role: "Head of Lower School", bio: "Early-childhood specialist and author of two books on play-based literacy. Hosts the Friday read-aloud herself.", seed: "vasquez" },
  { name: "Naomi Kessler", role: "Head of Middle School", bio: "Started the city-as-classroom program after a decade teaching in three countries. Keeps a canoe paddle behind her desk.", seed: "kessler" },
  { name: "Jonathan Ababio", role: "Head of Upper School", bio: "Historian, debate coach, and the reason the Capstone defense has a public gallery. Asks 'what's your evidence?' a lot.", seed: "ababio" },
  { name: "Priya Raghunathan", role: "Director of Admissions", bio: "Has toured more than 3,000 families through three campuses. Says the best interview question is 'what made you laugh this week?'", seed: "priya" },
];

export const traditions = [
  { title: "Lantern Walk", body: "On the first Friday of the year, the whole school walks the river path at dusk, youngest students carrying lanterns the seniors built." },
  { title: "Founders' Pancake Morning", body: "Faculty cook breakfast for every student on the founding anniversary. The Head of School works the griddle." },
  { title: "The Big Sing", body: "No auditions, no cuts — 400 voices, one December evening, one very loud finale." },
  { title: "Capstone Gallery Night", body: "Seniors present a year of original work to the city. Half the neighborhood shows up." },
];

export const athleticsTeams = [
  { sport: "Soccer", seasons: "Fall", levels: "MS · JV · Varsity" },
  { sport: "Cross Country", seasons: "Fall", levels: "MS · Varsity" },
  { sport: "Volleyball", seasons: "Fall", levels: "MS · JV · Varsity" },
  { sport: "Basketball", seasons: "Winter", levels: "MS · JV · Varsity" },
  { sport: "Swimming", seasons: "Winter", levels: "MS · Varsity" },
  { sport: "Track & Field", seasons: "Spring", levels: "MS · Varsity" },
  { sport: "Baseball / Softball", seasons: "Spring", levels: "JV · Varsity" },
  { sport: "Tennis", seasons: "Spring", levels: "MS · Varsity" },
];

export const artsPrograms = [
  { title: "Studio Arts", body: "Drawing, painting, ceramics, and printmaking in a daylight studio. The kiln runs most weeks.", art: "field" as const },
  { title: "Theater", body: "Two mainstage productions a year plus a student-directed one-act festival every spring.", art: "ribbon" as const },
  { title: "Music", body: "Strings from Grade 3, jazz ensemble, chamber choir, and a recording booth students actually book.", art: "orbit" as const },
  { title: "Film & Media", body: "A documentary track culminating in the Brightville Short Film Showcase at a real Chicago cinema.", art: "arch" as const },
];

export const admissionsSteps = [
  { step: "01", title: "Inquire", body: "Tell us about your child. We respond within two school days with dates and a person — not an autoresponder." },
  { step: "02", title: "Visit", body: "Tour with a student guide, sit in on a class, and meet a division head. Saturdays available monthly." },
  { step: "03", title: "Apply", body: "Online application, two teacher recommendations, and transcripts. PreK–K applicants join a play visit instead." },
  { step: "04", title: "Decide", body: "Decisions arrive in early March. Admitted families get a revisit day before enrollment contracts are due." },
];

export const tuitionRows = [
  { division: "Lower School", grades: "PreK – Grade 4", tuition: "$24,800" },
  { division: "Middle School", grades: "Grades 5 – 8", tuition: "$28,400" },
  { division: "Upper School", grades: "Grades 9 – 12", tuition: "$31,950" },
];

export const fallbackNews = [
  {
    id: "campus-topping-out",
    title: "Clybourn campus reaches topping-out milestone",
    category: "Campus",
    body: "The final steel beam — signed by every student — was set on the new flagship building this week. The construction team remains on schedule for a Fall 2027 opening, with the gymnasium shell next.",
    published_at: "2026-05-28T15:00:00Z",
  },
  {
    id: "debate-state",
    title: "Middle School debate team takes second at state",
    category: "Academics",
    body: "Eight students argued their way through six rounds in Springfield, finishing second of forty-two schools. Judges singled out the Grade 7 duo for the tournament's best cross-examination.",
    published_at: "2026-05-19T15:00:00Z",
  },
  {
    id: "spring-showcase",
    title: "Spring Showcase fills the Welcome Center",
    category: "Arts",
    body: "Over 300 families came through the student exhibition: ceramics, a documentary on the Clybourn build, and the premiere of the chamber choir's commissioned piece.",
    published_at: "2026-05-08T15:00:00Z",
  },
];

export const fallbackEvents = [
  { id: "e1", title: "Saturday Campus Tour & Hard-Hat Preview", location: "Welcome Center", starts_at: "2026-06-20T15:00:00Z" },
  { id: "e2", title: "Admissions Information Evening", location: "Virtual", starts_at: "2026-06-25T23:30:00Z" },
  { id: "e3", title: "Summer Bridge Program begins", location: "Welcome Center", starts_at: "2026-07-06T13:30:00Z" },
];
