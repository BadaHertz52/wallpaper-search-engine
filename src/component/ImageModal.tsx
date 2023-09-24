import * as reactDOM from 'react-dom';
import styled from 'styled-components';
import { ReactComponent as LikeIcon } from '../asset/like.svg';
import { ReactComponent as DeleteIcon } from '../asset/delete.svg';
import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { ModalState } from '../type';

const Modal = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    color: var(--text);
    min-width: 300px;
    max-width: 100%;
    max-height: 100%;
    overflow: auto;
    background-color: var(--primary);
    border: 3px solid var(--secondary);
    padding: 16px;
    box-shadow: 8px 8px 12px -1px rgb(0 0 0 / 0.3);
`;

const ModalImg = styled.img`
    width: 100%;
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
    const largeImageURL: string | undefined = imgData?.largeImageURL;
    const modalRootEl = document.getElementById('modal-root') as HTMLElement;
    const closeModal = useCallback(() => {
        setModal({ open: false, targetImgData: undefined });
    }, [setModal]);

    return reactDOM.createPortal(
        <Modal style={{ display: modal.open ? 'block' : 'none' }}>
            <DeleteIcon
                width="24px"
                cursor="pointer"
                fill="#FFFFFF"
                onClick={closeModal}
            />
            <ModalImg src={largeImageURL} />
            <p>{tags}</p>
            <DetailRow>
                <LikeIcon width="20px" height="20px" />
                {likes}명이 좋아합니다
            </DetailRow>
            <p>{views} 조회</p>
        </Modal>,
        modalRootEl
    );
};

export default React.memo(ImageModal);