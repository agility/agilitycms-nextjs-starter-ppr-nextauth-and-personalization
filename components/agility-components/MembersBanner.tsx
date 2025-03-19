import { renderHTML, Module, UnloadedModuleProps } from "@agility/nextjs";
import { authOptions } from "lib/auth/auth";
import { getContentItem } from "lib/cms/getContentItem";
import { getContentList } from "lib/cms/getContentList";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
const MembersBanner = async () => {
  // Get session on the server
//   const { data: session, update } = useSession()

  const session = await getServerSession(authOptions);

  // don't render anything if the user is not authenticated
  if (!session) {
    return <></>;
  }

  const user = await getContentList({
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

//   console.log(user);
console.log(picture);
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

    // <section id={`${contentID}`} className="relative px-8" data-agility-component={contentID}>
    // 	<div className="max-w-2xl mx-auto my-12 md:mt-18 lg:mt-20">
    // 		<div
    // 			data-agility-field="textblob"
    // 			data-agility-html
    // 			className="my-6 prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-full"
    // 			dangerouslySetInnerHTML={renderHTML(textblob)}
    // 		></div>
    // 	</div>
    // </section>
  );
};

export default MembersBanner;
