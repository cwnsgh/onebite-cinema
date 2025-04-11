import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { MovieData } from "@/types";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import fetchMovies from "@/lib/fetch-movies";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q;
  const movies = await fetchMovies(q as string);

  return {
    props: {
      movies,
    },
  };
};
export default function Page({
  movies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <section>
      <div className={style.search_movies}>
        {movies.length > 0 ? (
          movies.map((movie) => <MovieItem key={movie.id} {...movie} />)
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
