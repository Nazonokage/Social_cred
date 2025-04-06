// src/translations/translation.jsx
export const translations = {
    en: {
      
      home: {
        title: "Social Credit Monitoring",
        description: "This system manages citizen credit scores and debt records. Register an account to get started.",
        registerBtn: "Register Now",
        loginBtn: "Login"
      },
      register: {
        title: "User Registration",
        name: "Name",
        email: "Email",
        password: "Password",
        address: "Address",
        submit: "Register",
        existingAccount: "Already have an account?",
        login: "Login",
        error: "Registration failed"
      },

      nav: {
        profile: 'Profile',
        logout: 'Logout'
      },
      login: {
        invalidCredentials: 'Invalid email or password',
        title: "User Login",
        email: "Email",
        password: "Password",
        submit: "Login",
        noAccount: "Don't have an account?",
        register: "Register",
        error: "Login failed"
      },
      dashboard: {
        // In both 'en' and 'cn' sections under dashboard:
        recordDeleted: 'Record Deleted Successfully!', 
        confirmDelete: 'Confirm Deletion', 
        title: "Social Credit Records",
        addRecords: "Add Records",
        totalRecords: "Total Records",
        totalAmount: "Total Amount",
        unpaidRecords: "Unpaid Records",
        addNewRecord: "Add New Record",
        description: "Description",
        amount: "Amount",
        date: "Date",
        dueDate: "Due Date",
        status: "Status",
        cancel: "Cancel",
        recordAdded: "Record Added Successfully!",
        continue: "Continue",
        loadingRecords: "Loading Records..."
      },
        profile: {
        title: 'User Profile',
        name: 'Name',
        email: 'Email',
        address: 'Address',
        update: 'Update Profile',
        creditScore: 'Credit Score',
        updateSuccess: 'Profile updated successfully',
        updateError: 'Update failed'
      },
      common: {
        loading: 'Loading...'
      }

      

      
    },
    cn: {
      home: {
        title: "社会信用监测",
        description: "本系统用于管理公民信用评分和债务记录。注册账户以开始使用。",
        registerBtn: "立即注册",
        loginBtn: "登录"
      },
      register: {
        title: "用户注册",
        name: "姓名",
        email: "邮箱",
        password: "密码",
        address: "地址",
        submit: "注册",
        existingAccount: "已有账户?",
        login: "登录",
        error: "注册失败"
      },
      
      nav: {
        profile: '个人资料',
        logout: '登出'
      },
      login: {
        // ... add ...
        invalidCredentials: '邮箱或密码错误',
        title: "用户登录",
        email: "邮箱",
        password: "密码",
        submit: "登录",
        noAccount: "没有账户?",
        register: "注册",
        error: "登录失败"
      },
      dashboard: {
        recordDeleted: '记录删除成功!', 
        confirmDelete: '确认删除',
        title: "社会信用记录",
        addRecords: "添加记录",
        totalRecords: "总记录数",
        totalAmount: "总金额",
        unpaidRecords: "未支付记录",
        addNewRecord: "添加新记录",
        description: "描述",
        amount: "金额",
        date: "日期",
        dueDate: "到期日",
        status: "状态",
        cancel: "取消",
        recordAdded: "记录添加成功!",
        continue: "继续",
        loadingRecords: "正在加载记录..."
      },
      profile: {
        title: '用户资料',
        name: '姓名',
        email: '邮箱',
        address: '地址',
        update: '更新资料',
        creditScore: '信用分数',
        updateSuccess: '资料更新成功',
        updateError: '更新失败'
      },
      common: {
        loading: '加载中...'
      }
    }
  };




// // src/contexts/TranslationContext.jsx
// import { createContext, useState, useContext } from 'react';

// const TranslationContext = createContext();

// export function TranslationProvider({ children }) {
//   const [language, setLanguage] = useState('cn');
  
//   return (
//     <TranslationContext.Provider value={{ language, setLanguage }}>
//       {children}
//     </TranslationContext.Provider>
//   );
// }

// export function useTranslation() {
//   const { language } = useContext(TranslationContext);
//   return (key) => translations[language][key] || key;
// }

// export function useLanguageSwitcher() {
//   const { setLanguage } = useContext(TranslationContext);
//   return (lang) => setLanguage(lang);
// }