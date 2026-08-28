# Placement Intelligence System

> **"From Verified Student Profiles to Intelligent Company Matching."**

An enterprise-level placement and recruitment ecosystem connecting verified **Final-Year & Graduated Students** with corporate recruiters through **Educational Proof Verification**, **Resume Intelligence**, **Transparent Skill Matching**, **Proctored Multi-Section Assessments**, and **Data-Driven Recruitment Pipelines**.

---

## 🌟 System Highlights & Core Architecture

### 1. Educational Document Verification System
- **Student Status**: Registration options for `Final-Year Student` and `Graduated Student`.
- **Proof Document Upload**: Students upload College ID / Bonafide Certificates (for final-year candidates) or Degree Certificates (for graduates).
- **Admin Verification Center**: Admin evaluates submissions with OCR text extraction assistance (extracting Name, Degree, College, Year) to **VERIFY**, **REJECT**, or **REQUEST RESUBMISSION** with comments.
- **Verification Rule**: Only `VERIFIED` students can participate in company job drives and proctored assessments.

### 2. Resume Intelligence & Profile Editor
- **Multi-Section Resume Parsing**: Extracts Personal Info, Education, Technical Skills, Projects, Internships, Experience, Certifications, and Soft Skills.
- **Editable Extracted Resume Profile**: Students can review and edit extracted skills and project entries before job matching.
- **Resume Profile Strength**: Displays completeness percentage gauge (e.g. 82%).
- **ATS Resume Checker**: Provides ATS Compatibility Score (0–100), missing industry keywords, formatting quality, and strengths/weaknesses breakdown.

### 3. Transparent Student–Company Skill Matching Engine
- **Skill Normalization**: Automatically normalizes skill synonyms (`JS` = `JavaScript`, `Postgres` = `PostgreSQL`, `ML` = `Machine Learning`, etc.).
- **Match Explanation**: Transparent **Profile Match Score** (e.g. 87% Match) detailing:
  - Required Skills Matched
  - Preferred Skills Matched
  - CGPA Cutoff Eligibility
  - Matched Skills List (✓)
  - Missing / Preferred Skills List (△)

### 4. Proctored Multi-Section Assessment Engine (Up to 150 Minutes)
- **Configurable Test Duration**: Supports assessments up to **150 Minutes (2.5 Hours)** with countdown timer `02:30:00`.
- **5 Evaluation Sections**:
  1. **Coding**: Online code editor with language selection (Python, JavaScript, C++, Java) and test case runner.
  2. **Aptitude**: Quantitative & Logical Reasoning MCQs.
  3. **Communication**: Written & situational prompt evaluation.
  4. **English / Verbal**: Grammar, vocabulary, and reading comprehension.
  5. **English Speaking / Pronunciation**: Microphone audio recording for speech prompts.
- **Proctored Test Controls**: Camera preview & connection status, Screen sharing request, Microphone recording, Fullscreen enforcement, Tab-switch warning logger, and auto-submit on timeout.
- **Detailed Section Scoring**: Generates overall test score (e.g. 82/100) and section-wise breakdown.

### 5. Multi-Role Portals & Governance
- **Student Portal**: Dashboard, ATS Resume Checker, Placement Predictor (Random Forest ML), Job Matches, Applications Tracker, Proctored Assessment, and Upskilling Paths.
- **Company Portal**: Candidate Search with multi-filters (Branch, Skills, CGPA, ATS, Placement Score), talent shortlisting, customizable automated email composer, and job drive manager.
- **Trainer Portal**: Roster monitoring, candidate deep-dive inspection, trainer feedback note submission, and batch preparation announcements.
- **Admin Portal**: Institutional statistics, Company approvals, Student Verification Center, and Recharts analytics.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Recharts, Lucide React Icons
- **Backend & ML**: Python Flask (`backend/app.py` with Scikit-Learn `placement_model.pkl` & `salary_model.pkl`)
- **Cloud & Deployment**: Firebase Authentication (Email/Password, Google Sign-In), Firestore Database, Firebase Hosting

---

## 🚀 Local Quickstart Guide

### 1. Frontend Setup & Execution
```powershell
cd frontend
npm install
npm run dev
```
Open **[http://localhost:3000/](http://localhost:3000/)** in your browser.

### 2. Backend ML Server Execution
```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
Flask server runs on `http://localhost:5000`.

---

## 📦 Production Firebase Hosting Deployment

```powershell
cd frontend
npm run build
npx firebase-tools login
npx firebase-tools use placement-student-inteligence
npx firebase-tools deploy --only hosting
```
