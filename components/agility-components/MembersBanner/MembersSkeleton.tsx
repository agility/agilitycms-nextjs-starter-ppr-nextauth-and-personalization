import { CgSpinner, CgUser } from "react-icons/cg"


export const MembersSkeleton = () => {
	return <section className="bg-gray-300 text-white p-4 rounded-lg flex justify-between items-center max-w-screen-xl mx-auto mt-8 animate-pulse duration-100">
		<div className="flex-shrink-0">
			<CgUser className="mb-2 h-32 w-32 rounded-full border-4 border-white" />

		</div>
		<div>
			<h1 className="text-2xl font-bold">Welcome, ◼︎◼︎◼︎◼︎ ◼︎◼︎◼︎</h1>
		</div>
		<div className="ml-4">
			<p className="text-lg font-medium">◼︎◼︎◼︎ ◼︎◼︎◼︎◼︎ ◼︎◼︎</p>
			<p className="text-2xl pr-8">◼︎◼︎◼︎◼︎◼︎ ◼︎◼︎-◼︎◼︎</p>

		</div>
	</section>
}