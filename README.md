# MediSumm AI patient portal demo

Prebuilt Flutter patient portal. Deploy this repository to Vercel with Framework: Other, Build Command empty, Install Command empty, Output Directory: .

Demo ID: MR-DEMO-001 or PT-DEMO-001
Demo password: Demo@123

Uses synthetic reports and in-memory demo sign-in only. No real authentication, SMS or database is included. Medical chat uses a server-side gateway; see CHAT_SETUP.md for required configuration. Do not upload real patient information.

The source lives separately in medisumm_frontend/lib/patient_main.dart. Rebuild that entry point and replace these static files when publishing updates. This repository contains only the generated patient website, not the staff application or backend secrets.
