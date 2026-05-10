type TallyItem = {
  name: string;
  cat: string;
  catLabel: string;
  meta: string;
  count: number;
};

const ITEMS: TallyItem[] = [
  { name: "Glasses of water", cat: "cat-health", catLabel: "Health", meta: "Daily", count: 5 },
  { name: "Pushups", cat: "cat-fitness", catLabel: "Fitness", meta: "Reset weekly", count: 42 },
  { name: "Pages read", cat: "cat-habits", catLabel: "Habits", meta: "Cumulative", count: 128 },
  { name: "Deep work blocks", cat: "cat-work", catLabel: "Work", meta: "Today", count: 3 },
];

/** TallyTappy phone mock — used inside the Projects gallery. */
export function TallyMock() {
  return (
    <div className="app-tally">
      <div className="app-tally__header">
        <div className="app-tally__hello">Tuesday · Quiet morning</div>
        <div className="app-tally__title">Your tallies</div>
        <div className="app-tally__sub">4 active · last edited 2 min ago</div>
      </div>
      <div className="app-tally__list">
        {ITEMS.map((it) => (
          <div key={it.name} className="tally-card" data-tally>
            <div>
              <div className="tally-card__name">{it.name}</div>
              <div className="tally-card__meta">
                <span className={`tally-card__cat ${it.cat}`}>{it.catLabel}</span> {it.meta}
              </div>
            </div>
            <div className="tally-card__counter">
              <button className="tally-card__btn" type="button">−</button>
              <span className="tally-card__count" data-tally-count>
                {it.count}
              </span>
              <button className="tally-card__btn tally-card__btn--plus" type="button">+</button>
            </div>
          </div>
        ))}
      </div>
      <div className="app-tally__fab">+</div>
    </div>
  );
}
