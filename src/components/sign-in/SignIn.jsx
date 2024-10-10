import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import FormInput from '../form-input/form-input';
import Button from '../button/button';
import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from '../../utils/firebase/firebase.js';

import './sign-in.styles.scss';

const defaultFormFields = { email: '', password: '' };

const SignInForm = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        const result = await signInWithGooglePopup();
        if (result.user) navigate('/');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (error) {
            console.log('user sign in failed', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className='sign-in-container'>
            <h2>{t('do_you_have')}</h2>
            <span>{t('sign_in_with')}</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label={t('email')}
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />
                <FormInput
                    label={t('password')}
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                />
                <div className='buttons-container'>
                    <Button type='submit'>{t('sign_in')}</Button>
                    <Button buttonType='google' type='button' onClick={signInWithGoogle}>
                        {t('sign_in_with_google')}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
