# Patient portal chat deployment

Set MEDICAL_REVIEW_KEY as a sensitive server-side environment variable in the Vercel PatientPortal project (Production). Its value is the existing Render REVIEW_ACCESS_KEY. Never commit it or use a Flutter dart-define for it. Redeploy after configuring it.

The /api/chat Node function forwards requests only to the fixed medicalchatbot-giyy.onrender.com/chat endpoint and streams its response. With no configured key it fails closed with 503. The browser never receives the shared key.

This version is a public demo chatbot: frontend demo login and Origin checks are NOT authentication. Anyone can invoke the gateway. Before wider sharing configure Vercel firewall rate limits/spend controls; before real patient use implement verified patient sessions and per-report authorization. Existing Render review-key protection remains enabled. Do not send real patient records through the dummy portal.

Chat history stays in memory, is limited to the latest six messages sent upstream, and is discarded when the chat panel closes. The selected synthetic PDF is sent to the existing medical RAG backend until removed. Backend/provider processing remains subject to their policies.

Local verification: node --test gateway.test.mjs. Flutter source remains in the staff workspace under lib/features/patient_portal/portal_chat.dart.
