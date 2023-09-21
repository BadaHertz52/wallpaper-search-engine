import { Option, ResponseData } from './type';

/**
 * API에 요청할 url
 */
const getUrl = (keyword: string, option: Option) => {
    return [
        'https://pixabay.com/api/?',
        `key=${process.env.REACT_APP_API_KEY}`,
        `&q=${keyword}`,
        `&orientation=${option.orientation}`,
        `&order=${option.order}`,
        `&page=${option.page}`,
        `$per_page${option.perPage}`,
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
/**
 * 선택된 옵션 값 가져오기
 * @param id : 옵션 카테고리이자 form id
 * @returns
 */
const getCheckedOption = (id: string) => {
    let result;
    const children = document.getElementById(id)?.querySelectorAll('input');
    if (children) {
        const checkedEl = Array.prototype.filter.call(
            children,
            (item: HTMLInputElement) => {
                return item.checked;
            }
        )[0];
        result = checkedEl.value;
    }
    return result;
};
/**
 * 검색할 페이지 값 가져오기
 * @returns
 */
const getSelectedPage = () => {
    const selectEl = document.querySelector(
        '#pagination select'
    ) as HTMLSelectElement | null;
    return selectEl?.value;
};

const getOption = (): Option => {
    return {
        order: getCheckedOption('order'),
        orientation: getCheckedOption('orientation'),
        perPage: getCheckedOption('per_page'),
        page: getSelectedPage() || 1,
    };
};
export const getImgData = async (keyword: string) => {
    //1. 검색 옵션
    const option: Option = getOption();
    //2. api 요청 및 data 값 업데이트
    const url = getUrl(keyword, option);
    const data = await getData(url);
    return data;
};
