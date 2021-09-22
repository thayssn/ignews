import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import styles from './styles.module.scss';
import { signIn, useSession, signOut } from 'next-auth/client'

export const SignInButton = () => {
    const [session] = useSession(); 

    return session
    ? (
        <button type="button" className={styles.sign_in_button} onClick={() => signOut()}>
            <FaGithub color="#04d371" /> {session.user.name} 
            <FiX color="#737380" className={styles.close_icon}/>
        </button>
    )
    : (
        <button type="button"
            className={styles.sign_in_button}
            onClick={() => signIn('github')}
        >
            <FaGithub color="#FFF" /> Sign in with Github
        </button>
    )}