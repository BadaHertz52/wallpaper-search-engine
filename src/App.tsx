import styled from 'styled-components';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';
import Footer from './component/Footer';
import './App.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
    const recentKeywordsItem = localStorage.getItem(storageKey.searchWords);
    const observeTargetRef = useRef<HTMLDivElement>(null);
    /**
     * 기존의 키워드와 검색 옵션에서 페이지만 변경해 검색하는 무한 스크롤이 적용되는 검색인지 여부
     */
    const isInfiniteScroll = useMemo(() => {
        const optionItem = sessionStorage.getItem(storageKey.option);
        if (optionItem && recentKeywordsItem) {
            const recentOption = JSON.parse(optionItem) as Option;
            const recentKeyword = (
                JSON.parse(recentKeywordsItem) as string[]
            )[0];
            return recentKeyword === keyword &&
                recentOption.order === option.order &&
                recentOption.orientation === option.orientation &&
                recentOption.perPage === option.perPage &&
                recentOption.page !== option.page
                ? true
                : false;
        } else {
            return false;
        }
    }, [option, recentKeywordsItem, keyword]);
    const updateData = useCallback(async () => {
        if (keyword) {
            const imgData = await getImgData(keyword, option);
            sessionStorage.setItem(storageKey.option, JSON.stringify(option));
            if (imgData instanceof Error || !imgData.totalHits) {
                setData(null);
            } else {
                if (isInfiniteScroll) {
                    setData((prev) =>
                        prev
                            ? {
                                  ...prev,
                                  hits: prev.hits.concat(imgData.hits),
                              }
                            : imgData
                    );
                } else {
                    setData(imgData);
                }
            }
        }
    }, [keyword, option, setData, isInfiniteScroll]);

    const observerCallback: IntersectionObserverCallback = useCallback(
        (
            entries: IntersectionObserverEntry[],
            observer: IntersectionObserver
        ) => {
            //observeTarget이 보일때만 실행
            if (entries[0].isIntersecting) {
                setOption((prev) => ({ ...prev, page: prev.page + 1 }));
            }
        },
        []
    );
    useEffect(() => {
        updateData();
    }, [updateData, option, keyword]);

    useEffect(() => {
        if (!keyword) {
            // 페이지 오픈 시 , 저장된 keyword가 로컬 스토리지에 없을 때 "dog"에 대한 이미지를 가져오도록 함
            const newKeyword = recentKeywordsItem
                ? (JSON.parse(recentKeywordsItem) as string[])[0]
                : 'dog';
            setKeyword(newKeyword);
        }
    }, [recentKeywordsItem, keyword]);

    useEffect(() => {
        const observer = new IntersectionObserver(observerCallback, {
            threshold: 1,
        });
        observeTargetRef.current && observer.observe(observeTargetRef.current);
    }, [observerCallback]);
    return (
        <>
            <Container>
                <Hero setKeyword={setKeyword} setOption={setOption} />
                <ResultContainer
                    data={data}
                    option={option}
                    setOption={setOption}
                />
                <div ref={observeTargetRef}></div>
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;
