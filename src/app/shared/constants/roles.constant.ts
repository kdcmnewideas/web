/**
 * PLATFORM ROLES
 * Global roles that determine access to platform-level features and dashboards
 *
 * SUPER_ADMIN: Complete system access, can manage all organizations and admins
 * ADMIN: Admin access to multiple organizations
 * SUB_ADMIN: Sub-admin access to specific organizations
 * USER: Default platform role for standard users
 */
export enum PlatformRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  SUB_ADMIN = 'sub_admin',
  USER = 'user', // Default platform role
}

/**
 * ORGANIZATION ROLES
 * Roles within specific organizations (schools/institutions)
 *
 * ORG_ADMIN: Organization administrator with full control
 * ORG_FACULTY: Faculty/Instructor with content creation and grading permissions
 * STUDENT: Student with learning and assessment access
 */
export enum OrganizationRole {
  ORG_ADMIN = 'org_admin',
  ORG_FACULTY = 'org_faculty',
  STUDENT = 'student',
}

/**
 * COMBINED APP ROLES
 * Union type for all roles used throughout the app
 */
export type AppRole = PlatformRole | OrganizationRole;

/**
 * Platform Role labels for UI display
 */
export const PLATFORM_ROLE_LABELS: Record<PlatformRole, string> = {
  [PlatformRole.SUPER_ADMIN]: 'Super Admin',
  [PlatformRole.ADMIN]: 'Admin',
  [PlatformRole.SUB_ADMIN]: 'Sub Admin',
  [PlatformRole.USER]: 'User',
};

/**
 * Organization Role labels for UI display
 */
export const ORG_ROLE_LABELS: Record<OrganizationRole, string> = {
  [OrganizationRole.ORG_ADMIN]: 'Organization Admin',
  [OrganizationRole.ORG_FACULTY]: 'Faculty',
  [OrganizationRole.STUDENT]: 'Student',
};

/**
 * Combined role labels (all roles)
 */
export const ROLE_LABELS: Record<string, string> = {
  ...PLATFORM_ROLE_LABELS,
  ...ORG_ROLE_LABELS,
};

/**
 * Platform roles as array for forms/dropdowns
 */
export const AVAILABLE_PLATFORM_ROLES = [
  { label: PLATFORM_ROLE_LABELS[PlatformRole.SUPER_ADMIN], value: PlatformRole.SUPER_ADMIN },
  { label: PLATFORM_ROLE_LABELS[PlatformRole.ADMIN], value: PlatformRole.ADMIN },
  { label: PLATFORM_ROLE_LABELS[PlatformRole.SUB_ADMIN], value: PlatformRole.SUB_ADMIN },
  { label: PLATFORM_ROLE_LABELS[PlatformRole.USER], value: PlatformRole.USER },
];

/**
 * Organization roles as array for forms/dropdowns
 */
export const AVAILABLE_ORG_ROLES = [
  { label: ORG_ROLE_LABELS[OrganizationRole.ORG_ADMIN], value: OrganizationRole.ORG_ADMIN },
  { label: ORG_ROLE_LABELS[OrganizationRole.ORG_FACULTY], value: OrganizationRole.ORG_FACULTY },
  { label: ORG_ROLE_LABELS[OrganizationRole.STUDENT], value: OrganizationRole.STUDENT },
];

/**
 * All roles for backward compatibility
 */
export const AVAILABLE_ROLES = [...AVAILABLE_PLATFORM_ROLES, ...AVAILABLE_ORG_ROLES];
