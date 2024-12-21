'use client';


import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logo from '../../../../assets/FAVICON-plain.png'
import styles from './styles.module.css'
import Link from 'next/link'
import Button from '@/components/Button/Button'
import UserTypeSelect from '../UserTypeSelect/UserTypeSelect';
import TextInputComponent from '@/components/TextInputComponent/TextInputComponent';
import { AuthDetails } from './utils';
import { AuthService } from '@/services/authService';
import { validateEmail } from '@/helpers/helpers';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { userTypes } from '../UserTypeSelect/utils';
import { AppConstants } from '@/utils/constants';
import { useUserContext } from '@/contexts/UserContext';

const AuthForm = ({
    authType,
}: {
    authType: string;
}) => {
    const [ isLoginForm, setIsLoginForm ] = useState<boolean | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ details, setDetails ] = useState<AuthDetails>({});

    const { setIsLoggedIn, setUserDetails } = useUserContext();

    const params = useSearchParams();
    const router = useRouter();

    const authService = new AuthService();


    const handleUpdateDetail = (key: string, value: string) => {
        setDetails(prevDetail => {
            return {
                ...prevDetail,
                [key]: value
            }
        })
    }

    useEffect(() => {
        if (authType === 'login') return setIsLoginForm(true);

        setIsLoginForm(false);
    }, [authType])


    const handleSubmitDetails = async () => {
        if (Object.keys(details).length < 2 || loading) return toast.info('Please fill in all required details');
        if (details.email && !validateEmail(details.email)) return toast.info('Please enter a valid email');

        setLoading(true);

        if (isLoginForm) {
            try {
                const res = await authService.loginUser(details);
                localStorage.setItem(AppConstants.tokenKey, res?.token);

                setIsLoggedIn(true);

                router.push('/login-success');
            } catch (error) {
                setLoading(false);   
            }

            return
        }
        
        try {
            const res = await authService.registerUser({
                ...details,
                is_owner: params.get('type') === userTypes.owner,
            });

            setIsLoggedIn(true);
            setUserDetails({
                id: res?.id,
                email: res?.email,
                is_owner: res?.is_owner,
                phone_number: res?.phone_number,
                username: res?.username,
            });

            localStorage.setItem(AppConstants.tokenKey, res?.token);

            router.push('/login-success');
        } catch (error) {
            setLoading(false);   
        }
    }

    if (!authType || authType?.length < 1 || isLoginForm === null) return <></>
    
    return <>
        <section className={styles.form__Wrap}>
            <Link href={'/'}>
                <Image 
                    src={logo}
                    alt='logo icon'
                    width={45}
                    height={45}
                />
            </Link>

            {
                !isLoginForm &&
                <UserTypeSelect 
                    authType={authType}
                />
            }

            <TextInputComponent 
                label='username'
                name='username'
                value={details.username ?? ''}
                onChange={handleUpdateDetail}
                isRequired
            />

            {
                !isLoginForm && <>
                    <TextInputComponent 
                        label='email'
                        type='email'
                        name='email'
                        value={details.email ?? ''}
                        onChange={handleUpdateDetail}
                        isRequired
                    />

                    <TextInputComponent 
                        label='phone number'
                        type='tel'
                        name='phone_number'
                        value={details.phone_number ?? ''}
                        onChange={handleUpdateDetail}
                    />
                </>
            }

            <TextInputComponent 
                label='password'
                type='password'
                name='password'
                value={details.password ?? ''}
                onChange={handleUpdateDetail}
                isRequired
            />

            <Button 
                label={
                    loading ?
                        'Please wait...'
                    :
                    isLoginForm ?
                        'Login'
                    :
                    'Register'
                }
                handleClick={handleSubmitDetails}
            />

            <section className={styles.bottom__Row}>
                <p>
                    {
                        isLoginForm ?
                            "Don't have an account?"
                        :
                        "Already have an account?"
                    }
                </p>
                <Button 
                    label={
                        isLoginForm ?
                            'Register'
                        :
                        'Login'
                    }
                    useLink={true}
                    linkLocation={
                        isLoginForm ?
                            `/auth/register?type=${userTypes.owner}`
                        :
                        '/auth/login'   
                    }
                    style={{
                        fontSize: '0.85rem',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--primary-app-color)',
                        padding: 0
                    }}
                />
            </section>

            {
                !isLoginForm &&
                <p className={styles.legal__Info}>
                    <span>By continuing, you agree to our named</span>
                    {' '}
                    <Button 
                        label='terms of use'
                        style={{
                            padding: 0,
                            backgroundColor: 'transparent',
                            fontSize: '0.65rem',
                            color: 'var(--primary-app-color)',
                        }}
                    />
                    
                    <span>Read our</span>
                    
                    <Button 
                        label='Privacy Policy'
                        style={{
                            padding: 0,
                            backgroundColor: 'transparent',
                            fontSize: '0.65rem',
                            color: 'var(--primary-app-color)',
                        }}
                    />
                </p>
            }
        </section>
    </>
}

export default AuthForm