import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
export default function Home() {
  const String = "ONEBITE CINEMA";

  return (
    <>
      <h1>{String}</h1>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
