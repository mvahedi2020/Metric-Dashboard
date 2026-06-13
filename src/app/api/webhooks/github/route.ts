import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;

const verifySignature = (req: NextRequest, body: string) => {
  const signature = req.headers.get("x-hub-signature-256");
  
  if (!signature || !WEBHOOK_SECRET) {
    return false;
  }

  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
  const digest = "sha256=" + hmac.update(body).digest("hex");

  const sigBuffer = Buffer.from(signature);
  const digestBuffer = Buffer.from(digest);

  if (sigBuffer.length !== digestBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(sigBuffer, digestBuffer);
};

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    
    // 1. Verify Webhook Signature
    if (!verifySignature(req, rawBody)) {
      console.warn("Invalid GitHub Webhook Signature");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const event = req.headers.get("x-github-event");

    // 2. Parse pull_request events
    if (event === "pull_request") {
      const { action, pull_request } = payload;
      console.log(`[GitHub Webhook] PR ${pull_request.number} was ${action} by ${pull_request.user.login}`);
      console.log(`[GitHub Webhook] Title: ${pull_request.title}`);
      
      // TODO: Connect to database here in the future to store PR metrics
    } else {
      console.log(`[GitHub Webhook] Ignored event: ${event}`);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[GitHub Webhook] Error processing webhook:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
