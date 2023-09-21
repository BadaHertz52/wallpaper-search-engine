import styled from 'styled-components';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';
import Footer from './component/Footer';
import './App.css';
import { useState } from 'react';
import { ModalState, ResponseData, Search } from './type';
import DummyData from './asset/dummyData';

const Container = styled.div`
    position: relative;
    background-color: var(--primary);
    min-height: 100vh;
`;

function App() {
    const initialSearch: Search = {
        keyword: undefined,
        orientation: 'all',
        order: 'popular',
        page: 1,
        perPage: 20,
    };
    const [search, setSearch] = useState<Search>(initialSearch);
    const [data, setData] = useState<ResponseData | null>(DummyData);
    const [searchWords, setSearchWords] = useState<string[]>();
    const [modal, setModal] = useState<ModalState>({
        open: false,
        targetImgData: undefined,
    });
    return (
        <>
            <Container>
                <Hero />
                <ResultContainer />
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;
