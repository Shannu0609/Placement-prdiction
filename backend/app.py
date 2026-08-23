import os
import sys
import joblib
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from datetime import datetime, timedelta

# Locate frontend dist directory for single website production serving
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(CURRENT_DIR)
FRONTEND_DIST = os.path.join(ROOT_DIR, 'frontend', 'dist')

if not os.path.exists(FRONTEND_DIST):
    FRONTEND_DIST = os.path.join(CURRENT_DIR, 'static')

app = Flask(__name__, static_folder=FRONTEND_DIST, static_url_path='')
CORS(app)

# Ensure ML models are loaded from available paths or generated on startup
MODEL_DIRS = [
    os.path.join(CURRENT_DIR, 'models'),
    os.path.join(ROOT_DIR, 'models'),
    os.path.join(CURRENT_DIR, '..', 'models')
]

P_MODEL_PATH = None
S_MODEL_PATH = None

for m_dir in MODEL_DIRS:
    p_path = os.path.join(m_dir, 'placement_model.pkl')
    s_path = os.path.join(m_dir, 'salary_model.pkl')
    if os.path.exists(p_path) and os.path.exists(s_path):
        P_MODEL_PATH = p_path
        S_MODEL_PATH = s_path
        break

if not P_MODEL_PATH or not S_MODEL_PATH:
    sys.path.append(CURRENT_DIR)
    try:
        from generate_data import train as gen_data
        from train_models import train as train_models
    except ImportError:
        from backend.generate_data import train as gen_data
        from backend.train_models import train as train_models
    gen_data()
    train_models()
    P_MODEL_PATH = os.path.join(CURRENT_DIR, 'models', 'placement_model.pkl')
    S_MODEL_PATH = os.path.join(CURRENT_DIR, 'models', 'salary_model.pkl')

placement_model = joblib.load(P_MODEL_PATH)
salary_model = joblib.load(S_MODEL_PATH)

# In-memory storage for user history and admin data with realistic demo data
prediction_history = [
    {
        "id": "pred_101",
        "date": (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d %H:%M"),
        "student_name": "John Doe",
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
    },
    {
        "id": "pred_103",
        "date": (datetime.now() - timedelta(days=5)).strftime("%Y-%m-%d %H:%M"),
        "student_name": "Alex Smith",
        "cgpa": 6.8,
        "coding_score": 60,
        "communication_score": 65,
        "aptitude_score": 62,
        "projects_count": 2,
        "certifications_count": 1,
        "internship": 0,
        "skills": ["Java", "SQL", "Git"],
        "probability": 58,
        "category": "Medium Chance",
        "salary_range": "₹4.5 LPA – ₹7.0 LPA",
        "top_role": "QA Engineer"
    },
    {
        "id": "pred_104",
        "date": (datetime.now() - timedelta(days=7)).strftime("%Y-%m-%d %H:%M"),
        "student_name": "Rohan Gupta",
        "cgpa": 5.8,
        "coding_score": 38,
        "communication_score": 45,
        "aptitude_score": 40,
        "projects_count": 1,
        "certifications_count": 0,
        "internship": 0,
        "skills": ["C++"],
        "probability": 28,
        "category": "Low Chance",
        "salary_range": "₹3.5 LPA – ₹5.0 LPA",
        "top_role": "Software Developer"
    }
]

users_db = [
    {
        "id": "usr_1",
        "name": "John Doe",
        "email": "john@example.com",
        "college": "Institute of Technology",
        "branch": "Computer Science & Engineering",
        "year": "4th Year",
        "skills": ["Python", "React", "SQL", "Data Structures"]
    },
    {
        "id": "usr_2",
        "name": "Sophia Chen",
        "email": "sophia@example.com",
        "college": "National Tech University",
        "branch": "Artificial Intelligence",
        "year": "4th Year",
        "skills": ["Python", "Machine Learning", "SQL", "Cloud Computing"]
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

    features = [[cgpa, coding, comm, aptitude, projects, certs, internship]]
    
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
        },
        {
            "title": "QA Engineer",
            "required_skills": ["Git", "SQL", "Communication"],
            "base_score": (comm * 0.45 + aptitude * 0.35 + (15 if "SQL" in user_skills else 5))
        },
        {
            "title": "Cloud / DevOps Engineer",
            "required_skills": ["Cloud Computing", "Docker", "Git"],
            "base_score": (coding * 0.3 + aptitude * 0.3 + (25 if "Docker" in user_skills or "Cloud Computing" in user_skills else 0))
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
        recommendations.append("Practice Data Structures & Algorithms daily on LeetCode / HackerRank.")

    if comm >= 75:
        strengths.append(f"Strong Communication & Articulation ({comm}/100)")
    else:
        weaknesses.append(f"Communication Skills need practice (Current: {comm}/100)")
        recommendations.append("Participate in mock HR interviews and group discussions to boost fluency.")

    if aptitude >= 75:
        strengths.append(f"High Quantitative & Problem-Solving Aptitude ({aptitude}/100)")
    else:
        weaknesses.append(f"Aptitude Test Score is low (Current: {aptitude}/100)")
        recommendations.append("Solve speed-math, logical reasoning, and verbal aptitude quizzes weekly.")

    if projects >= 3:
        strengths.append(f"Solid Hands-on Portfolio ({projects} Projects)")
    else:
        weaknesses.append(f"Limited Project Portfolio ({projects} Project)")
        recommendations.append("Build 1-2 Full-Stack or AI application projects with live URLs.")

    if certs >= 2:
        strengths.append(f"Recognized Industry Certifications ({certs} Certifications)")
    else:
        weaknesses.append(f"Lack of Specialized Certifications")
        recommendations.append("Earn relevant credentials in AWS/Cloud, SQL, or Full-Stack Web Development.")

    if internship == 1:
        strengths.append("Direct Industry Internship Experience")
    else:
        weaknesses.append("No Industrial Internship Experience")
        recommendations.append("Apply for virtual internships or open-source hackathons to showcase real exposure.")

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


@app.route('/api/history/<pred_id>', methods=['DELETE'])
def delete_history_item(pred_id):
    global prediction_history
    prediction_history = [p for p in prediction_history if p["id"] != pred_id]
    return jsonify({"status": "success", "message": "Deleted prediction record"})


@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json or {}
    email = data.get('email', '')
    user = next((u for u in users_db if u['email'] == email), None)
    if not user:
        user = {
            "id": "usr_guest",
            "name": email.split('@')[0].capitalize() if email else "Student",
            "email": email,
            "college": "Tech University",
            "branch": "Computer Science",
            "year": "4th Year",
            "skills": ["Python", "JavaScript", "SQL"]
        }

    return jsonify({
        "status": "success",
        "token": "mock-jwt-token-xyz123",
        "user": user
    })


@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json or {}
    new_user = {
        "id": f"usr_{len(users_db) + 1}",
        "name": data.get("fullName", "New Student"),
        "email": data.get("email", ""),
        "college": data.get("collegeName", "Tech University"),
        "branch": data.get("branch", "Computer Science"),
        "year": data.get("year", "4th Year"),
        "skills": ["Python", "JavaScript"]
    }
    users_db.append(new_user)

    return jsonify({
        "status": "success",
        "token": "mock-jwt-token-newuser",
        "user": new_user
    })


@app.route('/api/admin/stats', methods=['GET'])
def admin_stats():
    total_predictions = len(prediction_history) + 420
    total_students = len(users_db) + 185
    avg_prob = round(sum(p['probability'] for p in prediction_history) / len(prediction_history), 1) if prediction_history else 78.4
    
    placement_trends = [
        {"month": "Jan", "placed": 65, "rate": 78},
        {"month": "Feb", "placed": 78, "rate": 82},
        {"month": "Mar", "placed": 84, "rate": 85},
        {"month": "Apr", "placed": 92, "rate": 89},
        {"month": "May", "placed": 110, "rate": 92},
        {"month": "Jun", "placed": 125, "rate": 94}
    ]

    salary_distribution = [
        {"range": "3-5 LPA", "count": 28},
        {"range": "5-8 LPA", "count": 54},
        {"range": "8-12 LPA", "count": 32},
        {"range": "12-16 LPA", "count": 18},
        {"range": "16+ LPA", "count": 8}
    ]

    popular_skills = [
        {"skill": "Python", "demand": 92},
        {"skill": "Data Structures", "demand": 88},
        {"skill": "React", "demand": 84},
        {"skill": "SQL", "demand": 80},
        {"skill": "Java", "demand": 76},
        {"skill": "Machine Learning", "demand": 70}
    ]

    return jsonify({
        "status": "success",
        "total_students": total_students,
        "total_predictions": total_predictions,
        "avg_placement_score": avg_prob,
        "top_career_recommendation": "Software Developer",
        "placement_trends": placement_trends,
        "salary_distribution": salary_distribution,
        "popular_skills": popular_skills,
        "recent_predictions": prediction_history,
        "registered_users": users_db
    })


# Static assets & SPA Catch-All Routing Handler
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    if path.startswith('api/'):
        return jsonify({"error": "API route not found"}), 404
    
    target_file = os.path.join(app.static_folder, path)
    if path != "" and os.path.exists(target_file):
        return send_from_directory(app.static_folder, path)
    else:
        index_file = os.path.join(app.static_folder, 'index.html')
        if os.path.exists(index_file):
            return send_from_directory(app.static_folder, 'index.html')
        return jsonify({
            "status": "online",
            "system": "Placement Intelligence API",
            "message": "Flask server running. React frontend static build not detected."
        })


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Starting Placement Intelligence Flask Server on port {port}...")
    app.run(host='0.0.0.0', port=port, debug=False)
