import GraphPageApi from "./api/GraphPageApi";

export interface Env {
	FB_PAGE_ACCESS_TOKEN: string,
	NODE_ENV:string
}

// define route

const routes = {
	album: "/album",
	albums: "/albums"
}

const allowedOrigins = [
	"https://oaeg.lk",
	"https://www.oaeg.lk"
]

const isOriginAllowed = (origin: string) => {
	return allowedOrigins.some(o => origin === o);
}

async function handleRequest(request: Request, env:Env,){

	const PAGE_ID = "1431417997070793";
	const graph = new GraphPageApi(
		env.FB_PAGE_ACCESS_TOKEN,
		"v17.0",
		PAGE_ID);

		let res = "";
		const requestUrl = new URL(request.url);

		switch (requestUrl.pathname) {
			case routes.album:
				const albumId = requestUrl.searchParams.get("id");
				
				if (albumId == null || albumId === "")
					throw new Error("Album ID is required");

				res = await graph.getSingleAlbum(albumId);
				break;
			case routes.albums:
				res = await graph.getAlbums();
				break;
			default:
				// 404
				throw new Error("Not Found");
		}

		return res;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {

		// get access request origin and check if it is allowed by checking ends with
		const origin = request.headers.get("Origin");

		if (origin && !isOriginAllowed(origin)) {
			return new Response("Not Allowed", {
				status: 403
			});
		}

		let res = "";
		try{
			res = await handleRequest(request, env);
		}
		catch(e){
			return new Response((e as Error).message, {
				status: 500
			});
		}

		return new Response(res, {
			headers: {
				"content-type": "application/json;charset=UTF-8",
				"Access-Control-Allow-Origin": env.NODE_ENV == "production" ?  origin! : "*"
			}
		});
	},
};
