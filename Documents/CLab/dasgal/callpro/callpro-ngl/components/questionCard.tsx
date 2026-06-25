import React from "react";
import styles from 'questionCard.module.css'
import Image from 'next/image';

type questionCard={
    receiver_id: string;
    context: string;
    asked_at:string;
    answer:string;
}

export default function QuestionCard(){
    return(
        <div className={styles.questionCard}>
            <div className={styles['profile-warpper']}>
                <Image src={avatar_url}></Image>
            </div>
            <div className={styles.context}>
                <p className={styles.question}> {context} </p>
            </div>
            <div className={styles.answer}>
                <p className={styles.question}>{answer}</p>
            </div>
        </div>
    )
}