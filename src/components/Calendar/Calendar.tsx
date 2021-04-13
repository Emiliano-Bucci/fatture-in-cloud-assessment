import { css } from "@emotion/react";

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
          <div
            key={month}
            css={css`
              display: flex;
              align-items: center;
              font-size: 14px;
              padding-left: 10px;
              width: 98px;
              border-bottom: 1px solid #ebedee;
              color: #3197d5;
              font-weight: 500;

              :not(:last-of-type) {
                border-right: 1px solid #ebedee;
              }
            `}
          >
            {month}
          </div>
        ))}
      </header>
      <div
        css={css`
          display: flex;
        `}
      >
        {data.map(({ docs, amount, month }) => (
          <div
            key={`${docs}-${amount}-${month}`}
            css={css`
              display: grid;
              align-content: end;
              width: 98px;
              padding: 10px;
              height: 93px;
              grid-gap: 4px;

              :not(:last-of-type) {
                border-right: 1px solid #ebedee;
              }
            `}
          >
            <span
              css={css`
                font-size: 14px;
                color: #6f7e86;
              `}
            >
              {docs} doc.
            </span>
            <span
              css={css`
                color: #26875a;
                font-weight: 500;
              `}
            >
              {amountFormater.format(amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
