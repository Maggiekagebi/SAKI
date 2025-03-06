// 等待DOM完全加載後再執行
document.addEventListener('DOMContentLoaded', function() {
    // 創建Vue應用
    const app = Vue.createApp({
        // 數據 - 存儲應用中使用的所有變量
        data() {
            return {
                // 當前頁面
                currentPage: 'blog',
                
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
                
                // 部落格分類
                blogCategories: [
                    {
                        id: 'food',
                        title: '美食',
                        icon: 'fas fa-utensils',
                        description: '分享美食探索、料理心得和餐廳推薦，記錄味蕾的感動與驚喜。',
                        link: 'blog-food.html',
                        color: '#ff8fab'
                    },
                    {
                        id: 'travel',
                        title: '旅遊',
                        icon: 'fas fa-plane',
                        description: '記錄旅行見聞、景點推薦和旅行小技巧，帶您探索世界各地的美景。',
                        link: 'blog-travel.html',
                        color: '#a2d2ff'
                    },
                    {
                        id: 'notes',
                        title: '學習筆記',
                        icon: 'fas fa-book',
                        description: '整理設計、技術和個人成長相關的學習心得與知識分享。',
                        link: 'blog-notes.html',
                        color: '#ade8f4'
                    }
                ],
                
                // 最新文章
                latestPosts: [
                    {
                        id: 1,
                        title: '台北五家必訪的隱藏版甜點店',
                        excerpt: '探索台北巷弄間的甜蜜秘境，這些隱藏版甜點店提供的不只是美味，更是一場視覺與味覺的藝術饗宴...',
                        image: 'https://via.placeholder.com/600x400',
                        date: '2023-05-15',
                        readTime: '5 分鐘',
                        category: '美食',
                        link: '#'
                    },
                    {
                        id: 2,
                        title: '宜蘭三日小旅行：自然與人文的完美結合',
                        excerpt: '宜蘭不只有傳統景點，更有許多值得探索的人文風景和自然美景。從海岸線到山林，從古老街道到現代藝術空間...',
                        image: 'https://via.placeholder.com/600x400',
                        date: '2023-04-28',
                        readTime: '8 分鐘',
                        category: '旅遊',
                        link: '#'
                    },
                    {
                        id: 3,
                        title: 'UI設計入門：色彩理論與實際應用',
                        excerpt: '了解色彩理論如何影響用戶體驗，以及如何在UI設計中運用色彩創造和諧的視覺效果。本文將深入淺出地解析...',
                        image: 'https://via.placeholder.com/600x400',
                        date: '2023-03-20',
                        readTime: '10 分鐘',
                        category: '學習筆記',
                        link: '#'
                    }
                ]
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
            
            // 獲取分類顏色
            getCategoryColor(categoryName) {
                const category = this.blogCategories.find(cat => cat.title === categoryName);
                return category ? category.color : '#ff8fab';
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