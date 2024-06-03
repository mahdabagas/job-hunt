import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { categoryJobType } from "@/types";

export async function GET() {
    const categories = await prisma.categoryJob.findMany({
        include: {
            _count: {
                select: {Job: true}
            }
        }
    })

    if (!categories) return NextResponse.json([]);

    const parseCategories = categories.map((item: any) => ({
        id : item.id,
        name: item.name,
        totalJobs: item._count.Job
    })) as categoryJobType[];

    return NextResponse.json(parseCategories);
}