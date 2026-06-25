import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(_: Request, { params }: { params: { id: string } }) {
    try {
        const { rows } = await pool.query(
        `SELECT * FROM questions 
        WHERE receiver_id = $1 
        ORDER BY asked_at DESC`,
        [params.id]
        )
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json()
        const { answer } = body

        const { rows } = await pool.query(
        `UPDATE questions
        SET answer=$1, is_answered=true, answered_at=NOW()
        WHERE question_id=$2
        RETURNING *`,
        [answer, params.id]
        )
        return NextResponse.json(rows[0])
    } catch (error) {
        return NextResponse.json({ error: 'Failed to answer question' }, { status: 500 })
    }
}