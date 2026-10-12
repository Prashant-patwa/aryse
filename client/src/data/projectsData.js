const projectsData = [
  {
    id: "1",
    title: "EcoCycle: Cleaner Waste Sorting on Campus",
    shortDescription: "Computer science students are building a low-cost waste-sorting prototype to help their college reduce mixed waste.",
    category: "Community Impact",
    city: "Mumbai",
    state: "Maharashtra",
    bannerImage: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    fundingGoal: 12000,
    amountRaised: 4600,
    progress: 38,
    creator: {
      name: "Aarav Sharma",
      role: "Third-Year Computer Science Student",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },
    story: "Our college canteen and hostel areas generate a lot of mixed waste every day. Students often want to recycle, but it is difficult when food waste, plastic bottles and paper end up in the same bin. My team wants to build a small sensor-assisted waste-sorting prototype and test it in one campus location before proposing a larger installation. We need money for sensors, a microcontroller, separate collection containers, wiring and a protective enclosure. We will share photos of the prototype, a simple expense breakdown and what we learn during testing. This is a student project, so our first goal is to prove that the idea works on a small scale.",
    rewards: [
      { id: "r1", title: "Eco Supporter", description: "Receive a digital thank-you note and a project progress update.", pledgeAmount: 100 }
    ],
    updates: []
  },
  {
    id: "2",
    title: "Campus Hackathon: Build for Local Problems",
    shortDescription: "Students are organising a small inter-college hackathon where teams develop practical solutions to local community challenges.",
    category: "College Events",
    city: "Mumbai",
    state: "Maharashtra",
    bannerImage: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
    fundingGoal: 18000,
    amountRaised: 7200,
    progress: 40,
    creator: {
      name: "Neha Gupta",
      role: "Student Technical Club Coordinator",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
    },
    story: "Our technical club usually organises small coding sessions, but we want to give students from nearby colleges a chance to work together on real problems. This hackathon will invite teams to build ideas around waste management, public transport, education and accessibility. We are students working with a limited budget, so we are trying to arrange mentors and equipment through volunteers rather than expensive sponsorship packages. Funds will help cover basic meals, stationery, extension boards, printed materials and essential event arrangements. We plan to publish the final project list and photographs so supporters can see what participants created.",
    rewards: [
      { id: "r2", title: "Hackathon Supporter", description: "Get a digital appreciation certificate and an update about the student projects.", pledgeAmount: 250 }
    ],
    updates: []
  },
  {
    id: "3",
    title: "Campus Blood Donation Awareness Camp",
    shortDescription: "NSS volunteers want to coordinate an awareness and blood donation camp with a qualified hospital or blood bank.",
    category: "Community Impact",
    city: "Mumbai",
    state: "Maharashtra",
    bannerImage: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80",
    fundingGoal: 9000,
    amountRaised: 3500,
    progress: 39,
    creator: {
      name: "Rohan Verma",
      role: "NSS Student Volunteer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    story: "Many students say they would like to donate blood but do not know when a camp is happening, whether they are eligible or what the process involves. Our NSS team wants to work with an authorised medical partner to conduct an awareness session and, subject to their arrangements and approvals, a campus donation camp. Medical screening, collection and donor eligibility will be handled by qualified professionals, not students. We are raising funds for awareness posters, registration materials, basic venue arrangements and refreshments for volunteers and donors. We will share the confirmed event details and a summary of how the budget was used.",
    rewards: [
      { id: "r3", title: "Community Health Supporter", description: "Receive a digital thank-you certificate recognising your support for the awareness campaign.", pledgeAmount: 150 }
    ],
    updates: []
  },
  {
    id: "4",
    title: "EduMentor: Students Helping Students Learn",
    shortDescription: "A simple peer-learning website connecting juniors with seniors who can help explain difficult college subjects.",
    category: "Websites & Apps",
    city: "Pune",
    state: "Maharashtra",
    bannerImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    fundingGoal: 7000,
    amountRaised: 2600,
    progress: 37,
    creator: {
      name: "Priya Nair",
      role: "Final-Year Information Technology Student",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
    },
    story: "During exam season, our class WhatsApp groups fill up with the same questions about programming, databases and operating systems. Some students are comfortable asking seniors for help, while others stay quiet because they feel embarrassed. EduMentor is a small website idea where students can list the subjects they understand and juniors can request peer-learning sessions. We want to build a basic version first, with clear community rules and no paid tutoring requirement. The funds will cover domain registration, hosting and testing costs. We will invite a small group of students to try it before expanding to other departments.",
    rewards: [
      { id: "r4", title: "Early Tester", description: "Get an invitation to try the first version and share feedback before the wider launch.", pledgeAmount: 200 }
    ],
    updates: []
  },
  {
    id: "5",
    title: "RoboWars: A Beginner Robotics Workshop",
    shortDescription: "A college robotics club wants to run an affordable hands-on workshop where beginners build and test small robots.",
    category: "College Events",
    city: "Nashik",
    state: "Maharashtra",
    bannerImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    fundingGoal: 14000,
    amountRaised: 5100,
    progress: 36,
    creator: {
      name: "Karan Joshi",
      role: "Robotics Club Member",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
    },
    story: "Students often see robotics competitions online but assume that building a robot requires expensive equipment and advanced knowledge. Our club wants to organise a beginner-friendly workshop using small, low-cost robot kits. Participants will learn basic wiring, motor control and safe testing, with senior students guiding each group. We are raising money for reusable components, batteries, basic tools, safety materials and a simple testing area. The event will start with a limited number of participants so we can provide proper supervision. If the workshop goes well, we hope to repeat it for students who cannot afford commercial robotics classes.",
    rewards: [
      { id: "r5", title: "Workshop Supporter", description: "Receive a digital appreciation certificate and a summary of the workshop outcomes.", pledgeAmount: 200 }
    ],
    updates: []
  },
  {
    id: "6",
    title: "GreenRoots: Native Plants for Our Campus",
    shortDescription: "Eco-club students want to plant native saplings and organise a student-led watering and maintenance schedule.",
    category: "Environmental Programs",
    city: "Mumbai",
    state: "Maharashtra",
    bannerImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    fundingGoal: 10000,
    amountRaised: 3900,
    progress: 39,
    creator: {
      name: "Ananya Deshmukh",
      role: "College Eco-Club Coordinator",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    },
    story: "Some corners of our campus have very little shade, and many of the plants put in during earlier drives did not survive because nobody was assigned to care for them. This time, we want to begin with a manageable number of native saplings and a maintenance plan. Our volunteers will coordinate with the college before choosing planting locations, then take turns watering and checking the plants. Funds will be used for saplings, soil, compost, basic gardening tools and protective supports. We will post updates with the number of saplings planted and how many remain healthy after the first few months. We want this to be more than a one-day photo opportunity.",
    rewards: [
      { id: "r6", title: "Green Supporter", description: "Receive a digital thank-you note and photos from the planting and maintenance days.", pledgeAmount: 150 }
    ],
    updates: []
  },
  
      {
    id: "8",
    title: "Campus Cultural Night: A Stage for Student Talent",
    shortDescription: "Student organisers are raising funds for an affordable cultural night featuring local college musicians, dancers and performers.",
    category: "College Events",
    city: "Mumbai",
    state: "Maharashtra",
    bannerImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    fundingGoal: 18000,
    amountRaised: 6200,
    progress: 34,
    creator: {
      name: "Tanvi Kulkarni",
      role: "College Cultural Committee Member",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80"
    },
    story: "A lot of students practise singing, dancing and theatre after classes, but not everyone gets a chance to perform on a proper stage. Our cultural committee wants to organise a campus evening where students can showcase their talent without expensive entry fees. We are trying to borrow equipment from the college and invite local performers who are willing to collaborate. The funds will cover basic sound and lighting arrangements, stage materials, drinking water and event essentials. We will publish the final schedule and share photographs after the event. If we raise less than our target, we will reduce the scale instead of spending money we do not have.",
    rewards: [
      { id: "r8", title: "Campus Arts Supporter", description: "Receive a digital thank-you note and the event highlights after the programme.", pledgeAmount: 200 }
    ],
    updates: []
  },
  {
    id: "9",
    title: "FoodShare: Connecting Canteen Surplus with Local NGOs",
    shortDescription: "Students want to coordinate safe, timely collection of suitable surplus food with nearby community organisations.",
    category: "Social Initiatives",
    city: "Pune",
    state: "Maharashtra",
    bannerImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    fundingGoal: 8500,
    amountRaised: 3100,
    progress: 36,
    creator: {
      name: "Aditya Mehta",
      role: "Third-Year AI and Data Science Student",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80"
    },
    story: "After college events, we sometimes see food left over while community groups nearby are trying to arrange meals for people who need them. We want to explore a simple coordination system between our canteen, event organisers and local NGOs. The first stage will be a small pilot with willing partners, clear pickup timings and basic food-safety rules. We will not collect or redistribute food that is unsuitable for consumption. Funding will support insulated food containers where needed, transport for approved pickups, labels and coordination materials. We will record the number of successful collections and share the lessons from the pilot before expanding the project.",
    rewards: [
      { id: "r9", title: "Food Waste Reduction Supporter", description: "Receive a digital update about the pilot and its reported food collections.", pledgeAmount: 150 }
    ],
    updates: []
  },
  {
    id: "10",
    title: "CodeCraft: Weekend Coding Classes for School Students",
    shortDescription: "College volunteers want to introduce local school students to basic programming through free weekend sessions.",
    category: "Social Initiatives",
    city: "Jaipur",
    state: "Rajasthan",
    bannerImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    fundingGoal: 11000,
    amountRaised: 3700,
    progress: 34,
    creator: {
      name: "Meera Patel",
      role: "Computer Science Society Volunteer",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80"
    },
    story: "We learnt programming through college labs, online tutorials and help from seniors. Many school students in our neighbourhood have never had the opportunity to try coding themselves. Our group wants to run introductory sessions using simple browser-based tools and beginner-friendly exercises. We will coordinate with a local school or community space and start with a small batch so every learner can get help. The funds will go towards printed worksheets, stationery, transport, basic equipment and any necessary venue arrangements. Students will make small projects such as a quiz or a personal webpage by the end of the programme. We want to make technology feel approachable, even for learners who are starting from zero.",
    rewards: [
      { id: "r10", title: "Young Coder Supporter", description: "Receive a digital appreciation certificate and a sample of the learners' final projects, with permission.", pledgeAmount: 200 }
    ],
    updates: []
  },
  {
    id: "11",
    title: "Campus Open Mic and Reading Circle",
    shortDescription: "A student literary club is organising a low-cost gathering for poetry, storytelling, book exchanges and open-mic performances.",
    category: "College Events",
    city: "Lucknow",
    state: "Uttar Pradesh",
    bannerImage: "https://images.unsplash.com/photo-1474366521846-73691ab3bcf4?auto=format&fit=crop&w=800&q=80",
    fundingGoal: 6000,
    amountRaised: 2200,
    progress: 37,
    creator: {
      name: "Kabir Das",
      role: "Student Literary Club Coordinator",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80"
    },
    story: "Some of our best writers share their work only with close friends because they are nervous about performing in front of an audience. We want to create a relaxed evening where students can read poems, tell stories, discuss books and exchange used novels. There will be no audition and no expensive ticket. Our club will arrange a basic microphone, seating, printed schedules and a small display for book exchanges. Funds will help cover essential event materials and accessibility needs. We hope this becomes a regular space where students can express themselves, meet people outside their departments and discover local writing talent.",
    rewards: [
      { id: "r11", title: "Storytelling Supporter", description: "Receive a digital thank-you note and a copy of the event's student-created reading list.", pledgeAmount: 100 }
    ],
    updates: []
  },
  {
    id: "12",
    title: "AquaGuard: Finding Water Leaks in College Hostels",
    shortDescription: "Engineering students want to test an affordable leak-alert prototype to reduce unnecessary water loss in hostel facilities.",
    category: "Products & Startups",
    city: "Nashik",
    state: "Maharashtra",
    bannerImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    fundingGoal: 13000,
    amountRaised: 4400,
    progress: 34,
    creator: {
      name: "Varun Shinde",
      role: "Third-Year Mechanical Engineering Student",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80"
    },
    story: "In our hostel, small leaks and taps that are not closed properly can go unnoticed until someone reports them. Our team wants to develop a low-cost prototype that can detect unusual water flow and send a basic alert to the maintenance team. We will first test it on a demonstration setup and seek permission before attempting any installation on actual hostel plumbing. Funding will be used for flow sensors, a microcontroller, connecting components, test materials and a protective case. We will measure how reliably the prototype identifies test leaks and publish the results, including what needs improvement. Our long-term idea is to make water-saving technology affordable for institutions with limited budgets.",
    rewards: [
      { id: "r12", title: "Water Saver Supporter", description: "Receive a digital project update with prototype photos and testing results.", pledgeAmount: 250 }
    ],
    updates: []
  },
  {
    id: "13",
    title: "Digital Saathi: Smartphone Safety Sessions for Seniors",
    shortDescription: "College volunteers want to help older residents recognise common online scams and use smartphone services more confidently.",
    category: "Community Impact",
    city: "Bhopal",
    state: "Madhya Pradesh",
    bannerImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    fundingGoal: 5500,
    amountRaised: 1800,
    progress: 33,
    creator: {
      name: "Sneha Patil",
      role: "College Cybersecurity Club Volunteer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    story: "Many older people use smartphones to talk to family, make payments and access services, but suspicious links and fake calls can make these tasks stressful. Our student group wants to hold small community sessions showing how to identify warning signs, check website addresses and report suspicious messages. We will use simple Hindi and English handouts and demonstrate examples without asking participants to share private information. We will never request passwords, PINs, OTPs or access to anyone's banking account. The budget covers printing, travel and basic session materials. We hope to make digital services feel safer and less intimidating for people who did not grow up using smartphones.",
    rewards: [
      { id: "r13", title: "Digital Safety Supporter", description: "Receive a digital thank-you note and a copy of our basic online-safety checklist.", pledgeAmount: 150 }
    ],
    updates: []
  },
  {
    id: "14",
    title: "Inter-Department Sports Day for Everyone",
    shortDescription: "Student organisers are planning a budget-friendly sports day with team games and inclusive activities across departments.",
    category: "College Events",
    city: "Indore",
    state: "Madhya Pradesh",
    bannerImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    fundingGoal: 16000,
    amountRaised: 5700,
    progress: 36,
    creator: {
      name: "Deepak Yadav",
      role: "Student Sports Committee Volunteer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    story: "Our college has students from many departments, but people usually spend time with their own classmates. We want to organise a sports day that gives everyone a chance to participate, even if they are not part of a formal team. The plan includes football, badminton, relay races and a few low-impact activities for students who prefer not to compete in contact sports. We are asking the college to lend us the grounds and available equipment. Funds will cover basic sports supplies, first-aid arrangements, drinking water, score sheets and low-cost medals. We will keep participation affordable and share the schedule and results after the event.",
    rewards: [
      { id: "r14", title: "Campus Sports Supporter", description: "Receive a digital appreciation certificate and the final sports-day highlights.", pledgeAmount: 200 }
    ],
    updates: []
  },
    {
    id: "15",
    title: "Project Udaan: Free Evening Tuition for School Students",
    shortDescription: "College volunteers want to run free evening study sessions for children from low-income families near their campus.",
    category: "Social Initiatives",
    city: "Pune",
    state: "Maharashtra",
    bannerImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    fundingGoal: 8500,
    amountRaised: 2800,
    progress: 33,
    creator: {
      name: "Ishita Kulkarni",
      role: "Second-Year B.Com Student",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    },
    story: "Last semester, I started helping two children from my neighbourhood with their school homework. Soon, a few more children joined us. Many of their parents work long hours and cannot afford private tuition, but the children are eager to learn. My friends and I want to organise free evening study sessions three days a week in a nearby community space. We need notebooks, pencils, printed worksheets, a whiteboard and basic learning materials. We will share monthly updates about the classes and what the children are learning. We are not trying to build a big organisation overnight; we just want to make regular academic support accessible to children who need it.",
    rewards: [
      { id: "r30", title: "Supporter Appreciation", description: "Receive a digital thank-you note and a short update about the learning sessions.", pledgeAmount: 100 }
    ],
    updates: []
  },
  {
    id: "16",
    title: "CycleFix: Free Bicycle Repair Camp",
    shortDescription: "Mechanical students plan a weekend repair camp to help local students and delivery workers maintain their bicycles.",
    category: "Community Impact",
    city: "Nagpur",
    state: "Maharashtra",
    bannerImage: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
    fundingGoal: 6000,
    amountRaised: 1900,
    progress: 32,
    creator: {
      name: "Rahul Wagh",
      role: "Third-Year Mechanical Engineering Student",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },
    story: "In our area, several students use bicycles to travel to school and college because public transport and fuel can be expensive. A punctured tyre or loose brake can mean missing classes or losing a day's earnings for someone who depends on a bicycle for work. Our college workshop has basic tools, and a few classmates know how to repair common problems. We want to organise a free weekend repair camp with help from an experienced local mechanic. The money will go towards puncture kits, brake cables, tubes, lubricants and replacement parts. We will publish a simple expense summary after the camp.",
    rewards: [
      { id: "r31", title: "Community Supporter", description: "Get your name listed in our digital thank-you post, if you wish.", pledgeAmount: 150 }
    ],
    updates: []
  },
  {
    id: "17",
    title: "Period Pals: Menstrual Health Awareness on Campus",
    shortDescription: "Student volunteers want to conduct respectful menstrual health sessions and arrange emergency hygiene supplies.",
    category: "Community Impact",
    city: "Jaipur",
    state: "Rajasthan",
    bannerImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    fundingGoal: 9500,
    amountRaised: 4200,
    progress: 44,
    creator: {
      name: "Simran Kaur",
      role: "Second-Year Nursing Student",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    story: "During college activities, we noticed that students sometimes hesitate to ask for menstrual hygiene products or reliable information because they feel embarrassed. Our group wants to work with a qualified health educator to hold small awareness sessions and arrange emergency sanitary products in accessible campus locations, with permission from the college. We will use the funds for hygiene supplies, educational posters, session materials and basic arrangements. We want the sessions to be welcoming, practical and free from judgement. We will also share information from credible health sources instead of spreading unverified advice.",
    rewards: [
      { id: "r32", title: "Awareness Ally", description: "Receive a digital appreciation certificate for supporting student health awareness.", pledgeAmount: 200 }
    ],
    updates: []
  },
  {
    id: "18",
    title: "BhashaBridge: English Practice for First-Generation Learners",
    shortDescription: "A student-led weekend programme where local learners can practise spoken English without expensive coaching.",
    category: "Social Initiatives",
    city: "Lucknow",
    state: "Uttar Pradesh",
    bannerImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    fundingGoal: 7000,
    amountRaised: 2300,
    progress: 33,
    creator: {
      name: "Mohit Srivastava",
      role: "Final-Year BA Student",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
    },
    story: "Some students understand their subjects well but hesitate during interviews because they have had fewer chances to practise spoken English. I experienced this myself when I first attended a college interview workshop. A few friends and I want to organise free weekend speaking circles for school and college learners in our neighbourhood. Activities will include introductions, mock interviews, group discussions and everyday conversations. We need printed practice sheets, stationery, a portable whiteboard and basic venue arrangements. This is not an English grammar coaching centre; it is a friendly space where learners can practise without being laughed at for making mistakes.",
    rewards: [
      { id: "r33", title: "Learning Supporter", description: "Receive a digital update with highlights from the first speaking sessions.", pledgeAmount: 100 }
    ],
    updates: []
  },
  {
    id: "19",
    title: "ReUse Station: Exchange Books Before Buying New",
    shortDescription: "A campus book exchange shelf and simple website to help juniors find used textbooks from seniors.",
    category: "Websites & Apps",
    city: "Bengaluru",
    state: "Karnataka",
    bannerImage: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
    fundingGoal: 5000,
    amountRaised: 1700,
    progress: 34,
    creator: {
      name: "Ananya Rao",
      role: "Second-Year Computer Science Student",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
    },
    story: "At the end of every semester, students sell or store textbooks they may never use again, while incoming students search for affordable copies. We want to make that exchange easier. Our plan is to build a basic website where seniors can list used books and juniors can contact them, along with a small physical exchange shelf approved by the college. We need a domain, basic hosting, shelf materials, labels and posters explaining how the exchange works. The books will remain owned by students; our project simply helps them find each other. If the pilot works, we hope to expand it to more departments.",
    rewards: [
      { id: "r34", title: "Early Project Supporter", description: "Receive early access to test the book-listing website and share feedback.", pledgeAmount: 250 }
    ],
    updates: []
  },
  {
    id: "20",
    title: "Paws & Care: Water Bowls for Community Animals",
    shortDescription: "College volunteers want to place and maintain clean water stations for community animals in summer.",
    category: "Community Impact",
    city: "Ahmedabad",
    state: "Gujarat",
    bannerImage: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=800&q=80",
    fundingGoal: 4500,
    amountRaised: 1600,
    progress: 36,
    creator: {
      name: "Dev Shah",
      role: "First-Year BBA Student",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    story: "On our walk to college, my friends and I often see dogs and cats searching for water, especially on hot afternoons. We want to place a limited number of sturdy water bowls at suitable locations after getting permission from property owners or local authorities. Our volunteers will take turns cleaning and refilling them, and we will keep a public list of the locations and maintenance schedule. The funds will cover durable bowls, cleaning supplies and signs asking people to keep the stations clean. We will start small and only add more locations if we can maintain the existing ones properly.",
    rewards: [
      { id: "r35", title: "Kindness Supporter", description: "Receive a photo update showing the water stations after installation.", pledgeAmount: 100 }
    ],
    updates: []
  },
  {
    id: "21",
    title: "Rural Digital Help Desk",
    shortDescription: "Student volunteers plan to help residents navigate online forms, digital documents and basic smartphone tasks.",
    category: "Social Initiatives",
    city: "Nashik",
    state: "Maharashtra",
    bannerImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    fundingGoal: 8000,
    amountRaised: 3100,
    progress: 39,
    creator: {
      name: "Pooja Jadhav",
      role: "Third-Year Information Technology Student",
      avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80"
    },
    story: "Many useful services are now online, but filling in a form or uploading the correct document can be confusing if someone has limited experience with smartphones. Our college volunteer group wants to run a supervised digital help desk during community outreach days. We will help residents understand forms, scan documents and navigate official websites, while letting each person enter their own private information. We will never collect passwords, OTPs or keep copies of sensitive documents. Funding will cover a refurbished laptop if needed, a scanner, mobile data and printed step-by-step guides. We will coordinate with local community representatives before starting.",
    rewards: [
      { id: "r36", title: "Digital Inclusion Supporter", description: "Receive a short project update explaining the services provided during our pilot.", pledgeAmount: 150 }
    ],
    updates: []
  },
  {
    id: "22",
    title: "Nayi Disha: Career Guidance for Government School Students",
    shortDescription: "College volunteers want to introduce school students to scholarships, entrance exams and different career paths.",
    category: "Social Initiatives",
    city: "Bhopal",
    state: "Madhya Pradesh",
    bannerImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    fundingGoal: 6500,
    amountRaised: 2100,
    progress: 32,
    creator: {
      name: "Arjun Tiwari",
      role: "Final-Year Engineering Student",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
    },
    story: "When I was in school, I knew about only a few career options because nobody in my family had gone through the college admission process. I want younger students to have more information before making those decisions. My classmates and I plan to visit a nearby government school with permission and conduct a practical session on college courses, entrance exams, scholarships and vocational opportunities. We will prepare a simple Hindi-English guide, invite volunteers from different fields and provide a question-and-answer session. The budget covers printing, travel, stationery and basic event materials. We will share the resources online so students can use them after the session too.",
    rewards: [
      { id: "r37", title: "Future Builder", description: "Receive a digital thank-you note and a copy of the career resource guide.", pledgeAmount: 150 }
    ],
    updates: []
  }
];

export default projectsData;