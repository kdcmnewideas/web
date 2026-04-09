import { faker } from '@faker-js/faker';
import * as fs from 'fs';
import * as path from 'path';

// ─── Helpers ─────────────────────────────────────────────────────────────────
const uuid = () => faker.string.uuid();
const past = () => faker.date.past().toISOString();
const recent = () => faker.date.recent().toISOString();

// ─── Users & Profiles ────────────────────────────────────────────────────────
function generateUsers(count: number) {
  return Array.from({ length: count }, () => ({
    id: uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    status: faker.helpers.arrayElement(['Active', 'Inactive', 'Pending']),
    platform_role: faker.helpers.arrayElement(['admin', 'student', 'teacher', 'subadmin']),
    created_at: past(),
  }));
}

function generateProfiles(users: any[]) {
  return users.map(u => ({
    id: u.id,
    email: u.email,
    name: u.name,
    platform_role: u.platform_role,
    memberships: [
      {
        org_id: uuid(),
        org_name: faker.company.name(),
        org_role: faker.helpers.arrayElement(['admin', 'member', 'teacher']),
        status: 'active',
      },
    ],
  }));
}

// ─── Organizations & Members ─────────────────────────────────────────────────
function generateOrganizations(count: number) {
  return Array.from({ length: count }, () => ({
    id: uuid(),
    name: faker.company.name(),
    org_type: faker.helpers.arrayElement(['School', 'University', 'Corporate', 'Bootcamp']),
    tenant_code: faker.string.alphanumeric(5).toUpperCase(),
    join_mode: faker.helpers.arrayElement(['invite', 'open', 'request']),
    created_at: past(),
  }));
}

function generateMembers(users: any[], orgs: any[]) {
  return users.map(u => ({
    id: uuid(),
    user_id: u.id,
    org_id: faker.helpers.arrayElement(orgs).id,
    org_role: faker.helpers.arrayElement(['admin', 'member', 'teacher']),
    status: faker.helpers.arrayElement(['active', 'pending', 'inactive']),
    user_email: u.email,
  }));
}

// ─── Boards ──────────────────────────────────────────────────────────────────
function generateBoards(count: number) {
  return Array.from({ length: count }, () => ({
    id: uuid(),
    name: faker.helpers.arrayElement(['CBSE', 'ICSE', 'IB', 'Cambridge', 'State Board', 'NIOS']),
    code: faker.string.alphanumeric(4).toUpperCase(),
    country: faker.location.country(),
    state: faker.location.state(),
    is_active: faker.datatype.boolean(),
    description: faker.lorem.sentence(),
  }));
}

// ─── Courses ──────────────────────────────────────────────────────────────────
function generateCourses(boards: any[], count: number) {
  return Array.from({ length: count }, () => ({
    id: uuid(),
    name: faker.helpers.arrayElement(['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'English', 'Computer Science']) + ' ' + faker.helpers.arrayElement(['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']),
    code: faker.string.alphanumeric(6).toUpperCase(),
    board_id: faker.helpers.arrayElement(boards).id,
    is_active: faker.datatype.boolean(),
  }));
}

// ─── Classes ─────────────────────────────────────────────────────────────────
function generateClasses(courses: any[], orgs: any[], count: number) {
  return Array.from({ length: count }, () => {
    const now = new Date();
    const published = faker.date.past();
    return {
      id: uuid(),
      name: `Batch ${faker.string.alpha({ length: 2, casing: 'upper' })} - ${now.getFullYear()}`,
      join_code: faker.string.alphanumeric(6).toUpperCase(),
      allow_join_requests: faker.datatype.boolean(),
      org_id: faker.helpers.arrayElement(orgs).id,
      course_id: faker.helpers.arrayElement(courses).id,
      is_active: true,
      is_published: faker.datatype.boolean(),
      is_archived: false,
      published_at: published.toISOString(),
      created_at: past(),
      updated_at: recent(),
    };
  });
}

// ─── Sections ─────────────────────────────────────────────────────────────────
function generateSections(classes: any[], courses: any[], count: number) {
  return Array.from({ length: count }, () => ({
    id: uuid(),
    name: `Section ${faker.helpers.arrayElement(['A', 'B', 'C', 'D'])}`,
    join_code: faker.string.alphanumeric(6).toUpperCase(),
    course_id: faker.helpers.arrayElement(courses).id,
    class_id: faker.helpers.arrayElement(classes).id,
    is_active: true,
    created_at: past(),
    updated_at: recent(),
  }));
}

// ─── Subjects ─────────────────────────────────────────────────────────────────
function generateSubjects(orgs: any[], count: number) {
  const subjectTitles = ['Algebra Fundamentals', 'Newtonian Mechanics', 'Organic Chemistry', 'Cell Biology', 'World History', 'English Literature', 'Data Structures', 'Calculus I', 'Thermodynamics', 'Genetics', 'Trigonometry', 'Electrochemistry', 'Modern Physics', 'Ecology', 'Analytical Chemistry'];
  return Array.from({ length: count }, (_, i) => ({
    id: uuid(),
    title: subjectTitles[i % subjectTitles.length],
    description: faker.lorem.paragraph(),
    thumbnail_url: `https://picsum.photos/seed/${faker.string.alphanumeric(8)}/400/250`,
    org_id: faker.helpers.arrayElement(orgs).id,
    created_at: past(),
  }));
}

// ─── Enrollments ──────────────────────────────────────────────────────────────
function generateEnrollments(users: any[], subjects: any[], count: number) {
  return Array.from({ length: count }, () => ({
    id: uuid(),
    user_id: faker.helpers.arrayElement(users).id,
    subject_id: faker.helpers.arrayElement(subjects).id,
    created_at: past(),
  }));
}

// ─── Ingestion Jobs ───────────────────────────────────────────────────────────
function generateIngestionJobs(subjects: any[], count: number) {
  const stages = ['EXTRACTING', 'STRUCTURING', 'GENERATING', 'FINALIZING', 'COMPLETED'];
  const statuses = ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'];
  return Array.from({ length: count }, () => {
    const status = faker.helpers.arrayElement(statuses);
    const sub = faker.helpers.arrayElement(subjects);
    return {
      id: uuid(),
      subject_id: sub.id,
      subject_title: sub.title,
      status,
      current_stage: faker.helpers.arrayElement(stages),
      progress_percentage: status === 'COMPLETED' ? 100 : faker.number.int({ min: 0, max: 95 }),
      created_at: past(),
      completed_at: status === 'COMPLETED' ? recent() : null,
    };
  });
}

// ─── Assessments ──────────────────────────────────────────────────────────────
function generateAssessments(users: any[], subjects: any[], count: number) {
  return Array.from({ length: count }, () => ({
    id: faker.number.int({ min: 1000, max: 9999 }),
    reference_id: faker.helpers.arrayElement(subjects).id,
    assignment_type: faker.helpers.arrayElement(['QUIZ', 'CODE', 'VOICE', 'TEXT']),
    completed_at: recent(),
    percentage: faker.number.float({ min: 30, max: 100, fractionDigits: 1 }),
    user_id: faker.helpers.arrayElement(users).id,
  }));
}

// ─── Goals ────────────────────────────────────────────────────────────────────
function generateGoals(users: any[], subjects: any[], count: number) {
  return Array.from({ length: count }, () => ({
    id: faker.number.int({ min: 100, max: 9999 }),
    user_id: faker.helpers.arrayElement(users).id,
    target_type: 'subject',
    target_id: faker.helpers.arrayElement(subjects).id,
    target_score: faker.number.int({ min: 60, max: 100 }),
    current_score: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
    deadline: faker.date.future().toISOString(),
    is_active: true,
    is_achieved: faker.datatype.boolean(),
    created_at: past(),
    updated_at: recent(),
  }));
}

// ─── AI Keys ──────────────────────────────────────────────────────────────────
function generateAiKeys(users: any[], count: number) {
  return Array.from({ length: count }, () => ({
    id: faker.number.int({ min: 10, max: 999 }),
    provider: faker.helpers.arrayElement(['google', 'openai', 'anthropic']),
    label: faker.helpers.arrayElement(['production', 'staging', 'dev', 'personal']),
    user_id: faker.helpers.arrayElement(users).id,
    capabilities: faker.helpers.arrayElements(['TEXT', 'IMAGE', 'AUDIO', 'EMBEDDING'], faker.number.int({ min: 1, max: 3 })),
    total_cost: parseFloat(faker.number.float({ min: 0, max: 50, fractionDigits: 4 }).toFixed(4)),
    is_active: true,
    created_at: past(),
  }));
}

// ─── Compile DB ───────────────────────────────────────────────────────────────
const users = generateUsers(30);
const orgs = generateOrganizations(5);
const boards = generateBoards(6);
const courses = generateCourses(boards, 12);
const classes = generateClasses(courses, orgs, 10);
const sections = generateSections(classes, courses, 15);
const subjects = generateSubjects(orgs, 15);
const ingestionJobs = generateIngestionJobs(subjects, 20);
const assessments = generateAssessments(users, subjects, 40);
const goals = generateGoals(users, subjects, 20);
const aiKeys = generateAiKeys(users, 8);

const db = {
  users,
  profiles: generateProfiles(users),
  organizations: orgs,
  members: generateMembers(users, orgs),
  boards,
  courses,
  classes,
  sections,
  subjects,
  enrollments: generateEnrollments(users, subjects, 25),
  ingestion_jobs: ingestionJobs,
  assessments,
  goals,
  ai_keys: aiKeys,
};

const filePath = path.join(__dirname, 'db.json');
fs.writeFileSync(filePath, JSON.stringify(db, null, 2));

console.log('\n✅ Mock database generated successfully!');
console.log(`📍 Path: ${filePath}\n`);
console.log(`  Users:           ${db.users.length}`);
console.log(`  Organizations:   ${db.organizations.length}`);
console.log(`  Members:         ${db.members.length}`);
console.log(`  Boards:          ${db.boards.length}`);
console.log(`  Courses:         ${db.courses.length}`);
console.log(`  Classes:         ${db.classes.length}`);
console.log(`  Sections:        ${db.sections.length}`);
console.log(`  Subjects:        ${db.subjects.length}`);
console.log(`  Enrollments:     ${db.enrollments.length}`);
console.log(`  Ingestion Jobs:  ${db.ingestion_jobs.length}`);
console.log(`  Assessments:     ${db.assessments.length}`);
console.log(`  Goals:           ${db.goals.length}`);
console.log(`  AI Keys:         ${db.ai_keys.length}`);
