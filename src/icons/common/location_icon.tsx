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
    {...props}
  >
    <g strokeLinecap="round" strokeLinejoin="round" clipPath="url(#a)">
      <path
        fill="#646464"
        stroke="#646464"
        d="M11.667 6.708c0 2.913-3.231 5.946-4.316 6.883a.583.583 0 0 1-.702 0c-1.085-.937-4.316-3.97-4.316-6.883a4.667 4.667 0 0 1 9.334 0Z"
      />
      <path
        fill="#fff"
        stroke="#fff"
        d="M7 8.458a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 .875h14v14H0z" />
      </clipPath>
    </defs>
  </svg>
    )
};

export default SVGComponent;
