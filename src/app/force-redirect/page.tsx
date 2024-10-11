"use server"

import {apiLogoutUser} from "@/lib/api-requests";
import {redirect} from "next/navigation";

export default async function ForceRedirectPage() {

  const response = await apiLogoutUser();

  redirect('/');
}
