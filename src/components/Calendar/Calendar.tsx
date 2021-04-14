import { css } from "@emotion/react";
import { useRef, useState } from "react";
import { useDrag } from "react-use-gesture";
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

const FilterSection: React.FC<{
  title: string;
  align?: "left" | "right";
}> = ({ children, title, align = "left" }) => {
  return (
    <div
      css={css`
        display: grid;
        grid-gap: 8px;
        align-content: start;
      `}
    >
      <h3
        css={css`
          font-size: 18px;
          border-bottom: 1px solid #ebedee;
          padding: 8px;

          ${align === "right" &&
          css`
            text-align: right;
          `}
        `}
      >
        {title}
      </h3>
      <div
        css={css`
          display: grid;
          grid-gap: 4px;
          padding: 8px;
          padding-top: 0;

          ${align === "right" &&
          css`
            justify-content: end;
          `}
        `}
      >
        {children}
      </div>
    </div>
  );
};

function TotalSection({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <span>{label}</span>{" "}
      <strong
        css={css`
          font-size: 18px;
          color: #3197d5;
        `}
      >
        {value}
      </strong>
    </div>
  );
}

export function Calendar({ data }: Props) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [activeItems, setActiveItems] = useState<number[]>([]);
  const dragWrapperRef = useRef<HTMLDivElement | null>(null);
  const dataLength = data.length;
  const wasDragging = useRef(false);
  const prevSelectedItem = useRef<number | null>(null);

  const dragBind = useDrag(
    ({ xy: [x], last }) => {
      const dragWrapperWidth =
        dragWrapperRef.current?.getBoundingClientRect().width ?? 0;
      const dragWrapperOffsetLeft =
        dragWrapperRef.current?.getBoundingClientRect().left ?? 0;
      const itemWidth = dragWrapperWidth / dataLength;
      const movement = x - dragWrapperOffsetLeft;
      const selectedItem = Math.floor(movement / itemWidth);
      wasDragging.current = true;

      if (movement < 0 || movement > dragWrapperWidth) {
        return;
      }

      if (!activeItems.includes(selectedItem)) {
        setActiveItems((p) => [...p, selectedItem]);
      }

      if (last) {
        setActiveItems([]);
        setSelectedItems(activeItems);
      }
    },
    {
      threshold: 10,
    }
  );

  const highestValue = Math.max(...data.map((v) => v.amount));
  const selectedMonths = data.filter((_, i) => selectedItems.includes(i));

  function handleOnCalendarItemClick(i: number) {
    if (wasDragging.current) {
      wasDragging.current = false;
      return;
    }

    if (prevSelectedItem.current === i) {
      setSelectedItems([]);
      setActiveItems([]);
      prevSelectedItem.current = null;
    } else if (prevSelectedItem.current !== i) {
      setSelectedItems([i]);
      prevSelectedItem.current = i;
    }
  }

  return (
    <div
      css={css`
        display: grid;
        grid-gap: 40px;

        button {
          cursor: pointer;
          background-color: #fff;
          border: none;
          padding: 12px 16px;
          transition: all 220ms ease;
          font-weight: 600;

          :hover,
          :focus {
            background-color: #3197d5;
            color: #fff;
          }
        }
      `}
    >
      <div
        css={css`
          background-color: #fff;
          border: 1px solid #ebedee;
          box-shadow: 0 6.7px 5.3px rgba(0, 0, 0, 0.008),
            0 22.3px 17.9px rgba(0, 0, 0, 0.012),
            0 100px 80px rgba(0, 0, 0, 0.02);
        `}
      >
        <header
          css={css`
            display: flex;
          `}
        >
          {data.map(({ month }) => (
            <CalendarHeader key={month} month={month} />
          ))}
        </header>
        <div
          {...dragBind()}
          ref={dragWrapperRef}
          css={css`
            display: flex;
          `}
        >
          {data.map(({ docs, amount, month }, i) => {
            const isSelected = selectedItems.includes(i);
            return (
              <CalendarItem
                key={`${docs}-${amount}-${month}`}
                docs={docs}
                amount={amountFormater.format(amount)}
                isSelected={isSelected}
                isActive={activeItems.includes(i)}
                percentFill={Number((amount / highestValue).toFixed(2))}
                onClick={() => handleOnCalendarItemClick(i)}
                onMouseDown={() => {
                  setActiveItems([i]);
                  setSelectedItems([]);
                }}
              />
            );
          })}
        </div>
      </div>
      <div
        css={css`
          display: grid;
          grid-auto-flow: column;
          justify-content: end;
          grid-gap: 16px;
        `}
      >
        <button onClick={() => setSelectedItems([])}>RESET</button>
        <button onClick={() => setSelectedItems(data.map((_, i) => i))}>
          SELECT ALL
        </button>
      </div>
      <div
        css={css`
          display: grid;
          grid-gap: 16px;
          background-color: #fff;
          padding: 24px;
          box-shadow: 0 6.7px 5.3px rgba(0, 0, 0, 0.008),
            0 22.3px 17.9px rgba(0, 0, 0, 0.012),
            0 100px 80px rgba(0, 0, 0, 0.02);
        `}
      >
        <h2
          css={css`
            font-size: 20px;
            font-weight: 600;
          `}
        >
          Filtered data
        </h2>

        <div
          css={css`
            display: grid;
            grid-gap: 24px;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            margin: -8px;
            border-bottom: 1px solid #ebedee;
          `}
        >
          <FilterSection title="Filtered months">
            {selectedMonths.length > 0 ? (
              selectedMonths.map((i) => <div key={i.month}>{i.month}</div>)
            ) : (
              <span>-</span>
            )}
          </FilterSection>
          <FilterSection title="Filtered documents">
            {selectedMonths.length > 0 ? (
              selectedMonths.map((i) => (
                <div key={`${i.month}-${i.docs}`}>{i.docs}</div>
              ))
            ) : (
              <span>-</span>
            )}
          </FilterSection>
          <FilterSection title="Filtered amount" align="right">
            {selectedMonths.length > 0 ? (
              selectedMonths.map((i) => (
                <div key={`${i.month}-${i.amount}`}>
                  {amountFormater.format(i.amount)}
                </div>
              ))
            ) : (
              <span>-</span>
            )}
          </FilterSection>
        </div>
        <div
          css={css`
            display: grid;
            grid-gap: 8px;
          `}
        >
          <TotalSection
            label="Total documents:"
            value={selectedMonths.reduce((acc, i) => acc + i.docs, 0)}
          />
          <TotalSection
            label="Total amount:"
            value={amountFormater.format(
              selectedMonths.reduce((acc, i) => acc + i.amount, 0)
            )}
          />
        </div>
      </div>
    </div>
  );
}
