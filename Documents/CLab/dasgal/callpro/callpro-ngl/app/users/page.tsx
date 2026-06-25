import ProfileCard from '@/components/profileCard'
import '../globals.css';

export default async function UsersPage() {
    const res = await fetch('http://localhost:3000/api/users')
    const users = await res.json()

    return (
        <div className='profilesGrid'>
        {users.map((user: any) => (
            <ProfileCard
            key={user.user_id}
            full_name={user.full_name}
            position={user.position}
            avatar_url={user.avatar_url}
            />
        ))}
        </div>
    )
}