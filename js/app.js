// 等待DOM完全加載後再執行
document.addEventListener("DOMContentLoaded", function () {
	// 創建Vue應用
	const app = Vue.createApp({
		// 數據 - 存儲應用中使用的所有變量
		data() {
			return {
				// 當前頁面
				currentPage: "about", // 根據實際頁面修改

				// 導航菜單是否打開
				menuOpen: false,

				// 當前活動的下拉選單
				activeDropdown: null,

				// 控制下拉選單的顯示狀態
				dropdownVisible: false,

				// 簡化後的導覽列項目（已移除多餘的 'blog-all' 最新文章）
				navItems: [
					{ id: "about", text: "關於我", link: "index.html" },
					{
						id: "blog",
						text: "文章分類",
						link: "blog.html",
						dropdown: true,
						dropdownItems: [
							{ id: "food", text: "🍳 美食小記", link: "blog.html?category=美食" },
							{ id: "travel", text: "✈️ 旅遊手札", link: "blog.html?category=旅遊" },
							{
								id: "notes",
								text: "💻 學習筆記",
								link: "blog.html?category=學習筆記",
							},
							{
								id: "outfit",
								text: "👗 時尚穿搭",
								link: "blog.html?category=時尚穿搭",
							},
							{
								id: "share",
								text: "☕️ 日常分享",
								link: "blog.html?category=日常分享",
							},
						],
					},
					{ id: "portfolio", text: "創作與剪影", link: "portfolio.html" },
				],

				// 個人資料
				personalInfo: {
					name: "咲 (SAKI)",
					greeting: "哈囉！",
					photo: "images/myphoto.jpg",
					bio: `我是一位努力精進自己的前端開發者，同時也是熱愛生活、攝影與手繪創作的記錄者。<br>在技術方面，擅長 HTML、CSS、Bootstrap 與 Vue.js；在生活方面，喜歡到處尋覓隱藏版美食、分享實穿 OOTD 與旅行故事。<br><br>
                    
                    這個網站不僅是我的技術履歷，更是我探索世界、沉澱思考的隨身筆記。期待在這裡與你分享生活中的點滴靈感與美好！`,

					// 升級：結合關鍵技術、學習、美食、穿搭、插畫等 SEO 關鍵字
					interests: [
						"前端開發",
						"Vue.js",
						"HTML/CSS",
						"響應式網頁",
						"美食探店",
						"旅遊日誌",
						"日常 OOTD",
						"穿搭分享",
						"數位插畫",
						"手繪速寫",
						"生活美學",
						"攝影記錄",
					],
				},

				// 1. 首頁快速分類通道資料（更改 link 參數指向 blog.html）
				quickCategories: [
					{
						id: "food",
						title: "美食小記",
						desc: "美味食記與探店",
						icon: "fas fa-utensils",
						link: "blog.html?category=美食",
						color: "#ff8fab",
					},
					{
						id: "travel",
						title: "旅遊手札",
						desc: "景點與旅行祕技",
						icon: "fas fa-plane",
						link: "blog.html?category=旅遊",
						color: "#a2d2ff",
					},
					{
						id: "notes",
						title: "學習筆記",
						desc: "知識與自我提升",
						icon: "fas fa-book",
						link: "blog.html?category=學習筆記",
						color: "#ade8f4",
					},
					{
						id: "outfit",
						title: "時尚穿搭",
						desc: "日常 OOTD 與穿搭",
						icon: "fas fa-tshirt",
						link: "blog.html?category=時尚穿搭",
						color: "#cdb4db",
					},
					{
						id: "share",
						title: "日常分享",
						desc: "生活雜感與心情",
						icon: "fas fa-coffee",
						link: "blog.html?category=日常分享",
						color: "#fcf6bd",
					},
				],

				// 2. 首頁最新三篇文章（更改 link 指向 blog.html 並帶上對應的 ID）
				latestPosts: [
					{
						id: 1,
						title: "台北五家必訪的隱藏版甜點店",
						excerpt:
							"探索台北巷弄間的甜蜜秘境，這些隱藏版甜點店提供的不只是美味，更是一場視覺與味覺的藝術饗宴...",
						image: "https://via.placeholder.com/600x400",
						date: "2026-05-15",
						readTime: "5 分鐘",
						category: "美食",
						link: "blog.html?id=1",
					},
					{
						id: 2,
						title: "宜蘭三日小旅行：自然與人文的完美結合",
						excerpt:
							"宜蘭不只有傳統景點，更有許多值得探索的人文風景和自然美景。從海岸線到山林...",
						image: "https://via.placeholder.com/600x400",
						date: "2026-04-28",
						readTime: "8 分鐘",
						category: "旅遊",
						link: "blog.html?id=2",
					},
					{
						id: 3,
						title: "早秋微涼：一週換季質感平價穿搭分享",
						excerpt:
							"轉眼又到了秋天，整理了五套適合約會與上班的日常早秋穿搭，運用平價單品搭出層次感...",
						image: "https://via.placeholder.com/600x400",
						date: "2026-04-10",
						readTime: "6 分鐘",
						category: "時尚穿搭",
						link: "blog.html?id=3",
					},
				],

				// 社交媒體連結
				socialLinks: [
					{ name: "Instagram", url: "#", icon: "fab fa-instagram" },
					{ name: "github", url: "#", icon: "fab fa fa-github" },
					{
						name: "HackMD",
						url: "https://hackmd.io/@Maggie-Hsieh",
						icon: "fa fa-book",
					},
				],
			};
		},

		// 方法 - 包含所有可調用的函數
		methods: {
			// 切換頁面的函數
			changePage(pageId) {
				this.currentPage = pageId;
			},

			// 為標籤添加隨機的粉色系顏色
			applyTagColors() {
				setTimeout(() => {
					const tags = document.querySelectorAll(".tag");
					const pinkHues = [
						"#ffc8dd",
						"#ffafcc",
						"#ff9ebb",
						"#ff8fab",
						"#ffc2d1",
						"#ffd1dc",
						"#ffb3c6",
						"#ffb6c1",
					];

					tags.forEach((tag) => {
						const randomPink = pinkHues[Math.floor(Math.random() * pinkHues.length)];
						tag.style.backgroundColor = randomPink;
					});
				}, 100);
			},

			// 新增：根據分類返回糖果色標籤顏色
			getCategoryColor(categoryName) {
				const colorMap = {
					美食: "#ff8fab",
					旅遊: "#a2d2ff",
					學習筆記: "#ade8f4",
					穿搭: "#cdb4db",
					日常分享: "#fcf6bd",
				};
				return colorMap[categoryName] || "#ff8fab";
			},

			// 切換菜單顯示/隱藏
			toggleMenu() {
				this.menuOpen = !this.menuOpen;

				// 當菜單打開時，禁止背景滾動
				if (this.menuOpen) {
					document.body.style.overflow = "hidden";
				} else {
					document.body.style.overflow = "";
					// 關閉所有下拉菜單
					this.activeDropdown = null;
					this.dropdownVisible = false;
				}
			},

			// 關閉菜單
			closeMenu() {
				this.menuOpen = false;
				document.body.style.overflow = "";
				// 關閉所有下拉菜單
				this.activeDropdown = null;
				this.dropdownVisible = false;
			},

			// 切換下拉選單
			toggleDropdown(event, itemId) {
				// 找到相應的導航項
				const navItem = this.navItems.find((item) => item.id === itemId);

				// 檢查是否點擊的是下拉圖標
				const isDropdownIcon =
					event.target.classList.contains("dropdown-icon") ||
					event.target.parentElement.classList.contains("dropdown-icon");

				// 僅在點擊下拉圖標時才阻止默認行為
				if (isDropdownIcon) {
					event.preventDefault();

					// 如果是同一個選單，則切換顯示/隱藏
					if (this.activeDropdown === itemId) {
						this.activeDropdown = null;
						this.dropdownVisible = false;
					} else {
						this.activeDropdown = itemId;
						this.dropdownVisible = true;
					}
				} else {
					// 如果不是點擊下拉圖標，則正常導航到頁面
					if (navItem && navItem.link) {
						window.location.href = navItem.link;
					}
				}
			},

			// 處理點擊文檔關閉下拉選單
			handleClickOutside(event) {
				const dropdownContainer = document.querySelector(".has-dropdown");
				if (
					dropdownContainer &&
					!dropdownContainer.contains(event.target) &&
					this.activeDropdown
				) {
					this.activeDropdown = null;
					this.dropdownVisible = false;
				}
			},
		},

		// 在Vue應用掛載完成後執行
		mounted() {
			// 添加頁面載入動畫
			document.body.classList.add("loaded");

			// 為標籤添加隨機色調變化（但保持在粉色系列）
			this.applyTagColors();

			// 添加點擊文檔關閉下拉選單的事件監聽器
			document.addEventListener("click", this.handleClickOutside);
		},

		beforeUnmount() {
			// 移除事件監聽器
			document.removeEventListener("click", this.handleClickOutside);
		},
	});

	// 將Vue應用掛載到id為app的元素上
	app.mount("#app");

	// 添加滾動時的動畫效果
	window.addEventListener("scroll", () => {
		const bioCard = document.querySelector(".bio-card");
		const scrollPosition = window.scrollY;

		if (scrollPosition > 100) {
			bioCard.classList.add("scrolled");
		} else {
			bioCard.classList.remove("scrolled");
		}
	});
});
