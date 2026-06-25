import styles from './header.module.css'
import Image from 'next/image';
import searchButton from './searchButton.svg';
import notifButton from './notif-button.svg';
import proButton from './profile-button.svg'

export function Header(){
    return(
        <section className={styles.header}>
            <div className={styles['logo-wrapper']}>
                <img src="logo.svg"></img>
            </div>

                <div className={styles.search}>
                    <input type="search"></input>
                    <button className={styles['search-button']}>
                        <Image src={searchButton} alt="srch"></Image>
                    </button>
                </div>
            <div className={styles['header-button']}>
                <button className={styles['profile-button']}>
                    <Image src={notifButton} alt="ntf"></Image>
                </button>
                <button className={styles['profile-button']}>
                    <Image src={proButton} alt="pro"></Image>
                </button>
            </div>
        </section>
    )
}