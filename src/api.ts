import { Option, ResponseData } from './type';

/**
 * API에 요청할 url
 */
const getUrl = (keyword: string, option: Option) => {
    const params = new URLSearchParams({
        key: process.env.REACT_APP_PIXABAY || '',
        q: keyword,
        orientation: option.orientation,
        order: option.order,
        page: String(option.page),
        per_page: String(option.perPage),
        image_type: 'photo',
    }).toString();

    return `https://pixabay.com/api/?${params}`;
};
/**
 * pixabay에 data 요청
 * @param url
 * @returns
 */
const getData = async (url: string): Promise<ResponseData | Error> => {
    try {
        const data = await (await fetch(url, { method: 'GET' })).json();
        return data;
    } catch (e) {
        const error = new Error(`fail to get data : ${e}`);
        console.error(error);
        return error;
    }
};

export const getImgData = async (
    keyword: string,
    option: Option
): Promise<ResponseData | Error> => {
    //api 요청 및 data 값 업데이트
    const url = getUrl(keyword, option);
    const data = await getData(url);
    return data;
};
