import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getDynamicPageURL } from "@agility/nextjs/node"
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

	// console.log("🔍 Cookies on SSR Request:", request.cookies.getAll());

	const token = await getToken({ req:request, secret: process.env.NEXTAUTH_SECRET });
	const protectedRoutes = ["/members"];

	if (protectedRoutes.includes(request.nextUrl.pathname)) {
	  // If no token, redirect to sign-in
	  if (!token) {
		const url = new URL("/signin", request.url);
		url.searchParams.set("callbackUrl", request.nextUrl.pathname); // Store where to redirect after login
		return NextResponse.redirect(url);
	  }
	}
  


	/*****************************
	 * *** AGILITY MIDDLEWARE ***
	 * 1: Check if this is a preview request,
	 * 2: Check if we are exiting preview
	 * 3: Check if this is a direct to a dynamic page
	 *    based on a content id
	 *******************************/

	const previewQ = request.nextUrl.searchParams.get("AgilityPreview")
	let contentIDStr = request.nextUrl.searchParams.get("ContentID") as string || ""

	if (request.nextUrl.searchParams.has("agilitypreviewkey")) {
		//*** this is a preview request ***
		const agilityPreviewKey = request.nextUrl.searchParams.get("agilitypreviewkey") || ""
		//locale is also passed in the querystring on preview requests
		const locale = request.nextUrl.searchParams.get("lang")
		const slug = request.nextUrl.pathname
		//valid preview key: we need to redirect to the correct url for preview
		let redirectUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}/api/preview?locale=${locale}&ContentID=${contentIDStr}&slug=${encodeURIComponent(slug)}&agilitypreviewkey=${encodeURIComponent(agilityPreviewKey)}`
		return NextResponse.rewrite(redirectUrl)

	} else if (previewQ === "0") {
		//*** exit preview
		const locale = request.nextUrl.searchParams.get("lang")

		//we need to redirect to the correct url for preview
		const slug = request.nextUrl.pathname
		let redirectUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}/api/preview/exit?locale=${locale}&ContentID=${contentIDStr}&slug=${encodeURIComponent(slug)}`

		return NextResponse.redirect(redirectUrl)
	} else if (contentIDStr) {
		const contentID = parseInt(contentIDStr)
		if (!isNaN(contentID) && contentID > 0) {
			//*** this is a dynamic page request ***

			let dynredirectUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}/api/dynamic-redirect?ContentID=${contentID}`
			return NextResponse.rewrite(dynredirectUrl)

		}
	}
}



export const config = {

	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico|).*)',
	],
}