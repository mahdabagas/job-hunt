import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET() {
    const categories = await prisma.industry.findMany();

    if (!categories) return NextResponse.json([]);

    return NextResponse.json(categories);
}