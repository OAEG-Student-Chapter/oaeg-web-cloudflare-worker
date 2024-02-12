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


export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const graph = new GraphPageApi(
			env.FB_PAGE_ACCESS_TOKEN,
			"v17.0",
			"1431417997070793");

		const requestUrl = new URL(request.url);

		let res = "";

		switch (requestUrl.pathname) {
			case routes.album:
				const albumId = requestUrl.searchParams.get("id");
				
				if (albumId == null || albumId === "")
					return new Response("Not Found", {
						status: 404
					});

				res = await graph.getSingleAlbum(albumId);
				break;
			case routes.albums:
				res = await graph.getAlbums();
				break;
			default:
				// 404
				return new Response("Not Found", {
					status: 404
				});

		}

		return new Response(res, {
			headers: {
				"content-type": "application/json;charset=UTF-8",
				"Access-Control-Allow-Origin": env.NODE_ENV == "production" ?  "*.oaeg.lk, oaeg.lk" : "*"
			},
		});
	},
};
