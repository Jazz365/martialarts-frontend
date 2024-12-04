'use client';


import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logo from '../../../../assets/FAVICON.jpg'
import styles from './styles.module.css'
import Link from 'next/link'
import Button from '@/components/Button/Button'
import UserTypeSelect from '../UserTypeSelect/UserTypeSelect';
import TextInputComponent from '@/components/TextInputComponent/TextInputComponent';
import { AuthDetails } from './utils';
import { AuthService } from '@/services/authService';
import { validateEmail } from '@/helpers/helpers';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { userTypes } from '../UserTypeSelect/utils';

const AuthForm = ({
    authType,
}: {
    authType: string;
}) => {
    const [ isLoginForm, setIsLoginForm ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ details, setDetails ] = useState<AuthDetails>({});

    const params = useSearchParams();

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
                await authService.loginUser(details);
                setLoading(false);
            } catch (error) {
                setLoading(false);   
            }

            return
        }
        
        try {
            await authService.registerUser({
                ...details,
                is_owner: params.get('type') === userTypes.owner,
            });

            setLoading(false);
        } catch (error) {
            setLoading(false);   
        }
    }

    if (!authType || authType?.length < 1) return <></>
    
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

            <UserTypeSelect 
                authType={authType}
            />

            <TextInputComponent 
                label='username'
                name='username'
                value={details.username ?? ''}
                onChange={({ target }) => handleUpdateDetail(target.name, target.value)}
            />

            {
                !isLoginForm && <>
                    <TextInputComponent 
                        label='email'
                        type='email'
                        name='email'
                        value={details.email ?? ''}
                        onChange={({ target }) => handleUpdateDetail(target.name, target.value)}
                    />

                    <TextInputComponent 
                        label='phone number'
                        type='tel'
                        name='phone_number'
                        value={details.phone_number ?? ''}
                        onChange={({ target }) => handleUpdateDetail(target.name, target.value)}
                    />
                </>
            }

            <TextInputComponent 
                label='password'
                type='password'
                name='password'
                value={details.password ?? ''}
                onChange={({ target }) => handleUpdateDetail(target.name, target.value)}
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
                            '/auth/register?type=owner'
                        :
                        '/auth/login?type=owner'   
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
        </section>
    </>
}

export default AuthForm