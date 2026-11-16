import { test } from 'node:test';
import assert from 'node:assert/strict';
import { POST } from './api/chat.mjs';
test('Missing configuration fails closed',async()=>{delete process.env.MEDICAL_REVIEW_KEY;assert.equal((await POST(new Request('https://portal.test/api/chat',{method:'POST'}))).status,503);});
test('Gateway keeps secret upstream and forwards response',async()=>{
 process.env.MEDICAL_REVIEW_KEY='synthetic-key';const original=global.fetch;
 global.fetch=async(url,options)=>{assert.equal(url,'https://medicalchatbot-giyy.onrender.com/chat');assert.equal(options.headers.Authorization,'Bearer synthetic-key');return new Response('{"type":"done"}\n');};
 try{const response=await POST(new Request('https://portal.test/api/chat',{method:'POST',headers:{origin:'https://portal.test'},body:JSON.stringify({question:'What is anemia?',history:[],attachments:[]})}));assert.equal(response.status,200);assert.equal(await response.text(),'{"type":"done"}\n');}finally{global.fetch=original;delete process.env.MEDICAL_REVIEW_KEY;}
});
test('Cross-origin requests rejected',async()=>{process.env.MEDICAL_REVIEW_KEY='synthetic';try{assert.equal((await POST(new Request('https://portal.test/api/chat',{method:'POST',headers:{origin:'https://other.test'}}))).status,403);}finally{delete process.env.MEDICAL_REVIEW_KEY;}});
