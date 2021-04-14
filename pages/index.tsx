import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { Calendar } from "components/Calendar/Calendar";
import dayjs from "dayjs";
import "dayjs/locale/it";
dayjs.locale("it");

const endpoint = "http://staccah.fattureincloud.it/testfrontend/data.json";

type Month = {
  documenti: number;
  importo: number;
};

function upperaseFirstLetter(v: string) {
  return `${v[0].toUpperCase()}${v.slice(1)}`;
}

type Data = {
  mesi: Month[];
};

const Page = () => {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState(false);
  const [queryIsLoading, setQueryIsLoading] = useState(true);

  useEffect(() => {
    if (queryIsLoading && !data) {
      fetch(endpoint)
        .then(async (r) => {
          const res = await r.json();

          if (res?.mesi) {
            setData(res);
          }

          setQueryIsLoading(false);
        })
        .catch(() => {
          setQueryIsLoading(false);
          setError(true);
        });
    }
  }, [data, queryIsLoading]);

  function getContent() {
    if (queryIsLoading) {
      return <p>Loading...</p>;
    }

    if ((!queryIsLoading && !data) || !data) {
      return <div>No data...</div>;
    }

    if (error) {
      return <div>There was an error...</div>;
    }

    return (
      <Calendar
        data={data.mesi.map(({ documenti, importo }, i) => {
          const month = dayjs().month(i).format("MMMM");
          return {
            month: upperaseFirstLetter(month),
            docs: documenti,
            amount: importo,
          };
        })}
      />
    );
  }

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        padding-top: 124px;
      `}
    >
      {getContent()}
    </div>
  );
};

export default Page;
