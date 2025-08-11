import * as React from "react";

type SvgProps = React.SVGProps<SVGSVGElement>;

const SvgComponent: React.FC<SvgProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={56}
    height={57}
    fill="none"
    viewBox="0 0 56 57"
    {...props}
  >
    <rect width={48} height={48} x={4} y={4.625} fill="#EDFAFF" rx={24} />
    <rect
      width={48}
      height={48}
      x={4}
      y={4.625}
      stroke="#E8F2FE"
      strokeWidth={8}
      rx={24}
    />
    <path
      stroke="#00426D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M23.9 36.625a9 9 0 1 0-3.9-3.9l-2 5.9zM24 28.625h.01M28 28.625h.01M32 28.625h.01"
    />
  </svg>
);

export default SvgComponent;
