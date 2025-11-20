import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🔥 Call your NestJS backend
    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await backendRes.json();

    if (!backendRes.ok || !data.token) {
      return NextResponse.json({ error: data.message }, { status: 401 });
    }

    // 🔥 Response object back to frontend
    const response = NextResponse.json({
      message: "Login successful",
      admin: data.admin
    });

    // 🔐 Set HttpOnly cookie on NEXT.JS DOMAIN (localhost:9002)
 response.cookies.set({
  name: "token",
  value: data.token,
  httpOnly: true,
  secure: true,            // HTTPS required
  sameSite: "none",        // for cross-site
  domain: "cec.edu.in",    // <-- put YOUR backend domain
  path: "/",
  maxAge: 7 * 24 * 60 * 60,
});


    return response;

  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
