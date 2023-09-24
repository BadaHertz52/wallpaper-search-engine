import {
    ChangeEvent,
    useState,
    KeyboardEvent,
    useEffect,
    useCallback,
} from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../asset/search.svg';
import SearchTag from './SearchTag';
import SearchOption from './SearchOption';
import { HeroProps } from './Hero';
import { getImgData } from '../fn';
import { storageKey } from '../storageKey';

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
type SearchProps = HeroProps;
const Search = (props: SearchProps) => {
    const { setData, setOption, option } = props;
    const key = storageKey.searchWords;
    const [searchOption, setSearchOption] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [searchWords, setSearchWords] = useState<string[]>();

    const toggleSearchOption = () => {
        setSearchOption((prev) => !prev);
    };
    const changeEscapeChars = useCallback((str: string) => {
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
    }, []);
    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            //XSS 공격 방어
            const text = event.target.value.replaceAll(/[&<>"']/g, (t) =>
                changeEscapeChars(t)
            );
            setInputValue(text);
        },
        [changeEscapeChars]
    );

    const handleKeyUp = useCallback(
        async (event: KeyboardEvent<HTMLInputElement>) => {
            const code = event.code;
            if (code === 'Enter' && inputValue) {
                const keyword = inputValue
                    .split(' ')
                    .filter((t) => t)
                    .join('+');
                //최근 검색어 추가
                !searchWords?.includes(keyword) &&
                    setSearchWords((prev) =>
                        prev ? [keyword, ...prev] : [keyword]
                    );
                // input 창 빈문자
                setInputValue('');
                // 검색
                const data = await getImgData(keyword, option);
                if (data instanceof Error || !data.totalHits) {
                    setData(null);
                } else {
                    setData(data);
                }
            }
        },
        [option, inputValue, searchWords, setData]
    );
    // 로컬스토리지에 저장된 최근 검색어 적용
    useEffect(() => {
        const item = localStorage.getItem(key);
        if (item) {
            setSearchWords(JSON.parse(item) as string[]);
        }
    }, [key]);
    // 최근 검색어 상태 변경 시, 로컬 스토리지에 반영
    useEffect(() => {
        if (searchWords) {
            localStorage.setItem(key, JSON.stringify(searchWords));
        } else {
            localStorage.getItem(key) && localStorage.removeItem(key);
        }
    }, [searchWords, key]);
    return (
        <>
            <SearchBoxContainer>
                <SearchInputContainer>
                    <SearchIcon width="24" fill="#5e5e5e" />
                    <SearchInput
                        placeholder="검색어 입력 후 ENTER"
                        value={inputValue}
                        onChange={handleChange}
                        onKeyUp={handleKeyUp}
                    />
                    <SearchOptionButton onClick={toggleSearchOption}>
                        검색 옵션 {searchOption ? '닫기' : '열기'}
                    </SearchOptionButton>
                </SearchInputContainer>
                {searchOption && (
                    <SearchOption
                        option={option}
                        setOption={setOption}
                        setData={setData}
                    />
                )}
            </SearchBoxContainer>
            <SearchTagContainer>
                {searchWords &&
                    searchWords.map((t, i) => (
                        <SearchTag
                            key={`searchTag_${i}`}
                            word={t}
                            setSearchWords={setSearchWords}
                            setInputValue={setInputValue}
                        />
                    ))}
            </SearchTagContainer>
        </>
    );
};

export default Search;
