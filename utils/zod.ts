import { ZodError } from 'zod';

export function formatZodError(error: ZodError) {
  const formatted: Record<string, string[]> = {};

  for (const issue of error.issues) {
    const key = issue.path[0]?.toString() || 'unknown';
    if (!formatted[key]) formatted[key] = [];
    formatted[key].push(issue.message);
  }

  return formatted;
}
