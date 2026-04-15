const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("OK");
});

app.get("/drive-image/:fileId", async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const url = `https://drive.google.com/uc?export=view&id=${fileId}`;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).send("画像を取得できませんでした");
    }

    const contentType = response.headers.get("content-type") || "image/png";
    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", contentType);
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error(error);
    res.status(500).send("サーバーエラー");
  }
});

app.listen(PORT, () => {
  console.log("サーバー起動 http://localhost:" + PORT);
});