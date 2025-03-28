import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import movies from "@/mock/movies.json";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";
import { MovieData } from "@/types";

function getRandomMovies(movies: MovieData[], count: number) {
  return [...movies].sort(() => Math.random() - Math.random()).slice(0, count);
}

export default function Home() {
  const recommendedMovies = getRandomMovies(movies, 3); // 전체 영화 중 랜덤으로 3개 선택

  return (
    <div>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.recommend_movies}>
          {recommendedMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>

      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.all_movies}>
          {movies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
