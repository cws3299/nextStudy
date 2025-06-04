import { BookData } from "@/types";

export default async function fetchOneBook(
  id: number
): Promise<BookData | null> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/book/${id}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
