# wallpaper-search-engine

### Index

#### <a href="#introduce">Introduce</a>

#### <a href="#skill">Skill</a>

#### <a href="#build">Build</a>

#### <a href="#study">Study</a>

-   React : Suspense
-   URLSearchParams
-   무한 스크롤

## <div id="introduce">Introduce</div>

 <img src="./readmeImg/wallpaper_search_engine_ex.gif" width="90%" style="margin:24px 0" alt="wallpaper-search-engine revelation"/>

wallpaper-search-engine은 [30개 프로젝트로 배우는 프론트엔드 웹 개발 (with React)의 수업 과제](https://github.com/hanameee/wallpaper-search-engine)로 pixabay의 이미지 API를 활용한 이미지 검색 기능을 제공하는 사이트입니다..

wallpaper-search-engine에서 구현한 기능들은 다음과 같습니다.

1.  검색어 입력 후 enter누르면 검색어에 맞춘 이미지를 보여줍니다. 키워드 사이의 띄어쓰기를 통해 여러개의 키워드를 이용한 검색도 가능합니다.

    📷 <**"baby cat dog"** 검색 시 화면>

    <img src="./readmeImg/baby_cat_dog.jpeg" width="500px" alt="baby_cat_dog"/>

2.  검색 옵션을 설정할 수 있고, 옵션이 변경 될 경우 이전에 검색한 결과들도 변경됩니다.
3.  이전에 검색한 검색어(이하 최신 검색어)를 클릭 시, 검색어 입력창에 반영됩니다.
4.  최신 검색어들은 저장되어 새로고침 시나 새로 창을 열었을 경우에도 남아있습니다.
5.  최신 검색어들은 옆의 "x"버튼을 클릭해 삭제할 수 있습니다.
6.  이미지를 클릭하면 이미지 상세보기 모달창이 열립니다.
7.  이미지 상세보기 모달창에서 이미지 로드가 완료되기 전까지는 로딩화면이 나타납니다. **(React의 Suspense 사용)**
8.  다크모드를 기능을 제공합니다.
9.  새로고침 시나 페이지를 처음 열때에는 최근 검색어가 있을 경우 해당 검색어를, 없을 경우에는 임의로 정한 "dog"를 검색어로 한 검색 결과가 화면에 나타납니다.

## <div id="skill">Skill</div>

-   HTML, CSS, Styled-components
-   React, Typescript

## <div id="build">Build</div>

### Install

```bash
 npm i
```

### Start

```bash
  npm run start
```

### Build

```
  npm run build
```

## <div id="study">Study</div>

### 1. React : Suspense

React의 Suspense를 이번 프로젝트를 통해서 처음 적용해 봤습니다.

이번 프로젝트에서 이미지 상세보기 모달창을 열었을 때 이미지 로드가 완료되기까지 어느 정도의 시간이 필요하다는 문제가 있었고 로드되는 시간동안 로딩화면을 보여주고자 React의 Suspense를 사용했습니다.

Suspense는 비동기 데이터를 가져오는 동안 Suspense의 자식 요소의 렌더링을 중단하고 fallback에 설정한 컴포넌트를 보여주는 기능으로,
이미지를 비동기 데이터로 가져오는 컴포넌트가 필요했고 이런 기능을 제공하는 "react-image" 라이브러리를 이용해 SuspenseImage 컴포넌트를 만들었고
로딩화면은 Loading 컴포넌트를 통해 구현했습니다.

### 2. URLSearchParams

### 1) URL의 쿼리 스트리밍?

```
 www.world.com/api/?key=12323454...
```

URL의 쿼리 스트리밍은 URL에서 물음표 다음에 오는 것들로 key=value형태로 구성되고 & 연산자를 이용해 여러개의 스트리밍을 묶어서 사용할 수 있습니다.

### 2) URLSearchParams 을 이용한 URL 스크리밍 작성/관리

URL의 쿼리스크리밍을 이용하는 유틸리티 메서드를 정의하는 URLSearchParams를 사용하면 복잡한 URL의 쿼리 스트리밍을 보다 간편하게 작성,관라할 수 있습니다.

##### 구현 코드

```js
const options = {
    key: '1234567',
    q: 'dog',
    //....
    image_type: 'photo',
};
const query = new URLSearchParams(options).toString();

const url = `https://www.world.com/api/?${query}`;

console.log(url);
//https://www.world.com/api/?key=1234567&q=dog&....&image_type=photo
```

### 3. 무한 스크롤

해당 프로젝트의 배포 사이트는 페이지 네이션으로 동작하고, 무한 스크롤 구현은 해당 프로젝트의 [fn/infinite_scroll](https://github.com/BadaHertz52/wallpaper-search-engine/tree/fn/infinite_scroll) 브랜치에서 확인할 수 있습니다.

### 1) 페이지 네이션 vs 무한 스크롤

정보의 양은 한정적이지 않지만 이를 보여줄 수 있는 뷰포트의 영역은 한정적입니다. 많은 정보를 한정적인 뷰포트에 표현하는 방식으로는 페이지별로 정보를 나누어서 하나의 페이지만을 보여주는 페이지 네이션과 스크롤을 통해 정보를 계속 추가해주는 무한 스크롤 방식이 있습니다.

|      | 페이지 네이션                                                                                             | 무한 스크롤                                                                                                                                                                                                          |
| ---- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 정의 | 정보를 페이지별로 나누어서 보여주는 방식                                                                  | 스크롤을 통해 페이지 하단에 도달했을때, 데이터를 추가로 불러들여서 계속해서 보여주는 방식                                                                                                                            |
| 예시 | 책                                                                                                        | 웹툰                                                                                                                                                                                                                 |
| 장점 | - 정보탐색에 유리 <br/> - 사용자에게 통제권이 있음 <br/> - SEO에 보다 적합                                | - 흐름이 중요한 정보에 있어 좋음 <br/> - 터치 기반환경에서 용이                                                                                                                                                      |
| 단점 | - 한 페이지에 담을 수 있는 정보의 양이 제한적임<br/> - 이전 페이지나 다음페이지 처럼 추가적인 기능이 필요 | - 로딩 시간이 걸림<br/> - 스크롤 막대가 정보의 양을 반영하지 못함 <br/> - SEO에 추가적인 조치 필요 (검색엔진이 페이지 하단에 도달해야 불러오지는 정보를 파악하기 힘듦)<br/> 특정항목이나 원래 위치로 돌아오기가 힘듦 |

### 2) 무한 스크롤 구현 - IntersectionObserver API

### A. IntersectionObserver API

IntersectionObserver API는 뷰포트와 설정한 요소의 교차점을 관찰하여 요소가 뷰포트에서 보이는 지 여부를 판별하는 기능을 제공합니다.

```JS
const el = document.getElementById("target"); // 관찰 대상
const callback =(entries,observer)=>{

	};
const  observer =new IntersectionObserver(callback, options)
observer.observe(el)
```

<details>
<summary>callback</summary>
<div markdown="callback">
: 관찰할 대상이 등록되거나 뷰포트 영역에서 관찰대상의 가시성에 변화가 있을 때 실행됨

-   entries: 가기성의 변화에 대한 정보
-   observe: 콜백이 실행되는 해당 인스컨스를 참조
</div>
</details>

<details>
<summary>options</summary>
<div markdown="options">
-   root: 가시성의 기준이 되는 영역, 뷰포트를 지정, 기본값은 null, null일 경우 브라우저의 뷰포트가 사용
-   rootMargin :바깥 여백(Margin)을 이용해 Root 범위를 확장하거나 축소
-   threshold : 옵저거가 실행될 타겟의 가시성 정보(백분율)

</div>
</details>

<details>
<summary>methods</summary>
<div markdown="methods">
  - observe : 관찰한 대상을 지정하고, 관찰을 시작
  - unobserve: 특정 관찰 대상에 대한 관찰 중지
  - disconnect:  모든 관찰 대상에 대한 관찰 중지
  - takeRecords : IntersectionObserverEntry 객체의 배열을 반환

</div>
</details>

#### observe 종료

observe의 관찰을 종료시키는 방법으로는 unobserve, disconnect 메서드를 사용하거나 관찰 타겟을 DOM에서 숨김는 방법이 있습니다.

### B. IntersectionObserver API 를 사용한 무한 스크롤 구현

IntersectionObserver API 를 이용해 하나의 페이지가 끝나는 부분에 관찰 타켓을 추가하고 타겟이 뷰포트에 보일때 다음 페이지의 이미지 데이터를 불러와 기존 데이터에 추가하고 현재 페이지가 총 페이지수를 넘어가면 관찰 타겟을 DOM에서 숨겨 관찰을 종료하는 방식으로 무한 스크롤을 구현했습니다.

<img src="./readmeImg/무한%20스크롤%20순서도.png" alt="무한 스크롤 순서도" height="450px">

<details>
<summary>구현 코드 보기</summary>
<div markdown="code">

```typescript
// observer의 관찰 타겟을 DOM에 보여질지 여부,
//현재 페이지가 데이터로 보여줄 수 있는 총 페이지의 수 (numberOfPage) 이하 일때 보여줌
// callback함수가 실행될때, page +1 이 되므로
const showObserveTarget = option.page !== numberOfPage;

const observerCallback: IntersectionObserverCallback = useCallback(
        (
            entries: IntersectionObserverEntry[],
            observer: IntersectionObserver
        ) => {
            //observeTarget이 보일때만 실행
            if (entries[0].isIntersecting) {
                setOption((prev) => ({ ...prev, page: prev.page + 1 }));
            }
        },
        []
    );
// option, keyword 값이 변경될때 마다 데이터 업데이트
useEffect(() => {
       const updateData =()=>{// data 업데이트}
    }, [ option, keyword]);
useEffect(() => {
        const observer = new IntersectionObserver(observerCallback, {
            threshold: 1,
        });
        if (observeTargetRef.current && showObserveTarget) {
            observer.observe(observeTargetRef.current);
        }
    }, [observerCallback, showObserveTarget]);

```

</div>
</details>

### 자료

[Intersection Observer - 요소의 가시성 관찰](https://heropy.blog/2019/10/27/intersection-observer/)
