import styled from 'styled-components';

const Card = styled.div`
    margin-left: 8px;
    margin-bottom: 8px;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 300px;
    padding: 8px;
    cursor: pointer;
`;

const Img = styled.img`
    width: 100%;
    border-radius: 4px;
`;

type ImageCardProps = {
    imgData: any;
    onClick?: () => void;
};
const ImageCard = ({ imgData, onClick }: ImageCardProps) => {
    const { webformatURL, id } = imgData;
    return (
        <Card onClick={onClick}>
            <Img key={id} src={webformatURL}></Img>
        </Card>
    );
};

export default ImageCard;
