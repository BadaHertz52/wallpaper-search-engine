import styled from 'styled-components';
import { Dispatch, SetStateAction, useState } from 'react';
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
    setData: Dispatch<SetStateAction<ResponseData | null>>;
    option: Option;
    setOption: Dispatch<SetStateAction<Option>>;
};
const ResultContainer = ({
    data,
    setData,
    option,
    setOption,
}: ResultContainerProps) => {
    const [modal, setModal] = useState<ModalState>({
        open: false,
        targetImgData: undefined,
    });
    const pageLength: number = !data
        ? 0
        : Math.round(data.totalHits / Number(data.hits.length || 20));
    /**
     * api 요청 후에 생기는 페이지 번호를 요소로하는 배열
     */
    const pages = new Array(pageLength).fill('p').map((v, i) => i + 1);

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
                    setData={setData}
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

export default ResultContainer;