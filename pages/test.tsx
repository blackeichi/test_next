import Link from "next/link";
import { useEffect, useState } from "react";

interface Bilions {
  slice: any;
  id: string;
  industries: [];
  name: string;
  netWorth: number;
  squareImage: string;
}

export default function Test() {
  const [mouseOn, setmouseOn] = useState(false);
  const [data, setData] = useState<Bilions>();
  useEffect(() => {
    (async () => {
      const results = await (
        await fetch("https://billions-api.nomadcoders.workers.dev/")
      ).json();
      setData(results);
    })();
  }, []);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,200px)",
        columnGap: "20px",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.9)",
        padding: "70px 100px",
      }}
    >
      {data?.slice(0, 40).map((result: any) => (
        <Link
          href={{ pathname: `/person/${result.id}`, query: { id: result.id } }}
          key={result.id}
        >
          <a>
            <div
              className="box"
              style={{ height: "300px", color: "white", cursor: "pointer" }}
              key={result.id}
            >
              <img style={{ width: "100%" }} src={result.squareImage} />
              <h1 style={{ fontSize: "16px" }}>{result.name}</h1>
              <h2 style={{ fontSize: "12px" }}>
                {Math.round(result.netWorth / 1000)} Bilions/{result.industries}
              </h2>
            </div>
          </a>
        </Link>
      ))}
      <style jsx>{`
        .box {
          transition: transform 0.2s ease-in-out;
        }
        .box:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
