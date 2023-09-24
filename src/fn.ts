import { Dispatch, SetStateAction } from 'react';
import { Option, ResponseData } from './type';
import { storageKey } from './storageKey';

/**
 * API에 요청할 url
 */
const getUrl = (keyword: string, option: Option) => {
    return [
        'https://pixabay.com/api/?',
        `key=${process.env.REACT_APP_PIXABAY}`,
        `&q=${keyword}`,
        `&orientation=${option.orientation}`,
        `&order=${option.order}`,
        `&page=${option.page}`,
        `&per_page=${option.perPage}`,
        '&image_type=photo',
    ].join('');
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

export const updateDataUsingLocalStorage = async (
    option: Option,
    setData: Dispatch<SetStateAction<ResponseData | null>>,
    storageItem?: string
) => {
    const recentKeywords =
        storageItem || localStorage.getItem(storageKey.searchWords);
    console.log('recent', recentKeywords);
    const keyword = recentKeywords
        ? (JSON.parse(recentKeywords) as string[])[0]
        : 'dog';
    const imgData = await getImgData(keyword, option);
    if (imgData instanceof Error || !imgData.totalHits) {
        setData(null);
    } else {
        setData(imgData);
    }
};
