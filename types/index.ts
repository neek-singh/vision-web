/**
 * Global TypeScript interfaces and types
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'STUDENT';
}
