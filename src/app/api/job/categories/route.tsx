import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { companyJobType } from "@/types";

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
    })) as companyJobType[];

    return NextResponse.json(parseCategories);
}