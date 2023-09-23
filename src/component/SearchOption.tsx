import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
} from 'react';
import styled from 'styled-components';
import { Option } from '../type';
import RadioBtn from './RadioBtn';
import { updateDataUsingLocalStorage } from '../fn';
import { HeroProps } from './Hero';

const SearchOptionContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
`;

const SearchOptionUl = styled.ul`
    padding: 0;
`;

const SearchOptionLi = styled.li`
    list-style: none;
    margin: 16px 0;
`;

const SearchOptionLabel = styled.p`
    border: 1px solid #4cabff;
    color: #4cabff;
    padding: 4px;
    border-radius: 16px;
`;

const SearchOption = ({ option, setOption, setData }: HeroProps) => {
    const handleChange = useCallback(
        async (event: ChangeEvent<HTMLFormElement>) => {
            const value = event.target.value;
            const id = event.currentTarget.id;
            const newOption = JSON.parse(JSON.stringify(option)) as Option;
            switch (id) {
                case 'order':
                    newOption.order = value;
                    break;
                case 'orientation':
                    newOption.orientation = value;
                    break;
                case 'per_page':
                    newOption.perPage = Number(value);
                    break;
                default:
                    break;
            }
            setOption(newOption);
            updateDataUsingLocalStorage(newOption, setData);
        },
        [setOption, setData, option]
    );
    return (
        <SearchOptionContainer>
            <SearchOptionUl>
                <SearchOptionLi>
                    <SearchOptionLabel>정렬</SearchOptionLabel>
                    <form id="order" onChange={handleChange}>
                        <RadioBtn
                            name="order"
                            id="latest"
                            value="latest"
                            selectedOption={option.order}
                        />
                        <label htmlFor="latest">최신순</label>
                        <RadioBtn
                            name="order"
                            id="popular"
                            value="popular"
                            selectedOption={option.order}
                        />
                        <label htmlFor="popular">인기순</label>
                    </form>
                </SearchOptionLi>
                <SearchOptionLi>
                    <SearchOptionLabel>사진 방향</SearchOptionLabel>
                    <form id="orientation" onChange={handleChange}>
                        <RadioBtn
                            name="orientation"
                            id="all"
                            value="all"
                            selectedOption={option.orientation}
                        />
                        <label htmlFor="all">모두</label>
                        <RadioBtn
                            name="orientation"
                            id="horizontal"
                            value="horizontal"
                            selectedOption={option.orientation}
                        />
                        <label htmlFor="horizontal">가로</label>
                        <RadioBtn
                            name="orientation"
                            id="vertical"
                            value="vertical"
                            selectedOption={option.orientation}
                        />
                        <label htmlFor="vertical">세로</label>
                    </form>
                </SearchOptionLi>
                <SearchOptionLi>
                    <SearchOptionLabel>페이지 당 갯수</SearchOptionLabel>
                    <form id="per_page" onChange={handleChange}>
                        <RadioBtn
                            name="per_page"
                            id="10"
                            value={10}
                            selectedOption={option.perPage}
                        />
                        <label htmlFor="10">10</label>
                        <RadioBtn
                            name="per_page"
                            id="20"
                            value={20}
                            selectedOption={option.perPage}
                        />
                        <label htmlFor="20">20</label>
                        <RadioBtn
                            name="per_page"
                            id="30"
                            value={30}
                            selectedOption={option.perPage}
                        />
                        <label htmlFor="10">30</label>
                    </form>
                </SearchOptionLi>
            </SearchOptionUl>
        </SearchOptionContainer>
    );
};

export default SearchOption;
