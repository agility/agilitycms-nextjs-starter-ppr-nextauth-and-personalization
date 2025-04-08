

import { Suspense } from "react";

import { MembersSkeleton } from "./MembersSkeleton";
import { MembersBannerDynamic } from "./MembersBannerDynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "lib/auth/auth";


const MembersBanner = async () => {

  return (
    <Suspense fallback={<MembersSkeleton />}>
      {/* @ts-expect-error Server Component */}
      <MembersBannerDynamic />


    </Suspense>
  )
};

export default MembersBanner;
