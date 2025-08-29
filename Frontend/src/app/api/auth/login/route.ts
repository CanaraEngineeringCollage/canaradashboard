import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const nestRes = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/login`,
      body,
      { withCredentials: true }
    );

    const cookie = nestRes.headers['set-cookie']?.[0];

    if (cookie) {
      return new NextResponse(JSON.stringify({ message: 'Login successful',data:nestRes.data }), {
        status: 200,
        headers: {
          'Set-Cookie': cookie,
        },
      });
    }

    return NextResponse.json({ message: 'No cookie received' }, { status: 500 });
  } catch (err: any) {
    return NextResponse.json({ message: err?.response?.data?.message || 'Login failed' }, { status: 401 });
  }
}
