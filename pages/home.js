import { profile } from "../data/profile.js";
import { projects } from "../data/projects.js";

const $ = (sel) => document.querySelector(sel);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function architectureSvg(width, steps) {
  const stepCount = steps.length;
  const gap = Math.max(1, Math.floor(width / Math.max(stepCount, 3)));
  const nodes = steps
    .map((s, idx) => {
      const x = 18 + idx * gap;
      const y = 16;
      return `
        <g>
          <rect x="${x}" y="${y}" rx="10" ry="10" width="${Math.max(120, gap - 8)}" height="28" fill="rgba(255,255,255,0.03)" stroke="rgba(60,255,176,0.35)"/>
          <text x="${x + 10}" y="${y + 19}" fill="rgba(201,209,217,0.95)" font-size="11" font-family="ui-monospace, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace">${escapeHtml(
            s.replace("→", "").trim()
          ).slice(0, 20)}</text>
        </g>`;
    })
    .join("");

  const arrows = new Array(stepCount - 1)
    .fill(0)
    .map((_, idx) => {
      const x1 = 120 + idx * gap;
      return `<polygon points="${x1},30 ${x1 + 10},16 ${x1 + 20},30" fill="rgba(0,229,255,0.55)"/>`;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${width} 60" width="100%" height="60" role="img" aria-label="Architecture flow">
      <rect x="0" y="0" width="${width}" height="60" rx="14" fill="rgba(0,0,0,0)"/>
      ${arrows}
      ${nodes}
    </svg>`;
}

function buildSectionHeader(title, accent = "") {
  return `
    <div class="section-header">
      <div>
        <h2>${escapeHtml(title)}${accent ? ` <span>${escapeHtml(accent)}</span>` : ""}</h2>
      </div>
    </div>`;
}

function renderProjects() {
  return projects
    .map((p) => {
      return `
      <div class="card">
        <div class="card-title">
          <h3>${escapeHtml(p.title)}</h3>
          <span class="tag">${escapeHtml(p.tag)}</span>
        </div>

        <div class="subhead">Problem</div>
        <p>${escapeHtml(p.problem)}</p>

        <div class="subhead">Solution</div>
        <p>${escapeHtml(p.solution)}</p>

        <div class="subhead">Tech Stack</div>
        <div class="row" style="margin-bottom:8px;">
          ${p.techStack.map((t) => `<span class="badge"><i></i>${escapeHtml(t)}</span>`).join("")}
        </div>

        <div class="subhead">Architecture</div>
        ${architectureSvg(720, p.architectureSteps)}

        <div class="divider"></div>
        <ul class="list">
          ${p.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}
        </ul>
      </div>`;
    })
    .join("");
}

function renderExperience() {
  return profile.experience
    .map((e) => {
      return `
      <div class="card">
        <div class="card-title">
          <h3>${escapeHtml(e.role)}</h3>
          <span class="tag">${escapeHtml(e.period)}</span>
        </div>
        <p style="margin-bottom:6px;"><strong style="color: var(--text); font-weight: 650;">${escapeHtml(e.company)}</strong> <span style="color: var(--muted);">${escapeHtml(
        e.location
      )}</span></p>
        <ul class="list">
          ${e.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}
        </ul>
        <div style="margin-top:10px;" class="row">
          ${e.tags.map((t) => `<span class="badge"><i></i>${escapeHtml(t)}</span>`).join("")}
        </div>
      </div>`;
    })
    .join("");
}

function renderTechStack() {
  const t = profile.techStack;
  const groups = [
    { label: "Languages", items: t.languages },
    { label: "Backend", items: t.backend },
    { label: "Databases", items: t.databases },
    { label: "Cloud", items: t.cloud },
    { label: "AI", items: t.ai },
    { label: "Tools", items: t.tools }
  ];

  return groups
    .map((g) => {
      return `
      <div class="kpi">
        <div class="kpi-label">${escapeHtml(g.label)}</div>
        <div class="row">
          ${g.items.map((x) => `<span class="badge"><i></i>${escapeHtml(x)}</span>`).join("")}
        </div>
      </div>`;
    })
    .join("");
}

function renderSkills() {
  const s = profile.skillsShowcase || [];
  if (!s.length) return "";

  return s
    .map((sec) => {
      return `
      <div class="card">
        <div class="terminal-title">${escapeHtml(sec.category)}</div>
        <div class="skills-list">
          ${(sec.items || [])
            .map((item) => `<span class="badge"><i></i>${escapeHtml(item)}</span>`)
            .join("")}
        </div>
      </div>`;
    })
    .join("");
}

function renderHomeHtml() {
  const c = profile.contacts;
  return `
  <div class="top-nav">
    <div class="container top-nav-inner">
      <div class="brand">
        <div class="brand-mark" aria-hidden="true"></div>
        <div>
          <div class="brand-title">${escapeHtml(profile.name)} / backend workspace</div>
        </div>
      </div>
      <div class="nav-links" role="navigation" aria-label="Primary">
        <a class="nav-link" href="#about">About</a>
        <a class="nav-link" href="#skills">Skills</a>
        <a class="nav-link" href="#projects">Projects</a>
        <a class="nav-link" href="#system-design">System Design</a>
        <a class="nav-link" href="#contact">Contact</a>
      </div>
      <div class="nav-actions">
        <button class="btn" id="themeToggle" type="button" aria-label="Toggle theme">Theme</button>
      </div>
    </div>
  </div>

  <main>
    <section class="hero" id="home">
      <div class="container hero-grid">
        <div>
          <div class="terminal-title">WELCOME</div>
          <h1 class="hero-title">
            Hi, I&#39;m <span class="accent">${escapeHtml(profile.name)}</span>
          </h1>
          <p class="hero-subtitle">${escapeHtml(profile.heroTitle)}</p>

          <div class="hero-ctas">
            <a class="btn" href="#projects">View Projects</a>
            <a class="btn" href="#contact">Contact Me</a>
            <a class="btn" href="${c.github}" target="_blank" rel="noreferrer noopener">GitHub</a>
          </div>

          <div style="height:14px;"></div>

          <div class="kpi-row">
            <div class="kpi">
              <div class="kpi-label">Current Focus</div>
              <div class="kpi-value">${escapeHtml(profile.currentFocus[0])}</div>
            </div>
            <div class="kpi">
              <div class="kpi-label">Stack</div>
              <div class="kpi-value">FastAPI · GCP · BigQuery</div>
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="terminal-title">CONNECTIONS</div>
          <div class="subhead">Quick Links</div>
          <div class="row">
            <a class="btn" href="${c.linkedin}" target="_blank" rel="noreferrer noopener">LinkedIn</a>
            <a class="btn" href="${c.x}" target="_blank" rel="noreferrer noopener">X</a>
            <a class="btn" href="${c.medium}" target="_blank" rel="noreferrer noopener">Blog</a>
            <a class="btn" href="mailto:${c.email}">Email</a>
          </div>

          <div class="divider"></div>

          <div class="subhead">Location</div>
          <div style="color: var(--text); font-family: var(--mono); font-size: 13px;">${escapeHtml(
            profile.location
          )}</div>

          <div class="divider"></div>

          <div class="subhead">Profile Note</div>
          <p style="margin:0; color: var(--muted); line-height: 1.7;">
            ${escapeHtml(profile.summary)}
          </p>
        </div>
      </div>
    </section>

    <section class="section" id="about">
      <div class="container">
        <div class="section-header">
          <div>
            <h2>About <span>Me</span></h2>
          </div>
          <div class="badge"><i></i>Backend systems · Data pipelines</div>
        </div>
        <div class="grid-2">
          <div class="card">
            <div class="terminal-title">DEVELOPER STATEMENT</div>
            <p style="margin-top:8px; color: var(--muted); line-height: 1.7;">
              ${escapeHtml(profile.roleLine)}.
            </p>
            <div class="divider"></div>
            <p style="color: var(--muted); line-height: 1.7;">
              ${escapeHtml(profile.summary)}
            </p>
          </div>
          <div class="card">
            <div class="terminal-title">WHAT I BUILD</div>
            <ul class="list" style="margin-top:10px;">
              <li>APIs that are reliable under load and designed for evolution.</li>
              <li>Data-driven architectures with analytics workflows and orchestration.</li>
              <li>Integration patterns for cloud services and AI-assisted processing.</li>
              <li>Performance-minded database access and query strategies.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="tech">
      <div class="container">
        <div class="section-header">
          <div>
            <h2>Tech <span>Stack</span></h2>
          </div>
          <div class="badge"><i></i>Languages · Backend · DB · Cloud</div>
        </div>
        <div class="grid-3">
          ${renderTechStack()}
        </div>
      </div>
    </section>

    <section class="section" id="skills">
      <div class="container">
        <div class="section-header">
          <div>
            <h2>All <span>Skills</span></h2>
          </div>
          <div class="badge"><i></i>Tools · Certifications · Backend · Data</div>
        </div>
        <div class="scroll-panel">
          <div class="scroll-panel-inner">
            ${renderSkills()}
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="projects">
      <div class="container">
        <div class="section-header">
          <div>
            <h2>Projects <span>Focused</span></h2>
          </div>
          <div class="badge"><i></i>Problem → Solution → Architecture</div>
        </div>
        <div class="scroll-panel">
          <div class="scroll-panel-inner">
            ${renderProjects()}
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="system-design">
      <div class="container">
        <div class="section-header">
          <div>
            <h2>System <span>Design</span></h2>
          </div>
          <div class="badge"><i></i>Notifications · Scalable APIs</div>
        </div>
        <div class="grid-2">
          <div class="card">
            <div class="terminal-title">HOW I BUILD SYSTEMS</div>
            <div class="subhead">Notification System</div>
            <ul class="list" style="margin-top:6px;">
              <li>Cron jobs for scheduled reminders</li>
              <li>Database-backed event triggers</li>
              <li>Retries, deduplication, and idempotency guarantees</li>
              <li>Operational visibility via logs and metrics</li>
            </ul>
            <div class="divider"></div>
            <div class="subhead">Typical Flow</div>
            ${architectureSvg(720, [
              "Scheduler",
              "DB events",
              "Notification pipeline",
              "Delivery",
              "Observability"
            ])}
          </div>
          <div class="card">
            <div class="terminal-title">SCALABLE APIS</div>
            <div class="subhead">API Reliability & Performance</div>
            <ul class="list" style="margin-top:6px;">
              <li>Async processing where latency matters</li>
              <li>Caching for hot paths and computed results</li>
              <li>Load handling with pagination and backpressure</li>
              <li>Clear contracts, versioning, and input validation</li>
              <li>Safe orchestration for AI-assisted workflows</li>
            </ul>
            <div class="divider"></div>
            <div class="subhead">Request Path</div>
            ${architectureSvg(720, [
              "Client",
              "API gateway",
              "Worker / Queue",
              "DB / Cache",
              "Response"
            ])}
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="experience">
      <div class="container">
        <div class="section-header">
          <div>
            <h2>Experience <span>Timeline</span></h2>
          </div>
          <div class="badge"><i></i>Backend roles · Python · Go · FastAPI</div>
        </div>
        <div class="grid-3">
          ${renderExperience()}
        </div>
      </div>
    </section>

    <section class="section" id="stats">
      <div class="container">
        <div class="section-header">
          <div>
            <h2>GitHub <span>Stats</span></h2>
          </div>
          <div class="badge"><i></i>Best-effort live fetch</div>
        </div>
        <div class="grid-2">
          <div class="card">
            <div class="terminal-title">PROFILE SUMMARY</div>
            <div id="githubSummary" style="margin-top:12px; color: var(--muted); font-family: var(--mono); font-size: 13px;">
              Loading...
            </div>
            <div class="divider"></div>
            <div class="subhead">Repository Count</div>
            <div id="repoCount" style="color: var(--text); font-family: var(--mono); font-size: 20px;">-</div>
          </div>
          <div class="card">
            <div class="terminal-title">LINKS</div>
            <p style="margin-top:10px; color: var(--muted); line-height: 1.7;">
              Explore repositories and open projects on GitHub. If you prefer a walkthrough, message me and I&#39;ll share architecture notes.
            </p>
            <div class="row" style="margin-top:14px;">
              <a class="btn" href="${c.github}" target="_blank" rel="noreferrer noopener">Open GitHub</a>
              <a class="btn" href="${c.linkedin}" target="_blank" rel="noreferrer noopener">Connect</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="contact">
      <div class="container">
        <div class="section-header">
          <div>
            <h2>Contact <span>Me</span></h2>
          </div>
          <div class="badge"><i></i>Let&#39;s build scalable backend systems</div>
        </div>

        <div class="grid-2">
          <div class="card">
            <div class="terminal-title">EMAIL</div>
            <p style="margin-top:10px; color: var(--muted); line-height: 1.7;">
              Send details about your product, data workflow, or API requirements.
            </p>
            <div class="divider"></div>
            <div class="row">
              <a class="btn" href="mailto:${c.email}?subject=Backend%20Portfolio%20Inquiry">Email me</a>
              <a class="btn" href="${c.linkedin}" target="_blank" rel="noreferrer noopener">LinkedIn</a>
            </div>
            <div class="divider"></div>
            <div class="subhead">Phone</div>
            <div style="color: var(--text); font-family: var(--mono);">${escapeHtml(profile.phone)}</div>
          </div>

          <div class="card">
            <div class="terminal-title">QUICK CHECKLIST</div>
            <ul class="list" style="margin-top:10px;">
              <li>What does your API need to do (inputs/outputs)?</li>
              <li>How big are your datasets and traffic expectations?</li>
              <li>Where will the system run (GCP, Cloud SQL, Vertex AI)?</li>
              <li>Do you need AI-assisted workflows (NL-to-SQL, OCR, analytics)?</li>
            </ul>
            <div class="divider"></div>
            <div class="subhead">Also interested in</div>
            <div class="row">
              <span class="badge"><i></i>Performance</span>
              <span class="badge"><i></i>Integrations</span>
              <span class="badge"><i></i>Security</span>
              <span class="badge"><i></i>Monitoring</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="container">
        <div>© ${new Date().getFullYear()} ${escapeHtml(profile.name)}. Built as a developer workspace portfolio.</div>
      </div>
    </footer>
  </main>
  `;
}

function applyTheme(theme) {
  const root = document.documentElement;
  // data-theme enables light CSS overrides.
  if (theme === "light") {
    root.dataset.theme = "light";
    root.style.setProperty("--bg", "#f6f8fa");
    root.style.setProperty("--panel", "rgba(255, 255, 255, 0.86)");
  } else {
    root.dataset.theme = "dark";
    if (theme === "midnight") {
      root.style.setProperty("--bg", "#05070c");
      root.style.setProperty("--panel", "rgba(5, 7, 12, 0.78)");
    } else {
      root.style.setProperty("--bg", "#0d1117");
      root.style.setProperty("--panel", "rgba(13, 17, 23, 0.72)");
    }
  }
}

function renderAndWire() {
  const root = $("#root");
  root.innerHTML = renderHomeHtml();

  // Theme
  const themeToggle = $("#themeToggle");
  let storedTheme = localStorage.getItem("theme") || "dark";
  if (storedTheme !== "dark" && storedTheme !== "light" && storedTheme !== "midnight") {
    storedTheme = "dark";
  }
  applyTheme(storedTheme === "midnight" ? "midnight" : storedTheme);
  themeToggle.textContent = storedTheme === "light" ? "Light" : "Dark";
  themeToggle.addEventListener("click", () => {
    const next = storedTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", next);
    storedTheme = next;
    applyTheme(next);
    themeToggle.textContent = storedTheme === "light" ? "Light" : "Dark";
  });

  // GitHub stats (best-effort).
  const githubSummary = $("#githubSummary");
  const repoCountEl = $("#repoCount");
  const username = profile.contacts.github.replace("https://github.com/", "").replace("http://github.com/", "").replace("/", "");

  async function loadGitHub() {
    try {
      githubSummary.textContent = "Fetching profile...";
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
      const user = await res.json();

      const reposRes = await fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=1&sort=pushed&order=desc`
      );

      // Some browsers might not allow pagination headers to reveal total count; keep it simple.
      const repoHint = user.public_repos;

      githubSummary.innerHTML = `
        <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
          <img alt="GitHub avatar" src="${escapeHtml(user.avatar_url)}" width="44" height="44" style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.12);" />
          <div>
            <div style="color: var(--text); font-size: 14px; font-weight: 700;">${escapeHtml(user.name || user.login)}</div>
            <div style="color: var(--muted); margin-top:2px;">${escapeHtml(user.bio || "Backend developer focused on APIs, data workflows, and system design.")}</div>
          </div>
        </div>
      `;
      repoCountEl.textContent = String(repoHint ?? "-");
      if (reposRes.ok) {
        // Intentionally not listing repos to keep UI fast.
      }
    } catch (err) {
      githubSummary.textContent = "GitHub stats unavailable (offline or rate-limited).";
      repoCountEl.textContent = "-";
    }
  }

  loadGitHub();
}

// Boot
document.addEventListener("DOMContentLoaded", () => {
  renderAndWire();
});

