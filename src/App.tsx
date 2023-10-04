import styled from 'styled-components';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';
import Footer from './component/Footer';
import './App.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Option, ResponseData } from './type';
import { storageKey } from './storageKey';
import { getImgData } from './api';

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
    const [keyword, setKeyword] = useState<string>();
    const [data, setData] = useState<ResponseData | null>(null);
    const recentKeywords = localStorage.getItem(storageKey.searchWords);
    const numberOfPage: number = !data
        ? 0
        : Math.round(data.totalHits / Number(option.perPage));
    /**
     * api 요청 후에 생기는 페이지 번호를 요소로하는 배열
     */
    const pages = new Array(numberOfPage).fill('p').map((v, i) => i + 1);
    const updateData = useCallback(async () => {
        if (keyword) {
            const imgData = await getImgData(keyword, option);
            if (imgData instanceof Error || !imgData.totalHits) {
                setData(null);
            } else {
                setData(imgData);
            }
        }
    }, [keyword, option, setData]);

    useEffect(() => {
        updateData();
    }, [updateData, option, keyword]);

    useEffect(() => {
        if (!keyword) {
            // 페이지 오픈 시 , 저장된 keyword가 로컬 스토리지에 없을 때 "dog"에 대한 이미지를 가져오도록 함
            const newKeyword = recentKeywords
                ? (JSON.parse(recentKeywords) as string[])[0]
                : 'dog';
            setKeyword(newKeyword);
        }
    }, [recentKeywords, keyword]);
    return (
        <>
            <Container>
                <Hero setKeyword={setKeyword} setOption={setOption} />
                <ResultContainer
                    data={data}
                    option={option}
                    setOption={setOption}
                    pages={pages}
                />
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;
