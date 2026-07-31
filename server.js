const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process"); // 引入執行指令的工具

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// ✨ 新增功能：讓伺服器託管你資料夾裡的所有靜態檔案 (HTML/CSS/JS)
app.use(express.static(__dirname));

app.post("/api/posts", (req, res) => {
	const posts = req.body;
	const fileContent = `const globalPostsData = ${JSON.stringify(posts, null, 4)};`;
	const filePath = path.join(__dirname, "js", "posts-data.js");

	try {
		fs.writeFileSync(filePath, fileContent, "utf8");
		console.log("✅ 成功寫入 js/posts-data.js");
		res.json({ success: true, message: "檔案寫入成功" });
	} catch (err) {
		console.error("❌ 寫入檔案發生錯誤:", err);
		if (!res.headersSent) {
			res.status(500).json({ success: false, message: "檔案寫入失敗" });
		}
	}
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`=========================================`);
	console.log(`🚀 本地微型伺服器已啟動！`);
	console.log(`📡 監聽端點: http://localhost:${PORT}`);
	console.log(`💡 正在為您自動開啟管理後台...`);
	console.log(`=========================================`);

	// ✨ 新增功能：根據你的作業系統，自動在瀏覽器打開後台網頁
	const url = `http://localhost:${PORT}/admin-upload.html`;
	const startCommand = process.platform === "win32" ? "start" : "open"; // Windows 用 start，Mac 用 open

	exec(`${startCommand} ${url}`, (err) => {
		if (err) console.error("自動開啟瀏覽器失敗，請手動點擊上面的網址。");
	});
});
