import React from "react";

interface StatStripProps {
  piecesRehomed?: string;
  uniqueInventory?: string;
  shippingTime?: string;
}

export const StatStrip: React.FC<StatStripProps> = ({
  piecesRehomed = "12K+",
  uniqueInventory = "1/1",
  shippingTime = "48H",
}) => {
  const stats = [
    {
      value: piecesRehomed,
      label: "PIECES REHOMED",
      subtext: "Hand-picked vintage saved from landfills",
    },
    {
      value: uniqueInventory,
      label: "UNIQUE ARCHIVE",
      subtext: "Every thrifted piece is strictly one-of-one",
    },
    {
      value: shippingTime,
      label: "DISPATCH WINDOW",
      subtext: "Fast domestic delivery across India",
    },
  ];

  return (
    <section className="w-full bg-[#1A1712] border-y-[1.5px] border-[#1A1712] py-8 text-[#F5F0E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-[#8A8574]/30">
          {stats.map((stat, idx) => (
            <div key={idx} className={idx > 0 ? "pt-6 md:pt-0 md:pl-8" : ""}>
              <div className="font-display text-4xl sm:text-5xl text-[#F2C511] tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-black uppercase tracking-widest text-[#FFFFFF] mt-1">
                {stat.label}
              </div>
              <div className="text-xs text-[#8A8574] mt-0.5">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
