import styled from 'styled-components';
import { ReactComponent as DeleteIcon } from '../asset/delete.svg';
import React, { Dispatch, SetStateAction } from 'react';

const Tag = styled.div`
    display: flex;
    font-size: 14px;
    border-radius: 16px;
    padding: 6px 10px;
    color: var(--primary);
    background-color: var(--highlight);
    cursor: pointer;
    &:hover {
        background-color: var(--overlay);
    }
    margin: 4px;
`;

const TagLabel = styled.span`
    margin-right: 4px;
    font-weight: bold;
    &:hover {
        text-decoration: underline;
    }
`;
type SearchTagProps = {
    word: string;
    setSearchWords: Dispatch<SetStateAction<string[] | undefined>>;
    setKeyword: Dispatch<SetStateAction<string>>;
};
const SearchTag = ({ word, setSearchWords, setKeyword }: SearchTagProps) => {
    const deleteTag = () => {
        setSearchWords((prev) => {
            const newWords = prev?.filter((i) => i !== word);
            return newWords?.[0] === undefined ? undefined : newWords;
        });
    };
    return (
        <Tag>
            <TagLabel onClick={() => setKeyword(word)}>{word}</TagLabel>
            <DeleteIcon width="12px" onClick={deleteTag} />
        </Tag>
    );
};

export default React.memo(SearchTag);
