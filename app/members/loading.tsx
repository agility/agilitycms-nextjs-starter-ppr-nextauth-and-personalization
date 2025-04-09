import { CgSpinner } from "react-icons/cg"

export default function Loading() {
	<section className="relative px-8" >
		<div className="max-w-2xl mx-auto my-12 md:mt-18 lg:mt-20">
			<div
				className="my-6 max-w-full flex gap-1 items-center justify-center"
			>
				{/* BASIC LOADING SCREEN */}
				<CgSpinner className="animate-spin" />
				<p>Loading...</p>
			</div>
		</div>
	</section >
}