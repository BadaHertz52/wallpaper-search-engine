import styled from 'styled-components';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';
import Footer from './component/Footer';
import './App.css';
import { useEffect, useMemo, useState } from 'react';
import { Option, ResponseData } from './type';
import { storageKey } from './storageKey';
import { updateDataUsingLocalStorage } from './fn';

const Container = styled.div`
    position: relative;
    background-color: var(--primary);
    min-height: 100vh;
`;

function App() {
    const initialOPtion: Option = useMemo(
        () => ({
            order: 'popular',
            orientation: 'all',
            perPage: 20,
            page: 1,
        }),
        []
    );
    const [option, setOption] = useState<Option>(initialOPtion);
    const [data, setData] = useState<ResponseData | null>(null);
    const recentKeywords = localStorage.getItem(storageKey.searchWords);

    // 페이지 오픈 시, 데이터 불러옴
    useEffect(() => {
        if (!data) {
            updateDataUsingLocalStorage(option, setData);
        }
    }, [data, recentKeywords, option]);
    return (
        <>
            <Container>
                <Hero setData={setData} option={option} setOption={setOption} />
                <ResultContainer
                    data={data}
                    setData={setData}
                    option={option}
                    setOption={setOption}
                />
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;
