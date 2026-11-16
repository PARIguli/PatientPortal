// Server-side bridge. Never return or log MEDICAL_REVIEW_KEY.
export const maxDuration = 300;
export async function POST(request) {
  const key = process.env.MEDICAL_REVIEW_KEY;
  if (!key) return Response.json({error:'Chat is not configured yet.'}, {status:503});
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return new Response(null,{status:403});
  let payload;
  try {
    const body = await request.text();
    if (body.length > 2500000) return new Response(null,{status:413});
    payload = JSON.parse(body);
  } catch {return new Response(null,{status:400});}
  if (typeof payload.question !== 'string' || !payload.question.trim() || payload.question.length > 12000 || !Array.isArray(payload.history) || payload.history.length > 6 || !Array.isArray(payload.attachments) || payload.attachments.length > 1) return new Response(null,{status:400});
  const clean = {question:payload.question,history:payload.history,attachments:payload.attachments};
  try {
    const upstream = await fetch('https://medicalchatbot-giyy.onrender.com/chat', {
      method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${key}`},
      body:JSON.stringify(clean), signal:AbortSignal.timeout(240000), redirect:'error'
    });
    if (!upstream.ok) return Response.json({error:'The medical assistant is unavailable. Please retry shortly.'},{status:502});
    return new Response(upstream.body,{headers:{'Content-Type':'application/x-ndjson','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
  } catch {console.error('Medical gateway request failed');return Response.json({error:'Connection timed out. Please try again.'},{status:504});}
}
