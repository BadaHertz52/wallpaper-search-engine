import React, { CSSProperties } from 'react';
import { useImage } from 'react-image';

type SuspenseImageProps = {
    imgUrl: string;
    alt: string;
    style: CSSProperties;
};
function SuspenseImage({ imgUrl, alt, style }: SuspenseImageProps) {
    const { src } = useImage({ srcList: imgUrl });
    return <img src={src} alt={alt} style={style} />;
}
export default React.memo(SuspenseImage);
