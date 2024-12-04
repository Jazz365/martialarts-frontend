import styles from '../styles.module.css'
import AuthForm from '@/features/Auth/components/AuthForm/AuthForm'

type PageParams = Promise<{ type: string }>;


const AuthPage = async (props: { params: PageParams }) => {
    const { type } = await props.params;

    return <>
        <section className={styles.page}>
            <AuthForm 
                authType={type}
            />
        </section>
    </>
}

export default AuthPage;