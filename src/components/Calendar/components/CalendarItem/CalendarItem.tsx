import { css } from "@emotion/react";
import { useSpring } from "@react-spring/core";
import { animated } from "@react-spring/web";
import { useEffect } from "react";

type Props = {
  docs: number;
  amount: string;
  isActive: boolean;
  isSelected: boolean;
  percentFill?: number;
  onClick(): void;
};

export function CalendarItem({
  docs,
  amount,
  isActive,
  isSelected,
  onClick,
  percentFill = 0.4,
}: Props) {
  const percentFillStyles = useSpring({
    from: {
      y: 0,
    },
    to: {
      y: percentFill,
    },
    delay: 240,
  });
  const styles = useSpring({
    opacity: isSelected || isActive ? 1 : 0,
  });

  useEffect(() => {
    if (percentFill < 0 || percentFill > 1) {
      throw new Error(
        `percentFill should be a value between 0 and 1; currently is ${percentFill}`
      );
    }
  }, [percentFill]);

  return (
    <div
      onClick={onClick}
      css={css`
        display: grid;
        align-content: end;
        width: 80px;
        padding: 10px;
        height: 93px;
        grid-gap: 4px;
        position: relative;
        cursor: pointer;
        z-index: 10;
        font-size: 12px;
        user-select: none;

        :not(:last-of-type) {
          border-right: 1px solid #ebedee;
        }
      `}
    >
      <span
        css={css`
          color: #6f7e86;
          z-index: 10;
          position: relative;
        `}
      >
        {docs} doc.
      </span>
      <span
        css={css`
          color: #26875a;
          font-weight: 500;
          z-index: 10;
          position: relative;
        `}
      >
        {amount}
      </span>
      <animated.div
        style={styles}
        css={css`
          pointer-events: none;
          width: 100%;
          height: 3px;
          top: 100%;
          left: 0;
          position: absolute;
          background-color: #3197d5;
          z-index: 10;
          transition: background-color 280ms ease;

          ${isActive &&
          css`
            background-color: rgba(49, 151, 213, 0.64);
          `}
        `}
      />
      <animated.div
        style={{
          scaleY: percentFillStyles.y.to((v) => v),
        }}
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #e0f1eb;
          z-index: 0;
          transform-origin: bottom;
        `}
      />
    </div>
  );
}
