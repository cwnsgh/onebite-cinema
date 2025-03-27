import { ReactNode, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import style from "./searchable-layout.module.css";

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [search, setSearch] = useState("");

  const router = useRouter();

  const q = router.query.q as string;

  //초기값설정
  useEffect(() => {
    setSearch(q || "");
    //쿼리스트링이 여러개일수있어서 에러
  }, [q]);

  //html 인풋 엘리먼트에서 발생한 이벤트
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    //입력된값없을때
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          placeholder="검색어를 입력하세요 ..."
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
