import { Fragment, useContext, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { UserContext } from '../../contexts/app.context';
import { useDispatch } from 'react-redux';
import { searchStory } from '../../store/story/story.actions';
import { useTranslation } from 'react-i18next';
import { signOutUser } from '../../utils/firebase/firebase.js';
import './navigation.styles.scss';

const Navigation = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const { currentUser } = useContext(UserContext);

    const handleChange = (event) => { setSearchTerm(event.target.value); }

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            dispatch(searchStory(searchTerm));
        }
    }

    return (
        <Fragment>
            <div id="logo">
                <Link to='/'><img src="diggclone.png" alt="logo" /></Link>
            </div>
            <div id="header">
                <ul>
                    <li><Link className="nav-link" to="/send">{t('send.story')}</Link></li>
                    {currentUser ? (
                        <>
                            <li><a onClick={signOutUser}>{t('sign_out')}</a></li>
                            <li>
                                <Link to={`/user/${currentUser.displayName}`}>{currentUser.displayName}</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link className="nav-link" to="/auth">{t('register')}</Link></li>
                            <li><Link className="nav-link" to="/auth">{t('sign_in')}</Link></li>
                        </>
                    )}
                    <li>
                        <div>
                            <input name="search" placeholder={t('search')} type="text" onChange={handleChange} onKeyDown={handleSearch} />
                        </div>
                    </li>
                </ul>
            </div>
            <div><Link to='/'><strong>DiggClone</strong></Link></div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;
