import { authOptions } from "lib/auth/auth";
import getAgilitySDK from "lib/cms/getAgilitySDK";
import { getServerSession } from "next-auth";

import Image from "next/image";

export const MembersBannerDynamic = async () => {

  const session = await getServerSession(authOptions);

  // don't render anything if the user is not authenticated
  if (!session) {
    return <div>No session</div>;
  }

  const agilitySDK = await getAgilitySDK()

  agilitySDK.config.fetchConfig = {
    // don't cache this call
    cache: "no-store"
  }

  const user = await agilitySDK.getContentList({
    referenceName: "memberstats",
    languageCode: "en-us",
    contentLinkDepth: 2,
    take: 1,
    skip: 0,
    filters: [
      {
        property: "fields.member",
        operator: "eq",
        value: `"${session?.user?.email}"` || "",
      },
    ],
  });

  const { picture, playerName, lastGameScore } = user?.items[0]?.fields || {}

  //do an await sleep for 1 second
  await new Promise((resolve) => setTimeout(resolve, 1000));


  return (
    <section className="bg-blue-500 text-white p-4 rounded-lg flex justify-between items-center max-w-screen-xl mx-auto mt-8">
      <div className="flex-shrink-0">
        <Image
          width="248"
          height="248"
          src={picture.url}
          alt="Player Image"
          className="w-32 h-32 rounded-full object-cover border-4 border-white"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold">Welcome, {session.user?.name} 👋</h1>
      </div>
      <div className="ml-4">
        <p className="text-lg font-medium">{playerName}</p>
        <p className="text-2xl pr-8">Last Game: {lastGameScore || "N/A"}</p>
      </div>
    </section>

  );
};

