import * as React from "react";

// 1. Add a type/interface for props so TS knows about .color
interface SVGProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

const SVGComponent: React.FC<SVGProps> = (props) => {
  // Get color prop or fallback to gray if none given
  const { color = "#646464", ...rest } = props;
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M3 10H21V6C21 5.46957 20.7893 4.96086 20.4142 4.58579C20.0391 4.21071 19.5304 4 19 4H5C4.46957 4 3.96086 4.21071 3.58579 4.58579C3.21071 4.96086 3 5.46957 3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H12"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 2V6"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 2V6"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.29 14.6999C20.9492 14.3609 20.5156 14.1305 20.0439 14.0379C19.5722 13.9453 19.0836 13.9948 18.64 14.1799C18.34 14.2999 18.07 14.4799 17.84 14.7099L17.5 15.0499L17.15 14.7099C16.8103 14.3692 16.3772 14.1369 15.9055 14.0426C15.4337 13.9482 14.9445 13.996 14.5 14.1799C14.2 14.2999 13.94 14.4799 13.71 14.7099C12.76 15.6499 12.71 17.2399 13.91 18.4499L17.5 21.9999L21.1 18.4499C22.3 17.2399 22.24 15.6499 21.29 14.7099V14.6999Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SVGComponent;
