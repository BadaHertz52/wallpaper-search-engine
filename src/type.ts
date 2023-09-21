export type Orientation = 'all' | 'horizontal' | 'vertical';
export type Order = 'popular' | 'latest';
export type PerPage = 10 | 20 | 30;
export type Search = {
    keyword?: string;
    /**
     * 기본값 :all
     */
    orientation: Orientation;
    /**
     * 기본값: popular
     */
    order: Order;
    /**
     * 요청하는 페이지 ,기본값1
     */
    page: number;
    /**
     *  한 페이지당 몇개의 결과 제공 , 기본값 20
     */
    perPage: PerPage; //
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
