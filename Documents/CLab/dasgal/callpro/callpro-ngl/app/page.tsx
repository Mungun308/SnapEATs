import pool from '@/lib/db'

export default async function Home() {
  const { rows } = await pool.query('SELECT * FROM users')

  return (
    <main>
      
      <pre>{JSON.stringify(rows, null, 2)}</pre>
      
    </main>
  )
}