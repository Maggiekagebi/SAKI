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
								text: "👗 素人穿搭",
								link: "blog.html?category=素人穿搭",
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
				currentImageIndex: 0,
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

			// 載入作品數據 (改為讀取自動生成的資料庫)
			loadProjects() {
				if (typeof globalHuhData !== "undefined") {
					this.projects = JSON.parse(JSON.stringify(globalHuhData));
				} else {
					this.projects = [];
				}
			},

			// 過濾作品
			filterProjects(category) {
				this.activeFilter = category;
			},

			// 修改原本的打開彈窗方法
			viewProjectDetails(project) {
				this.selectedProject = project;
				this.currentImageIndex = 0; // 👈 每次打開彈窗，都重置回第 1 張
				this.showModal = true;
			},

			// 👈 新增：下一張
			nextImage() {
				if (this.selectedProject.images && this.selectedProject.images.length > 0) {
					// 如果已經是最後一張，就回到第一張；否則就 +1
					if (this.currentImageIndex < this.selectedProject.images.length - 1) {
						this.currentImageIndex++;
					} else {
						this.currentImageIndex = 0;
					}
				}
			},

			// 👈 新增：上一張
			prevImage() {
				if (this.selectedProject.images && this.selectedProject.images.length > 0) {
					// 如果是第一張，就跳到最後一張；否則就 -1
					if (this.currentImageIndex > 0) {
						this.currentImageIndex--;
					} else {
						this.currentImageIndex = this.selectedProject.images.length - 1;
					}
				}
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
