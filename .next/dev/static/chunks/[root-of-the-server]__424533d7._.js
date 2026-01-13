(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/timezone/src/pages/passwordstrength.module.css [client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "articleCard": "passwordstrength-module__Z4-RnG__articleCard",
  "articleContainer": "passwordstrength-module__Z4-RnG__articleContainer",
  "articleContent": "passwordstrength-module__Z4-RnG__articleContent",
  "bestPracticesSection": "passwordstrength-module__Z4-RnG__bestPracticesSection",
  "btn": "passwordstrength-module__Z4-RnG__btn",
  "btnLarge": "passwordstrength-module__Z4-RnG__btnLarge",
  "btnPrimary": "passwordstrength-module__Z4-RnG__btnPrimary",
  "cardIcon": "passwordstrength-module__Z4-RnG__cardIcon",
  "contentBlock": "passwordstrength-module__Z4-RnG__contentBlock",
  "contentSection": "passwordstrength-module__Z4-RnG__contentSection",
  "ctaActions": "passwordstrength-module__Z4-RnG__ctaActions",
  "ctaCard": "passwordstrength-module__Z4-RnG__ctaCard",
  "ctaSection": "passwordstrength-module__Z4-RnG__ctaSection",
  "exampleBad": "passwordstrength-module__Z4-RnG__exampleBad",
  "exampleCard": "passwordstrength-module__Z4-RnG__exampleCard",
  "exampleGood": "passwordstrength-module__Z4-RnG__exampleGood",
  "exampleSection": "passwordstrength-module__Z4-RnG__exampleSection",
  "exampleTip": "passwordstrength-module__Z4-RnG__exampleTip",
  "examplesGrid": "passwordstrength-module__Z4-RnG__examplesGrid",
  "featureCard": "passwordstrength-module__Z4-RnG__featureCard",
  "featuresGrid": "passwordstrength-module__Z4-RnG__featuresGrid",
  "featuresSection": "passwordstrength-module__Z4-RnG__featuresSection",
  "heroContent": "passwordstrength-module__Z4-RnG__heroContent",
  "heroSection": "passwordstrength-module__Z4-RnG__heroSection",
  "heroSubtitle": "passwordstrength-module__Z4-RnG__heroSubtitle",
  "heroTitle": "passwordstrength-module__Z4-RnG__heroTitle",
  "practiceCard": "passwordstrength-module__Z4-RnG__practiceCard",
  "practiceContent": "passwordstrength-module__Z4-RnG__practiceContent",
  "practiceIcon": "passwordstrength-module__Z4-RnG__practiceIcon",
  "practicesContainer": "passwordstrength-module__Z4-RnG__practicesContainer",
  "sectionHeader": "passwordstrength-module__Z4-RnG__sectionHeader",
  "sectionSubtitle": "passwordstrength-module__Z4-RnG__sectionSubtitle",
});
}),
"[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__N_SSG",
    ()=>__N_SSG,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/timezone/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/timezone/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/timezone/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/timezone/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/timezone/src/pages/passwordstrength.module.css [client] (css module)");
;
;
;
;
;
const PasswordStrength = ({ currentDate, lastModifiedDate })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                        children: "Password Strength Guide 2026 | What Makes Passwords Secure | AccessVaulted"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 11,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Discover what makes passwords truly secure. Learn about password strength factors, entropy, complexity requirements, and how to create uncrackable passwords with AccessVaulted's generator."
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 12,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "keywords",
                        content: "password strength, password security, strong passwords, password complexity, password entropy, secure passwords, password requirements, password guidelines, password best practices, password length, character variety, random passwords, password cracking resistance, brute force protection, password security 2024, password strength checker, password strength test, password strength meter, password security factors, password complexity rules, password entropy calculation, password security standards, password strength analysis, password security metrics, password strength evaluation, password security assessment, password strength measurement, password security testing, password strength verification, password security validation, password strength criteria, password security parameters, password strength indicators, password security benchmarks, password strength standards, password security requirements, password strength guidelines, password security best practices, password strength optimization, password security enhancement, password strength improvement, password security upgrade, password strength factors, password security elements, password strength components, password security features, password strength characteristics, password security attributes, password strength properties, password security qualities, password strength metrics, password security measurements, password strength scores, password security ratings, password strength levels, password security grades, password strength categories, password security classes, password strength tiers, password security rankings, password strength comparison, password security analysis, password strength evaluation, password security assessment, password strength testing, password security verification, password strength validation, password strength check, password security audit, password strength review, password security inspection, password strength examination, password security scan, password strength assessment tool, password security analyzer, password strength meter tool, password security checker, password strength testing tool, password security evaluation tool, password strength measurement tool, password security assessment tool, password strength analysis tool, password security verification tool, password strength validation tool, password strength criteria tool, password security parameters tool, password strength indicators tool, password security benchmarks tool, password strength standards tool, password security requirements tool, password strength guidelines tool, password security best practices tool, password strength optimization tool, password security enhancement tool, password strength improvement tool, password security upgrade tool, accessvaulted password generator, free password strength checker, secure password creator, username and password generator, online password strength test, password security analyzer tool, password entropy calculator, password complexity analyzer, password strength assessment 2024, password security evaluation guide, password strength measurement standards, password security testing methods, password strength verification process, password security validation techniques, password strength check online, password security audit tool, password strength review service, password security inspection tool, password strength examination method, password security scan tool, cybersecurity password strength, digital security passwords, online account protection, internet security passwords, web security passwords, login security passwords, authentication security, credential security, account protection passwords, data security passwords, information security passwords, network security passwords, system security passwords, application security passwords, database security passwords, cloud security passwords, mobile security passwords, device security passwords, endpoint security passwords, enterprise security passwords, personal security passwords, home security passwords, business security passwords, organizational security passwords, institutional security passwords, government security passwords, military security passwords, financial security passwords, banking security passwords, healthcare security passwords, medical security passwords, education security passwords, academic security passwords, corporate security passwords, commercial security passwords, retail security passwords, ecommerce security passwords, social media security passwords, email security passwords, messaging security passwords, communication security passwords, transaction security passwords, payment security passwords, shopping security passwords, gaming security passwords, entertainment security passwords, streaming security passwords, media security passwords, content security passwords, document security passwords, file security passwords, folder security passwords, drive security passwords, storage security passwords, backup security passwords, recovery security passwords, access control passwords, permission security passwords, authorization security passwords, verification security passwords, validation security passwords, authentication security passwords, identification security passwords, login security passwords, signin security passwords, access security passwords, entry security passwords, gateway security passwords, portal security passwords, platform security passwords, service security passwords, application security passwords, software security passwords, hardware security passwords, firmware security passwords, operating system security passwords, database security passwords, server security passwords, client security passwords, user security passwords, admin security passwords, root security passwords, superuser security passwords, privileged security passwords, elevated security passwords, restricted security passwords, confidential security passwords, secret security passwords, top secret security passwords, classified security passwords, sensitive security passwords, personal security passwords, private security passwords, public security passwords, shared security passwords, group security passwords, team security passwords, department security passwords, division security passwords, company security passwords, organization security passwords, institution security passwords"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "author",
                        content: "AccessVaulted Cybersecurity Team"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "robots",
                        content: "index, follow, max-image-preview:large"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1.0"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "date",
                        content: currentDate
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "last-modified",
                        content: lastModifiedDate
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "theme-color",
                        content: "#1a365d"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "subject",
                        content: "Password Strength and Security Analysis"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "classification",
                        content: "Cybersecurity, Password Security, Password Strength Analysis"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "category",
                        content: "technology cybersecurity password security"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "subcategory",
                        content: "password strength measurement"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "language",
                        content: "EN"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "revised",
                        content: `Monday, December 2, ${currentDate.split('-')[0]}`
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "abstract",
                        content: "Comprehensive analysis of password strength factors and security metrics for creating uncrackable passwords"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "topic",
                        content: "Password Strength Analysis and Security Metrics"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "summary",
                        content: "Learn what makes passwords truly secure through detailed analysis of strength factors, entropy, and complexity requirements"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "designer",
                        content: "AccessVaulted Security Team"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "copyright",
                        content: "AccessVaulted"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "distribution",
                        content: "Global"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "coverage",
                        content: "Worldwide"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "rating",
                        content: "Safe For Kids"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "revisit-after",
                        content: "7 days"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:title",
                        content: "Password Strength Guide 2026 | What Makes Passwords Truly Secure | AccessVaulted"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:description",
                        content: "Discover the key factors that determine password strength and security. Learn about entropy, complexity, length requirements and create uncrackable passwords."
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:type",
                        content: "article"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:url",
                        content: "https://www.accessvaulted.com/password-strength-what-makes-a-password-truly-secure"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:image",
                        content: "https://www.accessvaulted.com/images/password-strength-preview.jpg"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:site_name",
                        content: "AccessVaulted"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:locale",
                        content: "en_US"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:updated_time",
                        content: lastModifiedDate
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "article:published_time",
                        content: lastModifiedDate
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "article:modified_time",
                        content: lastModifiedDate
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "article:author",
                        content: "AccessVaulted Security Team"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "article:section",
                        content: "Cybersecurity"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "article:tag",
                        content: "password strength"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "article:tag",
                        content: "password security"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "article:tag",
                        content: "password complexity"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "article:tag",
                        content: "password entropy"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "article:tag",
                        content: "secure passwords"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:card",
                        content: "summary_large_image"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:title",
                        content: "Password Strength Guide 2026 | AccessVaulted Security"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:description",
                        content: "Learn what makes passwords truly secure with our comprehensive password strength analysis guide and security metrics."
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:image",
                        content: "https://www.accessvaulted.com/images/password-strength-preview.jpg"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:site",
                        content: "@AccessVaulted"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:creator",
                        content: "@AccessVaulted"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:label1",
                        content: "Reading time"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:data1",
                        content: "10 minutes"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:label2",
                        content: "Category"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:data2",
                        content: "Password Security"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "canonical",
                        href: "https://www.accessvaulted.com/password-strength-what-makes-a-password-truly-secure"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                        type: "application/ld+json",
                        dangerouslySetInnerHTML: {
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "Article",
                                "headline": "Password Strength: What Makes a Password Truly Secure?",
                                "description": "Comprehensive guide analyzing password strength factors, security metrics, entropy calculations, and complexity requirements for creating uncrackable passwords.",
                                "image": "https://www.accessvaulted.com/images/password-strength-preview.jpg",
                                "author": {
                                    "@type": "Organization",
                                    "name": "AccessVaulted Security Team",
                                    "url": "https://www.accessvaulted.com"
                                },
                                "publisher": {
                                    "@type": "Organization",
                                    "name": "AccessVaulted",
                                    "logo": {
                                        "@type": "ImageObject",
                                        "url": "https://www.accessvaulted.com/images/logo.png"
                                    }
                                },
                                "datePublished": lastModifiedDate,
                                "dateModified": lastModifiedDate,
                                "mainEntityOfPage": {
                                    "@type": "WebPage",
                                    "@id": "https://www.accessvaulted.com/password-strength-what-makes-a-password-truly-secure"
                                },
                                "articleSection": "Password Security",
                                "keywords": "password strength password security password complexity password entropy secure passwords password requirements password guidelines password best practices password length character variety random passwords password cracking resistance brute force protection password security 2024",
                                "articleBody": "Discover what makes passwords truly secure through detailed analysis of strength factors, entropy calculations, complexity requirements, and security metrics for creating uncrackable passwords.",
                                "wordCount": "3000",
                                "timeRequired": "PT10M",
                                "inLanguage": "en-US"
                            })
                        }
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                        type: "application/ld+json",
                        dangerouslySetInnerHTML: {
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                    {
                                        "@type": "ListItem",
                                        "position": 1,
                                        "name": "Home",
                                        "item": "https://www.accessvaulted.com"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 2,
                                        "name": "Blog",
                                        "item": "https://www.accessvaulted.com/blog"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 3,
                                        "name": "Password Strength Guide",
                                        "item": "https://www.accessvaulted.com/password-strength-what-makes-a-password-truly-secure"
                                    }
                                ]
                            })
                        }
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "format-detection",
                        content: "telephone=no"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "google",
                        content: "notranslate"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "googlebot",
                        content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "bingbot",
                        content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                lineNumber: 10,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].articleContainer,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].heroSection,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].heroContent,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].heroTitle,
                                    itemProp: "headline",
                                    children: "Password Strength: What Makes a Password Truly Secure?"
                                }, void 0, false, {
                                    fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                    lineNumber: 165,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].heroSubtitle,
                                    itemProp: "description",
                                    children: "Discover the key elements that contribute to password strength and how to test your own passwords effectively."
                                }, void 0, false, {
                                    fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                    lineNumber: 166,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                                    itemProp: "datePublished",
                                    content: lastModifiedDate
                                }, void 0, false, {
                                    fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                    lineNumber: 169,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                                    itemProp: "dateModified",
                                    content: lastModifiedDate
                                }, void 0, false, {
                                    fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                    lineNumber: 170,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                            lineNumber: 164,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contentSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionHeader,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "Understanding Password Strength"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                        lineNumber: 177,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionSubtitle,
                                        children: "Beyond complexity to true security"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                        lineNumber: 178,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                lineNumber: 176,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].articleCard,
                                itemScope: true,
                                itemType: "https://schema.org/Article",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                                        itemProp: "datePublished",
                                        content: lastModifiedDate
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                        lineNumber: 184,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                                        itemProp: "dateModified",
                                        content: lastModifiedDate
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                        lineNumber: 185,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].articleContent,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contentBlock,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        children: "Measuring Password Strength Beyond Complexity"
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                        lineNumber: 188,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "It's not just about adding symbols — true password strength comes from ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "entropy"
                                                            }, void 0, false, {
                                                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                                lineNumber: 189,
                                                                columnNumber: 91
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            ', or randomness. A password like "P@ssw0rd123" looks strong but is actually one of the most commonly cracked passwords in existence.'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                        lineNumber: 189,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: "Modern cracking tools use sophisticated algorithms that instantly recognize and test common substitutions and number sequences. Entropy measures the sheer number of possible combinations an attacker would need to try, which is exponentially increased by length and true unpredictability."
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                        lineNumber: 190,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                lineNumber: 187,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contentBlock,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        children: "The Mathematics of Security"
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                        lineNumber: 194,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: "Every additional character in your password increases the possible combinations exponentially. A 12-character password with mixed characters has over 475 quintillion possible combinations, while a 16-character password has 3.4 x 10^28 possibilities—making it virtually uncrackable through brute force methods."
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                        lineNumber: 195,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                lineNumber: 193,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contentBlock,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        children: "Common Password Myths Debunked"
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                        lineNumber: 199,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: 'Many believe that complex-looking passwords with symbols are automatically secure, but predictable patterns like "P@ssw0rd!" or "Welcome123!" are easily cracked. True security comes from unpredictability and length, not just the presence of special characters.'
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                        lineNumber: 200,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                lineNumber: 198,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                        lineNumber: 186,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].featuresSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionHeader,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "Key Factors in Password Strength"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                        lineNumber: 209,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionSubtitle,
                                        children: "What truly makes a password resistant to attacks"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                        lineNumber: 210,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                lineNumber: 208,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].featuresGrid,
                                children: [
                                    {
                                        icon: "📊",
                                        title: "Password Entropy",
                                        description: "Measures true randomness and unpredictability. Higher entropy means more possible combinations for attackers to test."
                                    },
                                    {
                                        icon: "📏",
                                        title: "Length Over Complexity",
                                        description: "A longer password is always stronger than a complex short one. Aim for 16+ characters when possible."
                                    },
                                    {
                                        icon: "🎭",
                                        title: "Character Diversity",
                                        description: "Use uppercase, lowercase, numbers, and symbols, but avoid predictable patterns and common substitutions."
                                    },
                                    {
                                        icon: "🚫",
                                        title: "Avoid Common Patterns",
                                        description: "Steer clear of sequential patterns, keyboard walks, and commonly used password formulas."
                                    },
                                    {
                                        icon: "🧠",
                                        title: "True Randomness",
                                        description: "Human-created passwords are rarely truly random. Use cryptographically secure random generation."
                                    },
                                    {
                                        icon: "🔍",
                                        title: "Resistance to Dictionary Attacks",
                                        description: "Strong passwords shouldn't contain dictionary words or common phrases without significant modification."
                                    },
                                    {
                                        icon: "⏱️",
                                        title: "Cracking Time Estimation",
                                        description: "A truly strong password should take centuries or more to crack with current technology."
                                    },
                                    {
                                        icon: "🔄",
                                        title: "Unpredictable Structure",
                                        description: "Avoid using personal information, common phrases, or any pattern that could be guessed through social engineering."
                                    }
                                ].map((feature, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].featureCard,
                                        itemScope: true,
                                        itemType: "https://schema.org/Service",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                                                itemProp: "datePublished",
                                                content: lastModifiedDate
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                lineNumber: 259,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                                                itemProp: "dateModified",
                                                content: lastModifiedDate
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                lineNumber: 260,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].cardIcon,
                                                "aria-hidden": "true",
                                                children: feature.icon
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                lineNumber: 261,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                itemProp: "name",
                                                children: feature.title
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                lineNumber: 262,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                itemProp: "description",
                                                children: feature.description
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                lineNumber: 263,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                        lineNumber: 258,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].bestPracticesSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionHeader,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "Passphrases: The Smarter Alternative"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                        lineNumber: 272,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionSubtitle,
                                        children: "Combining security with memorability"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                        lineNumber: 273,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                lineNumber: 271,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practicesContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceCard,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceIcon,
                                                "aria-hidden": "true",
                                                children: "🔤"
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                lineNumber: 280,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceContent,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        children: "Length is Strength"
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                        lineNumber: 282,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: 'Longer passphrases made of random words are both secure and memorable. For example: "GlacierRainbowBatteryTruck" has high entropy and is easier to recall than "K7#m9Lp@2!"'
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                        lineNumber: 283,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                lineNumber: 281,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                        lineNumber: 279,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceCard,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceIcon,
                                                "aria-hidden": "true",
                                                children: "🛡️"
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                lineNumber: 288,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceContent,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        children: "Brute-Force Resistance"
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                        lineNumber: 290,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: "While a hacker's software can quickly cycle through every possible 8-character combination, a 20-character passphrase presents a virtually insurmountable number of possibilities for automated attacks."
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                        lineNumber: 291,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                lineNumber: 289,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                        lineNumber: 287,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceCard,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceIcon,
                                                "aria-hidden": "true",
                                                children: "💡"
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                lineNumber: 296,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceContent,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        children: "Enhanced Memorability"
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                        lineNumber: 298,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: 'By incorporating a capital letter, number, or symbol (e.g., "Glacier!Rainbow3BatteryTruck"), you create a credential that balances top-tier security with practical usability.'
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                        lineNumber: 299,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                lineNumber: 297,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                        lineNumber: 295,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceCard,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceIcon,
                                                "aria-hidden": "true",
                                                children: "🎯"
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                lineNumber: 304,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceContent,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        children: "Dictionary Attack Protection"
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                        lineNumber: 306,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: "Modern passphrases using 4+ completely random words are immune to traditional dictionary attacks and far more resilient to advanced cracking techniques."
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                        lineNumber: 307,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                lineNumber: 305,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                        lineNumber: 303,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                lineNumber: 278,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 270,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].exampleSection,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].exampleCard,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: "Password Strength Examples"
                                }, void 0, false, {
                                    fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                    lineNumber: 316,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].examplesGrid,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].exampleBad,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    children: "❌ Weak Password"
                                                }, void 0, false, {
                                                    fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                    lineNumber: 319,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: '"P@ssw0rd123"'
                                                }, void 0, false, {
                                                    fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                    lineNumber: 320,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Can be cracked in less than 1 second"
                                                }, void 0, false, {
                                                    fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                    lineNumber: 321,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                            lineNumber: 318,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].exampleGood,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    children: "✅ Strong Passphrase"
                                                }, void 0, false, {
                                                    fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                    lineNumber: 324,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: '"Ampersand-Crimson-Tent-Revive"'
                                                }, void 0, false, {
                                                    fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                    lineNumber: 325,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Would take centuries to crack"
                                                }, void 0, false, {
                                                    fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                    lineNumber: 326,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                            lineNumber: 323,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                    lineNumber: 317,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].exampleTip,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Testing Tip:"
                                        }, void 0, false, {
                                            fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                            lineNumber: 330,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        ' Use trusted tools like Bitwarden\'s Password Strength Tester or "How Secure Is My Password?" (offline version) to evaluate your passwords without sending them over the internet.'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                    lineNumber: 329,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                            lineNumber: 315,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 314,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contentSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionHeader,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "Important Security Considerations"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                        lineNumber: 338,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionSubtitle,
                                        children: "Best practices for testing and maintaining password strength"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                        lineNumber: 339,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                lineNumber: 337,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].articleCard,
                                itemScope: true,
                                itemType: "https://schema.org/Article",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                                        itemProp: "datePublished",
                                        content: lastModifiedDate
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                        lineNumber: 345,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                                        itemProp: "dateModified",
                                        content: lastModifiedDate
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                        lineNumber: 346,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].articleContent,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contentBlock,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        children: "Safe Password Testing"
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                        lineNumber: 349,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Never test real passwords on untrusted websites"
                                                            }, void 0, false, {
                                                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                                lineNumber: 350,
                                                                columnNumber: 20
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            " — they could be harvesting credentials. Always use reputable, offline tools or trusted password managers for strength testing."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                        lineNumber: 350,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: "These tools estimate cracking time by calculating entropy, revealing if your password relies on predictable patterns. They provide immediate feedback, helping you understand the real-world resilience of your credentials against modern brute-force and dictionary-based attacks."
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                        lineNumber: 351,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                lineNumber: 348,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contentBlock,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        children: "Regular Password Audits"
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                        lineNumber: 355,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: "Regularly audit your passwords using built-in security features in password managers or trusted security tools. Look for:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                        lineNumber: 356,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        children: "Reused passwords"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                                        lineNumber: 358,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    " across multiple accounts"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                                lineNumber: 358,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        children: "Weak passwords"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                                        lineNumber: 359,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    " that don't meet current security standards"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                                lineNumber: 359,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        children: "Compromised passwords"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                                        lineNumber: 360,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    " that have appeared in data breaches"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                                lineNumber: 360,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        children: "Old passwords"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                                        lineNumber: 361,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    " that haven't been updated in years"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                                lineNumber: 361,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                        lineNumber: 357,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                                lineNumber: 354,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                        lineNumber: 347,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                lineNumber: 344,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 336,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].ctaSection,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].ctaCard,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    children: "Ready to Test Your Password Strength?"
                                }, void 0, false, {
                                    fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                    lineNumber: 371,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Use our secure tools to evaluate your current passwords and generate new, truly strong credentials. No signup required, completely private, and 100% secure."
                                }, void 0, false, {
                                    fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                    lineNumber: 372,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].ctaActions,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/create-free-username-and-password-with-accessvaulted-generator",
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btn} ${__TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btnPrimary} ${__TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordstrength$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btnLarge}`,
                                        children: "Test Password Strength Now"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                        lineNumber: 374,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                                    lineNumber: 373,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                            lineNumber: 370,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                        lineNumber: 369,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx",
                lineNumber: 161,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_c = PasswordStrength;
var __N_SSG = true;
const __TURBOPACK__default__export__ = PasswordStrength;
var _c;
__turbopack_context__.k.register(_c, "PasswordStrength");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/password-strength-what-makes-a-password-truly-secure";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/timezone/src/pages/password-strength-what-makes-a-password-truly-secure.jsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__424533d7._.js.map