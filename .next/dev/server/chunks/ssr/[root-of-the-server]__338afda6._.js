module.exports = [
"[project]/timezone/src/pages/PasswordGenerator.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actionButtons": "PasswordGenerator-module__wOeZsW__actionButtons",
  "active": "PasswordGenerator-module__wOeZsW__active",
  "cardSubtitle": "PasswordGenerator-module__wOeZsW__cardSubtitle",
  "checkboxLabel": "PasswordGenerator-module__wOeZsW__checkboxLabel",
  "checkmark": "PasswordGenerator-module__wOeZsW__checkmark",
  "clearBtn": "PasswordGenerator-module__wOeZsW__clearBtn",
  "controlGroup": "PasswordGenerator-module__wOeZsW__controlGroup",
  "controlsSection": "PasswordGenerator-module__wOeZsW__controlsSection",
  "copied": "PasswordGenerator-module__wOeZsW__copied",
  "copyBtn": "PasswordGenerator-module__wOeZsW__copyBtn",
  "errorText": "PasswordGenerator-module__wOeZsW__errorText",
  "formLabel": "PasswordGenerator-module__wOeZsW__formLabel",
  "generateBtn": "PasswordGenerator-module__wOeZsW__generateBtn",
  "generatorCard": "PasswordGenerator-module__wOeZsW__generatorCard",
  "generatorContainer": "PasswordGenerator-module__wOeZsW__generatorContainer",
  "inputGroup": "PasswordGenerator-module__wOeZsW__inputGroup",
  "lengthSlider": "PasswordGenerator-module__wOeZsW__lengthSlider",
  "lengthValues": "PasswordGenerator-module__wOeZsW__lengthValues",
  "mainCardsLayout": "PasswordGenerator-module__wOeZsW__mainCardsLayout",
  "outputContainer": "PasswordGenerator-module__wOeZsW__outputContainer",
  "outputRow": "PasswordGenerator-module__wOeZsW__outputRow",
  "overallStrength": "PasswordGenerator-module__wOeZsW__overallStrength",
  "pageHeader": "PasswordGenerator-module__wOeZsW__pageHeader",
  "pageSubtitle": "PasswordGenerator-module__wOeZsW__pageSubtitle",
  "pageTitle": "PasswordGenerator-module__wOeZsW__pageTitle",
  "passwordDisplay": "PasswordGenerator-module__wOeZsW__passwordDisplay",
  "passwordOutput": "PasswordGenerator-module__wOeZsW__passwordOutput",
  "sliderLabel": "PasswordGenerator-module__wOeZsW__sliderLabel",
  "strengthBar": "PasswordGenerator-module__wOeZsW__strengthBar",
  "strengthBarContainer": "PasswordGenerator-module__wOeZsW__strengthBarContainer",
  "strengthHeader": "PasswordGenerator-module__wOeZsW__strengthHeader",
  "strengthIndicator": "PasswordGenerator-module__wOeZsW__strengthIndicator",
  "strengthLabel": "PasswordGenerator-module__wOeZsW__strengthLabel",
  "strengthValue": "PasswordGenerator-module__wOeZsW__strengthValue",
  "testerCard": "PasswordGenerator-module__wOeZsW__testerCard",
  "testerField": "PasswordGenerator-module__wOeZsW__testerField",
  "testerInput": "PasswordGenerator-module__wOeZsW__testerInput",
  "testerInputs": "PasswordGenerator-module__wOeZsW__testerInputs",
  "textInput": "PasswordGenerator-module__wOeZsW__textInput",
  "usernameOutput": "PasswordGenerator-module__wOeZsW__usernameOutput",
});
}),
"[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/timezone/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/timezone/src/pages/PasswordGenerator.module.css [ssr] (css module)");
;
;
;
;
const PasswordGenerator = ()=>{
    // Username Generator State
    const [fullName, setFullName] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [generatedUsername, setGeneratedUsername] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [usernameStrength, setUsernameStrength] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [usernameCopied, setUsernameCopied] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [isNameError, setIsNameError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // Password Generator State
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [length, setLength] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(10);
    const [includeUppercase, setIncludeUppercase] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [includeLowercase, setIncludeLowercase] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [includeNumbers, setIncludeNumbers] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [includeSymbols, setIncludeSymbols] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [passwordStrength, setPasswordStrength] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [passwordCopied, setPasswordCopied] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [isManualEdit, setIsManualEdit] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // Character sets
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    // Generate Username
    const generateUsername = ()=>{
        if (!fullName.trim()) {
            setIsNameError(true);
            return;
        }
        setIsNameError(false);
        const nameParts = fullName.trim().split(/\s+/);
        const firstName = nameParts[0].toLowerCase();
        const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1].toLowerCase() : '';
        let username = '';
        const randomNum = Math.floor(Math.random() * 900) + 100;
        if (lastName) {
            username = `${firstName}${lastName.charAt(0)}${randomNum}`;
        } else {
            username = `${firstName.slice(0, 6)}_${randomNum}`;
        }
        const symbols = '_.-';
        if (Math.random() > 0.7) {
            const sym = symbols[Math.floor(Math.random() * symbols.length)];
            username = username.slice(0, -3) + sym + username.slice(-3);
        }
        setGeneratedUsername(username);
        checkUsernameStrength(username);
        setUsernameCopied(false);
    };
    // Check Username Strength
    const checkUsernameStrength = (uname)=>{
        let score = 0;
        if (uname.length >= 6) score += 20;
        if (uname.length >= 8) score += 20;
        if (/\d/.test(uname)) score += 25;
        if (/[_.-]/.test(uname)) score += 25;
        if (/[a-z]/.test(uname) && /[A-Z]/.test(uname)) score += 10;
        setUsernameStrength(Math.min(score, 100));
    };
    // Generate Password
    const generatePassword = ()=>{
        let chars = '';
        let generatedPassword = '';
        if (includeUppercase) chars += uppercaseChars;
        if (includeLowercase) chars += lowercaseChars;
        if (includeNumbers) chars += numberChars;
        if (includeSymbols) chars += symbolChars;
        if (!chars) {
            alert('Please select at least one character type');
            return;
        }
        for(let i = 0; i < length; i++){
            const randomIndex = Math.floor(Math.random() * chars.length);
            generatedPassword += chars[randomIndex];
        }
        setPassword(generatedPassword);
        checkPasswordStrength(generatedPassword);
        setPasswordCopied(false);
        setIsManualEdit(false);
    };
    // Check Password Strength
    const checkPasswordStrength = (pwd)=>{
        let score = 0;
        if (pwd.length >= 6) score += 10;
        if (pwd.length >= 8) score += 15;
        if (pwd.length >= 10) score += 15;
        if (pwd.length >= 12) score += 10;
        if (/[A-Z]/.test(pwd)) score += 15;
        if (/[a-z]/.test(pwd)) score += 15;
        if (/[0-9]/.test(pwd)) score += 15;
        if (/[^A-Za-z0-9]/.test(pwd)) score += 15;
        const typesCount = [
            /[A-Z]/.test(pwd),
            /[a-z]/.test(pwd),
            /[0-9]/.test(pwd),
            /[^A-Za-z0-9]/.test(pwd)
        ].filter(Boolean).length;
        if (typesCount >= 3) score += 10;
        if (typesCount === 4) score += 15;
        setPasswordStrength(Math.min(score, 100));
    };
    // Manual password edit
    const handlePasswordChange = (e)=>{
        const newPassword = e.target.value;
        setPassword(newPassword);
        checkPasswordStrength(newPassword);
        setIsManualEdit(true);
        setPasswordCopied(false);
    };
    // Copy functions
    const copyToClipboard = (text, type)=>{
        if (!text) return;
        navigator.clipboard.writeText(text);
        if (type === 'username') {
            setUsernameCopied(true);
            setTimeout(()=>setUsernameCopied(false), 2000);
        } else {
            setPasswordCopied(true);
            setTimeout(()=>setPasswordCopied(false), 2000);
        }
    };
    // Strength colors
    const getStrengthColor = (strength)=>{
        if (strength < 40) return '#ff4d4d';
        if (strength < 70) return '#ffcc00';
        if (strength < 85) return '#66cc33';
        return '#2d862d';
    };
    const getStrengthLabel = (strength)=>{
        if (strength < 40) return 'Weak';
        if (strength < 70) return 'Moderate';
        if (strength < 85) return 'Strong';
        return 'Very Strong';
    };
    // Initial generation
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        generatePassword();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "Free Secure Password & Username Generator | AccessVaulted"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                        lineNumber: 169,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Generate strong, secure usernames and passwords instantly. 100% free, private, and designed for maximum online protection."
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                        lineNumber: 170,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "keywords",
                        content: "secure password generator, free username generator, strong password maker, password strength checker, cybersecurity tool, random password, secure login"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                        lineNumber: 174,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "author",
                        content: "AccessVaulted"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                        lineNumber: 178,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "robots",
                        content: "index, follow"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                        lineNumber: 179,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                        rel: "canonical",
                        href: "https://www.accessvaulted.com/generator"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                        lineNumber: 180,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:title",
                        content: "Free Secure Password & Username Generator | AccessVaulted"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                        lineNumber: 182,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:description",
                        content: "Create unbreakable passwords and cyber-safe usernames in seconds. Free, fast, and fully private."
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                        lineNumber: 183,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:type",
                        content: "website"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                        lineNumber: 187,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:url",
                        content: "https://www.accessvaulted.com/generator"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                        lineNumber: 188,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:image",
                        content: "https://www.accessvaulted.com/images/password-generator-preview.jpg"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                        lineNumber: 189,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:site_name",
                        content: "AccessVaulted"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                        lineNumber: 190,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:locale",
                        content: "en_US"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                        lineNumber: 191,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "twitter:card",
                        content: "summary_large_image"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                        lineNumber: 193,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "twitter:title",
                        content: "Free Secure Password & Username Generator | AccessVaulted"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                        lineNumber: 194,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "twitter:description",
                        content: "Generate strong, unique passwords and usernames with built-in strength analysis. 100% private and free to use."
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                        lineNumber: 195,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "twitter:image",
                        content: "https://www.accessvaulted.com/images/password-generator-preview.jpg"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                        lineNumber: 199,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "twitter:site",
                        content: "@accessvaulted"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                        lineNumber: 200,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "twitter:creator",
                        content: "@accessvaulted"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                        lineNumber: 201,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("script", {
                        type: "application/ld+json",
                        dangerouslySetInnerHTML: {
                            __html: JSON.stringify([
                                {
                                    "@context": "https://schema.org",
                                    "@type": "WebPage",
                                    "name": "Secure Password & Username Generator",
                                    "url": "https://www.accessvaulted.com/create-free-username-and-password-with-accessvaulted-generator",
                                    "description": "Free online tool to generate strong passwords and secure usernames. Includes real-time strength analysis and security scoring.",
                                    "publisher": {
                                        "@type": "Organization",
                                        "name": "AccessVaulted",
                                        "logo": {
                                            "@type": "ImageObject",
                                            "url": "https://www.accessvaulted.com/images/logo.png"
                                        }
                                    }
                                }
                            ])
                        }
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                        lineNumber: 203,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                lineNumber: 168,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].generatorContainer,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pageHeader,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pageTitle,
                                children: "Secure Username & Password Generator"
                            }, void 0, false, {
                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                lineNumber: 229,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pageSubtitle,
                                children: "Create strong, unique usernames and passwords in seconds. Perfect for cybersecurity, account protection, and safe online identity."
                            }, void 0, false, {
                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                lineNumber: 230,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                        lineNumber: 228,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].mainCardsLayout,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].generatorCard,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                        children: "Username Generator"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                        lineNumber: 237,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cardSubtitle,
                                        children: "Enter your name to create a secure, cyber-safe username"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                        lineNumber: 238,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].inputGroup,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                htmlFor: "fullName",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formLabel,
                                                children: "Full Name"
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                lineNumber: 241,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                id: "fullName",
                                                type: "text",
                                                value: fullName,
                                                onChange: (e)=>{
                                                    setFullName(e.target.value);
                                                    if (e.target.value.trim()) setIsNameError(false);
                                                },
                                                placeholder: "Enter your full name",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textInput
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                lineNumber: 242,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            isNameError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].errorText,
                                                children: "Full name is required."
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                lineNumber: 253,
                                                columnNumber: 31
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                        lineNumber: 240,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: generateUsername,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].generateBtn,
                                        children: "Generate Username"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                        lineNumber: 256,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    generatedUsername && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].outputContainer,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].outputRow,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("code", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].usernameOutput,
                                                        children: generatedUsername
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                        lineNumber: 263,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>copyToClipboard(generatedUsername, 'username'),
                                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].copyBtn} ${usernameCopied ? __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].copied : ''}`,
                                                        children: usernameCopied ? 'Copied!' : 'Copy'
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                        lineNumber: 264,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                lineNumber: 262,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].strengthIndicator,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].strengthHeader,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].strengthLabel,
                                                                children: "Username Strength:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                                lineNumber: 274,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].strengthValue,
                                                                style: {
                                                                    color: getStrengthColor(usernameStrength)
                                                                },
                                                                children: [
                                                                    getStrengthLabel(usernameStrength),
                                                                    " (",
                                                                    usernameStrength,
                                                                    "%)"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                                lineNumber: 275,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                        lineNumber: 273,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].strengthBarContainer,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].strengthBar,
                                                            style: {
                                                                width: `${usernameStrength}%`,
                                                                backgroundColor: getStrengthColor(usernameStrength)
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                            lineNumber: 283,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                        lineNumber: 282,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                lineNumber: 272,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                        lineNumber: 261,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                lineNumber: 236,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].generatorCard,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                        children: "Secure Password Generator"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                        lineNumber: 297,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cardSubtitle,
                                        children: "Create or check the strength of your passwords"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                        lineNumber: 298,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].passwordDisplay,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: password,
                                                onChange: handlePasswordChange,
                                                placeholder: "Type or generate a password",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].passwordOutput
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                lineNumber: 301,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>copyToClipboard(password, 'password'),
                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].copyBtn} ${password ? __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].active : ''} ${passwordCopied ? __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].copied : ''}`,
                                                disabled: !password,
                                                children: passwordCopied ? 'Copied!' : 'Copy'
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                lineNumber: 308,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                        lineNumber: 300,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].strengthIndicator,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].strengthHeader,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].strengthLabel,
                                                        children: "Password Strength:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                        lineNumber: 319,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].strengthValue,
                                                        style: {
                                                            color: getStrengthColor(passwordStrength)
                                                        },
                                                        children: [
                                                            getStrengthLabel(passwordStrength),
                                                            " (",
                                                            passwordStrength,
                                                            "%)"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                        lineNumber: 320,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                lineNumber: 318,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].strengthBarContainer,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].strengthBar,
                                                    style: {
                                                        width: `${passwordStrength}%`,
                                                        backgroundColor: getStrengthColor(passwordStrength)
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                    lineNumber: 328,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                lineNumber: 327,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                        lineNumber: 317,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].controlsSection,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].controlGroup,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sliderLabel,
                                                        children: [
                                                            "Password Length: ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                children: length
                                                            }, void 0, false, {
                                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                                lineNumber: 341,
                                                                columnNumber: 36
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                        lineNumber: 340,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                        type: "range",
                                                        min: "6",
                                                        max: "12",
                                                        value: length,
                                                        onChange: (e)=>{
                                                            setLength(parseInt(e.target.value));
                                                            if (!isManualEdit) generatePassword();
                                                        },
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].lengthSlider
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                        lineNumber: 343,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].lengthValues,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                children: "6"
                                                            }, void 0, false, {
                                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                                lineNumber: 355,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                children: "8"
                                                            }, void 0, false, {
                                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                                lineNumber: 356,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                children: "10"
                                                            }, void 0, false, {
                                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                                lineNumber: 357,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                children: "12"
                                                            }, void 0, false, {
                                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                                lineNumber: 358,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                        lineNumber: 354,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                lineNumber: 339,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].controlGroup,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].checkboxLabel,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                checked: includeUppercase,
                                                                onChange: ()=>{
                                                                    setIncludeUppercase(!includeUppercase);
                                                                    if (!isManualEdit) generatePassword();
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                                lineNumber: 364,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].checkmark
                                                            }, void 0, false, {
                                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                                lineNumber: 372,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            "Include Uppercase Letters (A-Z)"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                        lineNumber: 363,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].checkboxLabel,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                checked: includeLowercase,
                                                                onChange: ()=>{
                                                                    setIncludeLowercase(!includeLowercase);
                                                                    if (!isManualEdit) generatePassword();
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                                lineNumber: 376,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].checkmark
                                                            }, void 0, false, {
                                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                                lineNumber: 384,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            "Include Lowercase Letters (a-z)"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                        lineNumber: 375,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].checkboxLabel,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                checked: includeNumbers,
                                                                onChange: ()=>{
                                                                    setIncludeNumbers(!includeNumbers);
                                                                    if (!isManualEdit) generatePassword();
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                                lineNumber: 388,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].checkmark
                                                            }, void 0, false, {
                                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                                lineNumber: 396,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            "Include Numbers (0-9)"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                        lineNumber: 387,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].checkboxLabel,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                checked: includeSymbols,
                                                                onChange: ()=>{
                                                                    setIncludeSymbols(!includeSymbols);
                                                                    if (!isManualEdit) generatePassword();
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                                lineNumber: 400,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].checkmark
                                                            }, void 0, false, {
                                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                                lineNumber: 408,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            "Include Symbols (!@#$% etc.)"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                        lineNumber: 399,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                lineNumber: 362,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                        lineNumber: 338,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].actionButtons,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: generatePassword,
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].generateBtn,
                                                children: "Generate New Password"
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                lineNumber: 415,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setPassword('');
                                                    setIsManualEdit(true);
                                                },
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].clearBtn,
                                                children: "Clear"
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                lineNumber: 418,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                        lineNumber: 414,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                lineNumber: 296,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                        lineNumber: 235,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].testerCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                children: "Security Strength Tester"
                            }, void 0, false, {
                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                lineNumber: 432,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                children: "Test the strength of your username and password together."
                            }, void 0, false, {
                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                lineNumber: 433,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].testerInputs,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].testerField,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formLabel,
                                                children: "Username"
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                lineNumber: 437,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].outputRow,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: generatedUsername,
                                                        readOnly: true,
                                                        placeholder: "Generated username",
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].testerInput
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                        lineNumber: 439,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>copyToClipboard(generatedUsername, 'username'),
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].copyBtn,
                                                        disabled: !generatedUsername,
                                                        children: "Copy"
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                        lineNumber: 446,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                lineNumber: 438,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                        lineNumber: 436,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].testerField,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formLabel,
                                                children: "Password"
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                lineNumber: 457,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].outputRow,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: password,
                                                        readOnly: true,
                                                        placeholder: "Generated password",
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].testerInput
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                        lineNumber: 459,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>copyToClipboard(password, 'password'),
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].copyBtn,
                                                        disabled: !password,
                                                        children: "Copy"
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                        lineNumber: 466,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                lineNumber: 458,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                        lineNumber: 456,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                lineNumber: 435,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].overallStrength,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                        children: "Overall Security Score"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                        lineNumber: 478,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].strengthHeader,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].strengthLabel,
                                                children: "Combined Strength:"
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                lineNumber: 480,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].strengthValue,
                                                style: {
                                                    color: getStrengthColor((usernameStrength + passwordStrength) / 2)
                                                },
                                                children: [
                                                    getStrengthLabel((usernameStrength + passwordStrength) / 2),
                                                    ' ',
                                                    "(",
                                                    Math.round((usernameStrength + passwordStrength) / 2),
                                                    "%)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                                lineNumber: 481,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                        lineNumber: 479,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].strengthBarContainer,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$PasswordGenerator$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].strengthBar,
                                            style: {
                                                width: `${(usernameStrength + passwordStrength) / 2}%`,
                                                backgroundColor: getStrengthColor((usernameStrength + passwordStrength) / 2)
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                            lineNumber: 492,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                        lineNumber: 491,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                                lineNumber: 477,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                        lineNumber: 431,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/timezone/src/pages/create-free-username-and-password-with-accessvaulted-generator.js",
                lineNumber: 227,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
const __TURBOPACK__default__export__ = PasswordGenerator;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__338afda6._.js.map