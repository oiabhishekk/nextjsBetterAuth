import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  otp: string;
}

export const EmailTemplate = ({ firstName, otp }: EmailTemplateProps) => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h2>Hello {firstName},</h2>
      <p>
        Here’s your one-time password (OTP) for verification. Please use it
        within the next <strong>10 minutes</strong>.
      </p>
      <div
        style={{
          background: "#f4f4f4",
          padding: "15px",
          borderRadius: "8px",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
          letterSpacing: "4px",
        }}
      >
        {otp}
      </div>
      <p style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
        If you didn’t request this, you can safely ignore this email.
      </p>
      <p style={{ marginTop: "30px" }}>— The AbhishekLMS Team</p>
    </div>
  );
};
