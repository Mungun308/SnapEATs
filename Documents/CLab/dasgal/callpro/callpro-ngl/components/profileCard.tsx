import React from 'react';
import styles from './profileCard.module.css';
import Image from 'next/image';
import proPic from './proPic.svg';

type ProfileCardProps={
    full_name: string;
    position: string;
    avatar_url: string; 
}

export default function ProfileCard({full_name, position, avatar_url}: ProfileCardProps) {
    return (
        <div className={styles.profileCard}>
            <p className={styles.newProfile}></p>
            <div className={styles.proPic}>
                
                <Image src={proPic} alt={full_name} width={64} height={64} />
            </div>
            <div className='profileText'>
                <p className={styles.fullname}>{full_name} </p>
                <p className={styles.position}> {position} </p>
            </div>
            <button className={styles.viewButton}> үзэх </button>
        </div>
    )
}

