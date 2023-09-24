import styled from 'styled-components';
import { ReactComponent as PrevIcon } from '../asset/prev.svg';
import { ReactComponent as NextIcon } from '../asset/next.svg';
import React, {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useCallback,
} from 'react';
import { Option, ResponseData } from '../type';
import { updateDataUsingLocalStorage } from '../fn';

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 16px;
    color: var(--text);
`;
const PageSelectContainer = styled.div`
    display: flex;
`;
const PageSelect = styled.select`
    cursor: pointer;
    background-color: var(--primary);
    border: none;
    font-size: 16px;
    color: var(--highlight);
    font-weight: bold;
    font-family: inherit;
    &:focus {
        outline: none;
    }
    text-align: center;
`;

type PaginationProps = {
    pages: number[];
    setData: Dispatch<SetStateAction<ResponseData | null>>;
    option: Option;
    setOption: Dispatch<SetStateAction<Option>>;
};
const Pagination = ({ pages, option, setOption, setData }: PaginationProps) => {
    const updateData = useCallback(
        async (page: number) => {
            const newOption = {
                ...(JSON.parse(JSON.stringify(option)) as Option),
                page: page,
            };
            setOption(newOption);
            updateDataUsingLocalStorage(option, setData);
        },
        [option, setOption, setData]
    );

    const handleChange = useCallback(
        async (event: ChangeEvent<HTMLSelectElement>) => {
            const value = Number(event.target.value);
            if (value !== option.page) {
                await updateData(value);
            }
        },
        [updateData, option.page]
    );
    const handleClickIcon = useCallback(
        async (icon: string) => {
            let page = option.page;
            if (icon === 'prev') {
                --page;
            } else {
                ++page;
            }
            await updateData(page);
        },
        [option.page, updateData]
    );
    return (
        <Nav id="pagination">
            <PrevIcon
                width="24"
                cursor="pointer"
                fill="var(--text)"
                style={{ display: option.page === 1 ? 'none' : 'block' }}
                onClick={() => handleClickIcon('prev')}
            />
            <PageSelectContainer>
                <div>총 {pages.length} 중</div>
                <PageSelect
                    name="page"
                    value={option.page}
                    onChange={handleChange}
                >
                    {pages.map((v) => (
                        <option value={v} key={v}>
                            {v}
                        </option>
                    ))}
                </PageSelect>
                페이지
            </PageSelectContainer>
            <NextIcon
                width="24"
                cursor="pointer"
                fill="var(--text)"
                style={{
                    display:
                        option.page === pages.length || option.page === 1
                            ? 'none'
                            : 'block',
                }}
                onClick={() => handleClickIcon('next')}
            />
        </Nav>
    );
};

export default React.memo(Pagination);
