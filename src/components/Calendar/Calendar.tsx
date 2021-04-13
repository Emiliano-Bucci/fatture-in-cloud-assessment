import { css } from "@emotion/react";
import { CalendarHeader } from "./components/CalendarHeader";
import { CalendarItem } from "./components/CalendarItem";

const amountFormater = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

type Props = {
  data: {
    month: string;
    docs: number;
    amount: number;
  }[];
};

export function Calendar({ data }: Props) {
  return (
    <div
      css={css`
        background-color: #fff;
        border: 1px solid #ebedee;
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
        {data.map(({ docs, amount, month }) => (
          <CalendarItem
            key={`${docs}-${amount}-${month}`}
            docs={docs}
            amount={amountFormater.format(amount)}
          />
        ))}
      </div>
    </div>
  );
}
