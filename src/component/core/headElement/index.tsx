import Head from "next/head";
import React from "react";

interface headElementProps {
  title: String;
}

export const HeadElement: React.FC<headElementProps> = ({ title }) => {
  return (
    <Head>
      <link rel='shortcut icon' href="/favicon.png" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
      <title>{title}</title>
    </Head>
  );
};
