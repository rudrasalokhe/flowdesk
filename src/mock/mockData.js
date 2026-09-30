// Isolated Mock Data for Initial UI Development & Preview
// This file can be safely deleted or ignored once your FastAPI backend is running.

export const MOCK_USERS = [
  {
    id: 1,
    name: "Aarav Shah",
    initials: "AS",
    email: "aarav@launchpad.co",
    role: "MANAGER",
    team: "SaaS",
    workload: 61,
    conversion_rate: 18.4,
    status: "Available",
    color: "blue",
    leads: 142,
    won: 26
  },
  {
    id: 2,
    name: "Maya Chen",
    initials: "MC",
    email: "maya@launchpad.co",
    role: "SALES",
    team: "Enterprise",
    workload: 78,
    conversion_rate: 22.1,
    status: "Available",
    color: "purple",
    leads: 168,
    won: 37
  },
  {
    id: 3,
    name: "Jordan Lee",
    initials: "JL",
    email: "jordan@launchpad.co",
    role: "SALES",
    team: "Growth",
    workload: 46,
    conversion_rate: 16.8,
    status: "Available",
    color: "peach",
    leads: 119,
    won: 20
  },
  {
    id: 4,
    name: "Sarah Miller",
    initials: "SM",
    email: "sarah@launchpad.co",
    role: "ADMIN",
    team: "Operations",
    workload: 32,
    conversion_rate: 19.2,
    status: "Away",
    color: "mint",
    leads: 84,
    won: 16
  }
];

export const MOCK_LEADS = [
  {
    id: 1024,
    name: "Olivia Rhye",
    company: "Acme Inc.",
    email: "olivia@acme.com",
    phone: "+1 (415) 555-0124",
    source: "Website",
    score: 94,
    priority: "High",
    status: "Qualified",
    assigned_to: "Aarav Shah",
    initials: "OR",
    color: "peach",
    created_at: "2026-09-30",
    industry: "Software & technology",
    company_size: "51–200",
    message: "Interested in a product demo for our growing revenue team.",
    score_factors: [
      { label: "Enterprise company", value: 20 },
      { label: "Business email", value: 15 },
      { label: "Demo requested", value: 25 },
      { label: "High-value industry", value: 34 }
    ]
  },
  {
    id: 1023,
    name: "Phoenix Baker",
    company: "Layers",
    email: "phoenix@layers.design",
    phone: "+1 (415) 555-0123",
    source: "Referral",
    score: 88,
    priority: "High",
    status: "Demo",
    assigned_to: "Maya Chen",
    initials: "PB",
    color: "purple",
    created_at: "2026-09-30",
    industry: "Design & UX",
    company_size: "201–500",
    message: "Evaluating LaunchPad to streamline outbound sales workflow.",
    score_factors: [
      { label: "Tier 1 Referral", value: 25 },
      { label: "Active pipeline intent", value: 30 },
      { label: "Executive buyer title", value: 33 }
    ]
  },
  {
    id: 1022,
    name: "Lana Steiner",
    company: "Sisyphus",
    email: "lana@sisyphus.com",
    phone: "+1 (415) 555-0122",
    source: "LinkedIn",
    score: 76,
    priority: "Medium",
    status: "Contacted",
    assigned_to: "Jordan Lee",
    initials: "LS",
    color: "blue",
    created_at: "2026-09-29",
    industry: "Financial Tech",
    company_size: "51–200",
    message: "Requested pricing breakdown for 20 sales representatives.",
    score_factors: [
      { label: "Verified business address", value: 20 },
      { label: "LinkedIn ad referral", value: 26 },
      { label: "Growth trajectory", value: 30 }
    ]
  },
  {
    id: 1021,
    name: "Demi Wilkinson",
    company: "Catalog",
    email: "demi@catalog.studio",
    phone: "+1 (415) 555-0121",
    source: "Website",
    score: 92,
    priority: "High",
    status: "Negotiation",
    assigned_to: "Aarav Shah",
    initials: "DW",
    color: "pink",
    created_at: "2026-09-29",
    industry: "Creative Studio",
    company_size: "11–50",
    message: "Final proposal under review with procurement team.",
    score_factors: [
      { label: "Budget approved", value: 35 },
      { label: "Expedited timeline", value: 30 },
      { label: "High margin fit", value: 27 }
    ]
  },
  {
    id: 1020,
    name: "Drew Cano",
    company: "Circooles",
    email: "drew@circooles.com",
    phone: "+1 (415) 555-0120",
    source: "CSV import",
    score: 63,
    priority: "Medium",
    status: "New",
    assigned_to: "Maya Chen",
    initials: "DC",
    color: "mint",
    created_at: "2026-09-29",
    industry: "Logistics",
    company_size: "501–1000",
    message: "Inbound inquiry regarding multi-region lead assignment.",
    score_factors: [
      { label: "Bulk CSV record", value: 15 },
      { label: "Verified phone", value: 20 },
      { label: "Mid-market headcount", value: 28 }
    ]
  },
  {
    id: 1019,
    name: "Natali Craig",
    company: "Hourglass",
    email: "natali@hourglass.app",
    phone: "+1 (415) 555-0119",
    source: "Referral",
    score: 96,
    priority: "High",
    status: "Won",
    assigned_to: "Jordan Lee",
    initials: "NC",
    color: "yellow",
    created_at: "2026-09-28",
    industry: "SaaS",
    company_size: "201–500",
    message: "Closed-Won deal. Onboarding sequence initialized.",
    score_factors: [
      { label: "Series B Backed", value: 40 },
      { label: "Decision maker title", value: 30 },
      { label: "Marketplace referral", value: 26 }
    ]
  },
  {
    id: 1018,
    name: "Orlando Diggs",
    company: "Command+R",
    email: "orlando@commandr.com",
    phone: "+1 (415) 555-0118",
    source: "LinkedIn",
    score: 54,
    priority: "Low",
    status: "New",
    assigned_to: "Aarav Shah",
    initials: "OD",
    color: "purple",
    created_at: "2026-09-28",
    industry: "Developer Tools",
    company_size: "1–10",
    message: "Inquired about starter tier limits.",
    score_factors: [
      { label: "LinkedIn referral", value: 20 },
      { label: "Small team size", value: 14 },
      { label: "Organic trial user", value: 20 }
    ]
  },
  {
    id: 1017,
    name: "Andi Lane",
    company: "Quotient",
    email: "andi@quotient.co",
    phone: "+1 (415) 555-0117",
    source: "Website",
    score: 82,
    priority: "High",
    status: "Qualified",
    assigned_to: "Maya Chen",
    initials: "AL",
    color: "peach",
    created_at: "2026-09-27",
    industry: "Analytics",
    company_size: "51–200",
    message: "Qualified by sales development team.",
    score_factors: [
      { label: "Verified corporate domain", value: 20 },
      { label: "Demo requested", value: 30 },
      { label: "Analytics vertical fit", value: 32 }
    ]
  }
];

export const MOCK_LEAD_ACTIVITIES = {
  1024: [
    { id: 1, title: "Lead qualified", details: "Status changed from Contacted to Qualified", timestamp: "2026-09-30T10:42:00Z", time: "Today, 10:42 AM", actor: "Aarav Shah" },
    { id: 2, title: "First conversation", details: "Product requirements and next steps discussed", timestamp: "2026-09-30T10:30:00Z", time: "Today, 10:30 AM", actor: "Aarav Shah" },
    { id: 3, title: "Assigned to Aarav Shah", details: "Assigned by Sarah Miller", timestamp: "2026-09-30T09:18:00Z", time: "Today, 9:18 AM", actor: "Sarah Miller" },
    { id: 4, title: "Lead score calculated", details: "Score and priority returned by scoring service", timestamp: "2026-09-30T09:16:00Z", time: "Today, 9:16 AM", actor: "Scoring Engine" },
    { id: 5, title: "Lead created", details: "Submitted through the website demo request form", timestamp: "2026-09-30T09:15:00Z", time: "Today, 9:15 AM", actor: "Inbound Webhook" }
  ]
};

export const MOCK_TASKS = [
  {
    id: 1,
    title: "Send pricing proposal",
    lead: "Demi Wilkinson",
    lead_id: 1021,
    company: "Catalog",
    assigned_to: "Aarav Shah",
    due: "2026-09-29",
    priority: "High",
    status: "Overdue"
  },
  {
    id: 2,
    title: "Follow up on demo request",
    lead: "Olivia Rhye",
    lead_id: 1024,
    company: "Acme Inc.",
    assigned_to: "Aarav Shah",
    due: "2026-09-30",
    priority: "High",
    status: "Pending"
  },
  {
    id: 3,
    title: "Prepare product walkthrough",
    lead: "Phoenix Baker",
    lead_id: 1023,
    company: "Layers",
    assigned_to: "Maya Chen",
    due: "2026-09-30",
    priority: "Medium",
    status: "Pending"
  },
  {
    id: 4,
    title: "Share onboarding resources",
    lead: "Natali Craig",
    lead_id: 1019,
    company: "Hourglass",
    assigned_to: "Jordan Lee",
    due: "2026-10-01",
    priority: "Medium",
    status: "Pending"
  },
  {
    id: 5,
    title: "Connect with buying committee",
    lead: "Alex Morgan",
    lead_id: 1015,
    company: "Boltshift",
    assigned_to: "Aarav Shah",
    due: "2026-10-02",
    priority: "High",
    status: "Pending"
  },
  {
    id: 6,
    title: "Send introduction email",
    lead: "Lana Steiner",
    lead_id: 1022,
    company: "Sisyphus",
    assigned_to: "Jordan Lee",
    due: "2026-09-28",
    priority: "Low",
    status: "Completed"
  }
];

export const MOCK_ANALYTICS = {
  overview: {
    total_leads: 2846,
    new_leads: 428,
    qualified_leads: 864,
    high_priority_leads: 312,
    converted_leads: 386,
    conversion_rate: 13.6,
    lost_leads: 126,
    average_score: 74,
    changes: ["12.8", "8.2", "16.4", "6.1", "18.2", "2.4"],
    score_distribution: [
      { name: "0–20", value: 96 },
      { name: "21–40", value: 254 },
      { name: "41–60", value: 622 },
      { name: "61–80", value: 1042 },
      { name: "81–100", value: 832 }
    ]
  },
  pipeline: [
    { name: "New", value: 428, color: "#a3b2c9" },
    { name: "Contacted", value: 622, color: "#7b9ce9" },
    { name: "Qualified", value: 864, color: "#617fea" },
    { name: "Demo", value: 248, color: "#8b78d8" },
    { name: "Negotiation", value: 172, color: "#d09c57" },
    { name: "Won", value: 386, color: "#409b7a" },
    { name: "Lost", value: 126, color: "#c78082" }
  ],
  leads_over_time: [
    { date: "Sep 01", leads: 54, qualified: 21, previous: 42 },
    { date: "Sep 04", leads: 72, qualified: 28, previous: 53 },
    { date: "Sep 07", leads: 66, qualified: 23, previous: 47 },
    { date: "Sep 10", leads: 92, qualified: 37, previous: 62 },
    { date: "Sep 13", leads: 81, qualified: 30, previous: 55 },
    { date: "Sep 16", leads: 113, qualified: 46, previous: 73 },
    { date: "Sep 19", leads: 100, qualified: 41, previous: 64 },
    { date: "Sep 22", leads: 132, qualified: 56, previous: 82 },
    { date: "Sep 25", leads: 119, qualified: 49, previous: 74 },
    { date: "Sep 28", leads: 152, qualified: 67, previous: 91 },
    { date: "Sep 30", leads: 142, qualified: 62, previous: 88 }
  ],
  leads_by_source: [
    { name: "Website", value: 1196, color: "#4263eb", percent: "42%" },
    { name: "LinkedIn", value: 740, color: "#8c9ff2", percent: "26%" },
    { name: "Referral", value: 569, color: "#b6c3f9", percent: "20%" },
    { name: "CSV import", value: 341, color: "#dce3fc", percent: "12%" }
  ],
  salesperson_performance: [
    { id: 1, name: "Aarav Shah", assigned: 142, won: 26, conversion_rate: 18.4, team: "SaaS", color: "blue", workload: 61, leads: 142 },
    { id: 2, name: "Maya Chen", assigned: 168, won: 37, conversion_rate: 22.1, team: "Enterprise", color: "purple", workload: 78, leads: 168 },
    { id: 3, name: "Jordan Lee", assigned: 119, won: 20, conversion_rate: 16.8, team: "Growth", color: "peach", workload: 46, leads: 119 },
    { id: 4, name: "Sarah Miller", assigned: 84, won: 16, conversion_rate: 19.2, team: "Operations", color: "mint", workload: 32, leads: 84 }
  ]
};

export const MOCK_IMPORTS = {
  job_101: {
    id: "job_101",
    file_name: "September-leads.csv",
    file_size: "1.2 MB",
    uploaded_at: "2026-09-30T11:20:00Z",
    status: "Completed",
    total_rows: 500,
    processed_rows: 500,
    imported_rows: 482,
    duplicate_rows: 12,
    invalid_rows: 6,
    progress_percentage: 100,
    errors: [
      { row: 42, field: "email", message: "Malformed domain format" },
      { row: 108, field: "phone", message: "Invalid length" }
    ]
  }
};

export const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "A high-priority lead is ready for you",
    text: "Olivia Rhye from Acme Inc. has been assigned to you. Lead score: 94.",
    time: "12 minutes ago",
    type: "lead",
    read: false,
    lead_id: 1024
  },
  {
    id: 2,
    title: "Your follow-up is overdue",
    text: "Send the pricing proposal to Demi Wilkinson at Catalog.",
    time: "48 minutes ago",
    type: "task",
    read: false
  },
  {
    id: 3,
    title: "Your CSV import is complete",
    text: "September-leads.csv: 482 imported, 12 duplicates, 6 invalid rows.",
    time: "2 hours ago",
    type: "import",
    read: true
  },
  {
    id: 4,
    title: "Another lead across the finish line",
    text: "Natali Craig from Hourglass was converted by Jordan Lee.",
    time: "3 hours ago",
    type: "lead",
    read: true
  }
];
