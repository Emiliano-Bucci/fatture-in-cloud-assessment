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

const FilterSection: React.FC<{
  title: string;
}> = ({ children, title }) => {
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
  const [activeItems, setActiveItems] = useState<number[]>([]);

  function removeActiveItem(i: number) {
    setActiveItems((p) => p.filter((_i) => _i !== i));
  }

  function addActiveItem(i: number) {
    setActiveItems((p) => [...p, i]);
  }

  const highestValue = Math.max(...data.map((v) => v.amount));
  const selectedMonths = data.filter((_, i) => activeItems.includes(i));

  return (
    <div
      css={css`
        display: grid;
        grid-gap: 40px;
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

        {selectedMonths.length === 0 && <div>No data selected</div>}
        {selectedMonths.length > 0 && (
          <>
            <div
              css={css`
                display: grid;
                grid-gap: 24px;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                margin: -8px;
                border-bottom: 1px solid #ebedee;
              `}
            >
              <FilterSection title="Month selected">
                {selectedMonths.map((i) => (
                  <div key={i.month}>{i.month}</div>
                ))}
              </FilterSection>
              <FilterSection title="Total docs">
                {selectedMonths.map((i) => (
                  <div key={`${i.month}-${i.docs}`}>{i.docs}</div>
                ))}
              </FilterSection>
              <FilterSection title="Total amount">
                {selectedMonths.map((i) => (
                  <div key={`${i.month}-${i.amount}`}>
                    {amountFormater.format(i.amount)}
                  </div>
                ))}
              </FilterSection>
            </div>
            <div
              css={css`
                display: grid;
                grid-auto-flow: column;
                grid-gap: 16px;
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
          </>
        )}
      </div>
    </div>
  );
}
