export const projects = [
  {
    title: "NL-to-SQL Analytics Platform",
    tag: "FastAPI + Gemini + BigQuery",
    problem:
      "Users struggled to query large datasets using SQL. They needed a way to describe their intent in natural language and get accurate, executable queries.",
    solution:
      "Built a FastAPI backend that uses Gemini (Vertex AI) to translate natural language prompts into safe, structured BigQuery SQL. The system then executes the query, generates visualizations, and returns contextual summaries.",
    techStack: ["FastAPI", "Gemini (Vertex AI)", "BigQuery", "Python", "SQL"],
    architectureSteps: [
      "User → prompt input",
      "API → GenAI NL-to-SQL",
      "SQL → BigQuery execution",
      "Results → summaries + charts",
      "Response → API output"
    ],
    highlights: ["Secure query generation", "Automated visualization workflow", "Endpoint-driven UX"]
  },
  {
    title: "REST APIs with Notifications + Reminders",
    tag: "Scalable backend services",
    problem:
      "Applications required reliable reminders, alerts, and notifications across multiple domains without blocking API latency.",
    solution:
      "Implemented RESTful endpoints with Python and Go (Gin) where business logic stays synchronous, while notification flows run via scheduled/background patterns (cron-style jobs) and database-backed event triggers.",
    techStack: ["FastAPI", "Flask", "Gin", "MySQL/PostgreSQL", "Docker", "Cron Jobs"],
    architectureSteps: [
      "Request → API validation",
      "Service → persistence layer",
      "Events → notification pipeline",
      "Delivery → email/app notifications",
      "Monitoring → logs + retries"
    ],
    highlights: ["Async-friendly design", "Idempotent notifications", "Operational visibility"]
  },
  {
    title: "Document Intelligence API (Textract)",
    tag: "OCR + Extracted insights",
    problem:
      "Users needed structured fields extracted from images/documents (for downstream processing and workflows).",
    solution:
      "Integrated Amazon Textract to extract text and key information from images. Built an API layer that normalizes extracted fields, stores them in the database, and triggers follow-up workflows like reminders and data enrichment.",
    techStack: ["Python", "FastAPI", "Amazon Textract", "MongoDB", "SQL"],
    architectureSteps: [
      "User upload → OCR request",
      "Textract → extracted text",
      "Normalizer → structured fields",
      "DB → persistence + versioning",
      "Response → extracted JSON"
    ],
    highlights: ["OCR-to-JSON pipeline", "Database-backed normalization", "Workflow triggers"]
  },
  {
    title: "Headless Browser Network Scanner",
    tag: "FastAPI + Selenium Wire",
    problem:
      "Security teams needed a programmable way to simulate real browser traffic, detect login success, and inspect network behavior and CSP headers for web apps.",
    solution:
      "Developed a FastAPI-based automation backend that drives headless Chrome via Selenium Wire to capture network requests, detect successful authentication, measure page execution time, and extract CSP headers for security evaluation.",
    techStack: ["FastAPI", "Selenium Wire", "Headless Chrome", "Python"],
    architectureSteps: [
      "Client → FastAPI endpoint",
      "FastAPI → headless browser session",
      "Selenium Wire → network capture",
      "Analyzer → CSP + timing metrics",
      "Response → JSON report"
    ],
    highlights: ["Headless browser automation", "Network & CSP inspection", "Security-focused metrics"]
  },
  {
    title: "MBS Hotels Backend",
    tag: "Go + Gin + Hotel APIs",
    problem:
      "Hotel operations required reliable APIs for bookings, inventory, and partner integrations under real-world load.",
    solution:
      "Built and maintained Go/Gin-based backend services for MBS Hotels, exposing REST endpoints for bookings, availability, pricing, and partner integrations, with a focus on correctness and performance.",
    techStack: ["Go", "Gin", "REST APIs", "SQL Database"],
    architectureSteps: [
      "Client → Gin router",
      "Handlers → domain services",
      "Services → DB + external APIs",
      "Responses → JSON contracts"
    ],
    highlights: ["Production Go APIs", "Booking workflows", "Partner integration patterns"]
  },
  {
    title: "Bullet Security Platform",
    tag: "Flask + Security Workflows",
    problem:
      "Security operations needed a central backend to orchestrate checks, manage findings, and expose APIs to other tools.",
    solution:
      "Implemented Flask-based services to power security workflows, centralizing problem-solving logic, persistence, and REST APIs consumed by internal dashboards and scripts.",
    techStack: ["Flask", "REST APIs", "Python", "Problem Solving"],
    architectureSteps: [
      "Client → API gateway",
      "Flask → business logic",
      "DB → findings & runs",
      "Dashboards → consumption"
    ],
    highlights: ["Security use-cases", "Problem-solving centric design", "Reusable API layer"]
  },
  {
    title: "Lab Management System",
    tag: "Flask + Operations Backend",
    problem:
      "Labs needed structured tracking for tests, samples, and reports, without relying on manual spreadsheets.",
    solution:
      "Developed a Flask backend to manage lab entities (patients, tests, reports) with REST APIs backing internal tools and dashboards.",
    techStack: ["Flask", "REST APIs", "Python", "Problem Solving"],
    architectureSteps: [
      "User → lab UI",
      "UI → REST endpoints",
      "Flask → domain models",
      "DB → lab records"
    ],
    highlights: ["Operations automation", "Clear domain modelling", "Flask-based APIs"]
  },
  {
    title: "Logicor Platform",
    tag: "REST APIs at Scale",
    problem:
      "Product teams needed consistent, well-designed REST APIs to expose core functionality to clients and internal apps.",
    solution:
      "Contributed to Logicor’s backend by implementing and maintaining REST endpoints, focusing on problem solving, correctness, and reuse.",
    techStack: ["REST APIs", "Python/Flask", "Problem Solving"],
    architectureSteps: [
      "Client → HTTP entrypoint",
      "Routing → controllers",
      "Controllers → services",
      "Services → data layer"
    ],
    highlights: ["REST-first design", "Maintainable services", "Cross-team integrations"]
  },
  {
    title: "AVPL & ERP Backends",
    tag: "Enterprise REST + ERP",
    problem:
      "Enterprise clients needed ERP-style backends for resources, workflows, and reporting, with APIs that multiple apps could reuse.",
    solution:
      "Worked on AVPL and ERP backends using Python and REST APIs, designing endpoints around business workflows and ensuring they could be reused across mobile and web clients.",
    techStack: ["REST APIs", "Python", "ERP workflows", "Problem Solving"],
    architectureSteps: [
      "Client → REST gateway",
      "Gateway → workflow services",
      "Services → ERP data models",
      "Reporting → aggregated views"
    ],
    highlights: ["Enterprise workflows", "API reusability", "Problem-solving under constraints"]
  }
];

