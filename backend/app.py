import os
import joblib
import numpy as np
import pandas as pd
import hashlib
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

# Ensure models are loaded
MODEL_DIR = os.path.join(os.path.dirname(__file__), 'models')
P_MODEL_PATH = os.path.join(MODEL_DIR, 'placement_model.pkl')
S_MODEL_PATH = os.path.join(MODEL_DIR, 'salary_model.pkl')

if not os.path.exists(P_MODEL_PATH) or not os.path.exists(S_MODEL_PATH):
    from generate_data import train as gen_data
    from train_models import train as train_models
    gen_data()
    train_models()

placement_model = joblib.load(P_MODEL_PATH)
salary_model = joblib.load(S_MODEL_PATH)

# In-memory storage for user history and admin data with realistic demo data
prediction_history = [
    {
        "id": "pred_101",
        "date": (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d %H:%M"),
        "student_name": "Aarav Sharma",
        "cgpa": 8.5,
        "coding_score": 85,
        "communication_score": 80,
        "aptitude_score": 78,
        "projects_count": 4,
        "certifications_count": 3,
        "internship": 1,
        "skills": ["Python", "React", "SQL", "Data Structures"],
        "probability": 88,
        "category": "High Chance",
        "salary_range": "₹7.0 LPA – ₹11.0 LPA",
        "top_role": "Software Developer"
    },
    {
        "id": "pred_102",
        "date": (datetime.now() - timedelta(days=3)).strftime("%Y-%m-%d %H:%M"),
        "student_name": "Sophia Chen",
        "cgpa": 9.1,
        "coding_score": 92,
        "communication_score": 88,
        "aptitude_score": 90,
        "projects_count": 5,
        "certifications_count": 4,
        "internship": 1,
        "skills": ["Python", "Machine Learning", "SQL", "Cloud Computing"],
        "probability": 95,
        "category": "High Chance",
        "salary_range": "₹10.5 LPA – ₹15.0 LPA",
        "top_role": "Data Scientist"
    }
]

users_db = [
    {
        "id": "std_101",
        "name": "Aarav Sharma",
        "email": "student@placement.edu",
        "role": "student",
        "studentStatus": "Final-Year Student",
        "verificationStatus": "VERIFIED",
        "college": "National Institute of Technology",
        "branch": "Computer Science & Engineering",
        "year": "4th Year",
        "password_hash": hashlib.sha256("password123".encode()).hexdigest(),
        "skills": ["Python", "React", "SQL", "Data Structures"]
    },
    {
        "id": "cmp_301",
        "name": "TechCorp Global",
        "email": "hr@techcorp.com",
        "role": "company",
        "companyName": "TechCorp Global",
        "industry": "Software & Cloud Services",
        "website": "https://techcorpglobal.com",
        "verificationStatus": "VERIFIED",
        "password_hash": hashlib.sha256("password123".encode()).hexdigest(),
        "skills": []
    }
]


@app.route('/api/predict', methods=['POST'])
def predict_placement():
    data = request.json or {}
    cgpa = float(data.get('cgpa', 7.5))
    coding = float(data.get('coding_score', 70))
    comm = float(data.get('communication_score', 70))
    aptitude = float(data.get('aptitude_score', 70))
    projects = int(data.get('projects_count', 2))
    certs = int(data.get('certifications_count', 1))
    internship = 1 if data.get('internship') in [True, 1, '1', 'Yes'] else 0
    skills = data.get('skills', [])

    features = [[cgpa, coding, comm, aptitude, projects, certs, internship]]
    
    # Calculate probability
    prob_arr = placement_model.predict_proba(features)[0]
    prob_percentage = round(float(prob_arr[1]) * 100, 1)

    if prob_percentage >= 75.0:
        category = "High Chance"
        category_color = "#22C55E"
    elif prob_percentage >= 50.0:
        category = "Medium Chance"
        category_color = "#F59E0B"
    else:
        category = "Low Chance"
        category_color = "#EF4444"

    return jsonify({
        "status": "success",
        "placement_probability": prob_percentage,
        "category": category,
        "category_color": category_color
    })


@app.route('/api/salary-predict', methods=['POST'])
def predict_salary():
    data = request.json or {}
    cgpa = float(data.get('cgpa', 7.5))
    coding = float(data.get('coding_score', 70))
    projects = int(data.get('projects_count', 2))
    internship = 1 if data.get('internship') in [True, 1, '1', 'Yes'] else 0

    features = [[cgpa, coding, projects, internship]]
    pred_salary = float(salary_model.predict(features)[0])

    min_lpa = max(3.5, round(pred_salary - 1.5, 1))
    max_lpa = round(pred_salary + 2.0, 1)
    
    salary_formatted = f"₹{min_lpa} LPA – ₹{max_lpa} LPA"

    return jsonify({
        "status": "success",
        "expected_salary_avg": round(pred_salary, 1),
        "min_lpa": min_lpa,
        "max_lpa": max_lpa,
        "salary_range": salary_formatted
    })


@app.route('/api/career-recommend', methods=['POST'])
def career_recommendations():
    data = request.json or {}
    user_skills = set(data.get('skills', []))
    coding = float(data.get('coding_score', 70))
    comm = float(data.get('communication_score', 70))
    aptitude = float(data.get('aptitude_score', 70))
    projects = int(data.get('projects_count', 2))
    cgpa = float(data.get('cgpa', 7.5))

    roles_definition = [
        {
            "title": "Software Developer",
            "required_skills": ["Data Structures", "Java", "C++", "Git", "Python"],
            "base_score": (coding * 0.4 + aptitude * 0.3 + min(projects, 5) * 6 + (10 if cgpa >= 7.5 else 0))
        },
        {
            "title": "Frontend Developer",
            "required_skills": ["React", "JavaScript", "Git"],
            "base_score": (coding * 0.3 + min(projects, 5) * 8 + (20 if "React" in user_skills or "JavaScript" in user_skills else 5))
        },
        {
            "title": "Backend Developer",
            "required_skills": ["Node.js", "SQL", "Java", "Python", "Git"],
            "base_score": (coding * 0.35 + aptitude * 0.25 + min(projects, 5) * 7 + (15 if "Node.js" in user_skills or "SQL" in user_skills else 0))
        },
        {
            "title": "Data Analyst",
            "required_skills": ["Python", "SQL"],
            "base_score": (aptitude * 0.4 + comm * 0.25 + (15 if cgpa >= 7.5 else 5) + (20 if "SQL" in user_skills or "Python" in user_skills else 0))
        },
        {
            "title": "Data Scientist",
            "required_skills": ["Machine Learning", "Python", "SQL"],
            "base_score": (aptitude * 0.35 + coding * 0.35 + (25 if "Machine Learning" in user_skills else 0))
        }
    ]

    recommendations = []
    for r in roles_definition:
        matched = [s for s in r["required_skills"] if s in user_skills]
        missing = [s for s in r["required_skills"] if s not in user_skills]
        
        skill_match_boost = (len(matched) / len(r["required_skills"])) * 30.0
        final_score = min(98.0, max(35.0, round(r["base_score"] * 0.7 + skill_match_boost, 1)))

        recommendations.append({
            "title": r["title"],
            "match_percentage": final_score,
            "matched_skills": matched,
            "missing_skills": missing,
            "required_skills": r["required_skills"]
        })

    recommendations.sort(key=lambda x: x["match_percentage"], reverse=True)

    return jsonify({
        "status": "success",
        "top_match": recommendations[0]["title"],
        "recommendations": recommendations
    })


@app.route('/api/skill-analysis', methods=['POST'])
def skill_analysis():
    data = request.json or {}
    cgpa = float(data.get('cgpa', 7.5))
    coding = float(data.get('coding_score', 70))
    comm = float(data.get('communication_score', 70))
    aptitude = float(data.get('aptitude_score', 70))
    projects = int(data.get('projects_count', 2))
    certs = int(data.get('certifications_count', 1))
    internship = 1 if data.get('internship') in [True, 1, '1', 'Yes'] else 0

    strengths = []
    weaknesses = []
    recommendations = []

    if cgpa >= 8.0:
        strengths.append(f"Strong Academic Foundation (CGPA: {cgpa}/10)")
    else:
        weaknesses.append(f"Academic CGPA can be improved (Current: {cgpa}/10)")
        recommendations.append("Focus on maintaining a CGPA above 7.5 to clear initial corporate screening filters.")

    if coding >= 75:
        strengths.append(f"Excellent Coding & Logic Skills ({coding}/100)")
    else:
        weaknesses.append(f"Coding Score needs strengthening (Current: {coding}/100)")
        recommendations.append("Practice Data Structures & Algorithms daily.")

    radar_data = [
        {"subject": "Academics", "score": min(100, int(cgpa * 10))},
        {"subject": "Coding", "score": int(coding)},
        {"subject": "Communication", "score": int(comm)},
        {"subject": "Aptitude", "score": int(aptitude)},
        {"subject": "Projects", "score": min(100, projects * 20)},
        {"subject": "Certifications", "score": min(100, certs * 25)}
    ]

    return jsonify({
        "status": "success",
        "strengths": strengths if strengths else ["Basic profile foundation"],
        "weaknesses": weaknesses if weaknesses else ["Minor optimizations possible"],
        "recommendations": recommendations,
        "radar_data": radar_data
    })


@app.route('/api/history', methods=['GET', 'POST'])
def manage_history():
    if request.method == 'POST':
        data = request.json or {}
        new_entry = {
            "id": f"pred_{len(prediction_history) + 101}",
            "date": datetime.now().strftime("%Y-%m-%d %H:%M"),
            "student_name": data.get('student_name', 'Student User'),
            "cgpa": data.get('cgpa'),
            "coding_score": data.get('coding_score'),
            "communication_score": data.get('communication_score'),
            "aptitude_score": data.get('aptitude_score'),
            "projects_count": data.get('projects_count'),
            "certifications_count": data.get('certifications_count'),
            "internship": data.get('internship'),
            "skills": data.get('skills', []),
            "probability": data.get('probability'),
            "category": data.get('category'),
            "salary_range": data.get('salary_range'),
            "top_role": data.get('top_role')
        }
        prediction_history.insert(0, new_entry)
        return jsonify({"status": "success", "message": "Saved prediction", "entry": new_entry})

    return jsonify({"status": "success", "history": prediction_history})


@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json or {}
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')

    if not email or not password:
        return jsonify({"status": "error", "message": "Email and password are required"}), 400

    user = next((u for u in users_db if u['email'].lower() == email), None)
    if not user:
        return jsonify({"status": "error", "message": "Account not found. Please register first."}), 404

    return jsonify({
        "status": "success",
        "token": "mock-jwt-token-xyz123",
        "user": user
    })


@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json or {}
    email = data.get("email", "").strip().lower()
    fullName = data.get("fullName", "").strip()
    role = data.get("role", "student")
    password = data.get("password", "")

    # Validation Checks
    if not email or not fullName or not password:
        return jsonify({"status": "error", "message": "Full Name, Email, and Password are required."}), 400

    if any(u['email'].lower() == email for u in users_db):
        return jsonify({"status": "error", "message": "This email address is already registered. Please sign in or use another email."}), 409

    password_hash = hashlib.sha256(password.encode()).hexdigest()

    new_user = {
        "id": f"usr_{len(users_db) + 101}",
        "name": fullName,
        "email": email,
        "role": role,
        "studentStatus": data.get("studentStatus", "Final-Year Student"),
        "verificationStatus": "PENDING" if role == 'student' else "VERIFIED",
        "college": data.get("collegeName", "Tech University"),
        "branch": data.get("branch", "Computer Science"),
        "year": data.get("year", "4th Year"),
        "companyName": data.get("companyName", fullName),
        "industry": data.get("industry", "Technology Services"),
        "password_hash": password_hash,
        "skills": ["Python", "JavaScript"]
    }
    users_db.append(new_user)

    return jsonify({
        "status": "success",
        "message": "Account registered successfully!",
        "token": f"mock-jwt-token-{new_user['id']}",
        "user": new_user
    })


@app.route('/api/admin/stats', methods=['GET'])
def admin_stats():
    return jsonify({
        "status": "success",
        "total_students": len([u for u in users_db if u.get('role') == 'student']) + 185,
        "total_predictions": len(prediction_history) + 420,
        "registered_users": users_db
    })


if __name__ == '__main__':
    print("Starting Placement Intelligence Flask Server on port 5000...")
    app.run(host='0.0.0.0', port=5000, debug=True)
