import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    CSSProperties,
    Suspense,
} from 'react';
import * as reactDOM from 'react-dom';
import styled from 'styled-components';
import { ReactComponent as LikeIcon } from '../asset/like.svg';
import { ReactComponent as DeleteIcon } from '../asset/delete.svg';
import { ModalState } from '../type';
import SuspenseImage from './SuspenseImage';
import Loading from './Loading';

const Modal = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    color: var(--text);
    min-width: 300px;
    max-width: 60vw;
    max-height: 90vh;
    overflow: auto;
    background-color: var(--primary);
    border: 3px solid var(--secondary);
    padding: 16px;
    box-shadow: 8px 8px 12px -1px rgb(0 0 0 / 0.3);
    overflow: hidden;
    flex-direction: column;
    justify-content: center;
`;

const DetailRow = styled.div`
    display: flex;
    & > * {
        margin-right: 6px;
    }
`;

type ImageModalProps = {
    modal: ModalState;
    setModal: Dispatch<SetStateAction<ModalState>>;
};
const ImageModal = ({ modal, setModal }: ImageModalProps) => {
    const imgData = modal.targetImgData;
    const { tags, likes, views } = imgData || {
        tags: '',
        likes: '',
        views: '',
    };
    // window.innerHeight - modal padding * 2 - deleteIcon height - other height
    const maxHeight = `${
        (window.innerHeight - 16 * 2 - 24 - 21.6 * 3 - 16 * 4 - 16) * 0.9
    }px`;
    const imgStyle: CSSProperties = {
        maxWidth: '100%',
        maxHeight: maxHeight,
        margin: `auto auto`,
    };
    const largeImageURL: string | undefined = imgData?.largeImageURL;
    const modalRootEl = document.getElementById('modal-root') as HTMLElement;
    const closeModal = useCallback(() => {
        setModal({ open: false, targetImgData: undefined });
    }, [setModal]);
    return reactDOM.createPortal(
        <Modal
            style={{
                display: modal.open ? 'flex' : 'none',
            }}
        >
            <Suspense fallback={<Loading />}>
                <DeleteIcon
                    width="24px"
                    cursor="pointer"
                    fill="#FFFFFF"
                    onClick={closeModal}
                />
                {largeImageURL && (
                    <SuspenseImage
                        imgUrl={largeImageURL}
                        alt={`img modal_${imgData?.id}`}
                        style={imgStyle}
                    />
                )}
                <p style={{ margin: '10px 0' }}>{tags}</p>
                <DetailRow>
                    <LikeIcon width="20px" height="20px" />
                    {likes}명이 좋아합니다
                </DetailRow>
                <p style={{ margin: '10px 0' }}>{views} 조회</p>
            </Suspense>
        </Modal>,
        modalRootEl
    );
};

export default React.memo(ImageModal);
