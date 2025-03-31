import { MovieData } from "@/types";
import style from "./[id].module.css";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import fetchOneMovie from "@/lib/fetch-one-movie";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params!.id;
  const movie = await fetchOneMovie(Number(id));
  return {
    props: { movie },
  };
};

export default function Page({
  movie,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!movie) {
    return <h2>해당 영화 정보를 찾을 수 없습니다.</h2>;
  }
  const {
    id,
    title,
    subTitle,
    description,
    releaseDate,
    company,
    genres,
    runtime,
    posterImgUrl,
  } = movie;

  return (
    <div>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${movie.posterImgUrl}')` }}
      >
        <img src={movie.posterImgUrl} alt={`${movie.title} 포스터`} />
      </div>
      <h2>{movie.title}</h2>
      <p>
        {movie.releaseDate} | {movie.genres.join(", ")} | {movie.runtime}분
      </p>
      <p>{movie.company}</p>
      <h3 className={style.subTitle}>{movie.subTitle}</h3>
      <p className={style.description}>{movie.description}</p>
    </div>
  );
}
