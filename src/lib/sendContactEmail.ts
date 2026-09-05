export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactSendResult {
  success: boolean;
  message: string;
  mailtoUrl: string;
  gmailWebUrl: string;
  usedWebhook?: boolean;
}

export const TARGET_EMAIL = 'nagpalekjotsingh@gmail.com';
const STORAGE_KEY = 'portfolio_gas_webhook_url';

export function getGasWebhookUrl(): string {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored.trim().length > 0) return stored.trim();
  }
  return ((import.meta as any).env?.VITE_GOOGLE_SCRIPT_URL as string) || '';
}

export function setGasWebhookUrl(url: string): void {
  if (typeof window !== 'undefined') {
    if (!url || url.trim() === '') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, url.trim());
    }
  }
}

export function getMailtoFallbackUrl(payload: ContactPayload): string {
  const subject = `[Portfolio Inquiry] ${payload.name || 'Direct Message'} via ekjotnagpal.in`;
  const body = `Sender Name: ${payload.name || 'Visitor'}
Sender Email: ${payload.email || 'No email provided'}

Message:
${payload.message || ''}

---
Dispatched via Ekjot Nagpal Engineering Portfolio`;

  return `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function getGmailWebComposeUrl(payload: ContactPayload): string {
  const subject = `[Portfolio Inquiry] ${payload.name || 'Direct Message'} via ekjotnagpal.in`;
  const body = `Hi Ekjot,

My name is ${payload.name || '[Your Name]'}.

${payload.message || ''}

Best regards,
${payload.name || ''}
${payload.email || ''}`;

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${TARGET_EMAIL}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Complete ready-to-deploy Google Apps Script code for nagpalekjotsingh@gmail.com
export const GOOGLE_APPS_SCRIPT_CODE = `function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var name = data.name || 'Anonymous Visitor';
    var email = data.email || 'No email provided';
    var message = data.message || '(No message content)';
    var date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

    var recipient = 'nagpalekjotsingh@gmail.com';
    var subject = '🚀 Portfolio Inquiry from ' + name + ' (' + email + ')';

    var htmlBody = 
      '<div style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc;">' +
        '<div style="background-color: #0f172a; padding: 18px 24px; border-radius: 8px; margin-bottom: 20px;">' +
          '<h2 style="color: #ffffff; margin: 0; font-size: 18px; font-weight: 700;">Direct Portfolio Inquiry</h2>' +
          '<p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 12px;">Transmitted from ekjotnagpal.in</p>' +
        '</div>' +
        '<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">' +
          '<tr><td style="padding: 6px 0; color: #64748b; width: 120px; font-weight: 600;">Sender:</td><td style="padding: 6px 0; color: #0f172a; font-weight: 700;">' + name + '</td></tr>' +
          '<tr><td style="padding: 6px 0; color: #64748b; font-weight: 600;">Email:</td><td style="padding: 6px 0; color: #2563eb; font-weight: 600;"><a href="mailto:' + email + '">' + email + '</a></td></tr>' +
          '<tr><td style="padding: 6px 0; color: #64748b; font-weight: 600;">Received:</td><td style="padding: 6px 0; color: #64748b;">' + date + ' (IST)</td></tr>' +
        '</table>' +
        '<div style="background-color: #ffffff; padding: 18px; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 24px;">' +
          '<p style="color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 8px 0; letter-spacing: 0.05em;">Message Body</p>' +
          '<p style="color: #1e293b; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">' + message + '</p>' +
        '</div>' +
        '<div style="text-align: center;">' +
          '<a href="mailto:' + email + '?subject=Re: ' + encodeURIComponent(subject) + '" style="display: inline-block; background-color: #2563eb; color: #ffffff; font-weight: 600; font-size: 13px; text-decoration: none; padding: 12px 28px; border-radius: 8px;">Reply Directly to ' + name + '</a>' +
        '</div>' +
      '</div>';

    var plainBody = 
      'New Inquiry from: ' + name + ' <' + email + '>\\n\\n' +
      'Message:\\n' + message + '\\n\\n' +
      'Time: ' + date + ' (IST)\\n' +
      'Transmitted via Ekjot Nagpal Portfolio Webhook';

    MailApp.sendEmail({
      to: recipient,
      replyTo: email,
      subject: subject,
      body: plainBody,
      htmlBody: htmlBody
    });

    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: 'active', owner: 'nagpalekjotsingh@gmail.com' }))
    .setMimeType(ContentService.MimeType.JSON);
}
`;

export async function sendDirectEmail(payload: ContactPayload): Promise<ContactSendResult> {
  const mailtoUrl = getMailtoFallbackUrl(payload);
  const gmailWebUrl = getGmailWebComposeUrl(payload);
  const webhookUrl = getGasWebhookUrl();

  // If webhook is configured, dispatch directly via Google Apps Script
  if (webhookUrl && webhookUrl.startsWith('http')) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors', // Standard bypass for Google Apps Script 302 redirects
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          message: payload.message,
          timestamp: new Date().toISOString(),
        }),
      });

      return {
        success: true,
        message: 'Thank you for reaching out! Your message has been delivered to Ekjot, who will review and respond shortly.',
        mailtoUrl,
        gmailWebUrl,
        usedWebhook: true,
      };
    } catch (err: any) {
      console.warn('Direct email delivery failed, falling back to direct compose:', err);
      return {
        success: false,
        message: 'Unable to dispatch message directly. Please contact Ekjot at ' + TARGET_EMAIL + '.',
        mailtoUrl,
        gmailWebUrl,
        usedWebhook: true,
      };
    }
  }

  // If no webhook URL has been configured yet, open Gmail Web compose directly
  return {
    success: false,
    message: 'Your email draft has been prepared in your email client. Please review and click send.',
    mailtoUrl,
    gmailWebUrl,
    usedWebhook: false,
  };
}
