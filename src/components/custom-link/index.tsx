"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ComponentProps } from "react";
import { config } from "../../constants";
import { useToken } from "../../hooks";
import { requiresAuth } from "../../utils";

interface CustomLinkProps extends ComponentProps<typeof Link> {
  isExternalLink?: boolean;
}

export const CustomLink = ({
  isExternalLink = false,
  ...props
}: CustomLinkProps) => {
  const token = useToken();
  const path = usePathname();
  const locale = path.split("/")[1];
  // Extract the href from props, ensuring it's always a string
  const href = typeof props.href === "string" ? props.href : "";
  if (isExternalLink || href.startsWith("http")) {
    return (
      <Link {...props} href={href} prefetch={false}>
        {props.children}
      </Link>
    );
  }
  // Adjust the href to include the locale if it exists
  const adjustedHref = `/${locale}${href}`;
  if (requiresAuth(adjustedHref) && !token) {
    return (
      <Link
        {...props}
        href={`${config.ql_login_url}${adjustedHref}`}
        prefetch={props.prefetch ?? false}
      >
        {props.children}
      </Link>
    );
  }

  const url = new URL(adjustedHref, config.apiConfig.base_url); // Base URL needed to parse correctly
  const pathname = url.pathname; // Extracts '/properties/international'
  const query = Object.fromEntries(url.searchParams.entries()); // Converts query string into an object

  return (
    <Link
      {...props}
      href={{
        pathname,
        query,
      }}
      prefetch={props.prefetch ?? false}
    >
      {props.children}
    </Link>
  );
};
