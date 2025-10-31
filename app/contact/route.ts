import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = process.env.CONTACT_TO!;
const FROM = process.env.CONTACT_FROM!;

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, company, message, topic, volume, budget } = data;

    if (!name || !email || !message)
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2 style="color:#c2a165;margin-bottom:8px">New Contact from Hajari Minerals</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Company:</b> ${company || "-"}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Topic:</b> ${topic || "General enquiry"}</p>
        <p><b>Volume:</b> ${volume || "-"} MT</p>
        <p><b>Budget:</b> ${budget || "-"} USD</p>
        <hr style="margin:16px 0;border:none;border-top:1px solid #eee"/>
        <p style="white-space:pre-wrap">${message}</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject: `[Hajari Minerals] Enquiry from ${name}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: "Email failed to send" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
