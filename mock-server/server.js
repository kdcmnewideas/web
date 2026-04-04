// mock-server/server.js
// Standalone server entry-point — run with: node mock-server/server.js
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({ noCors: false });
const customMiddleware = require('./middlewares');

// ── Add a slight artificial delay so loading-state tests work ────────────────
server.use((req, res, next) => {
  setTimeout(next, 300);
});

// ── Standard json-server middleware (logging, static, CORS) ─────────────────
server.use(middlewares);

// ── Parse JSON bodies ────────────────────────────────────────────────────────
server.use(jsonServer.bodyParser);

// ── Custom routes (auth, orgs, dashboard, analytics …) ──────────────────────
server.use(customMiddleware);

// ── json-server router (CRUD for boards, courses, classes …) ─────────────────
server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log('\n🚀 Mock server running!');
  console.log(`   http://localhost:${PORT}\n`);
  console.log('Available resources:');
  [
    '/users', '/profiles', '/organizations', '/members',
    '/boards', '/courses', '/classes', '/sections',
    '/subjects', '/enrollments', '/ingestion_jobs',
    '/assessments', '/goals', '/ai_keys',
  ].forEach(r => console.log(`  GET http://localhost:${PORT}${r}`));
  console.log('\nCustom endpoints:');
  [
    'POST /auth/login', 'GET /auth/me',
    'GET  /admin/users/', 'POST /admin/users/:id/role',
    'GET  /orgs/', 'GET /orgs/:id/members',
    'GET  /subjects/:id/content', 'GET /subjects/:id/complete',
    'GET  /chapters/:id/topics/all',
    'POST /topics', 'POST /topics/:id/subtopics/generate',
    'POST /ingestion/pdf', 'GET /jobs/:id/status', 'GET /metrics',
    'POST /assessments/submit', 'GET /assessments/history',
    'GET  /dashboard', 'GET /dashboard/recent', 'GET /dashboard/trend', 'GET /dashboard/mastery',
    'POST /analytics/track-time', 'GET /analytics/readiness/:id', 'GET /analytics/mastery/:id',
    'POST /leaderboard/top-10', 'GET /leaderboard/my-rank',
    'GET  /goals/', 'PUT /goals/:id',
    'GET  /key/', 'POST /key/', 'GET /key/:id/analytics',
    'GET  /health', 'GET /metrics',
  ].forEach(e => console.log(`  ${e}`));
});
