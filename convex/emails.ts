"use node";

import { v } from "convex/values";
import nodemailer from "nodemailer";
import { internal } from "./_generated/api";
import { action } from "./_generated/server";

export const sendInvitationEmail = action({
  args: {
    inviteeId: v.id("invitees"),
    nameEnc: v.string(),
    email: v.string(),
    role: v.string(),
    rawToken: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      if (!smtpUser || !smtpPass) {
        throw new Error(
          "Missing SMTP_USER or SMTP_PASS environment variables. " +
          "Set them in the Convex dashboard: npx convex env set SMTP_USER your@gmail.com && npx convex env set SMTP_PASS your_app_password"
        );
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const inviteUrl = `${appUrl}/invite?token=${args.rawToken}`;

      const htmlContent = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d1b1e; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #0d1b1e 0%, #1a2f33 100%); padding: 40px 32px; text-align: center;">
            <h1 style="color: #13daec; font-size: 28px; margin: 0 0 8px 0; letter-spacing: -0.5px;">Afterword</h1>
            <p style="color: #6b8a8d; font-size: 14px; margin: 0;">Close the final chapter.</p>
          </div>
          <div style="padding: 32px;">
            <h2 style="color: #e2e8f0; font-size: 20px; margin: 0 0 16px 0;">You've Been Invited</h2>
            <p style="color: #94a3b8; font-size: 15px; line-height: 1.6; margin: 0 0 12px 0;">
              Hello,
            </p>
            <p style="color: #94a3b8; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
              You have been designated as a <strong style="color: #13daec;">${args.role.replace("_", " ")}</strong> on Afterword — 
              a secure platform for managing and closing online accounts of a loved one who has passed.
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${inviteUrl}" style="display: inline-block; background: #13daec; color: #0d1b1e; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 15px; letter-spacing: 0.3px;">
                Accept Invitation →
              </a>
            </div>
            <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0 0 8px 0;">
              If you did not expect this invitation, you can safely ignore this email.
            </p>
          </div>
          <div style="padding: 20px 32px; border-top: 1px solid #1e3a3f; text-align: center;">
            <p style="color: #475569; font-size: 12px; margin: 0;">
              Afterword · Privacy-first · Open Source · MIT Licensed
            </p>
          </div>
        </div>
      `;

      const info = await transporter.sendMail({
        from: `"Afterword" <${smtpUser}>`,
        to: args.email,
        subject: "You've been invited to Afterword — Estate Access",
        html: htmlContent,
      });

      console.log("✅ Invitation email sent successfully:", info.messageId, "to:", args.email);

      // Mark the invitation as sent
      await ctx.runMutation(internal.emailHelpers.markInvitationSent, {
        inviteeId: args.inviteeId,
      });

      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("❌ Failed to send invitation email:", error);
      throw new Error(`Failed to send invitation email: ${error}`);
    }
  },
});

export const sendOtpEmail = action({
  args: {
    guardianEmail: v.string(),
    otpCode: v.string(),
    ownerFirstName: v.string(),
    requestorRelationship: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      if (!smtpUser || !smtpPass) {
        throw new Error("Missing SMTP_USER or SMTP_PASS environment variables.");
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const htmlContent = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d1b1e; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #0d1b1e 0%, #1a2f33 100%); padding: 40px 32px; text-align: center;">
            <h1 style="color: #13daec; font-size: 28px; margin: 0 0 8px 0;">Afterword</h1>
            <p style="color: #6b8a8d; font-size: 14px; margin: 0;">Estate Unlock Request</p>
          </div>
          <div style="padding: 32px;">
            <h2 style="color: #e2e8f0; font-size: 20px; margin: 0 0 16px 0;">
              Estate unlock request for ${args.ownerFirstName}
            </h2>
            <p style="color: #94a3b8; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
              Someone identifying as a <strong style="color: #13daec;">${args.requestorRelationship}</strong> 
              is requesting access to ${args.ownerFirstName}'s digital estate.
            </p>
            <div style="background: #111818; border: 2px solid #13daec; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
              <p style="color: #6b8a8d; font-size: 13px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">Your Verification Code</p>
              <p style="color: #13daec; font-size: 36px; font-weight: 800; letter-spacing: 8px; margin: 0;">${args.otpCode}</p>
              <p style="color: #475569; font-size: 12px; margin: 8px 0 0 0;">This code expires in 10 minutes</p>
            </div>
            <div style="background: #1a2f33; border-radius: 8px; padding: 16px; margin: 16px 0;">
              <p style="color: #f59e0b; font-size: 13px; margin: 0; line-height: 1.5;">
                ⚠️ <strong>Only share this code if you trust this request.</strong> 
                If you are unsure, do not share the code and contact the family directly.
              </p>
            </div>
          </div>
          <div style="padding: 20px 32px; border-top: 1px solid #1e3a3f; text-align: center;">
            <p style="color: #475569; font-size: 12px; margin: 0;">
              Afterword · You are the trusted guardian for this estate
            </p>
          </div>
        </div>
      `;

      const info = await transporter.sendMail({
        from: `"Afterword" <${smtpUser}>`,
        to: args.guardianEmail,
        subject: `Estate unlock request for ${args.ownerFirstName} — action required`,
        html: htmlContent,
      });

      console.log("✅ OTP email sent to guardian:", info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("❌ Failed to send OTP email:", error);
      throw new Error(`Failed to send OTP email: ${error}`);
    }
  },
});


