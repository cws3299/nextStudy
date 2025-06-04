export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div>book/{id} 페이지</div>;
}

// [...id] catch all segment로 설정
// [[...id]] /book에도 잘 대응 됨
