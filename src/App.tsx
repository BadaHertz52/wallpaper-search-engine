import styled from 'styled-components';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';
import Footer from './component/Footer';
import './App.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ModalState, Option, ResponseData } from './type';
import DummyData from './asset/dummyData';
import { storageKey } from './storageKey';
import { getImgData } from './fn';

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
    const [modal, setModal] = useState<ModalState>({
        open: false,
        targetImgData: undefined,
    });
    const recentKeywords = localStorage.getItem(storageKey.searchWords);
    // 페이지 오픈 시, 데이터 불러옴
    useEffect(() => {
        if (!data) {
            const keyword = recentKeywords
                ? (JSON.parse(recentKeywords) as string[])[0]
                : 'dog';
            (async () => {
                const imgData = await getImgData(keyword, option);
                console.log('done');
                if (imgData instanceof Error || !imgData.totalHits) {
                    setData(null);
                } else {
                    setData(imgData);
                }
            })();
        }
    }, [data, recentKeywords, option]);
    return (
        <>
            <Container>
                <ResultContainer data={data} />
                <Hero setData={setData} option={option} setOption={setOption} />
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;
