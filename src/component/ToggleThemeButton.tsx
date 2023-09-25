import styled from 'styled-components';
import { ReactComponent as LightIcon } from '../asset/light.svg';
import { ReactComponent as DarkIcon } from '../asset/dark.svg';
import React, { useCallback, useEffect, useState } from 'react';
import { storageKey } from '../storageKey';

const Button = styled.div`
    position: fixed;
    right: 10px;
    top: 10px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.2);
    width: 48px;
    height: 48px;
    border-radius: 100%;
    background-color: var(--highlight);
    display: flex;
    justify-content: center;
    cursor: pointer;
    &:hover {
        background-color: var(--overlay);
        transform: translateY(-2px);
        transition: ease 1s;
    }
`;

const ToggleThemeButton = () => {
    type Theme = 'light' | 'dark';
    const [theme, setTheme] = useState<Theme>('light');
    const key = storageKey.theme;
    const rootEl = document.getElementById('root');
    const modalRootEl = document.getElementById('modal-root');
    const changeTheme = useCallback(
        (newTheme: Theme) => {
            rootEl?.classList.toggle('dark', newTheme === 'dark');
            modalRootEl?.classList.toggle('dark', newTheme === 'dark');
            setTheme(newTheme);
        },
        [rootEl, modalRootEl]
    );

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        localStorage.setItem(key, newTheme);
        changeTheme(newTheme);
    };
    useEffect(() => {
        const storageItem = localStorage.getItem(key);
        if (storageItem) {
            changeTheme(storageItem as Theme);
        }
    }, [changeTheme, key]);
    return (
        <Button onClick={toggleTheme}>
            {theme === 'light' ? (
                <DarkIcon width="48" height="48" fill="var(--primary)" />
            ) : (
                <LightIcon width="48" height="48" fill="var(--primary)" />
            )}
        </Button>
    );
};

export default React.memo(ToggleThemeButton);
