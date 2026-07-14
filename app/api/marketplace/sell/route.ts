import { Resend } from "resend";

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
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.SERVICE_REQUEST_TO;

    if (!resendApiKey) {
      console.error("RESEND_API_KEY is missing.");

      return Response.json(
        { error: "Email service is not configured." },
        { status: 500 },
      );
    }

    if (!recipientEmail) {
      console.error("SERVICE_REQUEST_TO is missing.");

      return Response.json(
        { error: "Recipient email is not configured." },
        { status: 500 },
      );
    }

    const resend = new Resend(resendApiKey);
    const formData = await request.formData();

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const deviceType = String(formData.get("deviceType") || "").trim();
    const condition = String(formData.get("condition") || "").trim();
    const brand = String(formData.get("brand") || "").trim();
    const model = String(formData.get("model") || "").trim();
    const askingPrice = String(formData.get("askingPrice") || "").trim();
    const description = String(formData.get("description") || "").trim();

    const photos = formData
      .getAll("photos")
      .filter(
        (file): file is File =>
          file instanceof File && file.size > 0,
      )
      .slice(0, 5);

    if (
      !name ||
      !email ||
      !deviceType ||
      !condition ||
      !brand ||
      !model ||
      !description
    ) {
      return Response.json(
        { error: "Please complete all required fields." },
        { status: 400 },
      );
    }

    const maximumFileSize = 5 * 1024 * 1024;

    const invalidPhoto = photos.find(
      (photo) =>
        !photo.type.startsWith("image/") ||
        photo.size > maximumFileSize,
    );

    if (invalidPhoto) {
      return Response.json(
        {
          error:
            "Each photo must be an image and cannot be larger than 5 MB.",
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

    const submittedAt = new Date().toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "America/New_York",
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeDeviceType = escapeHtml(deviceType);
    const safeCondition = escapeHtml(condition);
    const safeBrand = escapeHtml(brand);
    const safeModel = escapeHtml(model);
    const safeAskingPrice = askingPrice
      ? `$${escapeHtml(askingPrice)}`
      : "Not provided";

    const safeDescription = escapeHtml(description).replaceAll(
      "\n",
      "<br />",
    );

    const result = await resend.emails.send({
      from: "WheelzInMotion <onboarding@resend.dev>",
      to: recipientEmail,
      replyTo: email,
      subject: `Marketplace Submission: ${deviceType} - ${brand} ${model}`,
      attachments,
      html: `
        <div style="background:#080808;padding:40px 20px;font-family:Arial,sans-serif;color:#ffffff;">
          <div style="max-width:700px;margin:auto;background:#111111;border-radius:20px;overflow:hidden;border:1px solid #9333ea;box-shadow:0 0 35px rgba(147,51,234,.35);">

            <div style="background:linear-gradient(135deg,#7c3aed,#c026d3);padding:35px;text-align:center;">
              <h1 style="margin:0;font-size:34px;">
                WheelzInMotion
              </h1>

              <p style="margin:10px 0 0;font-size:18px;">
                New Marketplace Submission
              </p>
            </div>

            <div style="padding:35px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">
                    Customer
                  </td>

                  <td style="padding:12px;">
                    ${safeName}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">
                    Email
                  </td>

                  <td style="padding:12px;">
                    ${safeEmail}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">
                    Device Type
                  </td>

                  <td style="padding:12px;">
                    ${safeDeviceType}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">
                    Brand
                  </td>

                  <td style="padding:12px;">
                    ${safeBrand}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">
                    Model
                  </td>

                  <td style="padding:12px;">
                    ${safeModel}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">
                    Condition
                  </td>

                  <td style="padding:12px;">
                    ${safeCondition}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">
                    Asking Price
                  </td>

                  <td style="padding:12px;">
                    ${safeAskingPrice}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">
                    Photos
                  </td>

                  <td style="padding:12px;">
                    ${attachments.length}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:bold;color:#c084fc;">
                    Submitted
                  </td>

                  <td style="padding:12px;">
                    ${submittedAt}
                  </td>
                </tr>
              </table>

              <hr style="margin:35px 0;border:0;border-top:1px solid #27272a;" />

              <h2 style="color:#c084fc;">
                Item Description
              </h2>

              <p style="font-size:17px;line-height:1.8;color:#dddddd;">
                ${safeDescription}
              </p>

              <div style="margin-top:40px;text-align:center;">
                <a
                  href="mailto:${encodeURIComponent(email)}"
                  style="display:inline-block;padding:16px 30px;background:#9333ea;color:#ffffff;text-decoration:none;border-radius:999px;font-weight:bold;"
                >
                  Reply to Seller
                </a>
              </div>
            </div>

            <div style="background:#0d0d0d;padding:20px;text-align:center;color:#888888;">
              WheelzInMotion Marketplace Submission System
            </div>
          </div>
        </div>
      `,
    });

    if (result.error) {
      console.error("Resend error:", result.error);

      return Response.json(
        { error: "The submission could not be emailed." },
        { status: 500 },
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Marketplace submission error:", error);

    return Response.json(
      { error: "Unable to process the submission." },
      { status: 500 },
    );
  }
}