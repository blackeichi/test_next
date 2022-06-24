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
  const [data, setData] = useState<Detail>();
  let results;
  useEffect(() => {
    {
      id !== undefined
        ? (async () => {
            results = await (
              await fetch(
                `https://billions-api.nomadcoders.workers.dev/person/${id}`
              )
            ).json();
            setData(results);
          })()
        : (results = []);
    }
  }, [id]);
  return (
    <>
      {data ? (
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.9)",
            color: "white",
            padding: "100px 20px",
          }}
        >
          <img style={{ width: "300px" }} src={`${data.squareImage}`} />
          <h1 style={{ fontSize: "30px" }}>{data?.name}</h1>
          <h2 style={{ fontSize: "16px", fontWeight: "normal" }}>
            Networth : {Math.round(data.netWorth / 1000)} Biolion
          </h2>
          <h2 style={{ fontSize: "16px", fontWeight: "normal" }}>
            Country : {data?.country}
          </h2>
          <h2 style={{ fontSize: "16px", fontWeight: "normal" }}>
            Industry : {data?.industries}
          </h2>
          {data?.bio?.map((result) => (
            <span
              style={{ fontSize: "16px", fontWeight: "normal" }}
              key={Math.random()}
            >
              {result}
            </span>
          ))}
        </div>
      ) : null}
      <style jsx>{``}</style>
    </>
  );
}
