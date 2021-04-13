import { css } from "@emotion/react";
import { useState } from "react";
import { CalendarHeader } from "./components/CalendarHeader";
import { CalendarItem } from "./components/CalendarItem";

const amountFormater = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

type Props = {
  data: {
    month: string;
    docs: number;
    amount: number;
  }[];
};

export function Calendar({ data }: Props) {
  const [activeItems, setActiveItems] = useState<number[]>([]);

  function removeActiveItem(i: number) {
    setActiveItems((p) => p.filter((_i) => _i !== i));
  }

  function addActiveItem(i: number) {
    setActiveItems((p) => [...p, i]);
  }

  const highestValue = Math.max(...data.map((v) => v.amount));

  return (
    <div
      css={css`
        background-color: #fff;
        border: 1px solid #ebedee;
        box-shadow: 0 6.7px 5.3px rgba(0, 0, 0, 0.008),
          0 22.3px 17.9px rgba(0, 0, 0, 0.012), 0 100px 80px rgba(0, 0, 0, 0.02);
      `}
    >
      <header
        css={css`
          display: flex;
          height: 36px;
        `}
      >
        {data.map(({ month }) => (
          <CalendarHeader key={month} month={month} />
        ))}
      </header>
      <div
        css={css`
          display: flex;
        `}
      >
        {data.map(({ docs, amount, month }, i) => {
          const isActive = activeItems.includes(i);
          return (
            <CalendarItem
              key={`${docs}-${amount}-${month}`}
              docs={docs}
              amount={amountFormater.format(amount)}
              isActive={isActive}
              percentFill={Number((amount / highestValue).toFixed(2))}
              onClick={() => {
                if (isActive) {
                  removeActiveItem(i);
                } else {
                  addActiveItem(i);
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
