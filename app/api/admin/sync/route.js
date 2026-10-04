import { NextResponse } from "next/server";
import { getAdminData } from "@/lib/admin/serverStore";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { version, lastModified, etag } = await getAdminData();
    return NextResponse.json({
      status: "healthy",
      version,
      lastModified,
      etag,
      serverTime: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[API: /api/admin/sync] GET error:", err);
    return NextResponse.json(
      { status: "error", error: "Backend sync unavailable" },
      { status: 500 }
    );
  }
}
