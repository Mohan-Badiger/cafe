import { NextResponse } from "next/server";
import { getAdminData, updateStock } from "@/lib/admin/serverStore";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data } = await getAdminData();
    return NextResponse.json({
      success: true,
      inventory: data.inventory || [],
    });
  } catch (err) {
    console.error("[API: /api/admin/inventory] GET error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve inventory" },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const { itemId, change } = await request.json();
    if (!itemId || typeof change !== "number") {
      return NextResponse.json(
        { success: false, error: "itemId and numeric change are required" },
        { status: 400 }
      );
    }

    const result = await updateStock(itemId, change);
    return NextResponse.json({
      success: true,
      version: result.version,
      message: `Stock updated for ${itemId}`,
    });
  } catch (err) {
    console.error("[API: /api/admin/inventory] PATCH error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to update inventory" },
      { status: 500 }
    );
  }
}
