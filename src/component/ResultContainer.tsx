import styled from 'styled-components';
import React, { Dispatch, SetStateAction, useState } from 'react';
import ImageCard from './ImageCard';
import Pagination from './Pagination';
import EmptyResult from './EmptyResult';
import { ImgData, ModalState, Option, ResponseData } from '../type';
import ImageModal from './ImageModal';

const Container = styled.div`
    max-width: 1830px;
    margin: 8px auto;
    padding-right: 8px;
`;

const ResultsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`;
type ResultContainerProps = {
    data: ResponseData | null;
    option: Option;
    setOption: Dispatch<SetStateAction<Option>>;
    pages: number[];
};
const ResultContainer = ({
    data,
    option,
    setOption,
    pages,
}: ResultContainerProps) => {
    const [modal, setModal] = useState<ModalState>({
        open: false,
        targetImgData: undefined,
    });

    const showModal = (imgData: ImgData) => {
        setModal({
            open: true,
            targetImgData: imgData,
        });
    };
    return (
        <Container>
            <ImageModal modal={modal} setModal={setModal} />
            {data && (
                <Pagination
                    pages={pages}
                    option={option}
                    setOption={setOption}
                />
            )}
            <ResultsWrapper>
                {data ? (
                    data.hits?.map((imgData) => (
                        <ImageCard
                            key={imgData.id}
                            imgData={imgData}
                            onClick={showModal}
                        />
                    ))
                ) : (
                    <EmptyResult />
                )}
            </ResultsWrapper>
        </Container>
    );
};

export default React.memo(ResultContainer);
