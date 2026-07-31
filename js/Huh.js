// 等待DOM完全加載後再執行
document.addEventListener("DOMContentLoaded", function () {
	// 創建Vue應用
	const app = Vue.createApp({
		// 數據 - 存儲應用中使用的所有變量
		data() {
			return {
				// 當前頁面
				currentPage: "Huh?",

				// 導航菜單是否打開
				menuOpen: false,

				// 當前活動的下拉選單
				activeDropdown: null,

				// 個人資料
				personalInfo: {
					name: "咲 (SAKI)",
					logoText: "Saki",
				},

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
					{ id: "Huh", text: "Huh?", link: "Huh.html" },
				],

				// 作品集
				projects: [],

				// 當前過濾器
				activeFilter: "all",

				// 模態窗口
				showModal: false,
				selectedProject: null,
			};
		},

		// 計算屬性
		computed: {
			// 獲取所有唯一的作品分類
			uniqueCategories() {
				return [...new Set(this.projects.map((project) => project.category))];
			},

			// 根據當前過濾器過濾作品
			filteredProjects() {
				if (this.activeFilter === "all") {
					return this.projects;
				} else {
					return this.projects.filter(
						(project) => project.category === this.activeFilter,
					);
				}
			},
		},

		// 方法
		methods: {
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
				}
			},

			// 關閉菜單
			closeMenu() {
				this.menuOpen = false;
				document.body.style.overflow = "";
				// 關閉所有下拉菜單
				this.activeDropdown = null;
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
					} else {
						this.activeDropdown = itemId;
					}
				} else {
					// 如果不是點擊下拉圖標，則正常導航到頁面
					if (navItem && navItem.link) {
						window.location.href = navItem.link;
					}
				}
			},

			// 載入作品數據
			loadProjects() {
				const savedProjects = localStorage.getItem("HuhProjects");

				if (!savedProjects) {
					this.useDefaultProjects();
					return;
				}

				try {
					const parsed = JSON.parse(savedProjects);

					if (Array.isArray(parsed)) {
						this.projects = parsed;
					} else {
						this.useDefaultProjects();
					}
				} catch (e) {
					console.error("無法解析已保存的作品數據", e);
					this.useDefaultProjects();
				}
			},

			// 使用默認作品數據 (已為您補上穩定可用的圖片預覽網址，防禦缺圖跑版)
			useDefaultProjects() {
				this.projects = [
					{
						id: 1,
						title: "蓮藕大王品牌網頁設計",
						category: "Brand Design",
						description:
							"為蓮藕大王設計。\n網頁主要功能：商品管理、會員管理、購物車功能。\n技術架構:Laravel、MVC框架。\n前端:HTML、CSS、Bootstrap、JQuery。\n後端:PHP、MySQL、JS。",
						image: "images/Brand Design/lotusroot.svg",
					},
					{
						id: 2,
						title: "個人網站設計",
						category: "Logo Design",
						description:
							"自己設計個人網站，作品展示和分享美食、旅遊、學習筆記。\n網站採用響應式設計，在各種設備上都能完美顯示。\n使用技能:HTML、CSS、RWD、Vue.js",
						image: "images/Logo Design/Logo.svg",
					},
					{
						id: 3,
						title: "響應政府環保政策",
						category: "Portfolio",
						description: "為蓮藕大王品牌設計，響應政府環保政策公告圖",
						image: "images/portfolio-images/image1.png",
					},
					{
						id: 4,
						title: "菜單(餐車)",
						category: "Portfolio",
						description: "為蓮藕大王品牌設計，行動餐車使用的菜單",
						image: "images/portfolio-images/image2.png",
					},
					{
						id: 5,
						title: "2020年度春節公休通知",
						category: "Portfolio",
						description: "為蓮藕大王品牌設計，2020年度鼠鼠春節公休通知",
						image: "images/portfolio-images/image3.jpeg",
					},
					{
						id: 6,
						title: "速寫練習：植物與多肉盆栽",
						category: "Draw",
						description:
							"日常素描簿裡的鋼筆速寫，觀察不同多肉植物葉片堆疊的線條趣味。",
						image: "https://via.placeholder.com/600x400?text=Drawing+Sketch",
					},
					{
						id: 7,
						title: "週末美術館看展 OOTD",
						category: "OOTD",
						description:
							"以大地色系為主的西裝外套，搭配寬鬆垂墜長褲，適合悠閒逛美術館的簡約穿搭。",
						image: "https://via.placeholder.com/600x400?text=OOTD+Style",
					},
					{
						id: 8,
						title: "午後陽光與街角咖啡廳",
						category: "日常剪影",
						description:
							"漫步在台北巷弄中偶然發現的復古咖啡廳，光影灑落在木質桌椅上的溫暖瞬間。",
						image: "https://via.placeholder.com/600x400?text=Daily+Life",
					},
				];
			},

			// 過濾作品
			filterProjects(category) {
				this.activeFilter = category;
			},

			// 查看作品詳情
			viewProjectDetails(project) {
				this.selectedProject = project;
				this.showModal = true;

				// 禁止背景滾動
				document.body.style.overflow = "hidden";
			},

			// 關閉模態窗口
			closeModal() {
				this.showModal = false;
				this.selectedProject = null;

				// 恢復背景滾動
				document.body.style.overflow = "";
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
				}
			},
		},

		// 生命週期鉤子
		mounted() {
			// 在頁面載入時，加載作品數據
			this.loadProjects();

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
});
