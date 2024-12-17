import { redirect } from "next/navigation";
import { NextPage } from "next";

import { defaultLocale } from "@/i18n/constants";

// This page only renders when the app is built statically (output: 'export')
const Page: NextPage = ({}) => {
  redirect(`/${defaultLocale}`);
};

export default Page;
