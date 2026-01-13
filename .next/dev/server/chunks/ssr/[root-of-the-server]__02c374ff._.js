module.exports = [
"[project]/timezone/src/pages/contact-us.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "btn": "contact-us-module__xSWSJq__btn",
  "btnLarge": "contact-us-module__xSWSJq__btnLarge",
  "btnPrimary": "contact-us-module__xSWSJq__btnPrimary",
  "contactContainer": "contact-us-module__xSWSJq__contactContainer",
  "contactContent": "contact-us-module__xSWSJq__contactContent",
  "contactForm": "contact-us-module__xSWSJq__contactForm",
  "contactFormCard": "contact-us-module__xSWSJq__contactFormCard",
  "contactSection": "contact-us-module__xSWSJq__contactSection",
  "ctaActions": "contact-us-module__xSWSJq__ctaActions",
  "ctaCard": "contact-us-module__xSWSJq__ctaCard",
  "ctaSection": "contact-us-module__xSWSJq__ctaSection",
  "errorMessage": "contact-us-module__xSWSJq__errorMessage",
  "faqCard": "contact-us-module__xSWSJq__faqCard",
  "faqGrid": "contact-us-module__xSWSJq__faqGrid",
  "faqSection": "contact-us-module__xSWSJq__faqSection",
  "formGroup": "contact-us-module__xSWSJq__formGroup",
  "formHeader": "contact-us-module__xSWSJq__formHeader",
  "formInput": "contact-us-module__xSWSJq__formInput",
  "formLabel": "contact-us-module__xSWSJq__formLabel",
  "formRow": "contact-us-module__xSWSJq__formRow",
  "formSelect": "contact-us-module__xSWSJq__formSelect",
  "formTextarea": "contact-us-module__xSWSJq__formTextarea",
  "heroContent": "contact-us-module__xSWSJq__heroContent",
  "heroSection": "contact-us-module__xSWSJq__heroSection",
  "heroSubtitle": "contact-us-module__xSWSJq__heroSubtitle",
  "heroTitle": "contact-us-module__xSWSJq__heroTitle",
  "sectionHeader": "contact-us-module__xSWSJq__sectionHeader",
  "sectionSubtitle": "contact-us-module__xSWSJq__sectionSubtitle",
  "spin": "contact-us-module__xSWSJq__spin",
  "spinner": "contact-us-module__xSWSJq__spinner",
  "submitBtn": "contact-us-module__xSWSJq__submitBtn",
  "submitBtnLoading": "contact-us-module__xSWSJq__submitBtnLoading",
  "successMessage": "contact-us-module__xSWSJq__successMessage",
});
}),
"[project]/timezone/src/pages/contact-us.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/timezone/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/timezone/src/pages/contact-us.module.css [ssr] (css module)");
;
;
;
;
const ContactPage = ()=>{
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [submitStatus, setSubmitStatus] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        try {
            const response = await fetch('https://formsubmit.co/ajax/your-email@domain.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success === 'true') {
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
        } finally{
            setIsSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "Contact Us | AccessVaulted - Get in Touch"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/contact-us.js",
                        lineNumber: 56,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Have questions about our password generator? Contact the AccessVaulted team. We're here to help you with all your security needs."
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/contact-us.js",
                        lineNumber: 57,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "keywords",
                        content: "contact AccessVaulted, password generator support, security tool help, customer service"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/contact-us.js",
                        lineNumber: 61,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "author",
                        content: "AccessVaulted"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/contact-us.js",
                        lineNumber: 65,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "robots",
                        content: "index, follow"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/contact-us.js",
                        lineNumber: 66,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:title",
                        content: "Contact Us | AccessVaulted - Get in Touch"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/contact-us.js",
                        lineNumber: 69,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:description",
                        content: "Get in touch with the AccessVaulted team for support, questions, or feedback about our free password and username generator."
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/contact-us.js",
                        lineNumber: 70,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:type",
                        content: "website"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/contact-us.js",
                        lineNumber: 74,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:url",
                        content: "https://www.accessvaulted.com/contact"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/contact-us.js",
                        lineNumber: 75,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:image",
                        content: "https://www.accessvaulted.com/images/contact-preview.jpg"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/contact-us.js",
                        lineNumber: 76,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "twitter:card",
                        content: "summary_large_image"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/contact-us.js",
                        lineNumber: 79,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "twitter:title",
                        content: "Contact Us | AccessVaulted - Get in Touch"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/contact-us.js",
                        lineNumber: 80,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "twitter:description",
                        content: "Contact our team for support with our free password generator and security tools."
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/contact-us.js",
                        lineNumber: 81,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "twitter:image",
                        content: "https://www.accessvaulted.com/images/contact-preview.jpg"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/contact-us.js",
                        lineNumber: 85,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                        rel: "canonical",
                        href: "https://www.accessvaulted.com/contact"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/contact-us.js",
                        lineNumber: 88,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/timezone/src/pages/contact-us.js",
                lineNumber: 55,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].contactContainer,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].heroSection,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].heroContent,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].heroTitle,
                                    children: "Get in Touch"
                                }, void 0, false, {
                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].heroSubtitle,
                                    children: "Have questions about our password generator? We're here to help you with all your security needs."
                                }, void 0, false, {
                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/timezone/src/pages/contact-us.js",
                            lineNumber: 95,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/contact-us.js",
                        lineNumber: 94,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].contactSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sectionHeader,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                        children: "Contact Our Team"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/contact-us.js",
                                        lineNumber: 106,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sectionSubtitle,
                                        children: "Send us a message and we'll get back to you as soon as possible"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/contact-us.js",
                                        lineNumber: 107,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/timezone/src/pages/contact-us.js",
                                lineNumber: 105,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].contactContent,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].contactFormCard,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formHeader,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                    children: "Send us a Message"
                                                }, void 0, false, {
                                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                                    lineNumber: 116,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    children: "Fill out the form below and we'll respond within 24 hours"
                                                }, void 0, false, {
                                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                                    lineNumber: 117,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/timezone/src/pages/contact-us.js",
                                            lineNumber: 115,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                                            onSubmit: handleSubmit,
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].contactForm,
                                            action: "https://formsubmit.co/your-email@domain.com",
                                            method: "POST",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "hidden",
                                                    name: "_captcha",
                                                    value: "false"
                                                }, void 0, false, {
                                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                                    lineNumber: 127,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "hidden",
                                                    name: "_subject",
                                                    value: "New Contact Form Submission from AccessVaulted"
                                                }, void 0, false, {
                                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                                    lineNumber: 128,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "hidden",
                                                    name: "_template",
                                                    value: "table"
                                                }, void 0, false, {
                                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                                    lineNumber: 129,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formRow,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formGroup,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                    htmlFor: "name",
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formLabel,
                                                                    children: "Full Name *"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                                                    lineNumber: 133,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    id: "name",
                                                                    name: "name",
                                                                    value: formData.name,
                                                                    onChange: handleChange,
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formInput,
                                                                    required: true,
                                                                    placeholder: "Enter your full name"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                                                    lineNumber: 136,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/timezone/src/pages/contact-us.js",
                                                            lineNumber: 132,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formGroup,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                    htmlFor: "email",
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formLabel,
                                                                    children: "Email Address *"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                                                    lineNumber: 149,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                    type: "email",
                                                                    id: "email",
                                                                    name: "email",
                                                                    value: formData.email,
                                                                    onChange: handleChange,
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formInput,
                                                                    required: true,
                                                                    placeholder: "Enter your email address"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                                                    lineNumber: 152,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/timezone/src/pages/contact-us.js",
                                                            lineNumber: 148,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                                    lineNumber: 131,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formGroup,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                            htmlFor: "subject",
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formLabel,
                                                            children: "Subject *"
                                                        }, void 0, false, {
                                                            fileName: "[project]/timezone/src/pages/contact-us.js",
                                                            lineNumber: 166,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                            id: "subject",
                                                            name: "subject",
                                                            value: formData.subject,
                                                            onChange: handleChange,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formSelect,
                                                            required: true,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: "Select a subject"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                                                    lineNumber: 177,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                    value: "General Inquiry",
                                                                    children: "General Inquiry"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                                                    lineNumber: 178,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                    value: "Technical Support",
                                                                    children: "Technical Support"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                                                    lineNumber: 179,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                    value: "Feature Request",
                                                                    children: "Feature Request"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                                                    lineNumber: 180,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                    value: "Partnership",
                                                                    children: "Partnership"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                                                    lineNumber: 181,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                    value: "Security Concern",
                                                                    children: "Security Concern"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                                                    lineNumber: 182,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                    value: "Other",
                                                                    children: "Other"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                                                    lineNumber: 183,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/timezone/src/pages/contact-us.js",
                                                            lineNumber: 169,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                                    lineNumber: 165,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formGroup,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                            htmlFor: "message",
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formLabel,
                                                            children: "Message *"
                                                        }, void 0, false, {
                                                            fileName: "[project]/timezone/src/pages/contact-us.js",
                                                            lineNumber: 188,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                                                            id: "message",
                                                            name: "message",
                                                            value: formData.message,
                                                            onChange: handleChange,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formTextarea,
                                                            required: true,
                                                            rows: "6",
                                                            placeholder: "Tell us how we can help you..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/timezone/src/pages/contact-us.js",
                                                            lineNumber: 191,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                                    lineNumber: 187,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                submitStatus === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].successMessage,
                                                    children: "✅ Thank you! Your message has been sent successfully. We'll get back to you soon."
                                                }, void 0, false, {
                                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                                    lineNumber: 205,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                submitStatus === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].errorMessage,
                                                    children: "❌ There was an error sending your message. Please try again or contact us directly."
                                                }, void 0, false, {
                                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                                    lineNumber: 211,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].submitBtn} ${isSubmitting ? __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].submitBtnLoading : ''}`,
                                                    disabled: isSubmitting,
                                                    children: isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].spinner
                                                            }, void 0, false, {
                                                                fileName: "[project]/timezone/src/pages/contact-us.js",
                                                                lineNumber: 223,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            "Sending..."
                                                        ]
                                                    }, void 0, true) : 'Send Message'
                                                }, void 0, false, {
                                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                                    lineNumber: 216,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/timezone/src/pages/contact-us.js",
                                            lineNumber: 120,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                    lineNumber: 114,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/timezone/src/pages/contact-us.js",
                                lineNumber: 112,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/timezone/src/pages/contact-us.js",
                        lineNumber: 104,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].faqSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sectionHeader,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                        children: "Frequently Asked Questions"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/contact-us.js",
                                        lineNumber: 239,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sectionSubtitle,
                                        children: "Quick answers to common questions about our service"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/contact-us.js",
                                        lineNumber: 240,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/timezone/src/pages/contact-us.js",
                                lineNumber: 238,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].faqGrid,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].faqCard,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                children: "Is the password generator really free?"
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/contact-us.js",
                                                lineNumber: 247,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                children: "Yes, our username and password generator is completely free to use with no hidden costs or limitations."
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/contact-us.js",
                                                lineNumber: 248,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/timezone/src/pages/contact-us.js",
                                        lineNumber: 246,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].faqCard,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                children: "How do you protect my privacy?"
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/contact-us.js",
                                                lineNumber: 252,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                children: "All password generation happens locally in your browser. We never store or transmit your generated credentials."
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/contact-us.js",
                                                lineNumber: 253,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/timezone/src/pages/contact-us.js",
                                        lineNumber: 251,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].faqCard,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                children: "Can I use this for business accounts?"
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/contact-us.js",
                                                lineNumber: 257,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                children: "Absolutely! Our tool is perfect for generating secure credentials for both personal and business use."
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/contact-us.js",
                                                lineNumber: 258,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/timezone/src/pages/contact-us.js",
                                        lineNumber: 256,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].faqCard,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                children: "Do you offer technical support?"
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/contact-us.js",
                                                lineNumber: 262,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                children: "Yes, we provide free technical support for all users. Contact us through this form for assistance."
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/contact-us.js",
                                                lineNumber: 263,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/timezone/src/pages/contact-us.js",
                                        lineNumber: 261,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/timezone/src/pages/contact-us.js",
                                lineNumber: 245,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/timezone/src/pages/contact-us.js",
                        lineNumber: 237,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].ctaSection,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].ctaCard,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                    children: "Ready to Generate Secure Passwords?"
                                }, void 0, false, {
                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                    lineNumber: 271,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    children: "While you're here, why not try our free password generator? Create strong, unique passwords in seconds."
                                }, void 0, false, {
                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                    lineNumber: 272,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].ctaActions,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: "/create-free-username-and-password-with-accessvaulted-generator",
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].btn} ${__TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].btnPrimary} ${__TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$contact$2d$us$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].btnLarge}`,
                                        children: "Generate Passwords Now"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/contact-us.js",
                                        lineNumber: 274,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/timezone/src/pages/contact-us.js",
                                    lineNumber: 273,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/timezone/src/pages/contact-us.js",
                            lineNumber: 270,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/contact-us.js",
                        lineNumber: 269,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/timezone/src/pages/contact-us.js",
                lineNumber: 92,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
const __TURBOPACK__default__export__ = ContactPage;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__02c374ff._.js.map