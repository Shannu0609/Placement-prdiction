import os
import random
import numpy as np
import pandas as pd

# Set random seed for reproducibility
np.random.seed(42)
random.seed(42)

os.makedirs('dataset', exist_ok=True)

# Base sample data from requirements
placement_sample = [
    (8.5, 85, 80, 78, 4, 3, 1, 1),
    (7.2, 65, 70, 68, 2, 1, 0, 1),
    (6.0, 40, 50, 45, 1, 0, 0, 0),
    (9.1, 92, 88, 90, 5, 4, 1, 1),
    (5.8, 35, 42, 40, 0, 0, 0, 0),
    (8.0, 75, 72, 70, 3, 2, 1, 1),
    (6.5, 50, 55, 52, 1, 1, 0, 0),
    (8.8, 90, 85, 87, 5, 3, 1, 1),
    (7.0, 60, 65, 63, 2, 1, 0, 1),
    (5.5, 30, 40, 35, 0, 0, 0, 0),
]

salary_sample = [
    (8.5, 85, 4, 1, 8.0),
    (7.2, 65, 2, 0, 5.0),
    (9.0, 95, 5, 1, 12.0),
    (6.8, 55, 1, 0, 4.0),
    (8.0, 78, 3, 1, 7.0),
]

# Generate Placement Dataset (1000 records)
placement_records = list(placement_sample)

for _ in range(990):
    cgpa = round(float(np.random.uniform(5.0, 9.8)), 2)
    coding = int(np.clip(np.random.normal(cgpa * 9 + np.random.uniform(-10, 10), 12), 25, 100))
    comm = int(np.clip(np.random.normal(cgpa * 8.5 + np.random.uniform(-15, 15), 15), 25, 100))
    aptitude = int(np.clip(np.random.normal((coding + comm) / 2 + np.random.uniform(-8, 8), 10), 25, 100))
    projects = int(np.clip(round(np.random.normal((cgpa - 5) * 1.2 + coding / 25, 1.2)), 0, 10))
    certs = int(np.clip(round(np.random.normal((cgpa - 5) * 0.8 + comm / 30, 1.0)), 0, 8))
    
    # Internship probability increases with CGPA and coding score
    internship_prob = 1 / (1 + np.exp(-((cgpa - 7.0) * 0.8 + (coding - 60) * 0.04)))
    internship = 1 if np.random.random() < internship_prob else 0
    
    # Composite placement score
    composite_score = (
        (cgpa / 10.0) * 0.35 +
        (coding / 100.0) * 0.30 +
        (comm / 100.0) * 0.15 +
        (aptitude / 100.0) * 0.10 +
        (projects / 5.0) * 0.05 +
        (internship * 0.05)
    )
    
    # Sigmoid probability with mild noise
    prob = 1 / (1 + np.exp(-(composite_score - 0.62) * 14))
    placement_status = 1 if np.random.random() < prob else 0
    
    placement_records.append((cgpa, coding, comm, aptitude, projects, certs, internship, placement_status))

placement_df = pd.DataFrame(placement_records, columns=[
    'CGPA', 'Coding_Score', 'Communication_Score', 'Aptitude_Score', 
    'Projects_Count', 'Certifications_Count', 'Internship', 'Placement_Status'
])

placement_df.to_csv('dataset/placement_dataset.csv', index=False)
print(f"Generated placement_dataset.csv with {len(placement_df)} records.")

# Generate Salary Dataset (1000 records for placed students)
salary_records = list(salary_sample)

for _ in range(995):
    cgpa = round(float(np.random.uniform(6.0, 9.9)), 2)
    coding = int(np.clip(np.random.normal(cgpa * 9.2 + np.random.uniform(-8, 8), 10), 45, 100))
    projects = int(np.clip(round(np.random.normal((cgpa - 5) * 1.3, 1.2)), 1, 10))
    
    internship_prob = 1 / (1 + np.exp(-((cgpa - 6.5) * 0.9 + (coding - 55) * 0.05)))
    internship = 1 if np.random.random() < internship_prob else 0
    
    # Calculate realistic salary in LPA (range 3.5 to 26 LPA)
    base_salary = 3.2
    cgpa_contrib = (cgpa - 6.0) * 1.5
    coding_contrib = (coding - 45) * 0.14
    project_contrib = projects * 0.6
    internship_contrib = internship * 1.8
    noise = np.random.normal(0, 0.8)
    
    salary_lpa = round(max(3.5, base_salary + cgpa_contrib + coding_contrib + project_contrib + internship_contrib + noise), 1)
    salary_records.append((cgpa, coding, projects, internship, salary_lpa))

salary_df = pd.DataFrame(salary_records, columns=[
    'CGPA', 'Coding_Score', 'Projects_Count', 'Internship', 'Salary_LPA'
])

salary_df.to_csv('dataset/salary_dataset.csv', index=False)
print(f"Generated salary_dataset.csv with {len(salary_df)} records.")
