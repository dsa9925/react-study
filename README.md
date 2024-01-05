1.  작업의 과정에 대해서 스스로 정의 해본다면..
    1.1. 폴더구조 (pages, api, layouts, component, util, hooks, routers, reducers, slices )
    1.2. Page 구성 /src/pages/~~~.jsx
    1.3. Router 구조
    1.4. Page 공통 레이아웃 제작 /src/laouts/Layout.js
    1.5. 각 Page에 레이아웃 적용
    1.6. 각 Page에 {children}를 활용 props 전달하기
    정확하게 정리해 두시면 좋겠어요.

         <컴포넌트>
           HTML 결과물
              종류 1    :  텍스트 (Text Node)
              종류 2    :  HTML 태그 (Elements Node)
              종류 3    :   js 로 만든 JSX 컴포넌트
         </컴포넌트>

1.7. Page 별로 공통 레이아웃을 적용 후 내용은 각 페이지에 children 전달

1.8. 각 페이지별로 별도의 레이아웃이 필요하다.

1.9. 라우터 경로상 기능이 공통적인 것은 중첩 라우터를 적용하자.

        예)
            /about/ceo
            /about/history
            /about/partner
            /about/location

            /todo/list
            /todo/read
            /todo/modify
            /todo/add

            /member/join
            /member/login
            /member/modify

            /products/list
            /products/read
            /products/modify
            /products/add

    2.0. 중첩 라우터

       <route path="/about/">
          <route path="ceo"></route>
          <route path="history"></route>
          <route path="partner"></route>
          <route path="location"></route>
       </route>

       <route path="/todo/">
          <route path="list"></route>
          <route path="read"></route>
          <route path="add"></route>
          <route path="modify"></route>
       </route>

       <route path="/member/">
          <route path="join"></route>
          <route path="login"></route>
          <route path="modify"></route>
          <route path="info"></route>
       </route>

       <route path="/products/">
          <route path="list"></route>
          <route path="read"></route>
          <route path="add"></route>
          <route path="modify"></route>
       </route>
       .......

    2.1. Outlet 을 활용하는 경우의 필수 조건은 중첩 라우터여야 된다.


        : 라우터의 path 에 의해 출력된 컴포넌트

        <컴포넌트>
             : 라우터의 path 에 의해 출력될 컴포넌트
        </컴포넌트>



    2.2. Spinner 활용(로딩시 활용하려고)

         npm i react-spinners

         /src/components/loading 폴더
         /src/components/loading/Loading.js


    3. react-router-dom 의 활용

    3.1. 주소 경우수 (웹브라우저의 path)

         page 라우터               : http://localhost:3000/todo/

         중첩(Nested) 라우터       : http://localhost:3000/todo/list

         params                   : http://localhost:3000/todo/read/14
                                  : 만들수도 있어야 하고 (14)
                                  : 읽어들여서 사용할 수도 있어야 합니다.(14)


         쿼리스트링 (Query String) : http://localhost:3000/todo/list?page=1&size=10
                                  : 만들수도 있어야 하고 (?page=1&size=10)
                                  : 읽어들여서 사용할 수도 있어야 합니다.(page=1, size=10)

         http://localhost:3000/todo/read/14?page=1&size=10
                                  : 만들수도 있어야 하고 (14?page=1&size=10)
                                  : 읽어들여서 사용할 수도 있어야 합니다.(14, page=1, size=10)


    3.1. params 관련

     - http://localhost:3000/todo/read/30

     - 만들기
            <Route path="/todo/" />

                <Route path="read/:tno" />

            </route>

     - 읽기
            const { tno } = useParams();

    3.2. 쿼리스트링 (Query String)

    http://localhost:3000/todo/list?page=1&size=10

     - 읽기    : ?page=1&size=10

        const [urlSearchParams, setUrlSearchParams] = useSearchParams();
        const page = urlSearchParams.get("page");
        const size = urlSearchParams.get("size");

     - 만들기  : ?page=1&size=10

       const queryStr = createSearchParams({ page: 1, size: 10 }).toString();

       navigate({ pathname: "list", search: queryStr });
