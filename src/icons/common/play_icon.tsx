import * as React from "react"

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

const SVGComponent: React.FC<SVGProps> = (props) => {
  const { color = "#646464", ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      {...rest}
    >
      <rect
        width={34}
        height={34}
        y={0.875}
        fill="#000"
        fillOpacity={0.5}
        rx={17}
      />
      <path
        fill="#FF7F38"
        stroke="#FF7F38"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.292}
        d="m11 8.875 14 9-14 9v-18Z"
      />
    </svg>
  )
};

export default SVGComponent;
