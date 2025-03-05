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
                
                // 個人資料
                personalInfo: {
                    name: '您的名字',
                    logoText: 'Saki'
                },
                
                // 導航項目
                navItems: [
                    { id: 'about', text: '關於我', link: 'index.html' },
                    { id: 'portfolio', text: '作品集', link: 'portfolio.html' },
                    { id: 'blog', text: '部落格', link: '#' },
                    { id: 'contact', text: '聯絡我', link: 'contact.html' }
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
                }
            },
            
            // 關閉菜單
            closeMenu() {
                this.menuOpen = false;
                document.body.style.overflow = '';
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
                        title: '品牌識別設計',
                        category: '品牌設計',
                        description: '為本地咖啡店設計的完整品牌識別，包括標誌、包裝和宣傳材料。注重簡約風格與實用性，同時保持品牌的獨特性和識別度。',
                        image: 'https://via.placeholder.com/600x400'
                    },
                    {
                        id: 2,
                        title: '個人網站設計',
                        category: '網頁設計',
                        description: '自己設計個人網站，作品展示和分享美食、旅遊、學習筆記。網站採用響應式設計，在各種設備上都能完美顯示。\n使用技能:HTML、CSS、RWD、Vue.js',
                        image: 'https://via.placeholder.com/600x400'
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
            }
        },
        
        // 生命週期鉤子
        mounted() {
            // 在頁面載入時，加載作品數據
            this.loadProjects();
        }
    });
    
    // 將Vue應用掛載到id為app的元素上
    app.mount('#app');
});