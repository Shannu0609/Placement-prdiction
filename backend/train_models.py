import os
import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, mean_absolute_error, r2_score

def train():
    os.makedirs('models', exist_ok=True)
    
    # 1. Train Placement Classifier
    print("--- Training Placement Classifier Model ---")
    placement_df = pd.read_csv('dataset/placement_dataset.csv')
    
    X_place = placement_df[['CGPA', 'Coding_Score', 'Communication_Score', 'Aptitude_Score', 'Projects_Count', 'Certifications_Count', 'Internship']]
    y_place = placement_df['Placement_Status']
    
    X_train_p, X_test_p, y_train_p, y_test_p = train_test_split(X_place, y_place, test_size=0.2, random_state=42)
    
    clf = RandomForestClassifier(n_estimators=100, max_depth=8, random_state=42)
    clf.fit(X_train_p, y_train_p)
    
    y_pred_p = clf.predict(X_test_p)
    accuracy = accuracy_score(y_test_p, y_pred_p)
    print(f"Placement Model Accuracy: {accuracy * 100:.2f}%")
    print(classification_report(y_test_p, y_pred_p))
    
    joblib.dump(clf, 'models/placement_model.pkl')
    print("Saved models/placement_model.pkl")
    
    # 2. Train Salary Regressor
    print("\n--- Training Salary Regressor Model ---")
    salary_df = pd.read_csv('dataset/salary_dataset.csv')
    
    X_sal = salary_df[['CGPA', 'Coding_Score', 'Projects_Count', 'Internship']]
    y_sal = salary_df['Salary_LPA']
    
    X_train_s, X_test_s, y_train_s, y_test_s = train_test_split(X_sal, y_sal, test_size=0.2, random_state=42)
    
    reg = RandomForestRegressor(n_estimators=100, max_depth=8, random_state=42)
    reg.fit(X_train_s, y_train_s)
    
    y_pred_s = reg.predict(X_test_s)
    mae = mean_absolute_error(y_test_s, y_pred_s)
    r2 = r2_score(y_test_s, y_pred_s)
    print(f"Salary Model MAE: {mae:.2f} LPA, R2 Score: {r2:.3f}")
    
    joblib.dump(reg, 'models/salary_model.pkl')
    print("Saved models/salary_model.pkl")

if __name__ == '__main__':
    train()
