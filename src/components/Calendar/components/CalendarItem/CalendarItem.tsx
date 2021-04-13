import { css } from "@emotion/react";
import { useSpring } from "@react-spring/core";
import { animated } from "@react-spring/web";

type Props = {
  docs: number;
  amount: string;
  isActive: boolean;
  onClick(): void;
};

export function CalendarItem({ docs, amount, isActive, onClick }: Props) {
  const styles = useSpring({
    opacity: isActive ? 1 : 0,
  });
  return (
    <div
      onClick={onClick}
      css={css`
        display: grid;
        align-content: end;
        width: 98px;
        padding: 10px;
        height: 93px;
        grid-gap: 4px;
        position: relative;
        cursor: pointer;

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
      <animated.div
        css={css`
          pointer-events: none;
          width: 100%;
          height: 4px;
          top: 100%;
          left: 0;
          position: absolute;
          background-color: #3197d5;
        `}
        style={styles}
      />
    </div>
  );
}
