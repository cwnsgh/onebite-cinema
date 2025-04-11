import { MovieData } from "@/types";
import style from "./[id].module.css";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import fetchOneMovie from "@/lib/fetch-one-movie";

export const getStaticPaths = () => {
  return {
    paths: [
      //파라미터값은 무조건 문자열로설정 그래야 next가 이해함
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    //풀백해줘야함 - 대체 , 대비책, 보험
    fallback: false,
    //false로 하면 존재하지않는 경로의 요청은 그냥 NOTFOUND
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const movie = await fetchOneMovie(Number(id));
  return {
    props: { movie },
  };
};

export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!movie) {
    return <h2>해당 영화 정보를 찾을 수 없습니다.</h2>;
  }

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
