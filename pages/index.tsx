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
        });
    }
  }, [data, queryIsLoading]);

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
      `}
    >
      {queryIsLoading && <p>Loading...</p>}
      {!queryIsLoading && !data && <div>No data...</div>}
      {!queryIsLoading && data && (
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
      )}
    </div>
  );
};

export default Page;
