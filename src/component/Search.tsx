import { ChangeEvent, useState, KeyboardEvent, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../asset/search.svg';
import SearchTag from './SearchTag';
import SearchOption from './SearchOption';

const SearchTagContainer = styled.div`
    display: flex;
    width: 100%;
    overflow: auto;
    justify-content: center;
`;

const SearchBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px;
    padding: 4px 16px;
    width: 100%;
    align-items: center;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`;

const SearchInputContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
`;

const SearchInput = styled.input`
    background: transparent;
    font-size: 16px;
    outline: none;
    color: #5e5e5e;
    border: none;
    flex: auto;
    margin-left: 8px;
`;

const SearchOptionButton = styled.p`
    cursor: pointer;
    font-size: 14px;
    text-decoration: underline;
    color: #5e5e5e;
`;

const Search = () => {
    const storageKey = 'searchWords';

    const [searchOption, setSearchOption] = useState<boolean>(false);

    const [keyword, setKeyword] = useState<string>('');

    const [searchWords, setSearchWords] = useState<string[]>();

    const toggleSearchOption = () => {
        setSearchOption((prev) => !prev);
    };
    const changeEscapeChars = (str: string) => {
        switch (str) {
            case '&':
                return '&amp;';
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case `"`:
                return `&quot;`;
            case "'":
                return '&#39;';
            default:
                return str;
        }
    };
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        //XSS 공격 방어
        const text = event.target.value.replaceAll(/[&<>"']/g, (t) =>
            changeEscapeChars(t)
        );
        setKeyword(text);
    };

    const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        const code = event.code;
        if (code === 'Enter' && keyword) {
            //최근 검색어 추가
            !searchWords?.includes(keyword) &&
                setSearchWords((prev) =>
                    prev ? prev.concat(keyword) : [keyword]
                );
            // input 창 빈문자
            setKeyword('');
            // 검색
        }
    };

    useEffect(() => {
        const item = localStorage.getItem(storageKey);
        if (item) {
            setSearchWords(JSON.parse(item) as string[]);
        }
    }, []);

    useEffect(() => {
        if (searchWords) {
            localStorage.setItem(storageKey, JSON.stringify(searchWords));
        } else {
            localStorage.getItem(storageKey) &&
                localStorage.removeItem(storageKey);
        }
    }, [searchWords]);
    return (
        <>
            <SearchBoxContainer>
                <SearchInputContainer>
                    <SearchIcon width="24" fill="#5e5e5e" />
                    <SearchInput
                        placeholder="검색어 입력 후 ENTER"
                        value={keyword}
                        onChange={handleChange}
                        onKeyUp={handleKeyUp}
                    />
                    <SearchOptionButton onClick={toggleSearchOption}>
                        검색 옵션 {searchOption ? '닫기' : '열기'}
                    </SearchOptionButton>
                </SearchInputContainer>
                {searchOption && <SearchOption />}
            </SearchBoxContainer>
            <SearchTagContainer>
                {searchWords &&
                    searchWords.map((t, i) => (
                        <SearchTag
                            key={`searchTag_${i}`}
                            word={t}
                            setSearchWords={setSearchWords}
                            setKeyword={setKeyword}
                        />
                    ))}
            </SearchTagContainer>
        </>
    );
};

export default Search;
