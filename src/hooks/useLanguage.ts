
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'zh' | 'en';

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Simple translations
const translations: Record<Language, Record<string, string>> = {
  zh: {
    // Navbar
    'home': '首页',
    'features': '产品特点',
    'calculator': '碳足迹计算',
    'pricing': '服务价格',
    'contact': '联系我们',
    'login': '登录',
    'register': '注册',
    'dashboard': '个人中心',
    'logout': '退出登录',
    
    // Calculator
    'calculateFootprint': '计算碳足迹',
    'materialInfo': '材料信息',
    'energyConsumption': '能源消耗',
    'transportInfo': '运输信息',
    'results': '结果分析',
    'totalFootprint': '碳足迹总量',
    'reductionSuggestions': '减排建议',
    'buyReport': '购买完整报告',
    'getCustomPlan': '获取定制减排方案',
    
    // Auth
    'email': '邮箱',
    'password': '密码',
    'forgotPassword': '忘记密码',
    'noAccount': '还没有账号？',
    'alreadyHaveAccount': '已有账号？',
    'signUpSuccess': '注册成功',
    'loginSuccess': '登录成功',
    'logoutSuccess': '退出成功',
    'welcomeBack': '欢迎回来',
    'loginFailed': '登录失败',
    
    // Payment
    'chooseService': '选择适合您的服务方案',
    'serviceOptions': '我们提供多种LCA分析服务，满足您的不同需求',
    'selectService': '选择服务',
    'processing': '处理中...',
    'paymentSuccess': '支付成功！',
    'paymentCanceled': '支付已取消',
    'returnHome': '返回首页',
    'tryAgain': '重新选择方案'
  },
  en: {
    // Navbar
    'home': 'Home',
    'features': 'Features',
    'calculator': 'Carbon Calculator',
    'pricing': 'Pricing',
    'contact': 'Contact Us',
    'login': 'Login',
    'register': 'Register',
    'dashboard': 'Dashboard',
    'logout': 'Logout',
    
    // Calculator
    'calculateFootprint': 'Calculate Carbon Footprint',
    'materialInfo': 'Material Information',
    'energyConsumption': 'Energy Consumption',
    'transportInfo': 'Transport Information',
    'results': 'Results Analysis',
    'totalFootprint': 'Total Carbon Footprint',
    'reductionSuggestions': 'Reduction Suggestions',
    'buyReport': 'Buy Complete Report',
    'getCustomPlan': 'Get Custom Reduction Plan',
    
    // Auth
    'email': 'Email',
    'password': 'Password',
    'forgotPassword': 'Forgot Password',
    'noAccount': "Don't have an account?",
    'alreadyHaveAccount': 'Already have an account?',
    'signUpSuccess': 'Sign up successful',
    'loginSuccess': 'Login successful',
    'logoutSuccess': 'Logout successful',
    'welcomeBack': 'Welcome back',
    'loginFailed': 'Login failed',
    
    // Payment
    'chooseService': 'Choose a Service Plan',
    'serviceOptions': 'We offer various LCA analysis services to meet your needs',
    'selectService': 'Select Service',
    'processing': 'Processing...',
    'paymentSuccess': 'Payment Successful!',
    'paymentCanceled': 'Payment Canceled',
    'returnHome': 'Return Home',
    'tryAgain': 'Try Again'
  }
};

export const useLanguage = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: 'zh',
      setLanguage: (language) => set({ language }),
      t: (key) => {
        const { language } = get();
        return translations[language][key] || key;
      }
    }),
    {
      name: 'language-storage',
    }
  )
);
