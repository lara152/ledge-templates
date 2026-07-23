import { buildLlmsTxt } from '@/lib/llms';

// Static route handler — exported to /llms.txt at build time.
export const dynamic = 'force-static';

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
