import React from 'react';
import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';

export const Header = () => 
    <header className={styles.header}>
        <div className={styles.header__content}>
            <img src="/images/logo.svg"/>
            <nav className={styles.header__nav}>
                <a className={styles.active}>Home</a>
                <a>Posts</a>
            </nav>

            <SignInButton />
        </div>
    </header>