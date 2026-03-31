import { NextRequest, NextResponse } from 'next/server'
import { getAnalysis } from '@/lib/storage'

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('sessionId')
  if (!sessionId) return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 })
  const analysis = await getAnalysis(sessionId)
  if (!analysis) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(analysis)
}
