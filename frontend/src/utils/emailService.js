// Configurable Email Notification Service

export function sendAssessmentEmail({ candidateEmail, candidateName, companyName, jobTitle, assessmentTitle, durationMins, deadlineDate, assessmentLink }) {
  const subject = `Assessment Invitation: ${assessmentTitle} at ${companyName}`;
  const body = `Dear ${candidateName},

You have been shortlisted for the ${jobTitle} position at ${companyName}!

Please complete the official company-created assessment details below:

Assessment Title: ${assessmentTitle}
Maximum Duration: ${durationMins} Minutes (Proctored)
Deadline: ${deadlineDate}

Assessment Link: ${assessmentLink || 'https://placement-student-inteligence.web.app'}

Instructions:
1. Ensure a stable internet connection.
2. Grant camera and microphone permissions when prompted for proctored sections.
3. Keep screen sharing active throughout the evaluation.

Best regards,
${companyName} Recruitment Team`;

  console.log(`[EMAIL SERVICE] Sent Assessment Invitation to ${candidateEmail}`);
  return { success: true, subject, body, sentAt: new Date().toLocaleString() };
}

export function sendVerificationEmail({ candidateEmail, candidateName, status, adminComment }) {
  const subject = `Educational Document Verification Update: ${status}`;
  let body = "";

  if (status === "VERIFIED") {
    body = `Dear ${candidateName},\n\nGreat news! Your educational document has been verified by the Directorate of Placements.\n\nYour profile is now FULLY VERIFIED and unlocked for company recruitment drives.\n\nBest regards,\nPlacement Cell Administration`;
  } else if (status === "RESUBMISSION_REQUIRED") {
    body = `Dear ${candidateName},\n\nYour educational document verification requires resubmission.\nReason: ${adminComment || 'Please provide a clearer copy of your degree or bonafide certificate.'}\n\nPlease log in and re-upload your document.\n\nBest regards,\nPlacement Cell Administration`;
  } else {
    body = `Dear ${candidateName},\n\nYour educational document verification was not approved.\nReason: ${adminComment || 'Incomplete or unreadable document.'}\n\nBest regards,\nPlacement Cell Administration`;
  }

  console.log(`[EMAIL SERVICE] Sent Verification status update to ${candidateEmail}`);
  return { success: true, subject, body, sentAt: new Date().toLocaleString() };
}
