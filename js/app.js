// 等待DOM完全加載後再執行
document.addEventListener('DOMContentLoaded', function() {
    // 創建Vue應用
    const app = Vue.createApp({
        // 修改 data 函數，添加下拉式選單相關數據
data() {
    return {
        // 當前頁面
        currentPage: 'home', // 根據實際頁面修改
        
        // 導航菜單是否打開
        menuOpen: false,
        
        // 當前活動的下拉選單
        activeDropdown: null,
        
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
                
                // 個人資料
                personalInfo: {
                    name: '咲 (SAKI)',
                    greeting: '哈囉！',
                    photo: 'images/myphoto.jpg', // 您可以替換為您的照片
                    bio: `我是一位努力精進自己的前端開發者，專注於打造兼具美觀與實用性的網站體驗。<br>在技術方面，我使用HTML、CSS和Bootstrap等前端技術，擅用Vue.js增強網站互動性。<br><br>
                    
                    閒暇時光，我喜歡追劇放鬆自己，特別鍾愛動漫，沉浸在精彩的故事情節中。<br>同時，我也意識到自己在程式語言方面還有進步空間，因此會利用空閒時間自學，不斷精進技術能力，讓自己在網頁開發領域更加專業。<br><br>

                    我相信優秀的數位產品不僅需要紮實的技術基礎，更需要對使用者需求的深刻理解，這也是我持續努力的方向。`,
                    
                    interests: ['前端工程師', 'HTML','CSS','Bootstrap','RWD','Vue.js','攝影愛好','旅行探索', '咖啡文化', '漫畫動漫', '瑜珈冥想','時尚穿搭']
                },
                
                // 社交媒體連結
                socialLinks: [
                    { name: 'Instagram', url: '#', icon: 'fab fa-instagram' },
                    { name: 'github', url: '#', icon: 'fab fa fa-github' },
                    { name: 'HackMD', url: 'https://hackmd.io/@Maggie-Hsieh', icon: 'fa fa-book' },
                ]
            }
        },
        
        // 方法 - 包含所有可調用的函數
        methods: {
            // 切換頁面的函數
            changePage(pageId) {
                this.currentPage = pageId;
            }
        },
        
        // 在Vue應用掛載完成後執行
        mounted() {
            // 添加頁面載入動畫
            document.body.classList.add('loaded');
            
            // 為標籤添加隨機色調變化（但保持在粉色系列）
            this.applyTagColors();
        },
        
        // 方法
        methods: {
            // 為標籤添加隨機的粉色系顏色
            applyTagColors() {
                setTimeout(() => {
                    const tags = document.querySelectorAll('.tag');
                    const pinkHues = [
                        '#ffc8dd', '#ffafcc', '#ff9ebb', '#ff8fab', 
                        '#ffc2d1', '#ffd1dc', '#ffb3c6', '#ffb6c1'
                    ];
                    
                    tags.forEach(tag => {
                        const randomPink = pinkHues[Math.floor(Math.random() * pinkHues.length)];
                        tag.style.backgroundColor = randomPink;
                    });
                }, 100);
            },
            
// 修改或添加方法
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
        // 阻止導航到錨點
        event.preventDefault();
        
        // 在移動設備上
        if (window.innerWidth < 768) {
            // 如果點擊的是當前打開的下拉菜單，則關閉它
            this.activeDropdown = this.activeDropdown === itemId ? null : itemId;
        } else {
            // 在桌面設備上，點擊導航到博客主頁
            window.location.href = this.navItems.find(item => item.id === itemId).link;
        }
    },
    
    // 處理點擊文檔關閉下拉選單
    handleClickOutside(event) {
        const dropdownContainer = document.querySelector('.has-dropdown');
        if (dropdownContainer && !dropdownContainer.contains(event.target) && this.activeDropdown) {
            this.activeDropdown = null;
        }
    }
},

// 添加生命週期鉤子
mounted() {
    // 添加點擊文檔關閉下拉選單的事件監聽器
    document.addEventListener('click', this.handleClickOutside);
},

beforeUnmount() {
    // 移除事件監聽器
    document.removeEventListener('click', this.handleClickOutside);
}
        }
    });
    
    // 將Vue應用掛載到id為app的元素上
    app.mount('#app');
    
    // 添加滾動時的動畫效果
    window.addEventListener('scroll', () => {
        const bioCard = document.querySelector('.bio-card');
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 100) {
            bioCard.classList.add('scrolled');
        } else {
            bioCard.classList.remove('scrolled');
        }
    });
});
