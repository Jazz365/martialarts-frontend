import { NextResponse } from "next/server";


export async function GET() {
    return NextResponse.json({
        message: 'Successfully fetched detail!',
        data: process.env,
    }, {
        status: 200,
    })
}