// Intelligent Skill Matching & Normalization Engine

const SKILL_SYNONYMS = {
  "js": "javascript",
  "javascript.js": "javascript",
  "ts": "typescript",
  "py": "python",
  "py3": "python",
  "cpp": "c++",
  "cplusplus": "c++",
  "postgres": "postgresql",
  "postgres db": "postgresql",
  "mongo": "mongodb",
  "react": "react.js",
  "reactjs": "react.js",
  "node": "node.js",
  "nodejs": "node.js",
  "express": "express.js",
  "expressjs": "express.js",
  "ml": "machine learning",
  "ai": "artificial intelligence",
  "dl": "deep learning",
  "dsa": "data structures",
  "ds": "data structures",
  "algorithms": "data structures",
  "aws": "cloud computing",
  "amazon web services": "cloud computing",
  "docker": "cloud computing",
  "kubernetes": "cloud computing"
};

export function normalizeSkill(skill) {
  if (!skill) return "";
  const cleaned = skill.toLowerCase().trim();
  return SKILL_SYNONYMS[cleaned] || cleaned;
}

export function calculateJobMatch(studentProfile, jobRequirements) {
  const studentSkills = (studentProfile?.skills || []).map(s => normalizeSkill(s));
  const reqSkills = (jobRequirements?.requiredSkills || []).map(s => normalizeSkill(s));
  const prefSkills = (jobRequirements?.preferredSkills || []).map(s => normalizeSkill(s));

  const matchedRequired = reqSkills.filter(s => studentSkills.includes(s));
  const missingRequired = reqSkills.filter(s => !studentSkills.includes(s));

  const matchedPreferred = prefSkills.filter(s => studentSkills.includes(s));
  const missingPreferred = prefSkills.filter(s => !studentSkills.includes(s));

  // Score weights: Required skills 60%, Preferred skills 25%, CGPA eligibility 15%
  let reqScore = reqSkills.length ? (matchedRequired.length / reqSkills.length) * 60 : 60;
  let prefScore = prefSkills.length ? (matchedPreferred.length / prefSkills.length) * 25 : 25;
  
  const studentCgpa = studentProfile?.cgpa || 8.0;
  const minCgpa = jobRequirements?.minCgpa || 7.0;
  let cgpaScore = studentCgpa >= minCgpa ? 15 : Math.max(0, 15 - (minCgpa - studentCgpa) * 5);

  const matchScore = Math.min(99, Math.max(35, Math.round(reqScore + prefScore + cgpaScore)));

  return {
    matchScore,
    reqScore: Math.round(reqScore),
    prefScore: Math.round(prefScore),
    requiredMatchedCount: matchedRequired.length,
    totalRequiredCount: reqSkills.length,
    preferredMatchedCount: matchedPreferred.length,
    totalPreferredCount: prefSkills.length,
    matchedSkills: Array.from(new Set([...matchedRequired, ...matchedPreferred])).map(s => s.toUpperCase()),
    missingSkills: Array.from(new Set([...missingRequired, ...missingPreferred])).map(s => s.toUpperCase()),
    cgpaMatched: studentCgpa >= minCgpa,
    studentCgpa,
    minCgpa,
    explanation: {
      requiredText: `${matchedRequired.length} of ${reqSkills.length} Required Skills Matched`,
      preferredText: `${matchedPreferred.length} of ${prefSkills.length} Preferred Skills Matched`,
      cgpaText: studentCgpa >= minCgpa ? `CGPA (${studentCgpa}) meets cutoff (${minCgpa})` : `CGPA (${studentCgpa}) is below cutoff (${minCgpa})`
    }
  };
}
