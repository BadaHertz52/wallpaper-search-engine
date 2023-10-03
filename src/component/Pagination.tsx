import styled from 'styled-components';
import { ReactComponent as PrevIcon } from '../asset/prev.svg';
import { ReactComponent as NextIcon } from '../asset/next.svg';
import React, {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useCallback,
} from 'react';
import { Option } from '../type';

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
    option: Option;
    setOption: Dispatch<SetStateAction<Option>>;
};
const Pagination = ({ pages, option, setOption }: PaginationProps) => {
    const updatePageOption = useCallback(
        (page: number) => {
            if (option.page !== page) {
                const newOption = {
                    ...(JSON.parse(JSON.stringify(option)) as Option),
                    page: page,
                };
                setOption(newOption);
            }
        },
        [option, setOption]
    );

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLSelectElement>) => {
            const value = Number(event.target.value);
            updatePageOption(value);
        },
        [updatePageOption]
    );
    const handleClickIcon = useCallback(
        (icon: string) => {
            const newCurrentPage: number =
                option.page + (icon === 'prev' ? -1 : 1);
            updatePageOption(newCurrentPage);
        },
        [updatePageOption, option.page]
    );
    return (
        <Nav id="pagination">
            <PrevIcon
                width="24"
                cursor="pointer"
                fill="var(--text)"
                style={{
                    display:
                        option.page === 1 || pages.length === 1
                            ? 'none'
                            : 'block',
                }}
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
                        option.page === pages.length || pages.length === 1
                            ? 'none'
                            : 'block',
                }}
                onClick={() => handleClickIcon('next')}
            />
        </Nav>
    );
};

export default React.memo(Pagination);
