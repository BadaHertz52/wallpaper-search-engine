import styled from 'styled-components';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';
import Footer from './component/Footer';
import './App.css';
import { useEffect, useState } from 'react';
import { ModalState, ResponseData } from './type';
import DummyData from './asset/dummyData';
import { storageKey } from './storageKey';
import { getImgData } from './fn';

const Container = styled.div`
    position: relative;
    background-color: var(--primary);
    min-height: 100vh;
`;

function App() {
    const [data, setData] = useState<ResponseData | null>(null);

    const [modal, setModal] = useState<ModalState>({
        open: false,
        targetImgData: undefined,
    });
    const recentKeywords = localStorage.getItem(storageKey.searchWords);

    useEffect(() => {
        const keywords = recentKeywords
            ? (JSON.parse(recentKeywords) as string[])[0]
            : 'dog';
        (async () => {
            const imgData = await getImgData(keywords);
            if (imgData instanceof Error || !imgData.totalHits) {
                setData(null);
            } else {
                setData(imgData);
            }
        })();
    }, [recentKeywords]);
    return (
        <>
            <Container>
                <Hero setData={setData} />
                <ResultContainer data={data} />
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;
