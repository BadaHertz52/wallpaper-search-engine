import React, { Dispatch, SetStateAction, useEffect } from 'react';
import styled, { CSSProperties, keyframes } from 'styled-components';

const loading = keyframes`
    0%
    {transform: rotate(0deg);}
    100% 
    {transform: rotate(360deg);}
`;
const Loader = styled.div`
    position: relative;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background-color: #ffff;
    animation: ${loading} 2s linear infinite;
`;
const CircleLeft = styled.div`
    &::before {
        content: '';
        position: absolute;
        top: 0;
        right: -5px;
        width: calc((5rem - 60px) / 2);
        height: calc((5rem - 60px) / 2);
        background-color: rgba(50, 50, 50, 0.966);
        border-radius: 50%;
    }
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
    background: linear-gradient(
        to top,
        rgba(223, 223, 223),
        rgba(50, 50, 50, 0.966)
    );
`;
const CircleRight = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    background: linear-gradient(to top, rgb(216, 215, 215), transparent);
`;
const LoaderSpan = styled.span`
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border-radius: 50%;
    background-color: var(--primary);
    z-index: 1;
`;
function Loading() {
    const loadingStyle: CSSProperties = {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100$',
    };
    return (
        <div className="loading" style={loadingStyle}>
            <h3 style={{ textAlign: 'center' }}>Loading...</h3>
            <Loader>
                <CircleLeft />
                <LoaderSpan></LoaderSpan>
                <CircleRight />
            </Loader>
        </div>
    );
}

export default React.memo(Loading);
