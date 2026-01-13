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
"[project]/timezone/src/pages/passwordbiometrics.module.css [client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "articleCard": "passwordbiometrics-module__axmSTq__articleCard",
  "articleContainer": "passwordbiometrics-module__axmSTq__articleContainer",
  "articleContent": "passwordbiometrics-module__axmSTq__articleContent",
  "benefitCard": "passwordbiometrics-module__axmSTq__benefitCard",
  "benefitContent": "passwordbiometrics-module__axmSTq__benefitContent",
  "benefitContentText": "passwordbiometrics-module__axmSTq__benefitContentText",
  "benefitContentTitle": "passwordbiometrics-module__axmSTq__benefitContentTitle",
  "benefitIcon": "passwordbiometrics-module__axmSTq__benefitIcon",
  "benefitsGrid": "passwordbiometrics-module__axmSTq__benefitsGrid",
  "benefitsSection": "passwordbiometrics-module__axmSTq__benefitsSection",
  "btn": "passwordbiometrics-module__axmSTq__btn",
  "btnLarge": "passwordbiometrics-module__axmSTq__btnLarge",
  "btnPrimary": "passwordbiometrics-module__axmSTq__btnPrimary",
  "comparisonCard": "passwordbiometrics-module__axmSTq__comparisonCard",
  "comparisonContainer": "passwordbiometrics-module__axmSTq__comparisonContainer",
  "comparisonHeader": "passwordbiometrics-module__axmSTq__comparisonHeader",
  "comparisonHeaderSubtitle": "passwordbiometrics-module__axmSTq__comparisonHeaderSubtitle",
  "comparisonHeaderTitle": "passwordbiometrics-module__axmSTq__comparisonHeaderTitle",
  "comparisonList": "passwordbiometrics-module__axmSTq__comparisonList",
  "comparisonListItem": "passwordbiometrics-module__axmSTq__comparisonListItem",
  "comparisonNew": "passwordbiometrics-module__axmSTq__comparisonNew",
  "comparisonOld": "passwordbiometrics-module__axmSTq__comparisonOld",
  "comparisonSection": "passwordbiometrics-module__axmSTq__comparisonSection",
  "contentBlock": "passwordbiometrics-module__axmSTq__contentBlock",
  "contentBlockStrong": "passwordbiometrics-module__axmSTq__contentBlockStrong",
  "contentBlockText": "passwordbiometrics-module__axmSTq__contentBlockText",
  "contentBlockTitle": "passwordbiometrics-module__axmSTq__contentBlockTitle",
  "contentSection": "passwordbiometrics-module__axmSTq__contentSection",
  "ctaActions": "passwordbiometrics-module__axmSTq__ctaActions",
  "ctaCard": "passwordbiometrics-module__axmSTq__ctaCard",
  "ctaCardText": "passwordbiometrics-module__axmSTq__ctaCardText",
  "ctaCardTitle": "passwordbiometrics-module__axmSTq__ctaCardTitle",
  "ctaSection": "passwordbiometrics-module__axmSTq__ctaSection",
  "futureCard": "passwordbiometrics-module__axmSTq__futureCard",
  "futureCardText": "passwordbiometrics-module__axmSTq__futureCardText",
  "futureCardTitle": "passwordbiometrics-module__axmSTq__futureCardTitle",
  "futureSection": "passwordbiometrics-module__axmSTq__futureSection",
  "futureTip": "passwordbiometrics-module__axmSTq__futureTip",
  "futureTipStrong": "passwordbiometrics-module__axmSTq__futureTipStrong",
  "heroContent": "passwordbiometrics-module__axmSTq__heroContent",
  "heroSection": "passwordbiometrics-module__axmSTq__heroSection",
  "heroSubtitle": "passwordbiometrics-module__axmSTq__heroSubtitle",
  "heroTitle": "passwordbiometrics-module__axmSTq__heroTitle",
  "implementationSection": "passwordbiometrics-module__axmSTq__implementationSection",
  "practiceCard": "passwordbiometrics-module__axmSTq__practiceCard",
  "practiceContent": "passwordbiometrics-module__axmSTq__practiceContent",
  "practiceContentText": "passwordbiometrics-module__axmSTq__practiceContentText",
  "practiceContentTitle": "passwordbiometrics-module__axmSTq__practiceContentTitle",
  "practiceIcon": "passwordbiometrics-module__axmSTq__practiceIcon",
  "practicesContainer": "passwordbiometrics-module__axmSTq__practicesContainer",
  "sectionHeader": "passwordbiometrics-module__axmSTq__sectionHeader",
  "sectionHeaderTitle": "passwordbiometrics-module__axmSTq__sectionHeaderTitle",
  "sectionSubtitle": "passwordbiometrics-module__axmSTq__sectionSubtitle",
  "statusAvailable": "passwordbiometrics-module__axmSTq__statusAvailable",
  "statusEmerging": "passwordbiometrics-module__axmSTq__statusEmerging",
  "statusFuture": "passwordbiometrics-module__axmSTq__statusFuture",
  "techCardDescription": "passwordbiometrics-module__axmSTq__techCardDescription",
  "techCardTitle": "passwordbiometrics-module__axmSTq__techCardTitle",
  "techIcon": "passwordbiometrics-module__axmSTq__techIcon",
  "techStatus": "passwordbiometrics-module__axmSTq__techStatus",
  "technologiesGrid": "passwordbiometrics-module__axmSTq__technologiesGrid",
  "technologiesSection": "passwordbiometrics-module__axmSTq__technologiesSection",
  "technologyCard": "passwordbiometrics-module__axmSTq__technologyCard",
});
}),
"[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx [client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/timezone/src/pages/passwordbiometrics.module.css [client] (css module)");
;
;
;
;
;
const PasswordBiometrics = ({ currentDate, lastModifiedDate })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                        children: "Future of Passwords 2026 | Biometrics & Passkeys | AccessVaulted"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 11,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Explore the future of authentication with biometrics, passkeys, and passwordless technologies. Discover how emerging security methods are revolutionizing digital identity protection."
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 12,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "keywords",
                        content: "future of passwords, biometrics, passkeys, passwordless authentication, FIDO2, WebAuthn, digital security, authentication future, passwordless future, biometric authentication, facial recognition, fingerprint scanning, iris scanning, voice recognition, behavioral biometrics, passkey authentication, FIDO authentication, WebAuthn authentication, passwordless security, biometric security, authentication technologies, digital identity, cybersecurity future, authentication evolution, password replacement, password alternatives, authentication methods, security innovation, digital authentication, login security, account protection, identity verification, user authentication, secure access, protected login, authentication systems, security systems, protection systems, verification systems, access systems, login systems, account systems, identity systems, user systems, security technologies, protection technologies, verification technologies, access technologies, login technologies, account technologies, identity technologies, user technologies, security solutions, protection solutions, verification solutions, access solutions, login solutions, account solutions, identity solutions, user solutions, security tools, protection tools, verification tools, access tools, login tools, account tools, identity tools, user tools, security applications, protection applications, verification applications, access applications, login applications, account applications, identity applications, user applications, security software, protection software, verification software, access software, login software, account software, identity software, user software, security hardware, protection hardware, verification hardware, access hardware, login hardware, account hardware, identity hardware, user hardware, security devices, protection devices, verification devices, access devices, login devices, account devices, identity devices, user devices, security platforms, protection platforms, verification platforms, access platforms, login platforms, account platforms, identity platforms, user platforms, security services, protection services, verification services, access services, login services, account services, identity services, user services, security frameworks, protection frameworks, verification frameworks, access frameworks, login frameworks, account frameworks, identity frameworks, user frameworks, security standards, protection standards, verification standards, access standards, login standards, account standards, identity standards, user standards, security protocols, protection protocols, verification protocols, access protocols, login protocols, account protocols, identity protocols, user protocols, security methods, protection methods, verification methods, access methods, login methods, account methods, identity methods, user methods, security practices, protection practices, verification practices, access practices, login practices, account practices, identity practices, user practices, security strategies, protection strategies, verification strategies, access strategies, login strategies, account strategies, identity strategies, user strategies, security approaches, protection approaches, verification approaches, access approaches, login approaches, account approaches, identity approaches, user approaches, security models, protection models, verification models, access models, login models, account models, identity models, user models, security architectures, protection architectures, verification architectures, access architectures, login architectures, account architectures, identity architectures, user architectures, security designs, protection designs, verification designs, access designs, login designs, account designs, identity designs, user designs, security implementations, protection implementations, verification implementations, access implementations, login implementations, account implementations, identity implementations, user implementations, security deployments, protection deployments, verification deployments, access deployments, login deployments, account deployments, identity deployments, user deployments, security integrations, protection integrations, verification integrations, access integrations, login integrations, account integrations, identity integrations, user integrations, security adoptions, protection adoptions, verification adoptions, access adoptions, login adoptions, account adoptions, identity adoptions, user adoptions, security enablement, protection enablement, verification enablement, access enablement, login enablement, account enablement, identity enablement, user enablement, security activation, protection activation, verification activation, access activation, login activation, account activation, identity activation, user activation, security configuration, protection configuration, verification configuration, access configuration, login configuration, account configuration, identity configuration, user configuration, security setup, protection setup, verification setup, access setup, login setup, account setup, identity setup, user setup, security installation, protection installation, verification installation, access installation, login installation, account installation, identity installation, user installation, security maintenance, protection maintenance, verification maintenance, access maintenance, login maintenance, account maintenance, identity maintenance, user maintenance, security management, protection management, verification management, access management, login management, account management, identity management, user management, security monitoring, protection monitoring, verification monitoring, access monitoring, login monitoring, account monitoring, identity monitoring, user monitoring, security auditing, protection auditing, verification auditing, access auditing, login auditing, account auditing, identity auditing, user auditing, security assessment, protection assessment, verification assessment, access assessment, login assessment, account assessment, identity assessment, user assessment, security evaluation, protection evaluation, verification evaluation, access evaluation, login evaluation, account evaluation, identity evaluation, user evaluation, security testing, protection testing, verification testing, access testing, login testing, account testing, identity testing, user testing, security analysis, protection analysis, verification analysis, access analysis, login analysis, account analysis, identity analysis, user analysis, security review, protection review, verification review, access review, login review, account review, identity review, user review, security audit, protection audit, verification audit, access audit, login audit, account audit, identity audit, user audit, security check, protection check, verification check, access check, login check, account check, identity check, user check, security verification, protection verification, verification verification, access verification, login verification, account verification, identity verification, user verification, security validation, protection validation, verification validation, access validation, login validation, account validation, identity validation, user validation, security confirmation, protection confirmation, verification confirmation, access confirmation, login confirmation, account confirmation, identity confirmation, user confirmation, security approval, protection approval, verification approval, access approval, login approval, account approval, identity approval, user approval, accessvaulted password generator, free authentication tools, secure biometrics, username and password generator, online authentication security, future authentication guide, passwordless implementation, biometric security tools"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "author",
                        content: "AccessVaulted Cybersecurity Team"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "robots",
                        content: "index, follow, max-image-preview:large"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1.0"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "theme-color",
                        content: "#1a365d"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "date",
                        content: currentDate
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "last-modified",
                        content: lastModifiedDate
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "subject",
                        content: "Future Authentication Technologies"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "classification",
                        content: "Cybersecurity, Authentication, Biometrics"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "category",
                        content: "technology cybersecurity authentication"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "subcategory",
                        content: "future passwords biometrics"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "language",
                        content: "EN"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "revised",
                        content: "Friday, December 6, 2026"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "abstract",
                        content: "Comprehensive guide to future authentication technologies including biometrics, passkeys, and passwordless security methods revolutionizing digital identity protection"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "topic",
                        content: "Future Authentication Technologies and Passwordless Security"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "summary",
                        content: "Detailed analysis of emerging authentication technologies including biometrics, passkeys, and passwordless methods shaping the future of digital security"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "designer",
                        content: "AccessVaulted Security Team"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "copyright",
                        content: "AccessVaulted"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "distribution",
                        content: "Global"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "coverage",
                        content: "Worldwide"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "rating",
                        content: "Safe For Kids"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "revisit-after",
                        content: "7 days"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:title",
                        content: "Future of Passwords 2026 | Biometrics & Passkeys | AccessVaulted"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:description",
                        content: "Explore the future of authentication with biometrics, passkeys, and passwordless technologies. Discover how emerging security methods are revolutionizing digital identity protection."
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:type",
                        content: "article"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:url",
                        content: "https://www.accessvaulted.com/the-future-of-passwords-biometrics-and-beyond"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:image",
                        content: "https://www.accessvaulted.com/images/password-future-preview.jpg"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:site_name",
                        content: "AccessVaulted"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:locale",
                        content: "en_US"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:updated_time",
                        content: lastModifiedDate
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "article:published_time",
                        content: lastModifiedDate
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "article:modified_time",
                        content: lastModifiedDate
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "article:author",
                        content: "AccessVaulted Security Team"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "article:section",
                        content: "Authentication Future"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "article:tag",
                        content: "future of passwords"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "article:tag",
                        content: "biometrics"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "article:tag",
                        content: "passkeys"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "article:tag",
                        content: "passwordless authentication"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "article:tag",
                        content: "FIDO2"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:card",
                        content: "summary_large_image"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:title",
                        content: "Future of Passwords 2026 | AccessVaulted Security"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:description",
                        content: "Comprehensive guide to future authentication technologies including biometrics, passkeys, and passwordless security methods revolutionizing digital identity."
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:image",
                        content: "https://www.accessvaulted.com/images/password-future-preview.jpg"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:site",
                        content: "@AccessVaulted"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:creator",
                        content: "@AccessVaulted"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:label1",
                        content: "Reading time"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:data1",
                        content: "15 minutes"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:label2",
                        content: "Category"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:data2",
                        content: "Authentication Future"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "canonical",
                        href: "https://www.accessvaulted.com/the-future-of-passwords-biometrics-and-beyond"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                        type: "application/ld+json",
                        dangerouslySetInnerHTML: {
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "Article",
                                "headline": "The Future of Passwords: Biometrics and Beyond",
                                "description": "Comprehensive guide to emerging authentication technologies including biometrics, passkeys, and passwordless security methods that are revolutionizing digital identity protection and authentication.",
                                "image": "https://www.accessvaulted.com/images/password-future-preview.jpg",
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
                                    "@id": "https://www.accessvaulted.com/the-future-of-passwords-biometrics-and-beyond"
                                },
                                "articleSection": "Authentication Future",
                                "keywords": "future of passwords biometrics passkeys passwordless authentication FIDO2 WebAuthn digital security authentication future",
                                "articleBody": "Comprehensive analysis of emerging authentication technologies including biometrics, passkeys, and passwordless security methods that are revolutionizing digital identity protection and shaping the future of authentication security.",
                                "wordCount": "4000",
                                "timeRequired": "PT15M",
                                "inLanguage": "en-US"
                            })
                        }
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 87,
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
                                        "name": "Future of Passwords Guide",
                                        "item": "https://www.accessvaulted.com/the-future-of-passwords-biometrics-and-beyond"
                                    }
                                ]
                            })
                        }
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                        type: "application/ld+json",
                        dangerouslySetInnerHTML: {
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "FAQPage",
                                "mainEntity": [
                                    {
                                        "@type": "Question",
                                        "name": "What are passkeys?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Passkeys are a new type of passwordless authentication that uses cryptographic key pairs instead of passwords. They allow you to sign in using biometrics (like fingerprint or face recognition) or a device PIN.",
                                            "dateCreated": lastModifiedDate
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "How secure are biometric authentication methods?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Biometric authentication is highly secure when implemented properly. Modern systems use sophisticated algorithms that make it extremely difficult to spoof fingerprints, facial features, or other biometric data. They're generally more secure than traditional passwords.",
                                            "dateCreated": lastModifiedDate
                                        }
                                    }
                                ]
                            })
                        }
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "format-detection",
                        content: "telephone=no"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "google",
                        content: "notranslate"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "googlebot",
                        content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "bingbot",
                        content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                lineNumber: 10,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].articleContainer,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].heroSection,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].heroContent,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].heroTitle,
                                    children: "The Future of Passwords: Biometrics and Beyond"
                                }, void 0, false, {
                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                    lineNumber: 198,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].heroSubtitle,
                                    children: "Explore emerging technologies that may replace traditional passwords in the coming years and revolutionize digital authentication."
                                }, void 0, false, {
                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                    lineNumber: 199,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                            lineNumber: 197,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 196,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contentSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionHeader,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionHeaderTitle,
                                        children: "The Passwordless Revolution"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                        lineNumber: 208,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionSubtitle,
                                        children: "How biometrics and cryptographic keys are making traditional passwords obsolete"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                        lineNumber: 209,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                lineNumber: 207,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].articleCard,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].articleContent,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contentBlock,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contentBlockTitle,
                                                    children: "Goodbye Passwords, Hello Passkeys"
                                                }, void 0, false, {
                                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                    lineNumber: 217,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contentBlockText,
                                                    children: [
                                                        "Apple, Google, and Microsoft are rolling out ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contentBlockStrong,
                                                            children: "passkeys"
                                                        }, void 0, false, {
                                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                            lineNumber: 218,
                                                            columnNumber: 101
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        " — passwordless login using biometrics (face, fingerprint) and device-based security keys."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                    lineNumber: 218,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contentBlockText,
                                                    children: 'Passkeys represent a fundamental shift in digital authentication, moving away from the vulnerable "what you know" model to a far more secure "what you are" and "what you have" framework. Built on FIDO2 and WebAuthn standards, this technology promises to eliminate many of the security vulnerabilities associated with traditional passwords.'
                                                }, void 0, false, {
                                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                    lineNumber: 219,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                            lineNumber: 216,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contentBlock,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contentBlockTitle,
                                                    children: "The Limitations of Traditional Passwords"
                                                }, void 0, false, {
                                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                    lineNumber: 223,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contentBlockText,
                                                    children: "For decades, passwords have been the primary method of authentication, but they come with inherent weaknesses: they can be forgotten, stolen, phished, or cracked. The passwordless approach addresses these fundamental flaws by removing the human element from the authentication equation."
                                                }, void 0, false, {
                                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                    lineNumber: 224,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                            lineNumber: 222,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                    lineNumber: 215,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                lineNumber: 214,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].technologiesSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionHeader,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionHeaderTitle,
                                        children: "Emerging Authentication Technologies"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                        lineNumber: 233,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionSubtitle,
                                        children: "Next-generation security methods that are shaping the future of digital identity"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                        lineNumber: 234,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                lineNumber: 232,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].technologiesGrid,
                                children: [
                                    {
                                        icon: "👆",
                                        title: "Biometric Authentication",
                                        description: "Uses unique physical characteristics like fingerprints, facial recognition, or iris scans for secure, convenient access.",
                                        status: "Available"
                                    },
                                    {
                                        icon: "🔑",
                                        title: "Passkeys",
                                        description: "Cryptographic key pairs that replace passwords entirely, using device biometrics for authentication across services.",
                                        status: "Emerging"
                                    },
                                    {
                                        icon: "📱",
                                        title: "Device-Based Authentication",
                                        description: "Uses your smartphone or security key as the primary authentication factor, eliminating password entry.",
                                        status: "Available"
                                    },
                                    {
                                        icon: "🧠",
                                        title: "Behavioral Biometrics",
                                        description: "Analyzes unique patterns in how you type, swipe, or hold your device for continuous authentication.",
                                        status: "Future"
                                    },
                                    {
                                        icon: "🛡️",
                                        title: "FIDO2 Security Keys",
                                        description: "Hardware devices that provide phishing-resistant authentication using public key cryptography.",
                                        status: "Available"
                                    },
                                    {
                                        icon: "🌐",
                                        title: "Decentralized Identity",
                                        description: "Self-sovereign identity systems that give users control over their digital identities without centralized passwords.",
                                        status: "Future"
                                    }
                                ].map((tech, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].technologyCard,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].techIcon,
                                                children: tech.icon
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                lineNumber: 279,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].techCardTitle,
                                                children: tech.title
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                lineNumber: 280,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].techCardDescription,
                                                children: tech.description
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                lineNumber: 281,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].techStatus} ${tech.status === 'Available' ? __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].statusAvailable : tech.status === 'Emerging' ? __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].statusEmerging : __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].statusFuture}`,
                                                children: tech.status
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                lineNumber: 282,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                        lineNumber: 278,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                lineNumber: 239,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 231,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contentSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionHeader,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionHeaderTitle,
                                        children: "How Passkeys Work: The Technical Magic"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                        lineNumber: 297,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionSubtitle,
                                        children: "Understanding the cryptographic foundation behind passwordless authentication"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                        lineNumber: 298,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                lineNumber: 296,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].articleCard,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].articleContent,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contentBlock,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contentBlockTitle,
                                                    children: "The Cryptographic Key Pair System"
                                                }, void 0, false, {
                                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                    lineNumber: 306,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contentBlockText,
                                                    children: "Instead of storing passwords on servers, your device generates a cryptographic key pair. The private key stays securely on your phone or laptop; the public key is stored by the service. This eliminates the risk of password theft entirely."
                                                }, void 0, false, {
                                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                    lineNumber: 307,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contentBlockText,
                                                    children: "The process begins when you choose to create a passkey for an account. Your device generates a unique pair of cryptographic keys. The private key remains securely encrypted and stored exclusively on your device, never shared with anyone. The public key, which is useless on its own to an attacker, is sent to the website or service."
                                                }, void 0, false, {
                                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                    lineNumber: 308,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                            lineNumber: 305,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contentBlock,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contentBlockTitle,
                                                    children: "The Authentication Flow"
                                                }, void 0, false, {
                                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                    lineNumber: 312,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contentBlockText,
                                                    children: "When you log in, the website sends a cryptographic challenge to your device. Your device must then use the corresponding private key to sign and solve this challenge. Access to the private key is protected by your device's own authentication method—this could be biometric verification like Face ID or Touch ID, or your device's PIN."
                                                }, void 0, false, {
                                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                    lineNumber: 313,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contentBlockText,
                                                    children: "This elegant system entirely bypasses the risks of weak, reused, or stolen passwords, offering a seamless and phishing-resistant login experience that is both simpler for users and far more secure for everyone."
                                                }, void 0, false, {
                                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                    lineNumber: 314,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                            lineNumber: 311,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                    lineNumber: 304,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                lineNumber: 303,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 295,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].benefitsSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionHeader,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionHeaderTitle,
                                        children: "Benefits of Passwordless Authentication"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                        lineNumber: 323,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionSubtitle,
                                        children: "Why biometrics and passkeys represent a major security and usability improvement"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                        lineNumber: 324,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                lineNumber: 322,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].benefitsGrid,
                                children: [
                                    {
                                        icon: "🎯",
                                        title: "Phishing Immune",
                                        description: "Passkeys are tied to specific websites, making them immune to phishing attacks that trick users into entering credentials on fake sites."
                                    },
                                    {
                                        icon: "⚡",
                                        title: "Faster Login",
                                        description: "No more typing complex passwords. Authentication happens with a simple biometric scan or device unlock."
                                    },
                                    {
                                        icon: "🔒",
                                        title: "No Password Databases",
                                        description: "Eliminates the risk of password database breaches since no passwords are stored on servers."
                                    },
                                    {
                                        icon: "🔄",
                                        title: "No More Resets",
                                        description: "Eliminates forgotten password scenarios and the security risks associated with password reset processes."
                                    },
                                    {
                                        icon: "📱",
                                        title: "Cross-Device Sync",
                                        description: "Passkeys can securely sync across your trusted devices, providing seamless access everywhere."
                                    },
                                    {
                                        icon: "👥",
                                        title: "Better User Experience",
                                        description: "Simplifies the login process while significantly enhancing security—the best of both worlds."
                                    }
                                ].map((benefit, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].benefitCard,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].benefitIcon,
                                                children: benefit.icon
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                lineNumber: 363,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].benefitContent,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].benefitContentTitle,
                                                        children: benefit.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                        lineNumber: 365,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].benefitContentText,
                                                        children: benefit.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                        lineNumber: 366,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                lineNumber: 364,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                        lineNumber: 362,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                lineNumber: 329,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 321,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionHeader,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionHeaderTitle,
                                        children: "Traditional vs. Modern Authentication"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                        lineNumber: 376,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionSubtitle,
                                        children: "How passwordless methods compare to traditional password-based security"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                        lineNumber: 377,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                lineNumber: 375,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonContainer,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonCard,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonOld,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonHeader,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonHeaderTitle,
                                                            children: "❌ Traditional Passwords"
                                                        }, void 0, false, {
                                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                            lineNumber: 386,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonHeaderSubtitle,
                                                            children: "Vulnerable & Complex"
                                                        }, void 0, false, {
                                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                            lineNumber: 387,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                    lineNumber: 385,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonList,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonListItem,
                                                            children: "Prone to phishing attacks"
                                                        }, void 0, false, {
                                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                            lineNumber: 390,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonListItem,
                                                            children: "Risk of database breaches"
                                                        }, void 0, false, {
                                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                            lineNumber: 391,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonListItem,
                                                            children: "Password reuse across sites"
                                                        }, void 0, false, {
                                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                            lineNumber: 392,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonListItem,
                                                            children: "Forgotten password resets"
                                                        }, void 0, false, {
                                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                            lineNumber: 393,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonListItem,
                                                            children: "Complexity requirements"
                                                        }, void 0, false, {
                                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                            lineNumber: 394,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonListItem,
                                                            children: "Manual entry required"
                                                        }, void 0, false, {
                                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                            lineNumber: 395,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonListItem,
                                                            children: "Social engineering risks"
                                                        }, void 0, false, {
                                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                            lineNumber: 396,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                    lineNumber: 389,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                            lineNumber: 384,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonNew,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonHeader,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonHeaderTitle,
                                                            children: "✅ Passwordless Future"
                                                        }, void 0, false, {
                                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                            lineNumber: 401,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonHeaderSubtitle,
                                                            children: "Secure & Simple"
                                                        }, void 0, false, {
                                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                            lineNumber: 402,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                    lineNumber: 400,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonList,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonListItem,
                                                            children: "Phishing-resistant by design"
                                                        }, void 0, false, {
                                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                            lineNumber: 405,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonListItem,
                                                            children: "No passwords to steal"
                                                        }, void 0, false, {
                                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                            lineNumber: 406,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonListItem,
                                                            children: "Unique for every service"
                                                        }, void 0, false, {
                                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                            lineNumber: 407,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonListItem,
                                                            children: "No forgotten credentials"
                                                        }, void 0, false, {
                                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                            lineNumber: 408,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonListItem,
                                                            children: "Biometric convenience"
                                                        }, void 0, false, {
                                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                            lineNumber: 409,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonListItem,
                                                            children: "One-tap authentication"
                                                        }, void 0, false, {
                                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                            lineNumber: 410,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comparisonListItem,
                                                            children: "Cryptographic security"
                                                        }, void 0, false, {
                                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                            lineNumber: 411,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                    lineNumber: 404,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                            lineNumber: 399,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                    lineNumber: 383,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                lineNumber: 382,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 374,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].implementationSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionHeader,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionHeaderTitle,
                                        children: "Getting Started with Passwordless Today"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                        lineNumber: 421,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionSubtitle,
                                        children: "Practical steps to begin your transition to modern authentication methods"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                        lineNumber: 422,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                lineNumber: 420,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practicesContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceCard,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceIcon,
                                                children: "📱"
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                lineNumber: 429,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceContent,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceContentTitle,
                                                        children: "Enable Biometric Authentication"
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                        lineNumber: 431,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceContentText,
                                                        children: "Start using Face ID, Touch ID, or Windows Hello on your devices for supported apps and services. Most modern devices and popular services now support biometric authentication as a secure alternative to passwords."
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                        lineNumber: 432,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                lineNumber: 430,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                        lineNumber: 428,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceCard,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceIcon,
                                                children: "🔑"
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                lineNumber: 437,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceContent,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceContentTitle,
                                                        children: "Adopt Passkeys Where Available"
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                        lineNumber: 439,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceContentText,
                                                        children: "Look for passkey options in your account security settings for major services like Google, Apple, Microsoft, and popular websites. Create passkeys for your most important accounts to experience passwordless login."
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                        lineNumber: 440,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                lineNumber: 438,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                        lineNumber: 436,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceCard,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceIcon,
                                                children: "🛡️"
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                lineNumber: 445,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceContent,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceContentTitle,
                                                        children: "Use a Password Manager as Bridge"
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                        lineNumber: 447,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceContentText,
                                                        children: "While transitioning, use a password manager to generate and store strong unique passwords. Many password managers are adding passkey support, making them ideal bridges to the passwordless future."
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                        lineNumber: 448,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                lineNumber: 446,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                        lineNumber: 444,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceCard,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceIcon,
                                                children: "🌐"
                                            }, void 0, false, {
                                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                lineNumber: 453,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceContent,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceContentTitle,
                                                        children: "Stay Informed About Adoption"
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                        lineNumber: 455,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].practiceContentText,
                                                        children: "Follow updates from major tech companies and security organizations about passkey adoption. The ecosystem is evolving rapidly, with more services adding support every month."
                                                    }, void 0, false, {
                                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                        lineNumber: 456,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                                lineNumber: 454,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                        lineNumber: 452,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                lineNumber: 427,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 419,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].futureSection,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].futureCard,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].futureCardTitle,
                                    children: "The Passwordless Timeline"
                                }, void 0, false, {
                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                    lineNumber: 465,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].futureCardText,
                                    children: "Passkeys provide a seamless and future-proof authentication experience, combining top-tier security with unmatched convenience. The password isn't dead yet — but its days are numbered as major platforms accelerate their transition to passwordless authentication."
                                }, void 0, false, {
                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                    lineNumber: 466,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].futureTip,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].futureTipStrong,
                                            children: "Start Today:"
                                        }, void 0, false, {
                                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                            lineNumber: 468,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " Begin exploring passkey options on your devices and enable biometric authentication where available. The future of secure, convenient authentication is already here—it's just not evenly distributed yet."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                    lineNumber: 467,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                            lineNumber: 464,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 463,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].ctaSection,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].ctaCard,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].ctaCardTitle,
                                    children: "Ready for the Passwordless Future?"
                                }, void 0, false, {
                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                    lineNumber: 476,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].ctaCardText,
                                    children: "While we transition to biometrics and passkeys, ensure your current passwords are as secure as possible. Generate strong, unique passwords that protect your accounts today while preparing for tomorrow's authentication methods."
                                }, void 0, false, {
                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                    lineNumber: 477,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].ctaActions,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/create-free-username-and-password-with-accessvaulted-generator",
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btn} ${__TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btnPrimary} ${__TURBOPACK__imported__module__$5b$project$5d2f$timezone$2f$src$2f$pages$2f$passwordbiometrics$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].btnLarge}`,
                                        children: "Generate Secure Credentials"
                                    }, void 0, false, {
                                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                        lineNumber: 479,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                                    lineNumber: 478,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                            lineNumber: 475,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                        lineNumber: 474,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx",
                lineNumber: 194,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_c = PasswordBiometrics;
var __N_SSG = true;
const __TURBOPACK__default__export__ = PasswordBiometrics;
var _c;
__turbopack_context__.k.register(_c, "PasswordBiometrics");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/the-future-of-passwords-biometrics-and-beyond";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx [client] (ecmascript)");
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
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/timezone/src/pages/the-future-of-passwords-biometrics-and-beyond.jsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__c6ed475c._.js.map