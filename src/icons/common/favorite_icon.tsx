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
            <path
                stroke="#FF7F38"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.25 11.688c1.117-1.096 2.25-2.408 2.25-4.126a4.125 4.125 0 0 0-4.125-4.125c-1.32 0-2.25.376-3.375 1.5-1.125-1.125-2.055-1.5-3.375-1.5A4.125 4.125 0 0 0 1.5 7.564c0 1.724 1.125 3.037 2.25 4.125L9 16.938l5.25-5.25Z"
            />
        </svg>
    )
};

export default SVGComponent;
