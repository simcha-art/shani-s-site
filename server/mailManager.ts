import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export interface ContactEmailData {
    name: string;
    email: string;
    topic: string;
    question: string;
}

export async function sendEmailForAdmin({ name, email, topic, question }: ContactEmailData) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_DEST, // נשלח לתיבה שלך
        replyTo: email,             // בלחיצה על "השב" נחזור למייל של הלקוח
        subject: `לקוח רוצה ליצור איתך קשר: ${topic}`,
        text: `שלום אני ${name} רציתי לשאול בנושא ${topic}.\nהשאלה שלי היא:\n${question}`,
        html: `
      <div dir="rtl">
        <h3>התקבלה פנייה חדשה מאתר:</h3>
        <p><strong>שם הפונה:</strong> ${name}</p>
        <p><strong>אימייל לחזרה:</strong> ${email}</p>
        <p><strong>נושא:</strong> ${topic}</p>
        <p><strong>תוכן הפנייה:</strong></p>
        <blockquote style="background: #f4f4f4; padding: 10px; border-right: 4px solid #0070f3;">
          ${question}
        </blockquote>
      </div>
    `
    }
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
        return true
    } catch (error) {
        console.error(error)
        const err = new Error("Error!, could not send the email")
        err.status = 500
        throw err
    }
}

export async function sendEmailForUser({ name, email, topic, question, theme }: ContactEmailData & { theme: string }) {
    "sending the user a confirmation email that we received their message, the message will be in Hebrew or english depending on the theme we received from the frontend"
    const subject = theme === "he" ? `תודה על הפנייה שלך בנושא: ${topic}` : `Thank you for your inquiry regarding: ${topic}`;
    const text = theme === "he" ? `שלום ${name},\n\nתודה על הפנייה שלך בנושא: ${topic}.\n\nהשאלה שלך:\n${question}\n\nנשמח לחזור אליך בהקדם.` : `Hello ${name},\n\nThank you for your inquiry regarding: ${topic}.\n\nYour question:\n${question}\n\nWe will get back to you as soon as possible.`;
    const html = theme === "he" ? `
      <div dir="rtl">
        <h3>שלום ${name},</h3>
        <p>תודה על הפנייה שלך בנושא: <strong>${topic}</strong>.</p>
        <p>השאלה שלך:</p>
        <blockquote style="background: #f4f4f4; padding: 10px; border-right: 4px solid #0070f3;">
          ${question}
        </blockquote>
        <p>נשמח לחזור אליך בהקדם.</p>
      </div>
    ` : `
      <div>
        <h3>Hello ${name},</h3>
        <p>Thank you for your inquiry regarding: <strong>${topic}</strong>.</p>
        <p>Your question:</p>
        <blockquote style="background: #f4f4f4; padding: 10px; border-right: 4px solid #0070f3;">
          ${question}
        </blockquote>
        <p>We will get back to you as soon as possible.</p>
      </div>
    `;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email, // נשלח ללקוח
        subject: subject,
        text: text,
        html: html
    };
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
        return true
    } catch (error) {
        console.error(error)
        const err = new Error("Error!, could not send the email")
        err.status = 500
        throw err
    }
}
