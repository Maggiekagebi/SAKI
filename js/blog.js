// 等待DOM完全加載後再執行
document.addEventListener("DOMContentLoaded", function () {
	// 創建Vue應用
	const app = Vue.createApp({
		// 數據 - 存儲應用中使用的所有變量
		data() {
			return {
				// 當前頁面
				currentPage: "blog",

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

				// 部落格分類
				blogCategories: [
					{
						id: "food",
						title: "美食",
						icon: "fas fa-utensils",
						description: "分享美食探索、料理心得和餐廳推薦，記錄味蕾的感動與驚喜。",
						link: "blog-food.html",
						color: "#ff8fab",
					},
					{
						id: "travel",
						title: "旅遊",
						icon: "fas fa-plane",
						description:
							"記錄旅行見聞、景點推薦和旅行小技巧，帶您探索世界各地的美景。",
						link: "blog-travel.html",
						color: "#a2d2ff",
					},
					{
						id: "notes",
						title: "學習筆記",
						icon: "fas fa-book",
						description: "整理設計、技術和個人成長相關的學習心得與知識分享。",
						link: "blog-notes.html",
						color: "#ade8f4",
					},
				],

				// 部落格讀取所有文章
				latestPosts: typeof globalPostsData !== "undefined" ? globalPostsData : [],

				// 當前選中的文章分類過濾器 (預設為 'all' 顯示全部)
				activeFilter: "all",
				// 當前選中要閱讀全文的文章
				selectedPost: null,
				showModal: false,
				currentImageIndex: 0,
			};
		},

		// 計算屬性
		computed: {
			// 根據當前過濾器篩選顯示的文章
			filteredPosts() {
				if (this.activeFilter === "all") {
					return this.latestPosts;
				} else {
					return this.latestPosts.filter(
						(post) => post.category === this.activeFilter,
					);
				}
			},
		},

		// 方法
		methods: {
			// 切換文章過濾分類
			filterPosts(category) {
				this.activeFilter = category;
			},

			// 閱讀全文 (彈窗呈現完整內容)
			readFullPost(post) {
				this.selectedPost = post;
				this.currentImageIndex = 0;
				this.showModal = true;
			},

			// 👈 新增：下一張
			nextImage() {
				if (this.selectedPost.images && this.selectedPost.images.length > 0) {
					if (this.currentImageIndex < this.selectedPost.images.length - 1) {
						this.currentImageIndex++;
					} else {
						this.currentImageIndex = 0;
					}
				}
			},

			// 👈 新增：上一張
			prevImage() {
				if (this.selectedPost.images && this.selectedPost.images.length > 0) {
					if (this.currentImageIndex > 0) {
						this.currentImageIndex--;
					} else {
						this.currentImageIndex = this.selectedPost.images.length - 1;
					}
				}
			},

			// 關閉閱讀全文彈窗
			closeModal() {
				this.showModal = false;
				this.selectedPost = null;
				document.body.style.overflow = "";
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

			// 獲取分類顏色
			getCategoryColor(categoryName) {
				const category = this.blogCategories.find(
					(cat) => cat.title === categoryName,
				);
				return category ? category.color : "#ff8fab";
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
			// 添加點擊文檔關閉下拉選單的事件監聽器
			document.addEventListener("click", this.handleClickOutside);

			// ================= 新增：讀取網址參數 =================
			const urlParams = new URLSearchParams(window.location.search);
			const categoryParam = urlParams.get("category");
			const idParam = urlParams.get("id");

			// 如果網址帶有 ?category=美食，自動篩選該分類
			if (categoryParam) {
				this.activeFilter = categoryParam;
			}

			// 如果網址帶有 ?id=1，自動找到對應文章並開啟全文
			if (idParam) {
				const targetPost = this.latestPosts.find(
					(post) => String(post.id) === String(idParam),
				);
				if (targetPost) {
					this.readFullPost(targetPost);
				}
			}
		},

		beforeUnmount() {
			// 移除事件監聽器
			document.removeEventListener("click", this.handleClickOutside);
		},
	});

	// 將Vue應用掛載到id為app的元素上
	app.mount("#app");
});
