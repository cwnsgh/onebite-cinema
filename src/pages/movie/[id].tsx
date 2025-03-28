import { useRouter } from "next/router";
import movies from "@/mock/movies.json";
import { MovieData } from "@/types";
import style from "./[id].module.css";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  const movie = movies.find((movie: MovieData) => movie.id === Number(id));

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
