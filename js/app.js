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
            { id: 'contact', text: '聯絡我', link: 'contact.html' }
        ],
                
                // 個人資料
                personalInfo: {
                    name: '咲 (SAKI)',
                    greeting: '哈囉！',
                    photo: 'images/myphoto.jpg', // 您可以替換為您的照片
                    bio: `我是一位充滿熱情的設計師與內容創作者，喜歡在旅行中尋找靈感，將生活中的美好轉化為創意作品。<br><br>
                    
                    擁有多年的設計經驗，專注於品牌識別、用戶體驗設計和視覺傳達。我相信優秀的設計不僅能解決問題，更能觸動人心，創造情感連結。<br><br>
                    
                    當我不在工作時，你可能會發現我在咖啡廳角落閱讀一本好書，或是在城市的小巷中尋找拍照的完美角度。我熱愛分享我的知識和經驗，希望能夠啟發更多人發現生活中的美好和可能性。`,
                    
                    interests: ['前端工程師', '攝影愛好','旅行探索', '咖啡文化', '漫畫動漫', '瑜珈冥想','時尚穿搭']
                },
                
                // 社交媒體連結
                socialLinks: [
                    { name: 'Instagram', url: '#', icon: 'fab fa-instagram' },
                    { name: 'github', url: '#', icon: 'fab fa fa-github' },
                    { name: 'HackMD', url: '#', icon: 'fa fa-book' },
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
