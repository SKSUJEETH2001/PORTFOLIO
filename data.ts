import { PortfolioData } from "./types";

export const TEMPLATES: Record<string, { label: string; description: string; data: PortfolioData }> = {
  maritime: {
    label: "🚢 Maritime & Port Operations Focus",
    description: "Ideal for roles in shipping lines, port agencies, yard planning, and vessel operations.",
    data: {
      personal: {
        name: "Arjun Mehta",
        email: "arjun.mehta.logistics@gmail.com",
        phone: "+91 98765 43210",
        linkedin: "linkedin.com/in/arjun-mehta-shipping",
        location: "Mumbai, India",
        bio: "Motivated BBA in Shipping & Logistics graduate with terminal operations internship experience at DP World. Passionate about vessel scheduling, container turnaround optimization, and marine insurance. Eager to contribute to efficient maritime supply chains as an Operations Trainee.",
        focusArea: "Maritime Cargo & Port Operations"
      },
      education: {
        degree: "BBA in Shipping & Logistics",
        institution: "Indian Maritime University (IMU)",
        graduationYear: "2026",
        gpa: "8.6 / 10.0",
        coursework: ["Port Terminal Management", "Containerization & Liner Operations", "Marine Insurance & Chartering", "Customs & Port Regulations"]
      },
      internships: [
        {
          id: "int-1",
          company: "DP World Nhava Sheva Terminal",
          role: "Operations Intern",
          duration: "May 2025 - July 2025",
          description: [
            "Shadowed the vessel planner to review and edit container loading sequences, ensuring vessel stability and stowage compliance.",
            "Monitored yard slot allocation layouts, reducing average yard transfer times by 8% using advanced terminal tracking software.",
            "Cross-verified manifest data against Bills of Lading for 15+ incoming container vessels to avoid regulatory penalties."
          ]
        },
        {
          id: "int-2",
          company: "Ocean Freight Services Ltd",
          role: "Logistics Trainee",
          duration: "Dec 2024 - Jan 2025",
          description: [
            "Coordinated export/import customs clearance filings under supervision, gaining deep practical knowledge of Indian Customs procedures.",
            "Prepared freight invoices and tracked container demurrage fees, saving clients an average of 4% in extra charges by reporting delays proactively."
          ]
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "Vessel Turnaround Time Optimization Analysis",
          role: "Lead Student Researcher",
          description: "Analyzed berth performance data of a regional dry port. Identified bottlenecks in harbor pilotage and truck-to-rail loading coordination, proposing a prioritized crane scheduling framework to reduce queue times.",
          methods: ["Queuing Theory", "Vessel Turnaround Analysis", "FIFO Crane Dispatch", "Bottleneck Assessment"]
        }
      ],
      skills: [
        "Vessel Stowage & Planning",
        "Container Yard Slotting",
        "Customs Documentation & Clearances",
        "Incoterms 2020 Guidelines",
        "Liner Operations Management",
        "Demurrage & Detention Calculation",
        "SAP MM Basic Modules",
        "Maritime Cargo Insurance Rules"
      ],
      certifications: [
        {
          id: "cert-1",
          name: "Dangerous Goods Handling & HAZMAT Certificate",
          issuer: "Directorate General of Shipping",
          year: "2025"
        },
        {
          id: "cert-2",
          name: "Certified Maritime Logistics Professional",
          issuer: "International Association of Ports & Harbors",
          year: "2026"
        }
      ]
    }
  },
  freight: {
    label: "✈️ Freight Forwarding & Multi-modal Focus",
    description: "Perfect for jobs in cargo agencies, international freight forwarders (DHL, Kuehne+Nagel), and custom brokerage.",
    data: {
      personal: {
        name: "Samantha Rose",
        email: "samantha.rose.freight@gmail.com",
        phone: "+1 (555) 349-2810",
        linkedin: "linkedin.com/in/samantha-rose-freight",
        location: "Singapore",
        bio: "Detail-oriented BBA graduate specializing in International Freight Forwarding and Air-Sea Cargo consolidation. Highly analytical, with internship experience routing multi-modal cargo across APAC. Eager to master freight procurement, carrier negotiation, and customs brokerage.",
        focusArea: "Freight Forwarding & Air-Sea Cargo Operations"
      },
      education: {
        degree: "Bachelor of Business Administration (BBA) in Logistics & Global Commerce",
        institution: "Nanyang Academy of Logistics",
        graduationYear: "2026",
        gpa: "3.85 / 4.00",
        coursework: ["International Air-Sea Cargo Consolidation", "Customs Brokerage and Tariffs", "Multi-modal Transport Networks", "Global Trade Finance & Incoterms"]
      },
      internships: [
        {
          id: "int-1",
          company: "DHL Global Forwarding",
          role: "Air Freight Consolidation Intern",
          duration: "May 2025 - August 2025",
          description: [
            "Assisted in air freight booking operations, negotiating space allocation with 4 regional carriers during peak seasonal periods.",
            "Prepared House Air Waybills (HAWB) and Master Air Waybills (MAWB), reducing draft filing errors by 12% through meticulous double-checks.",
            "Tracked dynamic customs clearance updates for high-priority pharmaceutical shipments, maintaining real-time communication with warehouse managers."
          ]
        },
        {
          id: "int-2",
          company: "Apex Customs Brokers",
          role: "Documentation Assistant",
          duration: "Jan 2025 - Feb 2025",
          description: [
            "Classified import goods according to Harmonized System (HS) Codes under certified customs agents.",
            "Maintained physical and electronic compliance archives, ensuring all shipping manifests, commercial invoices, and packing lists complied with customs audit rules."
          ]
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "Multi-modal Route Cost Analysis: SE Asia to Europe",
          role: "Project Leader",
          description: "Engineered a routing decision matrix comparing Air-Sea, Sea-Rail, and Pure Sea lanes based on transit times, freight rates, carbon emissions, and border tax considerations, showing 15% cost optimization for non-perishables.",
          methods: ["Lanes Optimization", "Total Cost of Ownership", "Incoterms Risk Allocation", "HS Classification Analytics"]
        }
      ],
      skills: [
        "HAWB/MAWB & Ocean Bill of Lading",
        "HS Code Product Classification",
        "Multi-modal Transit Routing",
        "Cargo Space Procurement",
        "LCL / FCL Container Planning",
        "Carrier Rate Negotiations",
        "Customs Compliance Audit Checks",
        "Logistics Cost Estimation"
      ],
      certifications: [
        {
          id: "cert-1",
          name: "IATA Cargo Introductory Certification",
          issuer: "International Air Transport Association (IATA)",
          year: "2025"
        },
        {
          id: "cert-2",
          name: "Incoterms® 2020 Rules Masterclass",
          issuer: "International Chamber of Commerce (ICC)",
          year: "2026"
        }
      ]
    }
  },
  warehouse: {
    label: "📦 Supply Chain & Warehousing Focus",
    description: "Geared towards jobs in warehouse operations, inventory control, fulfillment centers (Amazon), and distribution logistics.",
    data: {
      personal: {
        name: "Rahul Nair",
        email: "rahul.nair.scm@outlook.com",
        phone: "+91 87654 32109",
        linkedin: "linkedin.com/in/rahul-nair-logistics",
        location: "Chennai, India",
        bio: "Process-driven BBA graduate passionate about Lean Warehousing and smart inventory fulfillment. Experienced in inventory auditing, SKU profiling, and lead time reduction. Skilled in utilizing modern warehouse management concepts to streamline stock flows.",
        focusArea: "Supply Chain & Warehouse Management"
      },
      education: {
        degree: "BBA in Logistics and Supply Chain Management",
        institution: "Academy of Maritime Education & Training (AMET)",
        graduationYear: "2026",
        gpa: "8.2 / 10.0",
        coursework: ["Warehouse Layout Design & Operations", "Inventory Planning & Control", "Logistics Information Systems", "Lean Management & Six Sigma"]
      },
      internships: [
        {
          id: "int-1",
          company: "Amazon Fulfillment Center (MAA5)",
          role: "Inventory Control Intern",
          duration: "May 2025 - July 2025",
          description: [
            "Conducted daily Cycle Counts and high-value bin audits, reducing inventory discrepancies by 15% across dry goods zones.",
            "Assisted the Warehouse Manager in SKU slotting analysis, re-allocating fast-moving goods close to the outbound dispatch lines to shave 10 seconds off each pick cycle.",
            "Utilized WMS scanners and logged operations errors, identifying 3 recurring hardware glitches to IT support."
          ]
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "Warehouse Space Utilization Study & Layout Re-design",
          role: "Solo Academic Researcher",
          description: "Re-mapped the storage layout of a local automotive spare parts distributor. Proposed a transition from random warehouse allocation to ABC inventory profiling, reclaiming 22% of previously underutilized rack spaces.",
          methods: ["ABC Classification", "SKU Profiling", "Space Utilization Analysis", "FIFO Warehouse Management"]
        }
      ],
      skills: [
        "Warehouse Management Systems (WMS)",
        "ABC Inventory Classification",
        "Cycle Counting & Auditing",
        "Lean 5S Workspace Layouts",
        "Safety & OSHA Standards Compliance",
        "SKU Slotting Strategies",
        "Order Picking Cycle Optimization",
        "Lead Time Bottleneck Assessment"
      ],
      certifications: [
        {
          id: "cert-1",
          name: "Certified Supply Chain Analyst (CSCA)",
          issuer: "International Supply Chain Education Alliance",
          year: "2025"
        },
        {
          id: "cert-2",
          name: "Lean Six Sigma Yellow Belt",
          issuer: "TÜV SÜD",
          year: "2026"
        }
      ]
    }
  }
};

export const GUIDES = [
  {
    title: "1. What makes a Shipping & Logistics portfolio different?",
    content: "Recruiters in shipping and logistics don't look at flashy design codes; they look for **operational vocabulary** and **regulatory awareness**. You must showcase your understanding of standard international trade codes (Incoterms 2020), document handling (Bill of Lading, Air Waybills, Letters of Credit), and metrics-driven execution (reducing container dwell times, optimizing warehouse slotting, avoiding demurrage/detention fees)."
  },
  {
    title: "2. Crucial Sections for a Fresher Portfolio",
    content: "As a fresher with no full-time experience, you need to emphasize:\n- **Educational BBA Focus**: Highlight specific advanced modules like Port Operations, Maritime Law, or Customs Clearance.\n- **Logistics Internship/Industrial Visit**: Every single port or warehouse visit counts! Describe what you saw (e.g., container cranes in action, custom officers sealing cargo).\n- **Hands-on Projects**: Showcase case studies where you solved real routing, inventory, or slotting bottlenecks.\n- **Industry Certifications**: Certifications from recognized organizations like IATA, ASCM, or FIATA set you far apart."
  },
  {
    title: "3. Top Shipping & Logistics Keywords to Include",
    content: "- **Maritime/Port**: TEUs (Twenty-foot Equivalent Units), Vessel Stowage Planning, Berth Occupancy, Dwell Time, Stevedoring, Feeder Ship, Dry Port, Custom House Agent (CHA).\n- **Freight Forwarding**: Bill of Lading (B/L), LCL/FCL, Consolidation, MAWB/HAWB, Seaway Bill, Carnet, Letter of Credit (L/C), FOB/CIF/DDP Incoterms.\n- **Warehousing/Inventory**: cycle counting, SKU slotting, ABC Classification, FIFO/LIFO, Cross-docking, Safety Stock, WMS, ERP (SAP/Oracle), lead time reduction."
  },
  {
    title: "4. Golden Rules for Describing Internships with AI",
    content: "Never just say: *'I did data entry at a logistics office.'* Instead, use our **AI Resume Tuner** to describe it like: *'Processed 20+ maritime shipping manifest dossiers daily with 99.8% compliance accuracy under Customs House Agent oversight.'* Focus on **Action Verbs + Context + Industry Metrics**."
  }
];
