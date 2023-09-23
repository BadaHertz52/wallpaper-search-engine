export type Option = {
    order: string;
    orientation: string;
    perPage: number;
    page: number;
};
export type ImgData = {
    id: number;
    pageURL: string;
    type: string;
    tags: string;
    previewURL: string;
    previewWidth: number;
    previewHeight: number;
    webformatURL: string;
    webformatWidth: number;
    webformatHeight: number;
    largeImageURL: string;
    fullHDURL?: string;
    imageURL?: string;
    imageWidth: number;
    imageHeight: number;
    imageSize: number;
    views: number;
    downloads: number;
    likes: number;
    comments: number;
    user_id: number;
    user: string;
    userImageURL: string;
};

export type ResponseData = {
    total: number;
    totalHits: number;
    hits: ImgData[];
};

export type ModalState = {
    open: boolean;
    targetImgData?: ImgData;
};
