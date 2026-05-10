/** Plan.it phone mock — used inside the Projects gallery. */
export function PlanMock() {
  return (
    <div className="app-plan">
      <div className="app-plan__header">
        <div className="app-plan__brand">
          <span className="dot" />
          Plan.it
        </div>
        <div className="app-plan__week">
          <span>
            <b>This week</b> · Apr 28 – May 4
          </span>
          <div className="app-plan__nav">
            <span>‹</span>
            <span>·</span>
            <span>›</span>
          </div>
        </div>
      </div>
      <div className="app-plan__grid" id="planGrid">
        <div className="app-plan__hourcol">
          <div className="app-plan__dayhead" style={{ borderLeft: "none" }}>
            &nbsp;
          </div>
          {["6a", "8a", "10a", "12p", "2p", "4p", "6p", "8p"].map((h) => (
            <div key={h} className="app-plan__hour">
              {h}
            </div>
          ))}
        </div>
        {/* day columns are populated by GSAP timeline — see usePortfolioViewModel */}
      </div>
      <div className="app-plan__fab">+</div>
    </div>
  );
}
