import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
    try {
        const { rows } = await pool.query(
        'SELECT * FROM users ORDER BY created_at DESC'
        )
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        )
    }

}

export async function POST(){
    try{
        const {rows}= await pool.query(
            'INSERT INTO user (email, full_name, age, position, team, birth_date, education, lifestyle, personality) VALUES ( );'
        )   
        return NextResponse.json('User added successfully!') 
    } catch (error){
        return NextResponse.json(
            { error: 'Failed to add user'},
            {status: 400 }
        )
    }
}