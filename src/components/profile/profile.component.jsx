import { useTranslation } from 'react-i18next';

const ProfileComponent = () => {
    const { t } = useTranslation();
    return (
        <div>{t`profile`}</div>
    )
};

export default ProfileComponent;