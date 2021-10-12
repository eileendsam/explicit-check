const express = require("express");
const genius = require("genius-lyrics-api");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/:artist/:song", async (req, res) => {
  const artist = req.params.artist;
  const song = req.params.song;

  const options = {
    apiKey: "e8rDg_zptJ8nHGa3WLFtGC5IMtkPTgMPqTqwIppsL_wWZMb",
    title: song,
    artist: artist,
    optimizeQuery: true,
  };

  const lyrics = await genius.getLyrics(options).then((lyrics) => lyrics);

  if (lyrics) {
    res.json({ data: lyrics });
  } else {
    res.json({ data: "" });
  }
});

app.listen(PORT, () => console.log("listening on " + PORT));
