import { getServerSession } from "next-auth";
import { authOptions } from "lib/auth/auth";
import { redirect } from "next/navigation";
import { getContentList } from "lib/cms/getContentList";
import Link from "next/link";
import Image from "next/image";
import getAgilitySDK from "lib/cms/getAgilitySDK";

export default async function MembersPage() {
  // Get session on the server
  const session = await getServerSession(authOptions);

  // Redirect if not logged in
  if (!session) {
    redirect("/signin");
  }

  const agilitySDK = await getAgilitySDK()

  agilitySDK.config.fetchConfig = {
    // don't cache this call
    cache: "no-store"
  }

  const stats = await agilitySDK.getContentList({

    referenceName: "memberstats",
    languageCode: "en-us",
    contentLinkDepth: 2,
    take: 1,
    skip: 0,
    filters: [
      {
        property: "fields.member",
        operator: "eq",
        value: `"${session?.user?.email || ""}"`,
      },
    ],
  });

  const stat = stats?.items?.length > 0 ? stats?.items?.[0] || null : null;

  if (!stat) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg text-center">
          <h1 className="text-2xl font-bold">Player not found</h1>
        </div>
      </div>
    );
  }

  const { picture, playerName, lastGameScore } = stat.fields || {};

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold">Welcome, {session.user?.name} 👋</h1>
        <p className="text-gray-600 mt-2">
          You&apos;re now inside the members-only area.
        </p>
        <p>The time is {new Date().toLocaleTimeString()}.</p>
      </div>

      <div>
        <div className="mt-6 flex flex-col items-center">
          <Image
            width="248"
            height="248"
            src={picture.url}
            alt="Player Image"
            className="w-32 h-32 rounded-full object-cover"
          />
          {playerName && (
            <h2 className="text-xl font-bold mt-4">{playerName}</h2>
          )}
          <p className="text-lg font-semibold mt-4">
            Last Score: {lastGameScore}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <Link
          href={"/"}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}
