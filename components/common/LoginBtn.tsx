import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <div className="ml-4 flex items-center gap-4 text-gray-400">
       <Link href="/members" className="text-base leading-6 font-medium text-secondary-500 hover:text-primary-500 border-transparent border-b-2 hover:border-primary-500 hover:border-b-primary hover:border-b-2 focus:outline-none focus:text-primary-500 transition duration-300">Members Area</Link>
    
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()} className="bg-red-500 text-white py-2 px-4 rounded-md">Sign out</button>
      </div>
    )
  }
  return (
    <div className="ml-12 flex">
    <Link href="/signin" className="bg-red-500 text-white py-2 px-4 rounded-md">Sign in</Link>
     
      {/* <button onClick={() => signIn()} className="bg-red-500 text-white py-2 px-4 rounded-md">Sign in</button> */}
      {/* <button onClick={() => signIn("google")} className="bg-gray-800 text-white py-2 px-4 rounded-md ml-2">Sign in with Google</button> */}
    </div>
  )
}