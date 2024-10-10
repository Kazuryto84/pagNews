import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import FormInput from '../form-input/form-input';
import Button from '../button/button';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.js';
import './sign-up.styles.scss';

const defaultFormFields = { displayName: '', email: '', password: '', confirmPassword: '' };

const SignUpForm = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => { setFormFields(defaultFormFields); };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!displayName || !email || !password || !confirmPassword) {
            alert('All fields are required');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            console.log('Creating user with:', { email, password });
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            if (user) {
                console.log('User created:', user);
                console.log('Creating user document with:', { displayName });
                await createUserDocumentFromAuth(user, { displayName });
                resetFormFields();
                navigate('/');
            } else {
                console.log('User creation failed');
            }
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log('User creation encountered an error', error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>{t('dont_you_have')}</h2>
            <span>{t('sign_up_with')}</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label={t('display_name')}
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName || ''}
                />
                <FormInput
                    label={t('email')}
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email || ''}
                />
                <FormInput
                    label={t('password')}
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password || ''}
                />
                <FormInput
                    label={t('confirm_password')}
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword || ''}
                />
                <button type="submit">{t('sign_up')}</button>
            </form>
        </div>
    );
};

export default SignUpForm;
