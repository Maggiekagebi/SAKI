// 等待DOM完全加載後再執行
document.addEventListener('DOMContentLoaded', function() {
    // 創建Vue應用
    const app = Vue.createApp({
        // 數據 - 存儲應用中使用的所有變量
        data() {
            return {
                // 當前頁面
                currentPage: 'portfolio',
                
                // 導航菜單是否打開
                menuOpen: false,

                // 當前活動的下拉選單
                activeDropdown: null,

                // 個人資料
                personalInfo: {
                    name: '咲 (SAKI)',
                    logoText: 'Saki'
                },
                
                // 導航項目
                navItems: [
                    { id: 'about', text: '關於我', link: 'index.html' },
                    { id: 'portfolio', text: '作品集', link: 'portfolio.html' },
                    { 
                        id: 'blog', 
                        text: '部落格', 
                        link: 'blog.html',
                        dropdown: true,
                        dropdownItems: [
                            { id: 'food', text: '美食', link: 'blog-food.html' },
                            { id: 'travel', text: '旅遊', link: 'blog-travel.html' },
                            { id: 'notes', text: '學習筆記', link: 'blog-notes.html' }
                        ]
                    },
                    // { id: 'contact', text: '聯絡我', link: 'contact.html' }
                ],
                
                // 作品集
                projects: [],
                
                // 當前過濾器
                activeFilter: 'all',
                
                // 模態窗口
                showModal: false,
                selectedProject: null
            }
        },
        
        // 計算屬性
        computed: {
            // 獲取所有唯一的作品分類
            uniqueCategories() {
                return [...new Set(this.projects.map(project => project.category))];
            },
            
            // 根據當前過濾器過濾作品
            filteredProjects() {
                if (this.activeFilter === 'all') {
                    return this.projects;
                } else {
                    return this.projects.filter(project => project.category === this.activeFilter);
                }
            }
        },
        
        // 方法
        methods: {
            // 切換菜單顯示/隱藏
            toggleMenu() {
                this.menuOpen = !this.menuOpen;
                
                // 當菜單打開時，禁止背景滾動
                if (this.menuOpen) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                    // 關閉所有下拉菜單
                    this.activeDropdown = null;
                }
            },
            
            // 關閉菜單
            closeMenu() {
                this.menuOpen = false;
                document.body.style.overflow = '';
                // 關閉所有下拉菜單
                this.activeDropdown = null;
            },
            
            // 切換下拉選單
            toggleDropdown(event, itemId) {
                // 找到相應的導航項
                const navItem = this.navItems.find(item => item.id === itemId);
                
                // 檢查是否點擊的是下拉圖標
                const isDropdownIcon = event.target.classList.contains('dropdown-icon') || 
                                      event.target.parentElement.classList.contains('dropdown-icon');
                
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
                // 嘗試從localStorage讀取作品數據
                const savedProjects = localStorage.getItem('portfolioProjects');
                if (savedProjects) {
                    try {
                        this.projects = JSON.parse(savedProjects);
                    } catch (e) {
                        console.error('無法解析已保存的作品數據', e);
                        // 如果無法讀取本地存儲，使用默認作品
                        this.useDefaultProjects();
                    }
                } else {
                    // 如果沒有本地存儲數據，使用默認作品
                    this.useDefaultProjects();
                }
            },
            
            // 使用默認作品數據
            useDefaultProjects() {
                this.projects = [
                    {
                        id: 1,
                        title: '蓮藕大王品牌網頁設計',
                        category: '品牌設計',
                        description: '為蓮藕大王設計。\n網頁主要功能：商品管理、會員管理、購物車功能。\n技術架構:Laravel、MVC框架。\n前端:HTML、CSS、Bootstrap、JQuery。\n後端:PHP、MySQL、JS。',
                        image: 'images/portfolio-images/lotusroot.svg'
                    },
                    {
                        id: 2,
                        title: '個人網站設計',
                        category: '網頁設計',
                        description: '自己設計個人網站，作品展示和分享美食、旅遊、學習筆記。\n網站採用響應式設計，在各種設備上都能完美顯示。\n使用技能:HTML、CSS、RWD、Vue.js',
                        image: 'images/Logo.svg'
                    },
                    {
                        id: 3,
                        title: '響應政府環保政策',
                        category: '插畫',
                        description: '為蓮藕大王品牌設計，響應政府環保政策公告圖',
                        image: 'images/portfolio-images/image1.png'
                    },
                    {
                        id: 4,
                        title: '菜單(餐車)',
                        category: '插畫',
                        description: '為蓮藕大王品牌設計，行動餐車使用的菜單',
                        image: 'images/portfolio-images/image2.png'
                    },
                    {
                        id: 5,
                        title: '2020年度春節公休通知',
                        category: '插畫',
                        description: '為蓮藕大王品牌設計，2020年度鼠鼠春節公休通知',
                        image: 'images/portfolio-images/image3.jpeg'
                    }
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
                document.body.style.overflow = 'hidden';
            },
            
            // 關閉模態窗口
            closeModal() {
                this.showModal = false;
                this.selectedProject = null;
                
                // 恢復背景滾動
                document.body.style.overflow = '';
            },
            
            // 處理點擊文檔關閉下拉選單
            handleClickOutside(event) {
                const dropdownContainer = document.querySelector('.has-dropdown');
                if (dropdownContainer && !dropdownContainer.contains(event.target) && this.activeDropdown) {
                    this.activeDropdown = null;
                }
            }
        },
        
        // 生命週期鉤子
        mounted() {
            // 在頁面載入時，加載作品數據
            this.loadProjects();
            
            // 添加點擊文檔關閉下拉選單的事件監聽器
            document.addEventListener('click', this.handleClickOutside);
        },
        
        beforeUnmount() {
            // 移除事件監聽器
            document.removeEventListener('click', this.handleClickOutside);
        }
    });
    
    // 將Vue應用掛載到id為app的元素上
    app.mount('#app');
});