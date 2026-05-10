import type { ReactNode } from "react";

/**
 * The phone shell used inside the Projects gallery. The CSS lives in
 * globals.css under the `.phone` class chain.
 */
export function PhoneFrame({
  timeColor,
  children,
}: {
  timeColor?: string;
  children: ReactNode;
}) {
  return (
    <div className="phone" data-phone>
      <div className="phone__notch" />
      <div className="phone__time" style={timeColor ? { color: timeColor } : undefined}>
        9:41
      </div>
      <div className="phone__icons">
        <span /> <span /> <span />
      </div>
      <div className="phone__screen">{children}</div>
    </div>
  );
}
