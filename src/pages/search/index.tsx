import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { MovieData } from "@/types";
import movies from "@/mock/movies.json";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";

export default function Page() {
  const router = useRouter();

  const { q } = router.query;

  const filteredMovies = q
    ? movies.filter((movie: MovieData) =>
        movie.title.toLowerCase().includes((q as string).toLowerCase())
      )
    : movies;

  return (
    <section>
      <div className={style.search_movies}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => <MovieItem key={movie.id} {...movie} />)
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </section>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
