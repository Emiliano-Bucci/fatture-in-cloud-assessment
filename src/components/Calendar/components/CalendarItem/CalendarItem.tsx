import { css } from "@emotion/react";

type Props = {
  docs: number;
  amount: string;
};

export function CalendarItem({ docs, amount }: Props) {
  return (
    <div
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
        {amount}
      </span>
    </div>
  );
}
