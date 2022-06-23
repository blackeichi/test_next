import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Detail {
  id: string;
  state: string;
  city: string;
  name: string;
  country: string;
  industries: [];
  netWorth: number;
  squareImage: string;
  bio: [];
}

export default function TestDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      const results = await (
        await fetch(`https://billions-api.nomadcoders.workers.dev/person/${id}`)
      ).json();
      console.log(results);
      setData(results);
    })();
  }, []);
  return (
    <>
      {data ? (
        <div>
          <img src={`${data.squareImage}`} />
          <h1>{data.name}</h1>
          <h2>{data.country}</h2>
          <h2>{data.industries[0]}</h2>
          <div>
            {data?.bio.map((result) => (
              <h2>{result}</h2>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
