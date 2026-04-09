// mock-server/middlewares.js
// Comprehensive middleware for JSON Server covering all Angular services.
const fs = require('fs');
const path = require('path');

function readDb() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8'));
}

function extractId(url, segment) {
  const parts = url.split('/');
  const idx = parts.indexOf(segment);
  return idx !== -1 ? parts[idx + 1] : null;
}

module.exports = (req, res, next) => {
  const { method, path: reqPath } = req;
  const db = readDb();

  // ─── Helpers ───────────────────────────────────────────────────────────────
  const ok = (data) => res.status(200).json(data);
  const created = (data) => res.status(201).json(data);
  const noContent = () => res.status(200).json({ message: 'Success' });

  // ══════════════════════════════════════════════════════════════════
  // AUTH SERVICE  (userServiceAPI + '/auth')
  // ══════════════════════════════════════════════════════════════════
  if (reqPath.startsWith('/auth')) {
    // POST /auth/login
    if (method === 'POST' && reqPath === '/auth/login') {
      return ok({
        access_token: 'mock-access-token-' + Math.random().toString(36).slice(2),
        refresh_token: 'mock-refresh-token-' + Math.random().toString(36).slice(2),
        token_type: 'bearer',
        expires_in: 3600,
      });
    }

    // POST /auth/register
    if (method === 'POST' && reqPath === '/auth/register') {
      return created({
        id: require('crypto').randomUUID(),
        email: req.body?.email || 'user@example.com',
        name: req.body?.name || 'New User',
        status: 'Pending',
        message: 'Registration successful. Please verify your email.',
      });
    }

    // POST /auth/verify
    if (method === 'POST' && reqPath === '/auth/verify') {
      return ok('Email verified successfully');
    }

    // POST /auth/forgot-password
    if (method === 'POST' && reqPath === '/auth/forgot-password') {
      return ok('Password reset link sent to your email.');
    }

    // POST /auth/reset-password
    if (method === 'POST' && reqPath === '/auth/reset-password') {
      return ok('Password reset successfully.');
    }

    // POST /auth/refresh
    if (method === 'POST' && reqPath.includes('/auth/refresh')) {
      return ok({
        access_token: 'mock-refreshed-token-' + Math.random().toString(36).slice(2),
        refresh_token: 'mock-refresh-token-' + Math.random().toString(36).slice(2),
        token_type: 'bearer',
        expires_in: 3600,
      });
    }

    // GET /auth/me
    if (method === 'GET' && reqPath === '/auth/me') {
      return ok(db.profiles[0]);
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // PLATFORM MANAGEMENT  (userServiceAPI + '/admin/users')
  // ══════════════════════════════════════════════════════════════════
  if (reqPath.startsWith('/admin/users')) {
    const parts = reqPath.split('/').filter(Boolean); // ['admin','users',id?,action?]
    const userId = parts[2];
    const action = parts[3];

    // GET /admin/users/
    if (method === 'GET' && !userId) {
      return ok(db.users);
    }
    // POST /admin/users/  (create user)
    if (method === 'POST' && !userId) {
      const newUser = {
        id: require('crypto').randomUUID(),
        ...req.body,
        created_at: new Date().toISOString(),
      };
      return created(newUser);
    }
    // PUT /admin/users/:id
    if (method === 'PUT' && userId && !action) {
      const user = db.users.find((u) => u.id === userId) || db.users[0];
      return ok({ ...user, ...req.body });
    }
    // POST /admin/users/:id/role
    if (method === 'POST' && userId && action === 'role') {
      const user = db.users.find((u) => u.id === userId) || db.users[0];
      return ok({ ...user, platform_role: req.body?.platform_role });
    }
    // POST /admin/users/:id/disable
    if (method === 'POST' && userId && action === 'disable') {
      const user = db.users.find((u) => u.id === userId) || db.users[0];
      return ok({ ...user, status: 'Inactive' });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // ORGANIZATION SERVICE  (userServiceAPI + '/orgs')
  // ══════════════════════════════════════════════════════════════════
  if (reqPath.startsWith('/orgs')) {
    const parts = reqPath.split('/').filter(Boolean); // ['orgs', orgId?, segment?, id?, action?]
    const orgId = parts[1];
    const segment = parts[2];
    const subId = parts[3];
    const subAction = parts[4];

    // POST /orgs/join
    if (method === 'POST' && orgId === 'join') {
      return ok(db.organizations[0]);
    }

    // GET /orgs/
    if (method === 'GET' && !orgId) return ok(db.organizations);

    // POST /orgs/  (create org)
    if (method === 'POST' && !orgId) {
      return created({
        id: require('crypto').randomUUID(),
        ...req.body,
        join_mode: 'invite',
        created_at: new Date().toISOString(),
      });
    }

    // GET /orgs/:id
    if (method === 'GET' && orgId && !segment) {
      return ok(db.organizations.find((o) => o.id === orgId) || db.organizations[0]);
    }

    // PATCH /orgs/:id
    if (method === 'PATCH' && orgId && !segment) {
      return ok({ ...db.organizations[0], ...req.body });
    }

    // GET /orgs/:id/members
    if (method === 'GET' && orgId && segment === 'members' && !subId) {
      return ok(db.members.filter((m) => m.org_id === orgId) || db.members.slice(0, 5));
    }

    // POST /orgs/:id/members
    if (method === 'POST' && orgId && segment === 'members' && !subId) {
      return created({
        id: require('crypto').randomUUID(),
        org_id: orgId,
        ...req.body,
        status: 'pending',
      });
    }

    // PATCH /orgs/:id/members/:memberId
    if (method === 'PATCH' && orgId && segment === 'members' && subId) {
      return ok({ ...db.members[0], ...req.body });
    }

    // POST /orgs/:id/members/bulk
    if (method === 'POST' && orgId && segment === 'members' && subId === 'bulk') {
      return ok({ total_processed: 10, success_count: 9, error_count: 1, errors: [] });
    }

    // POST /orgs/:id/members/approve
    if (method === 'POST' && orgId && segment === 'members' && subId === 'approve') {
      return ok('Members approved successfully');
    }

    // POST /orgs/:id/members/reject
    if (method === 'POST' && orgId && segment === 'members' && subId === 'reject') {
      return ok('Members rejected');
    }

    // POST /orgs/:id/rotate-join-key
    if (method === 'POST' && orgId && segment === 'rotate-join-key') {
      return ok({
        join_key: Math.random().toString(36).slice(2, 10).toUpperCase(),
        expires_at: new Date(Date.now() + 86400000).toISOString(),
      });
    }

    // POST /orgs/:id/accept
    if (method === 'POST' && orgId && segment === 'accept') return ok('Invite accepted');

    // POST /orgs/:id/invites/:inviteId/resend
    if (method === 'POST' && orgId && segment === 'invites' && subAction === 'resend') {
      return ok('Invite resent');
    }

    // DELETE /orgs/:id/invites/:inviteId
    if (method === 'DELETE' && orgId && segment === 'invites' && subId) {
      return ok('Invite cancelled');
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // BOARDS  →  json-server handles GET/POST/PATCH/DELETE /boards/*
  // ══════════════════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════════════════
  // COURSES  →  json-server handles /courses/*
  // ══════════════════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════════════════
  // CLASSES  →  json-server handles /classes/*
  // ══════════════════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════════════════
  // SECTIONS →  json-server handles /sections/*
  // ══════════════════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════════════════
  // ENROLLMENT SERVICE  (circulumAPI + '/enrollments')
  // ══════════════════════════════════════════════════════════════════
  if (reqPath.startsWith('/enrollments')) {
    const parts = reqPath.split('/').filter(Boolean);
    const seg1 = parts[1]; // enrollmentId or 'classes'
    const seg2 = parts[2]; // classId
    const seg3 = parts[3]; // 'enroll' or 'bulk-upload'

    // POST /enrollments  (join by code)
    if (method === 'POST' && !seg1) return ok('Joined class successfully');

    // POST /enrollments/:id/approve
    if (method === 'POST' && seg1 && parts[2] === 'approve') {
      return ok('Enrollment approved');
    }

    // POST /enrollments/classes/:classId/enroll
    if (method === 'POST' && seg1 === 'classes' && seg3 === 'enroll') {
      return ok('Student enrolled successfully');
    }

    // POST /enrollments/classes/:classId/bulk-upload
    if (method === 'POST' && seg1 === 'classes' && seg3 === 'bulk-upload') {
      return ok('Bulk enroll initiated');
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // SUBJECTS  →  json-server handles GET/POST/PATCH/DELETE /subjects/*
  // Extra subject-specific nested routes:
  // ══════════════════════════════════════════════════════════════════
  if (reqPath.startsWith('/subjects')) {
    const parts = reqPath.split('/').filter(Boolean);
    const subjectId = parts[1];
    const segment = parts[2];

    // GET /subjects/:id/content
    if (method === 'GET' && subjectId && segment === 'content') {
      const sub = db.subjects.find((s) => s.id === subjectId) || db.subjects[0];
      return ok({
        id: sub.id,
        title: sub.title,
        description: sub.description,
        chapters: [
          {
            id: require('crypto').randomUUID(),
            title: 'Chapter 1: Introduction',
            topics: [
              { id: require('crypto').randomUUID(), title: 'Topic 1.1', subtopics: [] },
              { id: require('crypto').randomUUID(), title: 'Topic 1.2', subtopics: [] },
            ],
          },
        ],
      });
    }

    // GET /subjects/:id/complete
    if (method === 'GET' && subjectId && segment === 'complete') {
      const sub = db.subjects.find((s) => s.id === subjectId) || db.subjects[0];
      return ok({
        id: sub.id,
        title: sub.title,
        description: sub.description,
        thumbnail_url: sub.thumbnail_url,
        org_id: sub.org_id,
        board_id: require('crypto').randomUUID(),
        class_id: require('crypto').randomUUID(),
        category_id: require('crypto').randomUUID(),
        created_by: db.users[0]?.id,
        created_at: sub.created_at,
        total_input_tokens: 15000,
        total_output_tokens: 4500,
        estimated_cost_usd: 0.042,
        chapters: [
          { id: require('crypto').randomUUID(), title: 'Chapter 1', topics: [] },
          { id: require('crypto').randomUUID(), title: 'Chapter 2', topics: [] },
        ],
      });
    }

    // GET /subjects/:id/questions
    if (method === 'GET' && subjectId && segment === 'questions') {
      return ok([
        {
          id: require('crypto').randomUUID(),
          question: "What is Newton's First Law?",
          type: 'MCQ',
          options: ['A', 'B', 'C', 'D'],
        },
        {
          id: require('crypto').randomUUID(),
          question: 'Define kinetic energy.',
          type: 'DESCRIPTIVE',
          options: [],
        },
      ]);
    }

    // GET /subjects/:id/questions/generate-test
    if (method === 'GET' && subjectId && segment === 'questions' && parts[3] === 'generate-test') {
      return ok([
        {
          id: require('crypto').randomUUID(),
          question: 'Mock test question 1?',
          type: 'MCQ',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correct: 'A',
        },
        {
          id: require('crypto').randomUUID(),
          question: 'Mock test question 2?',
          type: 'FILL_BLANK',
          options: [],
        },
      ]);
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // CHAPTERS (contentAPI)
  // ══════════════════════════════════════════════════════════════════
  if (reqPath.startsWith('/chapters')) {
    const parts = reqPath.split('/').filter(Boolean);
    const chapterId = parts[1];
    const segment = parts[2];

    // GET /chapters/:id/content
    if (method === 'GET' && chapterId && segment === 'content') {
      return ok({
        id: chapterId,
        title: 'Mock Chapter',
        topics: [
          { id: require('crypto').randomUUID(), title: 'Topic A', subtopics: [] },
          { id: require('crypto').randomUUID(), title: 'Topic B', subtopics: [] },
        ],
        start_page: 1,
      });
    }

    // GET /chapters/:id/topics/all
    if (method === 'GET' && chapterId && segment === 'topics' && parts[3] === 'all') {
      return ok([
        {
          id: require('crypto').randomUUID(),
          title: 'Topic 1',
          chapter_id: chapterId,
          subtopics: [],
        },
        {
          id: require('crypto').randomUUID(),
          title: 'Topic 2',
          chapter_id: chapterId,
          subtopics: [],
        },
        {
          id: require('crypto').randomUUID(),
          title: 'Topic 3',
          chapter_id: chapterId,
          subtopics: [],
        },
      ]);
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // TOPICS (contentAPI + CurriculumAdmin)
  // ══════════════════════════════════════════════════════════════════
  if (reqPath.startsWith('/topics')) {
    const parts = reqPath.split('/').filter(Boolean);
    const topicId = parts[1];
    const segment = parts[2];

    // POST /topics  (create topic)
    if (method === 'POST' && !topicId) {
      return created({ id: require('crypto').randomUUID(), ...req.body, subtopics: [] });
    }

    // GET /topics/:id/content
    if (method === 'GET' && topicId && segment === 'content') {
      return ok({ id: topicId, title: 'Mock Topic', status: 'active', subtopics: [] });
    }

    // PATCH /topics/:id/status
    if (method === 'PATCH' && topicId && segment === 'status') {
      return ok({
        id: topicId,
        title: 'Mock Topic',
        status: req.body?.status || 'active',
        subtopics: [],
      });
    }

    // POST /topics/:id/subtopics/generate
    if (method === 'POST' && topicId && segment === 'subtopics' && parts[3] === 'generate') {
      return ok('AI content generation queued. Subtopics will be available shortly.');
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // INGESTION SERVICE  (contentAPI)
  // ══════════════════════════════════════════════════════════════════

  // POST /ingestion/pdf
  if (method === 'POST' && reqPath === '/ingestion/pdf') {
    const job = db.ingestion_jobs[0] || {};
    return created({
      job_id: require('crypto').randomUUID(),
      status: 'PENDING',
      subject_id: job.subject_id || require('crypto').randomUUID(),
      file_url: 'https://mock-storage.example.com/files/upload.pdf',
      progress_url: 'http://localhost:3000/jobs/:id/status',
      queue_backend: 'redis',
      estimated_completion_time: new Date(Date.now() + 120000).toISOString(),
      estimated_cost_usd: 0.025,
    });
  }

  // POST /ingestion/pdf/estimate
  if (method === 'POST' && reqPath === '/ingestion/pdf/estimate') {
    return ok({
      estimated_cost_usd: 0.025,
      estimated_input_tokens: 45000,
      estimated_output_tokens: 12000,
      max_cost_usd: 0.05,
      model: 'gemini-2.5-pro',
      total_pages: 42,
      within_budget: true,
    });
  }

  // GET /jobs  (job list)
  if (method === 'GET' && reqPath.startsWith('/jobs') && !reqPath.split('/')[2]) {
    const jobs = db.ingestion_jobs || [];
    return ok({ jobs, total: jobs.length, skip: 0, limit: 100 });
  }

  // GET /jobs/:id/status
  if (method === 'GET' && reqPath.startsWith('/jobs/') && reqPath.includes('/status')) {
    const jobId = reqPath.split('/')[2];
    const job = db.ingestion_jobs.find((j) => j.id === jobId) || db.ingestion_jobs[0];
    return ok({
      job_id: job?.id || jobId,
      status: job?.status || 'PROCESSING',
      current_stage: job?.current_stage || 'STRUCTURING',
      progress_percentage: job?.progress_percentage || 65,
      processed_chapters: 3,
      total_chapters: 8,
      estimated_time_remaining: 45,
      started_at: new Date(Date.now() - 60000).toISOString(),
      created_at: job?.created_at || new Date().toISOString(),
    });
  }

  // DELETE /jobs/:id/cancel
  if (method === 'DELETE' && reqPath.startsWith('/jobs/') && reqPath.includes('/cancel')) {
    return ok('Job cancelled successfully');
  }

  // GET /jobs/:id/content
  if (method === 'GET' && reqPath.startsWith('/jobs/') && reqPath.includes('/content')) {
    const sub = db.subjects[0] || {};
    return ok({
      id: sub.id || require('crypto').randomUUID(),
      title: sub.title || 'Mock Subject',
      description: sub.description || 'Mock description',
      thumbnail_url: sub.thumbnail_url || '',
      org_id: sub.org_id || require('crypto').randomUUID(),
      board_id: require('crypto').randomUUID(),
      class_id: require('crypto').randomUUID(),
      category_id: require('crypto').randomUUID(),
      created_by: db.users[0]?.id,
      created_at: sub.created_at || new Date().toISOString(),
      total_input_tokens: 10000,
      total_output_tokens: 3500,
      estimated_cost_usd: 0.02,
      chapters: [
        { id: require('crypto').randomUUID(), title: 'Chapter 1', topics: [] },
        { id: require('crypto').randomUUID(), title: 'Chapter 2', topics: [] },
      ],
    });
  }

  // GET /health
  if (method === 'GET' && reqPath === '/health') {
    return ok({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      checks: { database: 'ok', queue: 'ok', storage: 'ok' },
    });
  }

  // GET /metrics
  if (method === 'GET' && reqPath === '/metrics') {
    return ok({
      total_jobs: db.ingestion_jobs.length,
      completed: db.ingestion_jobs.filter((j) => j.status === 'COMPLETED').length,
      processing: db.ingestion_jobs.filter((j) => j.status === 'PROCESSING').length,
      pending: db.ingestion_jobs.filter((j) => j.status === 'PENDING').length,
      failed: db.ingestion_jobs.filter((j) => j.status === 'FAILED').length,
      success_rate: 0.92,
      average_cost_usd: 0.028,
      queue_backend: 'redis',
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // CURRICULUM SERVICE (contentAPI)
  // ══════════════════════════════════════════════════════════════════

  // POST /enroll  (student enroll in content service)
  if (method === 'POST' && reqPath === '/enroll') {
    return created({
      id: require('crypto').randomUUID(),
      user_id: req.body?.user_id || db.users[0]?.id,
      subject_id: req.body?.subject_id || db.subjects[0]?.id,
      created_at: new Date().toISOString(),
    });
  }

  // POST /assets/upload
  if (method === 'POST' && reqPath === '/assets/upload') {
    return created({
      id: require('crypto').randomUUID(),
      asset_type: req.body?.asset_type || 'image',
      url: `https://mock-cdn.example.com/assets/${Math.random().toString(36).slice(2)}.jpg`,
      validation_summary: 'Asset uploaded and validated successfully.',
    });
  }

  // POST /upload-questions
  if (method === 'POST' && reqPath === '/upload-questions') {
    return ok('Questions uploaded and parsed successfully.');
  }

  // ══════════════════════════════════════════════════════════════════
  // ASSESSMENTS  (userProgressAPI + '/assessments')
  // ══════════════════════════════════════════════════════════════════
  if (reqPath.startsWith('/assessments')) {
    const parts = reqPath.split('/').filter(Boolean);
    const segment = parts[1]; // 'submit', 'history', or an ID

    // POST /assessments/submit
    if (method === 'POST' && segment === 'submit') {
      return created({
        id: Math.floor(Math.random() * 9000) + 1000,
        reference_id: req.body?.reference_id || db.subjects[0]?.id,
        assignment_type: req.body?.assignment_type || 'QUIZ',
        status: 'completed',
        completed_at: new Date().toISOString(),
        duration_seconds: req.body?.duration_seconds || 300,
        score: { score_obtained: 8, max_score: 10, percentage: 80, is_passed: true },
        feedback: {
          summary_text: 'Great performance! Keep it up.',
          detailed_analysis: {},
          suggested_actions: ['Review Chapter 2', 'Practice more MCQs'],
          user_submission: req.body?.user_answer || '',
        },
      });
    }

    // GET /assessments/history
    if (method === 'GET' && segment === 'history') {
      return ok(db.assessments.slice(0, 20));
    }

    // GET /assessments/:id
    if (method === 'GET' && segment && segment !== 'history') {
      const assessment = db.assessments.find((a) => String(a.id) === segment) || db.assessments[0];
      return ok({
        ...assessment,
        status: 'completed',
        duration_seconds: 420,
        score: { score_obtained: 7, max_score: 10, percentage: 70, is_passed: true },
        feedback: {
          summary_text: 'Good effort. Focus on improving weak areas.',
          detailed_analysis: {},
          suggested_actions: ['Review topic 3', 'Take more practice tests'],
          user_submission: 'Sample answer text',
        },
      });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // USER DASHBOARD  (userProgressAPI + '/dashboard')
  // ══════════════════════════════════════════════════════════════════
  if (reqPath.startsWith('/dashboard')) {
    const segment = reqPath.split('/')[2]; // 'recent', 'trend', 'mastery', or undefined

    // GET /dashboard  (user stats)
    if (method === 'GET' && !segment) {
      return ok({
        average_score: 74.5,
        total_exams_taken: db.assessments.length,
        goals_met_count: 3,
      });
    }

    // GET /dashboard/recent
    if (method === 'GET' && segment === 'recent') {
      return ok(db.assessments.slice(0, 5));
    }

    // GET /dashboard/trend
    if (method === 'GET' && segment === 'trend') {
      return ok(
        Array.from({ length: 14 }, (_, i) => ({
          exam_date: new Date(Date.now() - i * 86400000).toISOString(),
          score: Math.round(50 + Math.random() * 50),
          assignment_type: ['QUIZ', 'TEXT', 'MCQ'][i % 3],
        })),
      );
    }

    // GET /dashboard/mastery
    if (method === 'GET' && segment === 'mastery') {
      return ok({
        overall_ers: 72.4,
        subject_breakdown: db.subjects.slice(0, 4).map((s) => ({
          subject_id: s.id,
          average_score: Math.round(50 + Math.random() * 50),
          exams_taken: Math.floor(Math.random() * 10) + 1,
          mastery_status: ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)],
          ers_score: parseFloat((Math.random() * 100).toFixed(1)),
        })),
      });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // USER ANALYTICS  (userProgressAPI + '/analytics/')
  // ══════════════════════════════════════════════════════════════════
  if (reqPath.startsWith('/analytics')) {
    const parts = reqPath.split('/').filter(Boolean);
    const segment = parts[1]; // 'track-time', 'readiness', 'mastery'
    const subId = parts[2];

    // POST /analytics/track-time
    if (method === 'POST' && segment === 'track-time') return ok('Time tracked successfully');

    // GET /analytics/readiness/:subject_id
    if (method === 'GET' && segment === 'readiness' && subId) {
      return ok({
        subject_id: subId,
        exam_readiness_score: parseFloat((Math.random() * 100).toFixed(1)),
        exam_readiness_grade: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
        goal_readiness_score: parseFloat((Math.random() * 100).toFixed(1)),
        goal_readiness_status: ['on-track', 'at-risk', 'achieved'][Math.floor(Math.random() * 3)],
        goal_target: 80,
      });
    }

    // GET /analytics/mastery/:topic_id
    if (method === 'GET' && segment === 'mastery' && subId) {
      return ok({
        topic_id: subId,
        status: ['Beginner', 'Intermediate', 'Expert'][Math.floor(Math.random() * 3)],
        total_study_time_minutes: Math.floor(Math.random() * 300),
        total_assessment_time_minutes: Math.floor(Math.random() * 60),
        hesitation_ratio: parseFloat(Math.random().toFixed(2)),
        velocity_score: parseFloat((Math.random() * 10).toFixed(2)),
      });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // LEADERBOARD  (userProgressAPI + '/leaderboard')
  // ══════════════════════════════════════════════════════════════════
  if (reqPath.startsWith('/leaderboard')) {
    const segment = reqPath.split('/')[2];

    const mockRankings = db.users.slice(0, 10).map((u, i) => ({
      rank: i + 1,
      user_id: u.id,
      score: Math.round(95 - i * 5 + Math.random() * 3),
      exams_count: Math.floor(Math.random() * 20) + 1,
      is_current_user: i === 0,
    }));

    // POST /leaderboard/top-10
    if (method === 'POST' && segment === 'top-10') return ok(mockRankings);

    // POST /leaderboard/content-level
    if (method === 'POST' && segment === 'content-level') return ok(mockRankings.slice(0, 5));

    // GET /leaderboard/my-rank
    if (method === 'GET' && segment === 'my-rank') {
      return ok({ global_rank: 4, global_percentile: 92.5, current_score: 78 });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // GOALS  (userProgressAPI + '/goals/')
  // ══════════════════════════════════════════════════════════════════
  if (reqPath.startsWith('/goals')) {
    const parts = reqPath.split('/').filter(Boolean);
    const goalId = parts[1];

    // GET /goals/  (list by user)
    if (method === 'GET' && !goalId) return ok(db.goals.slice(0, 5));

    // POST /goals/
    if (method === 'POST' && !goalId) {
      return created({
        id: Math.floor(Math.random() * 9000) + 1000,
        ...req.body,
        current_score: 0,
        is_active: true,
        is_achieved: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }

    // GET /goals/:id
    if (method === 'GET' && goalId) {
      return ok(db.goals.find((g) => String(g.id) === goalId) || db.goals[0]);
    }

    // PUT /goals/:id
    if (method === 'PUT' && goalId) {
      return ok({ ...db.goals[0], ...req.body });
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // AI KEYS  (userProgressAPI + '/key/')
  // ══════════════════════════════════════════════════════════════════
  if (reqPath.startsWith('/key')) {
    const parts = reqPath.split('/').filter(Boolean);
    const keyId = parts[1];
    const segment = parts[2]; // 'usage' or 'analytics'
    console.log(method);
    // GET /key/
    if (method === 'GET' && !keyId) return ok(db.ai_keys || []);

    // POST /key/
    if (method === 'POST' && !keyId) {
      return created({
        id: Math.floor(Math.random() * 900) + 100,
        ...req.body,
        is_active: true,
        capabilities: ['TEXT'],
        total_cost: 0,
        created_at: new Date().toISOString(),
      });
    }

    // DELETE /key/:id
    if (method === 'DELETE' && keyId && !segment) return ok('API Key deleted');

    // POST /key/:id/usage
    if (method === 'POST' && keyId && segment === 'usage') return ok('Usage tracked');

    // GET /key/:id/analytics (note: service uses /key/:id/analytics not /key//:id/analytics)
    if (method === 'GET' && keyId && segment === 'analytics') {
      return ok(
        Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          capability_used: ['TEXT', 'IMAGE', 'EMBEDDING'][i % 3],
          operation: 'generate_content',
          model_used: 'gemini-2.5-pro',
          total_tokens: Math.floor(Math.random() * 5000) + 500,
          cost: parseFloat((Math.random() * 0.1).toFixed(5)),
          timestamp: new Date(Date.now() - i * 3600000).toISOString(),
        })),
      );
    }
  }

  // ══════════════════════════════════════════════════════════════════
  // Error simulation endpoints (for testing)
  // ══════════════════════════════════════════════════════════════════
  if (reqPath === '/api/error-500')
    return res.status(500).json({ error: 'Simulated 500 Internal Server Error' });
  if (reqPath === '/api/error-404')
    return res.status(404).json({ error: 'Simulated 404 Not Found' });

  // ── Pass everything else to json-server's built-in router ─────────
  next();
};
