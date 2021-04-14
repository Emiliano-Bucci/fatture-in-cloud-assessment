import { css } from "@emotion/react";

type Props = {
  month: string;
};
export function CalendarHeader({ month }: Props) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        font-size: 12px;
        padding-left: 10px;
        width: 80px;
        padding: 6px 8px;
        line-height: 17px;
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
  );
}
