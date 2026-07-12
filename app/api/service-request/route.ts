import { randomBytes } from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function createReferenceNumber() {
  const date = new Date();
  const datePart = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("");

  const randomPart = randomBytes(3).toString("hex").toUpperCase();

  return `WIM-${datePart}-${randomPart}`;
}

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
    const service = String(formData.get("service") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const photos = formData
      .getAll("photos")
      .filter((file): file is File => file instanceof File && file.size > 0)
      .slice(0, 5);

    if (!name || !email || !service || !message) {
      return Response.json(
        { error: "Please complete all required fields." },
        { status: 400 },
      );
    }

    const maximumFileSize = 5 * 1024 * 1024;

    const invalidPhoto = photos.find(
      (photo) =>
        !photo.type.startsWith("image/") || photo.size > maximumFileSize,
    );

    if (invalidPhoto) {
      return Response.json(
        {
          error:
            "Each upload must be an image and cannot be larger than 5 MB.",
        },
        { status: 400 },
      );
    }

    const attachments = await Promise.all(
      photos.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      })),
    );

    const reference = createReferenceNumber();

    const submittedAt = new Date().toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "America/New_York",
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeService = escapeHtml(service);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

    const result = await resend.emails.send({
      from: "WheelzInMotion <onboarding@resend.dev>",
      to: process.env.SERVICE_REQUEST_TO!,
      replyTo: email,
      subject: `${reference} | ${service} Service Request`,
      attachments,
      html: `
        <div style="background:#080808;padding:40px 20px;font-family:Arial,sans-serif;color:#ffffff;">
          <div style="max-width:700px;margin:auto;background:#111111;border-radius:20px;overflow:hidden;border:1px solid #9333ea;box-shadow:0 0 35px rgba(147,51,234,.35);">

            <div style="background:linear-gradient(135deg,#7c3aed,#c026d3);padding:35px;text-align:center;">
              <h1 style="margin:0;font-size:34px;">WheelzInMotion</h1>
              <p style="margin:10px 0 0;font-size:18px;">New Service Request</p>
            </div>

            <div style="padding:35px;">
              <div style="margin-bottom:28px;padding:18px;background:#080808;border:1px solid #9333ea;border-radius:14px;text-align:center;">
                <p style="margin:0;color:#a1a1aa;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">
                  Reference Number
                </p>
                <p style="margin:10px 0 0;color:#c084fc;font-size:24px;font-weight:bold;">
                  ${reference}
                </p>
              </div>

              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">Customer</td>
                  <td style="padding:12px;">${safeName}</td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">Email</td>
                  <td style="padding:12px;">${safeEmail}</td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">Service</td>
                  <td style="padding:12px;">${safeService}</td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">Photos</td>
                  <td style="padding:12px;">${attachments.length}</td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">Submitted</td>
                  <td style="padding:12px;">${submittedAt}</td>
                </tr>
              </table>

              <hr style="margin:35px 0;border:0;border-top:1px solid #27272a;" />

              <h2 style="color:#c084fc;">Customer Message</h2>

              <p style="font-size:17px;line-height:1.8;color:#dddddd;">
                ${safeMessage}
              </p>

              <div style="margin-top:40px;text-align:center;">
                <a
                  href="mailto:${encodeURIComponent(email)}"
                  style="display:inline-block;padding:16px 30px;background:#9333ea;color:#ffffff;text-decoration:none;border-radius:999px;font-weight:bold;"
                >
                  Reply to Customer
                </a>
              </div>
            </div>

            <div style="background:#0d0d0d;padding:20px;text-align:center;color:#888888;">
              WheelzInMotion Service Request System
            </div>
          </div>
        </div>
      `,
    });

    if (result.error) {
      console.error("Resend error:", result.error);

      return Response.json(
        { error: "The request could not be emailed." },
        { status: 500 },
      );
    }

    return Response.json({
      success: true,
      reference,
      service,
    });
  } catch (error) {
    console.error("Service request error:", error);

    return Response.json(
      { error: "Unable to process the service request." },
      { status: 500 },
    );
  }
}