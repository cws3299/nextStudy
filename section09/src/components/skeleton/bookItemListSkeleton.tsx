import BookItemSkeleton from "./bookItemSkeleton";

export default function BookItemListSkeleton({ count }: { count: number }) {
  return new Array(count)
    .fill(0)
    .map((_, idx) => <BookItemSkeleton key={`book-item-skeleton-${idx}`} />);
}

// React Loading Skeleton 라이브러리 써도 됨
