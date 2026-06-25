import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(_: Request, { params }: { params: { id: string } }) {
    try {
        const { rows } = await pool.query(
        'SELECT * FROM users WHERE user_id = $1',
        [params.id]
        )
        if (rows.length === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }
        return NextResponse.json(rows[0])
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json()
        const { full_name, age, position, team, birth_date, education, lifestyle, personality } = body

        const { rows } = await pool.query(
        `UPDATE users 
        SET full_name=$1, age=$2, position=$3, team=$4, birth_date=$5,
            education=$6, lifestyle=$7, personality=$8
        WHERE user_id=$9
        RETURNING *`,
        [full_name, age, position, team, birth_date,
        JSON.stringify(education), JSON.stringify(lifestyle), JSON.stringify(personality),
        params.id]
        )
        return NextResponse.json(rows[0])
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
    }
}