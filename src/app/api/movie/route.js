export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");
    const apiKey = process.env.OMDB_API_KEY; // Ensure this is set in .env.local
  
    if (!title) {
      return Response.json({ error: "Movie title is required" }, { status: 400 });
    }
  
    try {
      const response = await fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`);
      const data = await response.json();
  
      if (data.Response === "True") {
        return Response.json(data, { status: 200 });
      } else {
        return Response.json({ error: "Movie not found" }, { status: 404 });
      }
    } catch (error) {
      return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  