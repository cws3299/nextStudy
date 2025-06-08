"use server"; // 서버액션 별도 파일 분리시 파일 최상단 작성이 좀 더 일반적임

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
  } catch (error) {
    console.error(error);
    return;
  }
}
