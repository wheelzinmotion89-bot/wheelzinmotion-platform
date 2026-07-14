import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const computerUse = String(formData.get("computerUse") || "").trim();
    const budget = String(formData.get("budget") || "").trim();
    const cpuPreference = String(
      formData.get("cpuPreference") || "Not specified",
    ).trim();
    const gpuPreference = String(
      formData.get("gpuPreference") || "Not specified",
    ).trim();
    const memory = String(formData.get("memory") || "Not Sure").trim();
    const storage = String(formData.get("storage") || "Not Sure").trim();
    const caseSize = String(
      formData.get("caseSize") || "No Preference",
    ).trim();
    const operatingSystem = String(
      formData.get("operatingSystem") || "Not Sure",
    ).trim();
    const notes = String(formData.get("notes") || "No notes provided").trim();
    const features = formData.getAll("features").map(String);

    if (!name || !email || !computerUse || !budget) {
      return Response.json(
        { error: "Please complete all required fields." },
        { status: 400 },
      );
    }

    const submittedAt = new Date().toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "America/New_York",
    });

    const safeFeatures =
      features.length > 0
        ? features.map(escapeHtml).join(", ")
        : "None selected";

    const result = await resend.emails.send({
      from: "WheelzInMotion <onboarding@resend.dev>",
      to: process.env.SERVICE_REQUEST_TO!,
      replyTo: email,
      subject: `New Custom PC Build Request — ${budget}`,
      html: `
        <div style="background:#080808;padding:40px 20px;font-family:Arial,sans-serif;color:#ffffff;">
          <div style="max-width:720px;margin:auto;background:#111111;border-radius:20px;overflow:hidden;border:1px solid #9333ea;box-shadow:0 0 35px rgba(147,51,234,.35);">

            <div style="background:linear-gradient(135deg,#7c3aed,#c026d3);padding:35px;text-align:center;">
              <h1 style="margin:0;font-size:34px;">WheelzInMotion</h1>
              <p style="margin:10px 0 0;font-size:18px;">New Custom PC Build Request</p>
            </div>

            <div style="padding:35px;">
              <h2 style="color:#c084fc;">Customer Information</h2>

              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">Customer</td>
                  <td style="padding:12px;">${escapeHtml(name)}</td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">Email</td>
                  <td style="padding:12px;">${escapeHtml(email)}</td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">Submitted</td>
                  <td style="padding:12px;">${submittedAt}</td>
                </tr>
              </table>

              <hr style="margin:30px 0;border:0;border-top:1px solid #27272a;" />

              <h2 style="color:#c084fc;">Build Requirements</h2>

              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">Primary Use</td>
                  <td style="padding:12px;">${escapeHtml(computerUse)}</td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">Budget</td>
                  <td style="padding:12px;">${escapeHtml(budget)}</td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">CPU Preference</td>
                  <td style="padding:12px;">${escapeHtml(cpuPreference)}</td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">GPU Preference</td>
                  <td style="padding:12px;">${escapeHtml(gpuPreference)}</td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">Memory</td>
                  <td style="padding:12px;">${escapeHtml(memory)}</td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">Storage</td>
                  <td style="padding:12px;">${escapeHtml(storage)}</td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">Case Size</td>
                  <td style="padding:12px;">${escapeHtml(caseSize)}</td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">Operating System</td>
                  <td style="padding:12px;">${escapeHtml(operatingSystem)}</td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">Features</td>
                  <td style="padding:12px;">${safeFeatures}</td>
                </tr>
              </table>

              <hr style="margin:30px 0;border:0;border-top:1px solid #27272a;" />

              <h2 style="color:#c084fc;">Additional Notes</h2>

              <p style="font-size:17px;line-height:1.8;color:#dddddd;">
                ${escapeHtml(notes).replaceAll("\n", "<br />")}
              </p>

              <div style="margin-top:40px;text-align:center;">
                <a
                  href="mailto:${email}"
                  style="display:inline-block;padding:16px 30px;background:#9333ea;color:#ffffff;text-decoration:none;border-radius:999px;font-weight:bold;"
                >
                  Reply to Customer
                </a>
              </div>
            </div>

            <div style="background:#0d0d0d;padding:20px;text-align:center;color:#888888;">
              WheelzInMotion Custom PC Request System
            </div>
          </div>
        </div>
      `,
    });

    if (result.error) {
      console.error("Resend error:", result.error);

      return Response.json(
        { error: "The build request could not be emailed." },
        { status: 500 },
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("PC builder request error:", error);

    return Response.json(
      { error: "Unable to process the build request." },
      { status: 500 },
    );
  }
}