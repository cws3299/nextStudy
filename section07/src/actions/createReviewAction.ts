"use server";
import { revalidatePath, revalidateTag } from "next/cache";

// 서버액션 별도 파일 분리시 파일 최상단 작성이 좀 더 일반적임

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  // console.log(formData);
  // 브라우저에서 호출했으므로 network탭에도 뜨고, 서버액션이므로 next로그에도 찍힘
  // 브라우저의 network에서 headers를 보면 Next-Action에 현재 호출하고자 하는 서버 액션의 해시값 파악 가능
  // 우리가 코드상에 이런방식으로 server action을 만들면 자동으로 이런 코드를 실행하는 api가 생성됨
  // 브라우저에서 폼 태그 호출시 자동으로 해당 서버 액션이 호출됨

  const content = formData.get("content")?.toString(); // toString을 넣는 이유는 next가 타입을 FormDataEntryValue || null로 파악함 그래서 string임을 알려주기위해 toString()을 뒤에 붙힘
  const author = formData.get("author")?.toString(); // FormDataEntryValue은 string | file 이걸 의미함

  // console.log(content, author); // 서버액션이므로 next 로그에만 보임

  // 서버액션을 굳이 쓰는이유?
  // 클라이언트 컴포넌트로 하거나, api만들면 안돼?
  // 1. 긴 코드가 아닌 경우 serverAction을 활용하면 코드가 매우 간결해짐
  // 2. 브라우저는 오직 호출, 보안상 민감한 경우 serverAction이 올바름

  // DB에 직접 접근도 가능하지만 NEXT 서버액션 자체를 테스트중이로 뚫린 API를 기반으로 작업

  if (!bookId || !content || !author) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({
          bookId,
          content,
          author,
        }),
      }
    );

    console.log(response.status);
    // revalidatePath(`/book/${bookId}`);
    // Next서버가 자동으로 해당 페이지를 재생성함
    // 리뷰가 작성되고, 이를 기반으로 새로 작성된 리뷰가 추가된 컴포넌트를 서버가 새로 만들어서 보냄
    // Next 서버에게 인수에 들어간 페이지를 다시 생성(재검증) 해주길 요구함
    // 해당 page의 자녀 페이지들 모두 재생성 + 데이터도 새로 불러옴
    // 오직 서버액션이나 서버 컴포넌트에서만 실행가능

    // revalidatePath는 해당 페이지에 포함된 모든 캐시들이 무효화 됨
    // page.tsx에서 특정 fetch에 force-cache를 옵션으로 적용했다고 하더라도 기존 캐시 전부 삭제
    // revalidate로 할 경우에는 풀라우트 캐시를 무효화 함, 다만 새로운 데이터로 풀라우트 캐시를 저장해주지 않음
    // 새로고침을 하거나 다른페이지 다녀오면, 그때 다시 해당 페이지 방문시 실시간으로 스태틱 페이지가 생성되어 풀라우트가 작동함
    // 왜 이렇게 하는 걸까? -> revalidate 요청 이후에, 페이지에 접속할 때 무조건 최신 데이터를 보장하기 위해서

    //revaidate 옵션
    // 1. 특정 주소에 해당하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`);

    // 2.특정 경로의 모든 페이지 재검증 // book/1, book/2 모든 동적경로 한 번에 재검증
    // 폴더, 파일명 기준으로 작성
    // revalidatePath("/book/[id]", "page");

    // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
    // (with-searchbar) 폴더에서 layout을 사용하는 모든 페이지 재검증
    // revalidatePath("/(with-searchbar)", "layout");

    // 4. 모든 데이터 재검증
    // revalidatePath("/", "layout");

    // 5. 태그 기준, 데이터 캐시 재검증
    // tag값을 갖는 데이터 캐시가 재검증
    // fetch의 data-cache 옵션에서 tags로 하는 옵션이 존재함
    // 첫번째 방식보다 지금 이 5번째 방식이 나음, 하나의 페이지에 여러 api를 호출중일때
    // 특정 api의 캐시만 삭제할 수 있음
    revalidateTag(`review-${bookId}`);
  } catch (error) {
    console.error(error);
    return;
  }
}
