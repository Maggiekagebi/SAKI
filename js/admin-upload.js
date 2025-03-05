// 等待DOM完全加載後再執行
document.addEventListener('DOMContentLoaded', function() {
    // 創建Vue應用
    const app = Vue.createApp({
        // 數據 - 存儲應用中使用的所有變量
        data() {
            return {
                // 當前頁面
                currentPage: 'admin',
                
                // 導航菜單是否打開
                menuOpen: false,
                
                // 管理者認證
                isAuthenticated: false,
                adminPassword: '',
                
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
                
                // 新作品資料
                newProject: {
                    title: '',
                    category: '',
                    description: '',
                    imageFile: null,
                    image: ''
                },
                
                // 作品集
                projects: [
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
                        description: '為攝影師設計的個人網站，專注於作品展示和極簡使用體驗。網站採用響應式設計，在各種設備上都能完美顯示。',
                        image: 'https://via.placeholder.com/600x400'
                    },
                    {
                        id: 3,
                        title: '自然主題插畫',
                        category: '插畫',
                        description: '一系列以自然為主題的插畫作品，採用溫暖的色調和細緻的筆觸，展現大自然的美麗與和諧。',
                        image: 'https://via.placeholder.com/600x400'
                    }
                ],
                
                // 正在編輯的項目
                editingProject: null
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
            
            // 管理者認證
            authenticate() {
                // 在實際應用中，應該使用安全的身份驗證方法，如API呼叫
                // 這裡使用簡單的密碼檢查僅作為演示
                if (this.adminPassword === 'admin123') {
                    this.isAuthenticated = true;
                    
                    // 從本地存儲或API加載作品數據
                    this.loadProjects();
                } else {
                    alert('密碼不正確，請重試。');
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
                    }
                }
            },
            
            // 保存作品數據到本地存儲
            saveProjects() {
                try {
                    localStorage.setItem('portfolioProjects', JSON.stringify(this.projects));
                } catch (e) {
                    console.error('無法保存作品數據', e);
                }
            },
            
            // 處理文件上傳
            handleFileUpload(event) {
                const file = event.target.files[0];
                if (file) {
                    this.newProject.imageFile = file;
                    
                    // 創建本地預覽URL
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.newProject.image = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            },
            
            // 上傳新作品
            uploadProject() {
                // 驗證表單
                if (!this.newProject.title || !this.newProject.category || !this.newProject.description || !this.newProject.image) {
                    alert('請填寫所有必填欄位並上傳圖片');
                    return;
                }
                
                if (this.editingProject) {
                    // 更新現有作品
                    const index = this.projects.findIndex(p => p.id === this.editingProject.id);
                    if (index !== -1) {
                        this.projects[index] = {
                            id: this.editingProject.id,
                            title: this.newProject.title,
                            category: this.newProject.category,
                            description: this.newProject.description,
                            image: this.newProject.image
                        };
                        
                        alert('作品更新成功！');
                    }
                    
                    this.editingProject = null;
                } else {
                    // 添加新作品
                    const newId = this.projects.length > 0 ? Math.max(...this.projects.map(p => p.id)) + 1 : 1;
                    
                    this.projects.unshift({
                        id: newId,
                        title: this.newProject.title,
                        category: this.newProject.category,
                        description: this.newProject.description,
                        image: this.newProject.image
                    });
                    
                    alert('作品上傳成功！');
                }
                
                // 保存到本地存儲
                this.saveProjects();
                
                // 重置表單
                this.newProject = {
                    title: '',
                    category: '',
                    description: '',
                    imageFile: null,
                    image: ''
                };
                
                // 重置文件輸入框
                document.getElementById('project-image').value = '';
            },
            
            // 編輯作品
            editProject(project) {
                this.editingProject = project;
                
                // 填充表單
                this.newProject = {
                    title: project.title,
                    category: project.category,
                    description: project.description,
                    imageFile: null,
                    image: project.image
                };
                
                // 滾動到表單
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            },
            
            // 刪除作品
            deleteProject(id) {
                if (confirm('確定要刪除這個作品嗎？此操作無法撤銷。')) {
                    this.projects = this.projects.filter(project => project.id !== id);
                    
                    // 保存到本地存儲
                    this.saveProjects();
                    
                    alert('作品已刪除');
                }
            }
        },
        
        // 生命週期鉤子
        mounted() {
            // 初始化時查看URL中是否有認證參數
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('auth') === 'true') {
                this.adminPassword = 'admin123';
                this.authenticate();
            }
        }
    });
    
    // 將Vue應用掛載到id為app的元素上
    app.mount('#app');
});
