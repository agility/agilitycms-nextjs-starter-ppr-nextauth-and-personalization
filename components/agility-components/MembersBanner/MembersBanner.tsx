

import { Suspense } from "react";

import { MembersSkeleton } from "./MembersSkeleton";
import { MembersBannerDynamic } from "./MembersBannerDynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "lib/auth/auth";


const MembersBanner = async () => {
  const session = await getServerSession(authOptions);

  return (
    <Suspense fallback={<MembersSkeleton />}>
      {/* @XXts-expect-error Server Component */}
      {/* <MembersBannerDynamic /> */}
      <MembersSkeleton />

    </Suspense>
  )
};

export default MembersBanner;
