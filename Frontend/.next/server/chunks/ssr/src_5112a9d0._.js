module.exports = {

"[project]/src/components/page-title.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "PageTitle": (()=>PageTitle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function PageTitle({ title, icon: Icon, action }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-6 flex items-center justify-between",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    Icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                        className: "h-7 w-7 text-primary"
                    }, void 0, false, {
                        fileName: "[project]/src/components/page-title.tsx",
                        lineNumber: 14,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-semibold tracking-tight text-foreground md:text-3xl",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/page-title.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/page-title.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            action
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/page-title.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/ui/TablePagination.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-ssr] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevrons-left.js [app-ssr] (ecmascript) <export default as ChevronsLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevrons-right.js [app-ssr] (ecmascript) <export default as ChevronsRight>");
"use client";
;
;
const TablePagination = ({ currentPage, totalPages, rowsPerPage, onPageChange, onRowsPerPageChange, className = "" })=>{
    const rowsOptions = [
        10,
        25,
        50,
        100
    ];
    const gotoFirst = ()=>onPageChange(1);
    const gotoLast = ()=>onPageChange(totalPages);
    const gotoPrev = ()=>onPageChange(Math.max(1, currentPage - 1));
    const gotoNext = ()=>onPageChange(Math.min(totalPages, currentPage + 1));
    const disabledFirstPrev = currentPage <= 1;
    const disabledNextLast = currentPage >= totalPages;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full ${className}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white border rounded-md shadow-sm p-2 flex flex-col sm:flex-row items-center justify-between gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center space-x-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "text-sm text-gray-600",
                            children: "Rows per page:"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/TablePagination.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            value: rowsPerPage,
                            onChange: (e)=>onRowsPerPageChange(Number(e.target.value)),
                            className: "border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300",
                            children: rowsOptions.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: opt,
                                    children: opt
                                }, opt, false, {
                                    fileName: "[project]/src/components/ui/TablePagination.tsx",
                                    lineNumber: 45,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/TablePagination.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/TablePagination.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm text-gray-700 text-center sm:text-left",
                    children: [
                        "Page ",
                        currentPage,
                        " of ",
                        totalPages
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/TablePagination.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center space-x-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: gotoFirst,
                            disabled: disabledFirstPrev,
                            "aria-label": "first page",
                            className: `p-2 rounded text-sm border bg-white hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed ${disabledFirstPrev ? "" : "shadow-sm"}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsLeft$3e$__["ChevronsLeft"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/TablePagination.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/TablePagination.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: gotoPrev,
                            disabled: disabledFirstPrev,
                            "aria-label": "previous page",
                            className: `p-2 rounded text-sm border bg-white hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed ${disabledFirstPrev ? "" : "shadow-sm"}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/TablePagination.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/TablePagination.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: gotoNext,
                            disabled: disabledNextLast,
                            "aria-label": "next page",
                            className: `p-2 rounded text-sm border bg-white hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed ${disabledNextLast ? "" : "shadow-sm"}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/TablePagination.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/TablePagination.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: gotoLast,
                            disabled: disabledNextLast,
                            "aria-label": "last page",
                            className: `p-2 rounded text-sm border bg-white hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed ${disabledNextLast ? "" : "shadow-sm"}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsRight$3e$__["ChevronsRight"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/TablePagination.tsx",
                                lineNumber: 98,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/TablePagination.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/TablePagination.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/TablePagination.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/TablePagination.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = TablePagination;
}}),
"[project]/src/app/dashboard/faculty/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$page$2d$title$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/page-title.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$land$2d$plot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LandPlot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/land-plot.js [app-ssr] (ecmascript) <export default as LandPlot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-plus.js [app-ssr] (ecmascript) <export default as PlusCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$TablePagination$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/TablePagination.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$encrypt$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/encrypt.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
const departments = [
    "Computer Science & Engineering",
    "Information Science & Engineering",
    "Electronics & Communication Engineering",
    "Computer Science & Design",
    "Computer Science & Business System",
    "Artificial Intelligence & Machine Learning",
    "Mechanical Engineering",
    "Science & Humanities",
    "Placement Team",
    "Admin",
    "General",
    "Student Welfare Department",
    "Dean Office",
    "Physical Education",
    "Hostel",
    "Library"
];
const subDepartments = [
    "Chemistry",
    "Physics",
    "Mathematics",
    "Humanities & Management",
    "Computintg Science",
    "Engineering Science",
    "Civil"
];
const bufferToBase64 = (buffer)=>{
    const binary = buffer.data.reduce((acc, byte)=>acc + String.fromCharCode(byte), "");
    const base64 = btoa(binary);
    return `data:image/jpeg;base64,${base64}`;
};
const FacultyModal = ({ isOpen, onClose, onSubmit, mode, facultyToEdit, API_BASE_URL, facultyList })=>{
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [availablePriorities, setAvailablePriorities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        null
    ]);
    const [isLoadingPriorities, setIsLoadingPriorities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const initialFaculty = {
        id: Math.random().toString(36).substr(2, 9),
        name: "",
        designation: "",
        department: "",
        subDepartment: "",
        email: "",
        joiningDate: "",
        experience: "",
        employmentType: "Regular",
        type: "Teaching Staff",
        priority: null,
        qualifications: [],
        avatar: null,
        achievements: [],
        bookChapters: [],
        certifications: [],
        internationalJournalPublications: [],
        internationalConferencePublications: [],
        isKeyFunctionary: false,
        keyFunctionaryName: "",
        keyFunctionaryPriority: null,
        isHod: false,
        hodName: "",
        hodPriority: null
    };
    const [faculty, setFaculty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialFaculty);
    const [avatarFile, setAvatarFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [availableKeyFunctionaryPriorities, setAvailableKeyFunctionaryPriorities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [availableHodPriorities, setAvailableHodPriorities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadAvailablePriorities = async ()=>{
            if (!faculty.department) {
                setAvailablePriorities([
                    null
                ]);
                setIsLoadingPriorities(false);
                return;
            }
            setIsLoadingPriorities(true);
            try {
                const response = await fetch(`${API_BASE_URL}/faculty?department=${encodeURIComponent(faculty.department)}&all=true`);
                if (!response.ok) {
                    throw new Error("Failed to fetch department faculties");
                }
                const departmentFaculties = await response.json();
                const maxPriority = departmentFaculties.length + 1;
                const availablePrioritiesList = [
                    null
                ];
                for(let i = 1; i <= maxPriority; i++){
                    availablePrioritiesList.push(i);
                }
                setAvailablePriorities(availablePrioritiesList);
            } catch (error) {
                /* eslint-disable */ console.error(...oo_tx(`826269936_177_8_177_58_11`, "Error fetching priorities:", error));
                setAvailablePriorities([
                    null
                ]);
            } finally{
                setIsLoadingPriorities(false);
            }
        };
        const loadKeyFunctionaryPriorities = async ()=>{
            try {
                const response = await fetch(`${API_BASE_URL}/faculty?keyFunctionary=true&all=true`);
                if (response.ok) {
                    const keyFunctionaries = await response.json();
                    const maxKFPriority = keyFunctionaries.length + 1;
                    const list = [];
                    for(let i = 1; i <= maxKFPriority; i++){
                        list.push(i);
                    }
                    setAvailableKeyFunctionaryPriorities(list);
                }
            } catch (e) {
                /* eslint-disable */ console.error(...oo_tx(`826269936_197_8_197_24_11`, e));
                setAvailableKeyFunctionaryPriorities(Array.from({
                    length: 20
                }, (_, i)=>i + 1));
            }
        };
        const loadHodPriorities = async ()=>{
            try {
                const response = await fetch(`${API_BASE_URL}/faculty?hod=true&all=true`);
                if (response.ok) {
                    const hods = await response.json();
                    const maxHodPriority = hods.length + 1;
                    const list = [];
                    for(let i = 1; i <= maxHodPriority; i++){
                        list.push(i);
                    }
                    setAvailableHodPriorities(list);
                }
            } catch (e) {
                /* eslint-disable */ console.error(...oo_tx(`826269936_215_8_215_24_11`, e));
                setAvailableHodPriorities(Array.from({
                    length: 20
                }, (_, i)=>i + 1));
            }
        };
        loadAvailablePriorities();
        if (faculty.isKeyFunctionary) {
            loadKeyFunctionaryPriorities();
        }
        if (faculty.isHod) {
            loadHodPriorities();
        }
    }, [
        faculty.department,
        faculty.id,
        API_BASE_URL,
        faculty.isKeyFunctionary,
        faculty.isHod
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mode === "add" && faculty.department) {
            setFaculty((prev)=>({
                    ...prev,
                    priority: null,
                    subDepartment: ""
                }));
        }
    }, [
        faculty.department,
        mode
    ]);
    // Initial states for each section
    const initialQualification = {
        id: Math.random().toString(36).substr(2, 9),
        degree: "",
        nameOfDigree: "",
        passingYear: "",
        college: "",
        specialization: ""
    };
    const [newQualification, setNewQualification] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialQualification);
    const [editQualificationId, setEditQualificationId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const initialAchievement = {
        id: Math.random().toString(36).substr(2, 9),
        heading: "",
        descriptions: [
            ""
        ]
    };
    const [newAchievement, setNewAchievement] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialAchievement);
    const [editAchievementId, setEditAchievementId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentDescriptionIndex, setCurrentDescriptionIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const initialBookChapter = {
        id: Math.random().toString(36).substr(2, 9),
        heading: "",
        descriptions: [
            ""
        ]
    };
    const [newBookChapter, setNewBookChapter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialBookChapter);
    const [editBookChapterId, setEditBookChapterId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentBookChapterDescriptionIndex, setCurrentBookChapterDescriptionIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const initialCertification = {
        id: Math.random().toString(36).substr(2, 9),
        heading: "",
        descriptions: [
            ""
        ]
    };
    const [newCertification, setNewCertification] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialCertification);
    const [editCertificationId, setEditCertificationId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentCertificationDescriptionIndex, setCurrentCertificationDescriptionIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const initialJournal = {
        id: Math.random().toString(36).substr(2, 9),
        publicationsData: ""
    };
    const [newJournalPublication, setNewJournalPublication] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialJournal);
    const [editJournalPublicationId, setEditJournalPublicationId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const initialConference = {
        id: Math.random().toString(36).substr(2, 9),
        conferencePublications: ""
    };
    const [newConferencePublication, setNewConferencePublication] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialConference);
    const [editConferencePublicationId, setEditConferencePublicationId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mode === "add") {
            setFaculty(initialFaculty);
            setAvatarFile(null);
            setNewQualification(initialQualification);
            setEditQualificationId(null);
            setNewAchievement(initialAchievement);
            setEditAchievementId(null);
            setCurrentDescriptionIndex(0);
            setNewBookChapter(initialBookChapter);
            setEditBookChapterId(null);
            setCurrentBookChapterDescriptionIndex(0);
            setNewCertification(initialCertification);
            setEditCertificationId(null);
            setCurrentCertificationDescriptionIndex(0);
            setNewJournalPublication(initialJournal);
            setEditJournalPublicationId(null);
            setNewConferencePublication(initialConference);
            setEditConferencePublicationId(null);
            setStep(1);
            setErrors({});
        } else if (mode === "edit" && facultyToEdit) {
            setFaculty(facultyToEdit);
            setAvatarFile(null);
            setNewQualification(initialQualification);
            setEditQualificationId(null);
            setNewAchievement(initialAchievement);
            setEditAchievementId(null);
            setCurrentDescriptionIndex(0);
            setNewBookChapter(initialBookChapter);
            setEditBookChapterId(null);
            setCurrentBookChapterDescriptionIndex(0);
            setNewCertification(initialCertification);
            setEditCertificationId(null);
            setCurrentCertificationDescriptionIndex(0);
            setNewJournalPublication(initialJournal);
            setEditJournalPublicationId(null);
            setNewConferencePublication(initialConference);
            setEditConferencePublicationId(null);
            setStep(1);
            setErrors({});
        }
    }, [
        mode,
        facultyToEdit,
        isOpen
    ]);
    const totalSteps = 5;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (step === 2 && faculty.qualifications.length > 0 && !editQualificationId) {
            setNewQualification(faculty.qualifications[0]);
            setEditQualificationId(faculty.qualifications[0].id);
        }
        if (step === 3 && faculty.achievements && faculty.achievements.length > 0 && !editAchievementId) {
            setNewAchievement(faculty.achievements[0]);
            setEditAchievementId(faculty.achievements[0].id);
            setCurrentDescriptionIndex(0);
        }
        if (step === 4 && faculty.bookChapters && faculty.bookChapters.length > 0 && !editBookChapterId) {
            setNewBookChapter(faculty.bookChapters[0]);
            setEditBookChapterId(faculty.bookChapters[0].id);
            setCurrentBookChapterDescriptionIndex(0);
        }
        if (step === 5 && faculty.certifications && faculty.certifications.length > 0 && !editCertificationId) {
            setNewCertification(faculty.certifications[0]);
            setEditCertificationId(faculty.certifications[0].id);
            setCurrentCertificationDescriptionIndex(0);
        }
    }, [
        step
    ]);
    const validateStep = (currentStep)=>{
        const newErrors = {};
        if (currentStep === 1) {
            const isAdminOrGeneral = faculty.department === "Admin" || faculty.department === "General" || faculty.department === "Student Welfare Department" || faculty.department === "Dean Office" || faculty.department === "Hostel" || faculty.department === "Library" || faculty.department === "Physical Education";
            if (!isAdminOrGeneral) {
                if (!faculty.name || faculty.name.trim() === "") newErrors.name = "Name is required";
                if (!faculty.designation || faculty.designation.trim() === "") newErrors.designation = "Designation is required";
                if (!faculty.department) newErrors.department = "Department is required";
                // if (faculty.department === "Science & Humanities" && faculty.type !== "Technical Staff" && !faculty.subDepartment) {
                //   newErrors.subDepartment = "Sub-department is required for Science & Humanities";
                // }
                if (!faculty.joiningDate) newErrors.joiningDate = "Joining date is required";
                if (!faculty.experience || faculty.experience.trim() === "") newErrors.experience = "Experience is required";
                if (!faculty.employmentType) newErrors.employmentType = "Employment type is required";
                if (mode === "add" && !faculty.avatar && !avatarFile) newErrors.avatar = "Avatar is required";
                if (faculty.isKeyFunctionary && (!faculty.keyFunctionaryName || faculty.keyFunctionaryName.trim() === "")) {
                    newErrors.keyFunctionaryName = "Key Functionary Name is required";
                }
                if (!faculty.type) newErrors.type = "Type is required";
                if (faculty.isHod && (!faculty.hodName || faculty.hodName.trim() === "")) {
                    newErrors.hodName = "Department Name (HOD) is required";
                }
            }
        }
        if (currentStep === 2) {
            const isAdminOrGeneral = faculty.department === "Admin" || faculty.department === "General" || faculty.department === "Student Welfare Department" || faculty.department === "Dean Office" || faculty.department === "Hostel" || faculty.department === "Library" || faculty.department === "Physical Education";
            // Only validate if NOT Admin/General
            if (!isAdminOrGeneral) {
                const isAddingOrUpdating = newQualification.degree || newQualification.nameOfDigree || newQualification.passingYear || newQualification.college || newQualification.specialization || editQualificationId;
                if (isAddingOrUpdating) {
                    if (!newQualification.degree || newQualification.degree.trim() === "") {
                        newErrors.degree = "Degree is required";
                    }
                    if (!newQualification.nameOfDigree || newQualification.nameOfDigree.trim() === "") {
                        newErrors.nameOfDigree = "Name of degree is required";
                    }
                    if (!newQualification.passingYear || newQualification.passingYear.trim() === "") {
                        newErrors.passingYear = "Passing Year is required";
                    }
                    if (!newQualification.college || newQualification.college.trim() === "") {
                        newErrors.college = "College is required";
                    }
                    if (!newQualification.specialization || newQualification.specialization.trim() === "") {
                        newErrors.specialization = "Specialization is required";
                    }
                }
                if (mode === "edit" && faculty.qualifications.length === 0 && !isAddingOrUpdating) {
                    newErrors.qualifications = "At least one qualification is required";
                }
                if (mode === "add" && faculty.qualifications.length === 0 && !isAddingOrUpdating) {
                    newErrors.qualifications = "At least one qualification is required";
                }
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleNext = ()=>{
        if (step === 2 && newQualification.degree && newQualification.nameOfDigree && newQualification.passingYear && newQualification.college && newQualification.specialization) {
            if (editQualificationId) {
                setFaculty({
                    ...faculty,
                    qualifications: faculty.qualifications.map((q)=>q.id === editQualificationId ? {
                            ...newQualification,
                            id: q.id
                        } : q)
                });
                setEditQualificationId(null);
                setNewQualification(initialQualification);
            } else {
                setFaculty({
                    ...faculty,
                    qualifications: [
                        ...faculty.qualifications,
                        {
                            ...newQualification,
                            id: Math.random().toString(36).substr(2, 9)
                        }
                    ]
                });
                setNewQualification(initialQualification);
            }
        }
        if (step === 3 && newAchievement.heading.trim() && newAchievement.descriptions.some((desc)=>desc.trim())) {
            if (editAchievementId) {
                setFaculty({
                    ...faculty,
                    achievements: (faculty.achievements || []).map((a)=>a.id === editAchievementId ? {
                            ...newAchievement,
                            id: a.id
                        } : a)
                });
                setEditAchievementId(null);
                setNewAchievement(initialAchievement);
                setCurrentDescriptionIndex(0);
            } else {
                setFaculty({
                    ...faculty,
                    achievements: [
                        ...faculty.achievements || [],
                        {
                            ...newAchievement,
                            id: Math.random().toString(36).substr(2, 9)
                        }
                    ]
                });
                setNewAchievement(initialAchievement);
                setCurrentDescriptionIndex(0);
            }
        }
        if (step === 4 && newBookChapter.heading.trim() && newBookChapter.descriptions.some((desc)=>desc.trim())) {
            if (editBookChapterId) {
                setFaculty({
                    ...faculty,
                    bookChapters: (faculty.bookChapters || []).map((b)=>b.id === editBookChapterId ? {
                            ...newBookChapter,
                            id: b.id
                        } : b)
                });
                setEditBookChapterId(null);
                setNewBookChapter(initialBookChapter);
                setCurrentBookChapterDescriptionIndex(0);
            } else {
                setFaculty({
                    ...faculty,
                    bookChapters: [
                        ...faculty.bookChapters || [],
                        {
                            ...newBookChapter,
                            id: Math.random().toString(36).substr(2, 9)
                        }
                    ]
                });
                setNewBookChapter(initialBookChapter);
                setCurrentBookChapterDescriptionIndex(0);
            }
        }
        if (step === 5 && newCertification.heading.trim() && newCertification.descriptions.some((desc)=>desc.trim())) {
            if (editCertificationId) {
                setFaculty({
                    ...faculty,
                    certifications: (faculty.certifications || []).map((c)=>c.id === editCertificationId ? {
                            ...newCertification,
                            id: c.id
                        } : c)
                });
                setEditCertificationId(null);
                setNewCertification(initialCertification);
                setCurrentCertificationDescriptionIndex(0);
            } else {
                setFaculty({
                    ...faculty,
                    certifications: [
                        ...faculty.certifications || [],
                        {
                            ...newCertification,
                            id: Math.random().toString(36).substr(2, 9)
                        }
                    ]
                });
                setNewCertification(initialCertification);
                setCurrentCertificationDescriptionIndex(0);
            }
        }
        if (step === 6 && newJournalPublication.publicationsData) {
            if (editJournalPublicationId) {
                setFaculty({
                    ...faculty,
                    internationalJournalPublications: (faculty.internationalJournalPublications || []).map((j)=>j.id === editJournalPublicationId ? {
                            ...newJournalPublication,
                            id: j.id
                        } : j)
                });
                setEditJournalPublicationId(null);
                setNewJournalPublication(initialJournal);
            } else {
                setFaculty({
                    ...faculty,
                    internationalJournalPublications: [
                        ...faculty.internationalJournalPublications || [],
                        {
                            ...newJournalPublication,
                            id: Math.random().toString(36).substr(2, 9)
                        }
                    ]
                });
                setNewJournalPublication(initialJournal);
            }
        }
        let shouldSubmit = false;
        if (step === 7) {
            if (newConferencePublication.conferencePublications) {
                if (editConferencePublicationId) {
                    setFaculty((prev)=>({
                            ...prev,
                            internationalConferencePublications: (prev.internationalConferencePublications || []).map((c)=>c.id === editConferencePublicationId ? {
                                    ...newConferencePublication,
                                    id: c.id
                                } : c)
                        }));
                    setEditConferencePublicationId(null);
                    setNewConferencePublication(initialConference);
                } else {
                    setFaculty((prev)=>({
                            ...prev,
                            internationalConferencePublications: [
                                ...prev.internationalConferencePublications || [],
                                {
                                    ...newConferencePublication,
                                    id: Math.random().toString(36).substr(2, 9)
                                }
                            ]
                        }));
                    setNewConferencePublication(initialConference);
                }
                shouldSubmit = true;
            } else {
                shouldSubmit = true;
            }
        }
        if (validateStep(step)) {
            if (step < totalSteps) {
                setStep(step + 1);
            } else {
                onSubmit(faculty, avatarFile);
                onClose();
            }
        }
    };
    const handleBack = ()=>{
        if (step > 1) {
            setStep(step - 1);
        }
    };
    const handleSkip = ()=>{
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            onSubmit(faculty, avatarFile);
            onClose();
        }
    };
    const handleInputChange = async (e)=>{
        const { name, value } = e.target;
        if (name === "avatar") {
            const file = e.target.files?.[0];
            if (file) {
                setAvatarFile(file);
                const arrayBuffer = await file.arrayBuffer();
                const buffer = {
                    type: file.type,
                    data: Array.from(new Uint8Array(arrayBuffer))
                };
                setFaculty({
                    ...faculty,
                    avatar: buffer
                });
            } else {
                setAvatarFile(null);
                setFaculty({
                    ...faculty,
                    avatar: null
                });
            }
        } else if (name === "priority") {
            setFaculty({
                ...faculty,
                priority: parseInt(value, 10) || null
            });
        } else if (name === "isKeyFunctionary") {
            setFaculty({
                ...faculty,
                isKeyFunctionary: e.target.checked
            });
        } else if (name === "keyFunctionaryPriority") {
            setFaculty({
                ...faculty,
                keyFunctionaryPriority: parseInt(value, 10) || null
            });
        } else if (name === "isHod") {
            setFaculty({
                ...faculty,
                isHod: e.target.checked
            });
        } else if (name === "hodPriority") {
            setFaculty({
                ...faculty,
                hodPriority: parseInt(value, 10) || null
            });
        } else {
            setFaculty({
                ...faculty,
                [name]: value
            });
            if (name === "department" && value !== "Science & Humanities") {
                setFaculty((prev)=>({
                        ...prev,
                        subDepartment: ""
                    }));
            }
        }
    };
    // Achievement Handlers
    const handleAchievementHeadingChange = (e)=>{
        const value = e.target.value;
        setNewAchievement({
            ...newAchievement,
            heading: value
        });
    };
    const handleDescriptionChange = (e, index)=>{
        const value = e.target.value;
        const updatedDescriptions = [
            ...newAchievement.descriptions
        ];
        updatedDescriptions[index] = value;
        setNewAchievement({
            ...newAchievement,
            descriptions: updatedDescriptions
        });
    };
    const addDescription = ()=>{
        setNewAchievement({
            ...newAchievement,
            descriptions: [
                ...newAchievement.descriptions,
                ""
            ]
        });
        setCurrentDescriptionIndex(newAchievement.descriptions.length);
    };
    const removeDescription = (index)=>{
        if (newAchievement.descriptions.length > 1) {
            const updatedDescriptions = newAchievement.descriptions.filter((_, i)=>i !== index);
            setNewAchievement({
                ...newAchievement,
                descriptions: updatedDescriptions
            });
            if (currentDescriptionIndex > index && currentDescriptionIndex > 0) {
                setCurrentDescriptionIndex(currentDescriptionIndex - 1);
            }
        }
    };
    const addOrUpdateAchievement = ()=>{
        if (newAchievement.heading.trim() && newAchievement.descriptions.some((desc)=>desc.trim())) {
            if (editAchievementId) {
                setFaculty({
                    ...faculty,
                    achievements: (faculty.achievements || []).map((a)=>a.id === editAchievementId ? {
                            ...newAchievement,
                            id: a.id
                        } : a)
                });
                setEditAchievementId(null);
                setNewAchievement(initialAchievement);
                setCurrentDescriptionIndex(0);
            } else {
                setFaculty({
                    ...faculty,
                    achievements: [
                        ...faculty.achievements || [],
                        {
                            ...newAchievement,
                            id: Math.random().toString(36).substr(2, 9)
                        }
                    ]
                });
                setNewAchievement(initialAchievement);
                setCurrentDescriptionIndex(0);
            }
        } else {
            alert("Please fill heading and at least one description.");
        }
    };
    const editAchievement = (id)=>{
        const achievement = (faculty.achievements || []).find((a)=>a.id === id);
        if (achievement) {
            setNewAchievement(achievement);
            setEditAchievementId(id);
            setCurrentDescriptionIndex(0);
        }
    };
    const removeAchievement = (id)=>{
        setFaculty({
            ...faculty,
            achievements: (faculty.achievements || []).filter((a)=>a.id !== id)
        });
        if (editAchievementId === id) {
            setEditAchievementId(null);
            setNewAchievement(initialAchievement);
            setCurrentDescriptionIndex(0);
        }
    };
    const cancelEditAchievement = ()=>{
        setEditAchievementId(null);
        setNewAchievement(initialAchievement);
        setCurrentDescriptionIndex(0);
    };
    // Book Chapter Handlers
    const handleBookChapterHeadingChange = (e)=>{
        const value = e.target.value;
        setNewBookChapter({
            ...newBookChapter,
            heading: value
        });
    };
    const handleBookChapterDescriptionChange = (e, index)=>{
        const value = e.target.value;
        const updatedDescriptions = [
            ...newBookChapter.descriptions
        ];
        updatedDescriptions[index] = value;
        setNewBookChapter({
            ...newBookChapter,
            descriptions: updatedDescriptions
        });
    };
    const addBookChapterDescription = ()=>{
        setNewBookChapter({
            ...newBookChapter,
            descriptions: [
                ...newBookChapter.descriptions,
                ""
            ]
        });
        setCurrentBookChapterDescriptionIndex(newBookChapter.descriptions.length);
    };
    const removeBookChapterDescription = (index)=>{
        if (newBookChapter.descriptions.length > 1) {
            const updatedDescriptions = newBookChapter.descriptions.filter((_, i)=>i !== index);
            setNewBookChapter({
                ...newBookChapter,
                descriptions: updatedDescriptions
            });
            if (currentBookChapterDescriptionIndex > index && currentBookChapterDescriptionIndex > 0) {
                setCurrentBookChapterDescriptionIndex(currentBookChapterDescriptionIndex - 1);
            }
        }
    };
    const addOrUpdateBookChapter = ()=>{
        if (newBookChapter.heading.trim() && newBookChapter.descriptions.some((desc)=>desc.trim())) {
            if (editBookChapterId) {
                setFaculty({
                    ...faculty,
                    bookChapters: (faculty.bookChapters || []).map((b)=>b.id === editBookChapterId ? {
                            ...newBookChapter,
                            id: b.id
                        } : b)
                });
                setEditBookChapterId(null);
                setNewBookChapter(initialBookChapter);
                setCurrentBookChapterDescriptionIndex(0);
            } else {
                setFaculty({
                    ...faculty,
                    bookChapters: [
                        ...faculty.bookChapters || [],
                        {
                            ...newBookChapter,
                            id: Math.random().toString(36).substr(2, 9)
                        }
                    ]
                });
                setNewBookChapter(initialBookChapter);
                setCurrentBookChapterDescriptionIndex(0);
            }
        } else {
            alert("Please fill heading and at least one description.");
        }
    };
    const editBookChapter = (id)=>{
        const bookChapter = (faculty.bookChapters || []).find((b)=>b.id === id);
        if (bookChapter) {
            setNewBookChapter(bookChapter);
            setEditBookChapterId(id);
            setCurrentBookChapterDescriptionIndex(0);
        }
    };
    const removeBookChapter = (id)=>{
        setFaculty({
            ...faculty,
            bookChapters: (faculty.bookChapters || []).filter((b)=>b.id !== id)
        });
        if (editBookChapterId === id) {
            setEditBookChapterId(null);
            setNewBookChapter(initialBookChapter);
            setCurrentBookChapterDescriptionIndex(0);
        }
    };
    const cancelEditBookChapter = ()=>{
        setEditBookChapterId(null);
        setNewBookChapter(initialBookChapter);
        setCurrentBookChapterDescriptionIndex(0);
    };
    // Certification Handlers
    const handleCertificationHeadingChange = (e)=>{
        const value = e.target.value;
        setNewCertification({
            ...newCertification,
            heading: value
        });
    };
    const handleCertificationDescriptionChange = (e, index)=>{
        const value = e.target.value;
        const updatedDescriptions = [
            ...newCertification.descriptions
        ];
        updatedDescriptions[index] = value;
        setNewCertification({
            ...newCertification,
            descriptions: updatedDescriptions
        });
    };
    const addCertificationDescription = ()=>{
        setNewCertification({
            ...newCertification,
            descriptions: [
                ...newCertification.descriptions,
                ""
            ]
        });
        setCurrentCertificationDescriptionIndex(newCertification.descriptions.length);
    };
    const removeCertificationDescription = (index)=>{
        if (newCertification.descriptions.length > 1) {
            const updatedDescriptions = newCertification.descriptions.filter((_, i)=>i !== index);
            setNewCertification({
                ...newCertification,
                descriptions: updatedDescriptions
            });
            if (currentCertificationDescriptionIndex > index && currentCertificationDescriptionIndex > 0) {
                setCurrentCertificationDescriptionIndex(currentCertificationDescriptionIndex - 1);
            }
        }
    };
    const addOrUpdateCertification = ()=>{
        if (newCertification.heading.trim() && newCertification.descriptions.some((desc)=>desc.trim())) {
            if (editCertificationId) {
                setFaculty({
                    ...faculty,
                    certifications: (faculty.certifications || []).map((c)=>c.id === editCertificationId ? {
                            ...newCertification,
                            id: c.id
                        } : c)
                });
                setEditCertificationId(null);
                setNewCertification(initialCertification);
                setCurrentCertificationDescriptionIndex(0);
            } else {
                setFaculty({
                    ...faculty,
                    certifications: [
                        ...faculty.certifications || [],
                        {
                            ...newCertification,
                            id: Math.random().toString(36).substr(2, 9)
                        }
                    ]
                });
                setNewCertification(initialCertification);
                setCurrentCertificationDescriptionIndex(0);
            }
        } else {
            alert("Please fill heading and at least one description.");
        }
    };
    const editCertification = (id)=>{
        const certification = (faculty.certifications || []).find((c)=>c.id === id);
        if (certification) {
            setNewCertification(certification);
            setEditCertificationId(id);
            setCurrentCertificationDescriptionIndex(0);
        }
    };
    const removeCertification = (id)=>{
        setFaculty({
            ...faculty,
            certifications: (faculty.certifications || []).filter((c)=>c.id !== id)
        });
        if (editCertificationId === id) {
            setEditCertificationId(null);
            setNewCertification(initialCertification);
            setCurrentCertificationDescriptionIndex(0);
        }
    };
    const cancelEditCertification = ()=>{
        setEditCertificationId(null);
        setNewCertification(initialCertification);
        setCurrentCertificationDescriptionIndex(0);
    };
    // Qualification Handlers
    const handleQualificationChange = (e)=>{
        const { name, value } = e.target;
        setNewQualification({
            ...newQualification,
            [name]: value
        });
    };
    const addOrUpdateQualification = ()=>{
        if (newQualification.degree && newQualification.passingYear && newQualification.college && newQualification.specialization) {
            if (editQualificationId) {
                setFaculty({
                    ...faculty,
                    qualifications: faculty.qualifications.map((q)=>q.id === editQualificationId ? {
                            ...newQualification,
                            id: q.id
                        } : q)
                });
                setEditQualificationId(null);
                setNewQualification(initialQualification);
            } else {
                setFaculty({
                    ...faculty,
                    qualifications: [
                        ...faculty.qualifications,
                        {
                            ...newQualification,
                            id: Math.random().toString(36).substr(2, 9)
                        }
                    ]
                });
                setNewQualification(initialQualification);
            }
        } else {
            alert("Please fill all required fields for the qualification.");
        }
    };
    const editQualification = (id)=>{
        const qualification = faculty.qualifications.find((q)=>q.id === id);
        if (qualification) {
            setNewQualification(qualification);
            setEditQualificationId(id);
        }
    };
    const removeQualification = (id)=>{
        setFaculty({
            ...faculty,
            qualifications: faculty.qualifications.filter((q)=>q.id !== id)
        });
        if (editQualificationId === id) {
            setEditQualificationId(null);
            setNewQualification(initialQualification);
        }
    };
    const cancelEditQualification = ()=>{
        setEditQualificationId(null);
        setNewQualification(initialQualification);
    };
    // Journal Publication Handlers
    const handleJournalPublicationChange = (e)=>{
        const { name, value } = e.target;
        setNewJournalPublication({
            ...newJournalPublication,
            [name]: value
        });
    };
    const addOrUpdateJournalPublication = ()=>{
        if (newJournalPublication.publicationsData) {
            if (editJournalPublicationId) {
                setFaculty({
                    ...faculty,
                    internationalJournalPublications: (faculty.internationalJournalPublications || []).map((j)=>j.id === editJournalPublicationId ? {
                            ...newJournalPublication,
                            id: j.id
                        } : j)
                });
                setEditJournalPublicationId(null);
                setNewJournalPublication(initialJournal);
            } else {
                setFaculty({
                    ...faculty,
                    internationalJournalPublications: [
                        ...faculty.internationalJournalPublications || [],
                        {
                            ...newJournalPublication,
                            id: Math.random().toString(36).substr(2, 9)
                        }
                    ]
                });
                setNewJournalPublication(initialJournal);
            }
        } else {
            alert("Please fill all required fields for the journal publication.");
        }
    };
    const editJournalPublication = (id)=>{
        const journal = (faculty.internationalJournalPublications || []).find((j)=>j.id === id);
        if (journal) {
            setNewJournalPublication(journal);
            setEditJournalPublicationId(id);
        }
    };
    const removeJournalPublication = (id)=>{
        setFaculty({
            ...faculty,
            internationalJournalPublications: (faculty.internationalJournalPublications || []).filter((j)=>j.id !== id)
        });
        if (editJournalPublicationId === id) {
            setEditJournalPublicationId(null);
            setNewJournalPublication(initialJournal);
        }
    };
    const cancelEditJournalPublication = ()=>{
        setEditJournalPublicationId(null);
        setNewJournalPublication(initialJournal);
    };
    // Conference Publication Handlers
    const handleConferencePublicationChange = (e)=>{
        const { name, value } = e.target;
        setNewConferencePublication({
            ...newConferencePublication,
            [name]: value
        });
    };
    const addOrUpdateConferencePublication = ()=>{
        if (newConferencePublication.conferencePublications) {
            if (editConferencePublicationId) {
                setFaculty({
                    ...faculty,
                    internationalConferencePublications: (faculty.internationalConferencePublications || []).map((c)=>c.id === editConferencePublicationId ? {
                            ...newConferencePublication,
                            id: c.id
                        } : c)
                });
                setEditConferencePublicationId(null);
                setNewConferencePublication(initialConference);
            } else {
                setFaculty({
                    ...faculty,
                    internationalConferencePublications: [
                        ...faculty.internationalConferencePublications || [],
                        {
                            ...newConferencePublication,
                            id: Math.random().toString(36).substr(2, 9)
                        }
                    ]
                });
                setNewConferencePublication(initialConference);
            }
        } else {
            alert("Please fill all required fields for the conference publication.");
        }
    };
    const editConferencePublication = (id)=>{
        const conference = (faculty.internationalConferencePublications || []).find((c)=>c.id === id);
        if (conference) {
            setNewConferencePublication(conference);
            setEditConferencePublicationId(id);
        }
    };
    const removeConferencePublication = (id)=>{
        setFaculty({
            ...faculty,
            internationalConferencePublications: (faculty.internationalConferencePublications || []).filter((c)=>c.id !== id)
        });
        if (editConferencePublicationId === id) {
            setEditConferencePublicationId(null);
            setNewConferencePublication(initialConference);
        }
    };
    const cancelEditConferencePublication = ()=>{
        setEditConferencePublicationId(null);
        setNewConferencePublication(initialConference);
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold mb-4",
                    children: mode === "add" ? "Add Faculty" : "Edit Faculty"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                    lineNumber: 1079,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between",
                            children: Array.from({
                                length: totalSteps
                            }, (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `flex-1 h-2 mx-1 rounded ${i + 1 <= step ? "bg-primary" : "bg-gray-300"}`
                                }, i, false, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1083,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                            lineNumber: 1081,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-600 mt-2",
                            children: [
                                "Step ",
                                step,
                                " of ",
                                totalSteps
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                            lineNumber: 1086,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                    lineNumber: 1080,
                    columnNumber: 9
                }, this),
                step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold mb-4",
                            children: "Basic Information (Required)"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                            lineNumber: 1093,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Name *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1096,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            name: "name",
                                            value: faculty.name,
                                            onChange: handleInputChange,
                                            className: "w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1097,
                                            columnNumber: 17
                                        }, this),
                                        errors.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-sm mt-1",
                                            children: errors.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1104,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1095,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Designation *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1107,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            name: "designation",
                                            value: faculty.designation,
                                            onChange: handleInputChange,
                                            className: "w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1108,
                                            columnNumber: 17
                                        }, this),
                                        errors.designation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-sm mt-1",
                                            children: errors.designation
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1115,
                                            columnNumber: 40
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1106,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Department *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1118,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            name: "department",
                                            value: faculty.department,
                                            onChange: handleInputChange,
                                            className: "w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Select Department"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1125,
                                                    columnNumber: 19
                                                }, this),
                                                departments.map((dept)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: dept,
                                                        children: dept
                                                    }, dept, false, {
                                                        fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                        lineNumber: 1127,
                                                        columnNumber: 21
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1119,
                                            columnNumber: 17
                                        }, this),
                                        errors.department && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-sm mt-1",
                                            children: errors.department
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1132,
                                            columnNumber: 39
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1117,
                                    columnNumber: 15
                                }, this),
                                faculty.department === "Science & Humanities" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Sub-Department (Optional)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1136,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            name: "subDepartment",
                                            value: faculty.subDepartment || "",
                                            onChange: handleInputChange,
                                            className: "w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Select Sub-Department"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1143,
                                                    columnNumber: 21
                                                }, this),
                                                subDepartments.map((subDept)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: subDept,
                                                        children: subDept
                                                    }, subDept, false, {
                                                        fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                        lineNumber: 1145,
                                                        columnNumber: 23
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1137,
                                            columnNumber: 19
                                        }, this),
                                        errors.subDepartment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-sm mt-1",
                                            children: errors.subDepartment
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1150,
                                            columnNumber: 44
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1135,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Email"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1155,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "email",
                                            name: "email",
                                            value: faculty.email || "",
                                            onChange: handleInputChange,
                                            className: "w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1156,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1154,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Joining Date *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1165,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "date",
                                            name: "joiningDate",
                                            value: faculty.joiningDate,
                                            onChange: handleInputChange,
                                            className: "w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1166,
                                            columnNumber: 17
                                        }, this),
                                        errors.joiningDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-sm mt-1",
                                            children: errors.joiningDate
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1173,
                                            columnNumber: 40
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1164,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Experience *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1176,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            name: "experience",
                                            value: faculty.experience,
                                            onChange: handleInputChange,
                                            className: "w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1177,
                                            columnNumber: 17
                                        }, this),
                                        errors.experience && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-sm mt-1",
                                            children: errors.experience
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1184,
                                            columnNumber: 39
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1175,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Employment Type *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1187,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            name: "employmentType",
                                            value: faculty.employmentType,
                                            onChange: handleInputChange,
                                            className: "w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Regular",
                                                    children: "Regular"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1194,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Contract",
                                                    children: "Contract"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1195,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Visiting",
                                                    children: "Visiting"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1196,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1188,
                                            columnNumber: 17
                                        }, this),
                                        errors.employmentType && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-sm mt-1",
                                            children: errors.employmentType
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1198,
                                            columnNumber: 43
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1186,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Type *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1201,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            name: "type",
                                            value: faculty.type,
                                            onChange: handleInputChange,
                                            className: "w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Teaching Staff",
                                                    children: "Teaching Staff"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1208,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Technical Staff",
                                                    children: "Technical Staff"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1209,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1202,
                                            columnNumber: 17
                                        }, this),
                                        errors.type && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-sm mt-1",
                                            children: errors.type
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1211,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1200,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Priority (Higher appears first)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1214,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            name: "priority",
                                            value: faculty.priority === null ? "null" : faculty.priority?.toString(),
                                            onChange: handleInputChange,
                                            disabled: isLoadingPriorities,
                                            className: "w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "null",
                                                    children: "No Priority"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1222,
                                                    columnNumber: 19
                                                }, this),
                                                availablePriorities.filter((p)=>p !== null).map((priority)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: priority,
                                                        children: priority
                                                    }, priority, false, {
                                                        fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                        lineNumber: 1226,
                                                        columnNumber: 23
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1215,
                                            columnNumber: 17
                                        }, this),
                                        isLoadingPriorities && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-blue-500 mt-1",
                                            children: "Loading priorities..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1231,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1213,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: [
                                                "Avatar ",
                                                mode === "add" ? "*" : "(Optional)"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1234,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "file",
                                            name: "avatar",
                                            accept: "image/*",
                                            onChange: handleInputChange,
                                            className: "w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1235,
                                            columnNumber: 17
                                        }, this),
                                        errors.avatar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-sm mt-1",
                                            children: errors.avatar
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1242,
                                            columnNumber: 35
                                        }, this),
                                        faculty.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: bufferToBase64(faculty.avatar),
                                            alt: "Avatar preview",
                                            className: "mt-2 w-32 h-32 object-cover rounded-full"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1244,
                                            columnNumber: 19
                                        }, this) : faculty.hasAvatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: `${API_BASE_URL}/faculty/${faculty.id}/avatar?t=${Date.now()}`,
                                            alt: "Avatar preview",
                                            className: "mt-2 w-32 h-32 object-cover rounded-full"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1246,
                                            columnNumber: 19
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1233,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-span-full border-t pt-4 mt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    name: "isKeyFunctionary",
                                                    id: "isKeyFunctionary",
                                                    checked: faculty.isKeyFunctionary || false,
                                                    onChange: handleInputChange,
                                                    className: "mr-2 h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1255,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "isKeyFunctionary",
                                                    className: "font-medium",
                                                    children: "Is Key Functionary?"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1263,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1254,
                                            columnNumber: 17
                                        }, this),
                                        faculty.isKeyFunctionary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium mb-1",
                                                            children: "Key Functionary Name *"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1271,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            name: "keyFunctionaryName",
                                                            value: faculty.keyFunctionaryName || "",
                                                            onChange: handleInputChange,
                                                            placeholder: "e.g. Dean",
                                                            className: "w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1272,
                                                            columnNumber: 23
                                                        }, this),
                                                        errors.keyFunctionaryName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-red-500 text-sm mt-1",
                                                            children: errors.keyFunctionaryName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1280,
                                                            columnNumber: 53
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1270,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium mb-1",
                                                            children: "Key Functionary Priority *"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1283,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            name: "keyFunctionaryPriority",
                                                            value: faculty.keyFunctionaryPriority || "",
                                                            onChange: handleInputChange,
                                                            className: "w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: "Select Priority"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                                    lineNumber: 1290,
                                                                    columnNumber: 25
                                                                }, this),
                                                                availableKeyFunctionaryPriorities.length > 0 ? availableKeyFunctionaryPriorities.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: p,
                                                                        children: p
                                                                    }, p, false, {
                                                                        fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                                        lineNumber: 1293,
                                                                        columnNumber: 31
                                                                    }, this)) : Array.from({
                                                                    length: 20
                                                                }, (_, i)=>i + 1).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: p,
                                                                        children: p
                                                                    }, p, false, {
                                                                        fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                                        lineNumber: 1298,
                                                                        columnNumber: 31
                                                                    }, this))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1284,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-500 mt-1",
                                                            children: "Lower number = Higher Priority (appears first)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1303,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1282,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1269,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center mb-4 mt-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    name: "isHod",
                                                    id: "isHod",
                                                    checked: faculty.isHod || false,
                                                    onChange: handleInputChange,
                                                    className: "mr-2 h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1309,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "isHod",
                                                    className: "font-medium",
                                                    children: "Is HOD?"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1317,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1308,
                                            columnNumber: 17
                                        }, this),
                                        faculty.isHod && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium mb-1",
                                                            children: "Department Name*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1325,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            name: "hodName",
                                                            value: faculty.hodName || "",
                                                            onChange: handleInputChange,
                                                            placeholder: "e.g. Head of Department",
                                                            className: "w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1326,
                                                            columnNumber: 23
                                                        }, this),
                                                        errors.hodName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-red-500 text-sm mt-1",
                                                            children: errors.hodName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1334,
                                                            columnNumber: 42
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1324,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium mb-1",
                                                            children: "HOD Priority *"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1337,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            name: "hodPriority",
                                                            value: faculty.hodPriority || "",
                                                            onChange: handleInputChange,
                                                            className: "w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: "Select Priority"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                                    lineNumber: 1344,
                                                                    columnNumber: 25
                                                                }, this),
                                                                availableHodPriorities.length > 0 ? availableHodPriorities.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: p,
                                                                        children: p
                                                                    }, p, false, {
                                                                        fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                                        lineNumber: 1347,
                                                                        columnNumber: 31
                                                                    }, this)) : Array.from({
                                                                    length: 20
                                                                }, (_, i)=>i + 1).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: p,
                                                                        children: p
                                                                    }, p, false, {
                                                                        fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                                        lineNumber: 1352,
                                                                        columnNumber: 31
                                                                    }, this))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1338,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-500 mt-1",
                                                            children: "Lower number = Higher Priority (appears first)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1357,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1336,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1323,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1253,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                            lineNumber: 1094,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                    lineNumber: 1092,
                    columnNumber: 11
                }, this),
                step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold mb-4",
                            children: "Qualifications (Required)"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                            lineNumber: 1368,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Degree *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1371,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            name: "degree",
                                            value: newQualification.degree,
                                            onChange: handleQualificationChange,
                                            className: "w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1372,
                                            columnNumber: 17
                                        }, this),
                                        errors.degree && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-sm mt-1",
                                            children: errors.degree
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1379,
                                            columnNumber: 35
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1370,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Name of Degree *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1382,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            name: "nameOfDigree",
                                            value: newQualification.nameOfDigree,
                                            onChange: handleQualificationChange,
                                            className: "w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1383,
                                            columnNumber: 17
                                        }, this),
                                        errors.nameOfDigree && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-sm mt-1",
                                            children: errors.nameOfDigree
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1390,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1381,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Passing Year *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1393,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            name: "passingYear",
                                            value: newQualification.passingYear,
                                            onChange: handleQualificationChange,
                                            className: "w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1394,
                                            columnNumber: 17
                                        }, this),
                                        errors.passingYear && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-sm mt-1",
                                            children: errors.passingYear
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1401,
                                            columnNumber: 40
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1392,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "College *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1404,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            name: "college",
                                            value: newQualification.college,
                                            onChange: handleQualificationChange,
                                            className: "w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1405,
                                            columnNumber: 17
                                        }, this),
                                        errors.college && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-sm mt-1",
                                            children: errors.college
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1412,
                                            columnNumber: 36
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1403,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1",
                                            children: "Specialization *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1415,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            name: "specialization",
                                            value: newQualification.specialization,
                                            onChange: handleQualificationChange,
                                            className: "w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1416,
                                            columnNumber: 17
                                        }, this),
                                        errors.specialization && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-500 text-sm mt-1",
                                            children: errors.specialization
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1423,
                                            columnNumber: 43
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1414,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                            lineNumber: 1369,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex space-x-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: addOrUpdateQualification,
                                    className: "bg-primary text-white px-4 py-2 rounded hover:bg-primary/90",
                                    children: editQualificationId ? "Update Qualification" : "Add Qualification"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1427,
                                    columnNumber: 15
                                }, this),
                                editQualificationId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: cancelEditQualification,
                                    className: "bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400",
                                    children: "Cancel Edit"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1431,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                            lineNumber: 1426,
                            columnNumber: 13
                        }, this),
                        errors.qualifications && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-500 text-sm mt-2",
                            children: errors.qualifications
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                            lineNumber: 1436,
                            columnNumber: 39
                        }, this),
                        faculty.qualifications.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "mt-4 space-y-2",
                            children: faculty.qualifications.map((q)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "flex justify-between items-center bg-gray-100 p-2 rounded",
                                    children: [
                                        q.degree,
                                        " - ",
                                        q.college,
                                        " (",
                                        q.passingYear,
                                        ") - ",
                                        q.specialization,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex space-x-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>editQualification(q.id),
                                                    className: "text-blue-500 hover:text-blue-700",
                                                    children: "Edit"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1443,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>removeQualification(q.id),
                                                    className: "text-red-500 hover:text-red-700",
                                                    children: "Remove"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1446,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1442,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, q.id, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1440,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                            lineNumber: 1438,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                    lineNumber: 1367,
                    columnNumber: 11
                }, this),
                step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold mb-4",
                            children: "Achievements (Optional)"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                            lineNumber: 1459,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6 p-4 border rounded-lg bg-gray-50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-2",
                                            children: "Achievement Heading *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1464,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: newAchievement.heading,
                                            onChange: handleAchievementHeadingChange,
                                            placeholder: "Enter achievement heading/title",
                                            className: "w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1465,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1463,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-2",
                                            children: "Descriptions *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1475,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: newAchievement.descriptions.map((desc, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start space-x-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                            value: desc,
                                                            onChange: (e)=>handleDescriptionChange(e, index),
                                                            placeholder: `Description ${index + 1}`,
                                                            rows: 3,
                                                            className: "flex-1 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1479,
                                                            columnNumber: 23
                                                        }, this),
                                                        newAchievement.descriptions.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>removeDescription(index),
                                                            className: "bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm",
                                                            children: "×"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1487,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, index, true, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1478,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1476,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: addDescription,
                                            className: "mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm",
                                            children: "+ Add Description"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1498,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1474,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex space-x-2 mt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: addOrUpdateAchievement,
                                            className: "bg-primary text-white px-4 py-2 rounded hover:bg-primary/90",
                                            disabled: !newAchievement.heading.trim() || !newAchievement.descriptions.some((desc)=>desc.trim()),
                                            children: editAchievementId ? "Update Achievement" : "Add Achievement"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1504,
                                            columnNumber: 17
                                        }, this),
                                        editAchievementId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: cancelEditAchievement,
                                            className: "bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400",
                                            children: "Cancel Edit"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1512,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1503,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                            lineNumber: 1462,
                            columnNumber: 13
                        }, this),
                        faculty.achievements && faculty.achievements.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-md font-medium mb-2",
                                    children: "Added Achievements:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1522,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: faculty.achievements.map((achievement)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white border rounded-lg p-4 shadow-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-start mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                            className: "font-semibold text-lg",
                                                            children: achievement.heading
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1527,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex space-x-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>editAchievement(achievement.id),
                                                                    className: "text-blue-500 hover:text-blue-700 text-sm",
                                                                    children: "Edit"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                                    lineNumber: 1529,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>removeAchievement(achievement.id),
                                                                    className: "text-red-500 hover:text-red-700 text-sm",
                                                                    children: "Remove"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                                    lineNumber: 1532,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1528,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1526,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1 ml-4",
                                                    children: achievement.descriptions.map((desc, index)=>desc.trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-700 pl-2 ",
                                                            children: [
                                                                "• ",
                                                                desc
                                                            ]
                                                        }, index, true, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1541,
                                                            columnNumber: 31
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1537,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, achievement.id, true, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1525,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1523,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                            lineNumber: 1521,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                    lineNumber: 1458,
                    columnNumber: 11
                }, this),
                step === 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold mb-4",
                            children: "Career Advancement (Optional)"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                            lineNumber: 1557,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6 p-4 border rounded-lg bg-gray-50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-2",
                                            children: "Career Advancement *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1562,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: newBookChapter.heading,
                                            onChange: handleBookChapterHeadingChange,
                                            placeholder: "Enter Career Advancement heading/title",
                                            className: "w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1563,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1561,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-2",
                                            children: "Descriptions *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1573,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: newBookChapter.descriptions.map((desc, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start space-x-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                            value: desc,
                                                            onChange: (e)=>handleBookChapterDescriptionChange(e, index),
                                                            placeholder: `Description ${index + 1}`,
                                                            rows: 3,
                                                            className: "flex-1 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1577,
                                                            columnNumber: 23
                                                        }, this),
                                                        newBookChapter.descriptions.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>removeBookChapterDescription(index),
                                                            className: "bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm",
                                                            children: "×"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1585,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, index, true, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1576,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1574,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: addBookChapterDescription,
                                            className: "mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm",
                                            children: "+ Add Description"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1596,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1572,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex space-x-2 mt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: addOrUpdateBookChapter,
                                            className: "bg-primary text-white px-4 py-2 rounded hover:bg-primary/90",
                                            disabled: !newBookChapter.heading.trim() || !newBookChapter.descriptions.some((desc)=>desc.trim()),
                                            children: editBookChapterId ? "Update Career Advancement" : "Add Career Advancement"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1606,
                                            columnNumber: 17
                                        }, this),
                                        editBookChapterId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: cancelEditBookChapter,
                                            className: "bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400",
                                            children: "Cancel Edit"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1614,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1605,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                            lineNumber: 1560,
                            columnNumber: 13
                        }, this),
                        faculty.bookChapters && faculty.bookChapters.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-md font-medium mb-2",
                                    children: "Added Career Advancement:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1624,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: faculty.bookChapters.map((bookChapter)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white border rounded-lg p-4 shadow-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-start mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                            className: "font-semibold text-lg",
                                                            children: bookChapter.heading
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1629,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex space-x-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>editBookChapter(bookChapter.id),
                                                                    className: "text-blue-500 hover:text-blue-700 text-sm",
                                                                    children: "Edit"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                                    lineNumber: 1631,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>removeBookChapter(bookChapter.id),
                                                                    className: "text-red-500 hover:text-red-700 text-sm",
                                                                    children: "Remove"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                                    lineNumber: 1634,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1630,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1628,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1 ml-4",
                                                    children: bookChapter.descriptions.map((desc, index)=>desc.trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-700 pl-2  ",
                                                            children: [
                                                                "• ",
                                                                desc
                                                            ]
                                                        }, index, true, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1643,
                                                            columnNumber: 31
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1639,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, bookChapter.id, true, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1627,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1625,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                            lineNumber: 1623,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                    lineNumber: 1556,
                    columnNumber: 11
                }, this),
                step === 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold mb-4",
                            children: "Publications (Optional)"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                            lineNumber: 1659,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6 p-4 border rounded-lg bg-gray-50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-2",
                                            children: "Publications Heading *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1664,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: newCertification.heading,
                                            onChange: handleCertificationHeadingChange,
                                            placeholder: "Enter Publications heading/title",
                                            className: "w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1665,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1663,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-2",
                                            children: "Descriptions *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1675,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: newCertification.descriptions.map((desc, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start space-x-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                            value: desc,
                                                            onChange: (e)=>handleCertificationDescriptionChange(e, index),
                                                            placeholder: `Description ${index + 1}`,
                                                            rows: 3,
                                                            className: "flex-1 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1679,
                                                            columnNumber: 23
                                                        }, this),
                                                        newCertification.descriptions.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>removeCertificationDescription(index),
                                                            className: "bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm",
                                                            children: "×"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1687,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, index, true, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1678,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1676,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: addCertificationDescription,
                                            className: "mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm",
                                            children: "+ Add Description"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1698,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1674,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex space-x-2 mt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: addOrUpdateCertification,
                                            className: "bg-primary text-white px-4 py-2 rounded hover:bg-primary/90",
                                            disabled: !newCertification.heading.trim() || !newCertification.descriptions.some((desc)=>desc.trim()),
                                            children: editCertificationId ? "Update Publications" : "Add Publications"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1708,
                                            columnNumber: 17
                                        }, this),
                                        editCertificationId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: cancelEditCertification,
                                            className: "bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400",
                                            children: "Cancel Edit"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1716,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1707,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                            lineNumber: 1662,
                            columnNumber: 13
                        }, this),
                        faculty.certifications && faculty.certifications.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-md font-medium mb-2",
                                    children: "Added Publications:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1726,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: faculty.certifications.map((certification)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white border rounded-lg p-4 shadow-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-start mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                            className: "font-semibold text-lg",
                                                            children: certification.heading
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1731,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex space-x-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>editCertification(certification.id),
                                                                    className: "text-blue-500 hover:text-blue-700 text-sm",
                                                                    children: "Edit"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                                    lineNumber: 1733,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>removeCertification(certification.id),
                                                                    className: "text-red-500 hover:text-red-700 text-sm",
                                                                    children: "Remove"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                                    lineNumber: 1736,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1732,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1730,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1 ml-4",
                                                    children: certification.descriptions.map((desc, index)=>desc.trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-700 pl-2  ",
                                                            children: [
                                                                "• ",
                                                                desc
                                                            ]
                                                        }, index, true, {
                                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                            lineNumber: 1745,
                                                            columnNumber: 31
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 1741,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, certification.id, true, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 1729,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1727,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                            lineNumber: 1725,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                    lineNumber: 1658,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between mt-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                            lineNumber: 1852,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex space-x-2",
                            children: [
                                step > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleBack,
                                    className: "bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400",
                                    children: "Back"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1857,
                                    columnNumber: 15
                                }, this),
                                step > 1 && step < totalSteps && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSkip,
                                    className: "bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600",
                                    children: "Skip"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1862,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleNext,
                                    className: "bg-primary text-white px-4 py-2 rounded hover:bg-primary/90",
                                    children: step === totalSteps ? "Submit" : "Next"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 1866,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                            lineNumber: 1855,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                    lineNumber: 1851,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
            lineNumber: 1078,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard/faculty/page.tsx",
        lineNumber: 1077,
        columnNumber: 5
    }, this);
};
const API_BASE_URL = `${("TURBOPACK compile-time value", "http://localhost:3000")}`;
const Page = ()=>{
    const [faculties, setFaculties] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [departmentFilter, setDepartmentFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [modalMode, setModalMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("add");
    const [selectedFaculty, setSelectedFaculty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [facultyToDelete, setFacultyToDelete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isImportModalOpen, setIsImportModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [importFile, setImportFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isImporting, setIsImporting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [rowsPerPage, setRowsPerPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(10);
    const [totalFaculties, setTotalFaculties] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [totalPages, setTotalPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const encrypted = localStorage.getItem("token");
        if (!encrypted) {
            router.push("/login");
            return;
        }
        try {
            const decrypted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$encrypt$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decryptToken"])(encrypted);
            if (!decrypted || decrypted.length < 10) {
                localStorage.removeItem("token");
                router.push("/login");
            }
        } catch (err) {
            localStorage.removeItem("token");
            router.push("/login");
        }
    }, []);
    const fetchFaculties = ()=>{
        setIsLoading(true);
        const queryParams = new URLSearchParams({
            page: currentPage.toString(),
            limit: rowsPerPage.toString(),
            ...departmentFilter && {
                department: departmentFilter
            },
            ...search && {
                search
            },
            created: "true"
        });
        fetch(`${API_BASE_URL}/faculty?${queryParams}`).then((res)=>res.json()).then((response)=>{
            setFaculties(response.data);
            setTotalFaculties(response.total);
            setTotalPages(response.totalPages);
        }).catch((error)=>{
            /* eslint-disable */ console.error(...oo_tx(`826269936_1935_8_1935_57_11`, "Error fetching faculties:", error));
            toast({
                title: "Error",
                description: "Failed to load faculty data.",
                variant: "destructive"
            });
        }).finally(()=>setIsLoading(false));
    };
    // Fetch department options for dropdown
    const [departmentOptions, setDepartmentOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const fetchDepartments = ()=>{
        fetch(`${API_BASE_URL}/faculty/departments`).then((res)=>res.json()).then((departments)=>{
            setDepartmentOptions(departments);
        }).catch((error)=>{
            /* eslint-disable */ console.error(...oo_tx(`826269936_1954_8_1954_59_11`, "Error fetching departments:", error));
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchFaculties();
        fetchDepartments();
    }, [
        currentPage,
        rowsPerPage,
        departmentFilter,
        search
    ]);
    const handleAddFaculty = ()=>{
        setModalMode("add");
        setSelectedFaculty(undefined);
        setIsModalOpen(true);
    };
    const handleEditFaculty = (faculty)=>{
        setModalMode("edit");
        setSelectedFaculty(faculty);
        setIsModalOpen(true);
    };
    const handleSubmit = (faculty, avatarFile)=>{
        const encrypted = localStorage.getItem("token");
        const token = encrypted ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$encrypt$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decryptToken"])(encrypted) : null;
        const facultyData = {
            ...faculty,
            avatar: undefined
        };
        const formData = new FormData();
        formData.append("data", JSON.stringify(facultyData));
        if (avatarFile) {
            formData.append("avatar", avatarFile);
        }
        if (modalMode === "add") {
            fetch(`${API_BASE_URL}/faculty`, {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res)=>{
                if (!res.ok) {
                    return res.json().then((err)=>{
                        throw new Error(err.message);
                    });
                }
                return res.json();
            }).then(()=>{
                fetchFaculties();
                fetchDepartments();
                setIsModalOpen(false);
                toast({
                    title: "Success",
                    description: "Faculty added successfully."
                });
            }).catch((error)=>{
                /* eslint-disable */ console.error(...oo_tx(`826269936_2011_10_2011_55_11`, "Error adding faculty:", error));
                toast({
                    title: "Error",
                    description: error.message || "Failed to add faculty.",
                    variant: "destructive"
                });
            });
        } else {
            fetch(`${API_BASE_URL}/faculty/${faculty.id}`, {
                method: "PATCH",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res)=>{
                if (!res.ok) {
                    return res.json().then((err)=>{
                        throw new Error(err.message);
                    });
                }
                return res.json();
            }).then(()=>{
                fetchFaculties();
                fetchDepartments();
                setIsModalOpen(false);
                toast({
                    title: "Success",
                    description: "Faculty information updated successfully."
                });
            }).catch((error)=>{
                /* eslint-disable */ console.error(...oo_tx(`826269936_2044_10_2044_57_11`, "Error updating faculty:", error));
                toast({
                    title: "Error",
                    description: error.message || "Failed to update faculty.",
                    variant: "destructive"
                });
            });
        }
    };
    const handleDeleteFaculty = (id)=>{
        const encrypted = localStorage.getItem("token");
        const token = encrypted ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$encrypt$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decryptToken"])(encrypted) : null;
        fetch(`${API_BASE_URL}/faculty/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res)=>{
            if (!res.ok) {
                return res.json().then((err)=>{
                    throw new Error(err.message);
                });
            }
            fetchFaculties();
            toast({
                title: "Success",
                description: "Faculty deleted successfully."
            });
        }).catch((error)=>{
            /* eslint-disable */ console.error(...oo_tx(`826269936_2076_8_2076_55_11`, "Error deleting faculty:", error));
            toast({
                title: "Error",
                description: "Failed to delete faculty.",
                variant: "destructive"
            });
        });
    };
    // const handleImportData = async () => {
    //   if (!importFile) {
    //     toast({
    //       title: "Error",
    //       description: "Please select a file to import.",
    //       variant: "destructive",
    //     });
    //     return;
    //   }
    //   // Validate file type
    //   if (!importFile.name.match(/\.(xlsx|xls)$/i)) {
    //     toast({
    //       title: "Error",
    //       description: "Only Excel files (.xlsx, .xls) are allowed.",
    //       variant: "destructive",
    //     });
    //     return;
    //   }
    //   const encrypted = localStorage.getItem("token");
    //   const token = encrypted ? decryptToken(encrypted) : null;
    //   const formData = new FormData();
    //   formData.append("file", importFile);
    //   setIsImporting(true);
    //   try {
    //     const response = await fetch(`${API_BASE_URL}/faculty/import-data`, {
    //       method: "POST",
    //       body: formData,
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     if (!response.ok) {
    //       const error = await response.json();
    //       throw new Error(error.message || "Failed to import data");
    //     }
    //     const result = await response.json();
    //     setIsImportModalOpen(false);
    //     setImportFile(null);
    //     fetchFaculties();
    //     toast({
    //       title: "Import Completed",
    //       description: `Processed: ${result.totalProcessed}, Success: ${result.success}, Failed: ${result.failed}. ${
    //         result.errors.length > 0 ? `Errors: ${result.errors.slice(0, 3).join(", ")}${result.errors.length > 3 ? "..." : ""}` : ""
    //       }`,
    //       variant: result.failed > 0 ? "destructive" : "default",
    //     });
    //   } catch (error: any) {
    //     console.error("Error importing data:", error);
    //     toast({
    //       title: "Error",
    //       description: error.message || "Failed to import faculty data.",
    //       variant: "destructive",
    //     });
    //   } finally {
    //     setIsImporting(false);
    //   }
    // };
    // Filter faculties by search (client-side for name search)
    // ✅ Use data directly from backend
    const displayedFaculties = faculties;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$page$2d$title$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PageTitle"], {
                title: "Faculty Management",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$land$2d$plot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LandPlot$3e$__["LandPlot"],
                action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: handleAddFaculty,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__["PlusCircle"], {
                                className: "mr-2 h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                lineNumber: 2167,
                                columnNumber: 15
                            }, void 0),
                            "Add Faculty"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                        lineNumber: 2166,
                        columnNumber: 13
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                    lineNumber: 2161,
                    columnNumber: 11
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                lineNumber: 2157,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col md:flex-row gap-4 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "Search by faculty name",
                        value: search,
                        onChange: (e)=>{
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        },
                        className: "border outline-none rounded p-2 w-full md:w-1/3"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                        lineNumber: 2174,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: departmentFilter,
                        onChange: (e)=>setDepartmentFilter(e.target.value),
                        className: "border rounded p-2 w-full md:w-1/4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "All Departments"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                lineNumber: 2185,
                                columnNumber: 11
                            }, this),
                            departmentOptions.map((dept)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: dept,
                                    children: dept
                                }, dept, false, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 2187,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                        lineNumber: 2184,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                lineNumber: 2173,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "min-w-full border border-gray-200 rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        className: "bg-gray-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "border px-4 py-2",
                                    children: "Avatar"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 2196,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "border px-4 py-2",
                                    children: "Name"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 2197,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "border px-4 py-2",
                                    children: "Designation"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 2198,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "border px-4 py-2",
                                    children: "Department"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 2199,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "border px-4 py-2",
                                    children: "Joining Date"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 2200,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "border px-4 py-2",
                                    children: "Employment Type"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 2201,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "border px-4 py-2",
                                    children: "Actions"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 2202,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                            lineNumber: 2195,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                        lineNumber: 2194,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: [
                            displayedFaculties.map((faculty)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "border px-4 py-2",
                                            children: faculty.hasAvatar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: `${("TURBOPACK compile-time value", "http://localhost:3000") || "http://localhost:3000"}/faculty/${faculty.id}/avatar?t=${Date.now()}`,
                                                alt: `${faculty.name}'s avatar`,
                                                className: "w-12 h-12 object-cover rounded"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                lineNumber: 2210,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 2208,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "border px-4 py-2",
                                            children: faculty.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 2217,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "border px-4 py-2",
                                            children: faculty.designation
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 2218,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "border px-4 py-2",
                                            children: faculty.department
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 2219,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "border px-4 py-2",
                                            children: new Date(faculty.joiningDate).toLocaleDateString("en-GB")
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 2220,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "border px-4 py-2",
                                            children: faculty.employmentType
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 2221,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "border px-4 py-2 flex",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleEditFaculty(faculty),
                                                    className: "bg-yellow-500 text-white px-2 py-1 rounded mr-2",
                                                    children: "Edit"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 2223,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setFacultyToDelete(faculty);
                                                        setIsDeleteModalOpen(true);
                                                    },
                                                    className: "bg-red-500 text-white px-2 py-1 rounded",
                                                    children: "Delete"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                                    lineNumber: 2226,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                            lineNumber: 2222,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, faculty.id, true, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 2207,
                                    columnNumber: 13
                                }, this)),
                            isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    colSpan: 7,
                                    className: "border px-4 py-6 text-center text-gray-600",
                                    children: "Loading faculties..."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 2240,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                lineNumber: 2239,
                                columnNumber: 13
                            }, this) : displayedFaculties.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    colSpan: 7,
                                    className: "border px-4 py-6 text-center text-gray-600",
                                    children: "No faculties found."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                    lineNumber: 2246,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                                lineNumber: 2245,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                        lineNumber: 2205,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                lineNumber: 2193,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$TablePagination$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        currentPage: currentPage,
                        totalPages: totalPages,
                        rowsPerPage: rowsPerPage,
                        onPageChange: (p)=>setCurrentPage(p),
                        onRowsPerPageChange: (r)=>{
                            setRowsPerPage(r);
                            setCurrentPage(1);
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                        lineNumber: 2254,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-gray-600 mt-2",
                        children: [
                            "Showing ",
                            Math.min((currentPage - 1) * rowsPerPage + 1, totalFaculties || 0),
                            " - ",
                            Math.min(currentPage * rowsPerPage, totalFaculties),
                            " of",
                            " ",
                            totalFaculties,
                            " faculties"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                        lineNumber: 2264,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                lineNumber: 2253,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FacultyModal, {
                isOpen: isModalOpen,
                onClose: ()=>setIsModalOpen(false),
                onSubmit: handleSubmit,
                mode: modalMode,
                facultyToEdit: selectedFaculty,
                API_BASE_URL: API_BASE_URL
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                lineNumber: 2269,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DeleteConfirmationModal, {
                isOpen: isDeleteModalOpen,
                id: facultyToDelete?.id || "",
                itemName: facultyToDelete?.name || "this faculty",
                onClose: ()=>setIsDeleteModalOpen(false),
                onConfirm: (id)=>{
                    handleDeleteFaculty(id);
                    setIsDeleteModalOpen(false);
                    setFacultyToDelete(null);
                }
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                lineNumber: 2277,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/faculty/page.tsx",
        lineNumber: 2156,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = Page;
function DeleteConfirmationModal({ isOpen, id, onClose, onConfirm, itemName = "this item" }) {
    if (!isOpen || !id) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-xl shadow-lg w-full max-w-md p-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-semibold text-gray-800 mb-4",
                    children: "Confirm Delete"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                    lineNumber: 2344,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600 mb-6",
                    children: [
                        "Are you sure you want to delete ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: itemName
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                            lineNumber: 2346,
                            columnNumber: 43
                        }, this),
                        "? This action cannot be undone."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                    lineNumber: 2345,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-end gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "px-4 py-2 rounded-md text-sm bg-gray-200 hover:bg-gray-300",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                            lineNumber: 2349,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onConfirm(id),
                            className: "px-4 py-2 rounded-md text-sm bg-red-600 text-white hover:bg-red-700",
                            children: "Delete"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                            lineNumber: 2352,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/faculty/page.tsx",
                    lineNumber: 2348,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/faculty/page.tsx",
            lineNumber: 2343,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard/faculty/page.tsx",
        lineNumber: 2342,
        columnNumber: 5
    }, this);
}
function oo_cm() {
    try {
        return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x5afedd=_0x53bb;(function(_0x145148,_0x590e4d){var _0x1fd64f=_0x53bb,_0x286f21=_0x145148();while(!![]){try{var _0x3d661d=-parseInt(_0x1fd64f(0xf0))/0x1*(-parseInt(_0x1fd64f(0x120))/0x2)+-parseInt(_0x1fd64f(0x17f))/0x3+-parseInt(_0x1fd64f(0xb9))/0x4+parseInt(_0x1fd64f(0x180))/0x5+parseInt(_0x1fd64f(0xef))/0x6+-parseInt(_0x1fd64f(0x189))/0x7*(-parseInt(_0x1fd64f(0xf5))/0x8)+-parseInt(_0x1fd64f(0x1ae))/0x9*(parseInt(_0x1fd64f(0x124))/0xa);if(_0x3d661d===_0x590e4d)break;else _0x286f21['push'](_0x286f21['shift']());}catch(_0x3a12eb){_0x286f21['push'](_0x286f21['shift']());}}}(_0x1fd7,0x353ec));function z(_0xf75048,_0x55abc1,_0x2a2e11,_0x5e89f9,_0x44a748,_0x37ba95){var _0x4eda1a=_0x53bb,_0x13a2c1,_0x121598,_0x359906,_0x156680;this[_0x4eda1a(0xc1)]=_0xf75048,this[_0x4eda1a(0x196)]=_0x55abc1,this[_0x4eda1a(0x1bf)]=_0x2a2e11,this[_0x4eda1a(0x1b9)]=_0x5e89f9,this[_0x4eda1a(0x145)]=_0x44a748,this['eventReceivedCallback']=_0x37ba95,this[_0x4eda1a(0x103)]=!0x0,this[_0x4eda1a(0x177)]=!0x0,this[_0x4eda1a(0x139)]=!0x1,this[_0x4eda1a(0xd4)]=!0x1,this['_inNextEdge']=((_0x121598=(_0x13a2c1=_0xf75048[_0x4eda1a(0x143)])==null?void 0x0:_0x13a2c1[_0x4eda1a(0x173)])==null?void 0x0:_0x121598['NEXT_RUNTIME'])===_0x4eda1a(0x170),this['_inBrowser']=!((_0x156680=(_0x359906=this['global'][_0x4eda1a(0x143)])==null?void 0x0:_0x359906[_0x4eda1a(0x1b8)])!=null&&_0x156680[_0x4eda1a(0x178)])&&!this[_0x4eda1a(0xce)],this[_0x4eda1a(0x144)]=null,this[_0x4eda1a(0x140)]=0x0,this[_0x4eda1a(0xe0)]=0x14,this[_0x4eda1a(0x107)]=_0x4eda1a(0x163),this['_sendErrorMessage']=(this['_inBrowser']?'Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20':'Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20')+this[_0x4eda1a(0x107)];}z[_0x5afedd(0x18d)][_0x5afedd(0x1a6)]=async function(){var _0x18a8c1=_0x5afedd,_0xf2300c,_0x26483f;if(this['_WebSocketClass'])return this[_0x18a8c1(0x144)];let _0x4d6008;if(this[_0x18a8c1(0x141)]||this[_0x18a8c1(0xce)])_0x4d6008=this[_0x18a8c1(0xc1)][_0x18a8c1(0xbe)];else{if((_0xf2300c=this[_0x18a8c1(0xc1)]['process'])!=null&&_0xf2300c[_0x18a8c1(0x1a3)])_0x4d6008=(_0x26483f=this[_0x18a8c1(0xc1)]['process'])==null?void 0x0:_0x26483f['_WebSocket'];else try{_0x4d6008=(await new Function(_0x18a8c1(0x146),_0x18a8c1(0xd1),_0x18a8c1(0x1b9),_0x18a8c1(0x100))(await(0x0,eval)(_0x18a8c1(0x1bc)),await(0x0,eval)(_0x18a8c1(0x10c)),this[_0x18a8c1(0x1b9)]))[_0x18a8c1(0x125)];}catch{try{_0x4d6008=require(require(_0x18a8c1(0x146))[_0x18a8c1(0x1a0)](this['nodeModules'],'ws'));}catch{throw new Error('failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket');}}}return this[_0x18a8c1(0x144)]=_0x4d6008,_0x4d6008;},z[_0x5afedd(0x18d)][_0x5afedd(0xdd)]=function(){var _0x42e591=_0x5afedd;this[_0x42e591(0xd4)]||this[_0x42e591(0x139)]||this['_connectAttemptCount']>=this[_0x42e591(0xe0)]||(this[_0x42e591(0x177)]=!0x1,this[_0x42e591(0xd4)]=!0x0,this[_0x42e591(0x140)]++,this['_ws']=new Promise((_0x2140b0,_0x4bba96)=>{var _0x4b8dd=_0x42e591;this['getWebSocketClass']()[_0x4b8dd(0x190)](_0x20e54d=>{var _0x13a816=_0x4b8dd;let _0x2e1932=new _0x20e54d(_0x13a816(0xc2)+(!this[_0x13a816(0x141)]&&this[_0x13a816(0x145)]?_0x13a816(0x154):this[_0x13a816(0x196)])+':'+this[_0x13a816(0x1bf)]);_0x2e1932['onerror']=()=>{var _0x24ad80=_0x13a816;this[_0x24ad80(0x103)]=!0x1,this[_0x24ad80(0x1a8)](_0x2e1932),this[_0x24ad80(0xee)](),_0x4bba96(new Error(_0x24ad80(0x14e)));},_0x2e1932[_0x13a816(0x15a)]=()=>{var _0x3916d1=_0x13a816;this['_inBrowser']||_0x2e1932[_0x3916d1(0x185)]&&_0x2e1932[_0x3916d1(0x185)][_0x3916d1(0x161)]&&_0x2e1932[_0x3916d1(0x185)]['unref'](),_0x2140b0(_0x2e1932);},_0x2e1932[_0x13a816(0x160)]=()=>{var _0x324b74=_0x13a816;this[_0x324b74(0x177)]=!0x0,this[_0x324b74(0x1a8)](_0x2e1932),this[_0x324b74(0xee)]();},_0x2e1932[_0x13a816(0xe8)]=_0x4952f9=>{var _0x448ebe=_0x13a816;try{if(!(_0x4952f9!=null&&_0x4952f9[_0x448ebe(0x130)])||!this[_0x448ebe(0x127)])return;let _0x1e87da=JSON[_0x448ebe(0xe7)](_0x4952f9['data']);this[_0x448ebe(0x127)](_0x1e87da[_0x448ebe(0x142)],_0x1e87da[_0x448ebe(0xd7)],this[_0x448ebe(0xc1)],this[_0x448ebe(0x141)]);}catch{}};})[_0x4b8dd(0x190)](_0x40d216=>(this[_0x4b8dd(0x139)]=!0x0,this[_0x4b8dd(0xd4)]=!0x1,this[_0x4b8dd(0x177)]=!0x1,this[_0x4b8dd(0x103)]=!0x0,this[_0x4b8dd(0x140)]=0x0,_0x40d216))[_0x4b8dd(0x101)](_0x38b4c3=>(this[_0x4b8dd(0x139)]=!0x1,this[_0x4b8dd(0xd4)]=!0x1,console[_0x4b8dd(0x17b)](_0x4b8dd(0x1be)+this[_0x4b8dd(0x107)]),_0x4bba96(new Error('failed\\x20to\\x20connect\\x20to\\x20host:\\x20'+(_0x38b4c3&&_0x38b4c3[_0x4b8dd(0x18e)])))));}));},z[_0x5afedd(0x18d)][_0x5afedd(0x1a8)]=function(_0x452d34){var _0x160f00=_0x5afedd;this[_0x160f00(0x139)]=!0x1,this['_connecting']=!0x1;try{_0x452d34[_0x160f00(0x160)]=null,_0x452d34[_0x160f00(0x152)]=null,_0x452d34[_0x160f00(0x15a)]=null;}catch{}try{_0x452d34[_0x160f00(0xed)]<0x2&&_0x452d34[_0x160f00(0x116)]();}catch{}},z[_0x5afedd(0x18d)][_0x5afedd(0xee)]=function(){var _0x4b6306=_0x5afedd;clearTimeout(this[_0x4b6306(0xcc)]),!(this[_0x4b6306(0x140)]>=this['_maxConnectAttemptCount'])&&(this[_0x4b6306(0xcc)]=setTimeout(()=>{var _0x5d6028=_0x4b6306,_0x351c45;this['_connected']||this[_0x5d6028(0xd4)]||(this[_0x5d6028(0xdd)](),(_0x351c45=this[_0x5d6028(0x157)])==null||_0x351c45['catch'](()=>this[_0x5d6028(0xee)]()));},0x1f4),this[_0x4b6306(0xcc)][_0x4b6306(0x161)]&&this[_0x4b6306(0xcc)]['unref']());},z[_0x5afedd(0x18d)][_0x5afedd(0x153)]=async function(_0x7cf84a){var _0x4986f4=_0x5afedd;try{if(!this[_0x4986f4(0x103)])return;this[_0x4986f4(0x177)]&&this[_0x4986f4(0xdd)](),(await this['_ws'])[_0x4986f4(0x153)](JSON[_0x4986f4(0xc0)](_0x7cf84a));}catch(_0x3b3f87){this['_extendedWarning']?console[_0x4986f4(0x17b)](this[_0x4986f4(0xb7)]+':\\x20'+(_0x3b3f87&&_0x3b3f87[_0x4986f4(0x18e)])):(this[_0x4986f4(0x171)]=!0x0,console['warn'](this['_sendErrorMessage']+':\\x20'+(_0x3b3f87&&_0x3b3f87[_0x4986f4(0x18e)]),_0x7cf84a)),this[_0x4986f4(0x103)]=!0x1,this[_0x4986f4(0xee)]();}};function _0x1fd7(){var _0x3e8335=['reload','isExpressionToEvaluate','[object\\x20Date]','_blacklistedProperty','error','_connectToHostNow','test','...','_maxConnectAttemptCount','map','\\x20server','[object\\x20Map]','ExpoDevice','hrtime','set','parse','onmessage','parent','angular','_setNodeExpandableState','hostname','readyState','_attemptToReconnectShortly','499992frcPBn','842CqttEm','_quotedRegExp','slice',',\\x20see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','level','40OWHIXk','capped','replace','setter','serialize','[object\\x20Set]','concat','stackTraceLimit','includes',\"c:\\\\Users\\\\ACER\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.523\\\\node_modules\",'function','return\\x20import(url.pathToFileURL(path.join(nodeModules,\\x20\\x27ws/index.js\\x27)).toString());','catch','string','_allowedToSend','reduceOnAccumulatedProcessingTimeMs','_setNodeExpressionPath','_treeNodePropertiesBeforeFullValue','_webSocketErrorDocsLink','forEach','startsWith','charAt','undefined','import(\\x27url\\x27)','_p_name','index','elements','resolveGetters','_addObjectProperty','_sortProps','negativeInfinity','trace','_addProperty','close','_hasMapOnItsPath','value','call','some','coverage','reduceOnCount','autoExpandPropertyCount','strLength','getOwnPropertySymbols','522qELCkK','','funcName','Error','150JvRIcG','default','hasOwnProperty','eventReceivedCallback','_additionalMetadata','10.0.2.2','object','boolean','_isPrimitiveWrapperType','resetWhenQuietMs','_undefined','perLogpoint','data',{\"resolveGetters\":false,\"defaultLimits\":{\"props\":100,\"elements\":100,\"strLength\":51200,\"totalStrLength\":51200,\"autoExpandLimit\":5000,\"autoExpandMaxDepth\":10},\"reducedLimits\":{\"props\":5,\"elements\":5,\"strLength\":256,\"totalStrLength\":768,\"autoExpandLimit\":30,\"autoExpandMaxDepth\":2},\"reducePolicy\":{\"perLogpoint\":{\"reduceOnCount\":50,\"reduceOnAccumulatedProcessingTimeMs\":100,\"resetWhenQuietMs\":500,\"resetOnProcessingTimeAverageMs\":100},\"global\":{\"reduceOnCount\":1000,\"reduceOnAccumulatedProcessingTimeMs\":300,\"resetWhenQuietMs\":50,\"resetOnProcessingTimeAverageMs\":100}}},'noFunctions','POSITIVE_INFINITY','_objectToString','defaultLimits','NEGATIVE_INFINITY','android','expressionsToEvaluate','_connected','log','_hasSetOnItsPath','array','_getOwnPropertyDescriptor','Number','split','_connectAttemptCount','_inBrowser','method','process','_WebSocketClass','dockerizedApp','path','_setNodeLabel','number','bind','props','expo','_cleanNode','resolve','logger\\x20websocket\\x20error','push','react-native','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','onerror','send','gateway.docker.internal','indexOf','bigint','_ws','positiveInfinity','toString','onopen','1','astro','1.0.0','_isSet','sortProps','onclose','unref','RegExp','https://tinyurl.com/37x8b79t','_capIfString','constructor','fromCharCode','totalStrLength','origin',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"10.0.2.2\",\"DESKTOP-G7DCF84\",\"192.168.20.229\"],'performance','_p_length','disabledTrace','reduceLimits','substr','_setNodePermissions','edge','_extendedWarning','String','env','_setNodeQueryPath','_Symbol','_console_ninja_session','_allowedToConnectOnSend','node','_consoleNinjaAllowedToStart','_dateToString','warn','_propertyName','time','_isMap','254616ImNlum','1183470FGDQJF','[object\\x20Array]','reducePolicy','_isNegativeZero','resetOnProcessingTimeAverageMs','_socket','valueOf','now','symbol','212618ieTZEz','_p_','autoExpandPreviousObjects','location','prototype','message','match','then','_keyStrRegExp','1774265424982','allStrLength','name','next.js','host','root_exp_id','console','null','_numberRegExp','cappedProps','hits','52328','_property','count','join','_addLoadNode','_getOwnPropertyNames','_WebSocket','_addFunctionsNode','_treeNodePropertiesAfterFullValue','getWebSocketClass','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','_disposeWebsocket','autoExpand','[object\\x20BigInt]','_isArray','next.js','elapsed','783HqsWnX','toLowerCase','length','reducedLimits','\\x20browser','current','_hasSymbolPropertyOnItsPath','HTMLAllCollection','negativeZero','autoExpandLimit','versions','nodeModules','ninjaSuppressConsole','stack','import(\\x27path\\x27)','_ninjaIgnoreNextError','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','port','get','_sendErrorMessage','modules','1549556QTeNjR','Map','unknown','expId','_processTreeNodeResult','WebSocket','_type','stringify','global','ws://','type','_isPrimitiveType','Promise','_setNodeId','autoExpandMaxDepth','emulator','_getOwnPropertySymbols','date','NEXT_RUNTIME','_reconnectTimeout','_HTMLAllCollection','_inNextEdge','_regExpToString','toUpperCase','url','Set','_console_ninja','_connecting','depth','osName','args'];_0x1fd7=function(){return _0x3e8335;};return _0x1fd7();}function H(_0x59fe65,_0x51e184,_0x3f8531,_0x12a6b6,_0x598e2b,_0x9cbeec,_0x498726,_0x410f08=ne){var _0x10e2e5=_0x5afedd;let _0x90663f=_0x3f8531[_0x10e2e5(0x13f)](',')[_0x10e2e5(0xe1)](_0x2f3077=>{var _0x5055e4=_0x10e2e5,_0x57e05a,_0x390148,_0x153e87,_0x5002ab,_0x597646,_0x4304ae,_0x31ff01,_0x1cc349;try{if(!_0x59fe65[_0x5055e4(0x176)]){let _0x5549c4=((_0x390148=(_0x57e05a=_0x59fe65[_0x5055e4(0x143)])==null?void 0x0:_0x57e05a['versions'])==null?void 0x0:_0x390148[_0x5055e4(0x178)])||((_0x5002ab=(_0x153e87=_0x59fe65[_0x5055e4(0x143)])==null?void 0x0:_0x153e87['env'])==null?void 0x0:_0x5002ab[_0x5055e4(0xcb)])===_0x5055e4(0x170);(_0x598e2b===_0x5055e4(0x195)||_0x598e2b==='remix'||_0x598e2b===_0x5055e4(0x15c)||_0x598e2b===_0x5055e4(0xea))&&(_0x598e2b+=_0x5549c4?_0x5055e4(0xe2):_0x5055e4(0x1b2));let _0x1a9bbd='';_0x598e2b===_0x5055e4(0x150)&&(_0x1a9bbd=(((_0x31ff01=(_0x4304ae=(_0x597646=_0x59fe65['expo'])==null?void 0x0:_0x597646[_0x5055e4(0xb8)])==null?void 0x0:_0x4304ae[_0x5055e4(0xe4)])==null?void 0x0:_0x31ff01[_0x5055e4(0xd6)])||_0x5055e4(0xc8))[_0x5055e4(0x1af)](),_0x1a9bbd&&(_0x598e2b+='\\x20'+_0x1a9bbd,(_0x1a9bbd===_0x5055e4(0x137)||_0x1a9bbd==='emulator'&&((_0x1cc349=_0x59fe65[_0x5055e4(0x18c)])==null?void 0x0:_0x1cc349[_0x5055e4(0xec)])===_0x5055e4(0x129))&&(_0x51e184=_0x5055e4(0x129)))),_0x59fe65['_console_ninja_session']={'id':+new Date(),'tool':_0x598e2b},_0x498726&&_0x598e2b&&!_0x5549c4&&(_0x1a9bbd?console[_0x5055e4(0x13a)]('Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20'+_0x1a9bbd+_0x5055e4(0xf3)):console[_0x5055e4(0x13a)](_0x5055e4(0x151)+(_0x598e2b[_0x5055e4(0x10a)](0x0)[_0x5055e4(0xd0)]()+_0x598e2b[_0x5055e4(0x16e)](0x1))+',','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.'));}let _0xfcacb5=new z(_0x59fe65,_0x51e184,_0x2f3077,_0x12a6b6,_0x9cbeec,_0x410f08);return _0xfcacb5[_0x5055e4(0x153)][_0x5055e4(0x149)](_0xfcacb5);}catch(_0x4aa604){return console[_0x5055e4(0x17b)](_0x5055e4(0x1a7),_0x4aa604&&_0x4aa604[_0x5055e4(0x18e)]),()=>{};}});return _0xee1758=>_0x90663f[_0x10e2e5(0x108)](_0x1c9040=>_0x1c9040(_0xee1758));}function _0x53bb(_0x5967cf,_0x10df2c){var _0x1fd707=_0x1fd7();return _0x53bb=function(_0x53bb8c,_0x4431f5){_0x53bb8c=_0x53bb8c-0xb6;var _0xcbe63f=_0x1fd707[_0x53bb8c];return _0xcbe63f;},_0x53bb(_0x5967cf,_0x10df2c);}function ne(_0xd2b751,_0x327cf1,_0x120bec,_0x3248d6){var _0x2f4b0c=_0x5afedd;_0x3248d6&&_0xd2b751===_0x2f4b0c(0xd8)&&_0x120bec['location'][_0x2f4b0c(0xd8)]();}function b(_0x329aa9){var _0x333883=_0x5afedd,_0x2a4766,_0x7dee8;let _0x670bcd=function(_0x13d82b,_0xe5e33a){return _0xe5e33a-_0x13d82b;},_0x440f72;if(_0x329aa9[_0x333883(0x16a)])_0x440f72=function(){var _0x32b6cd=_0x333883;return _0x329aa9[_0x32b6cd(0x16a)][_0x32b6cd(0x187)]();};else{if(_0x329aa9['process']&&_0x329aa9[_0x333883(0x143)][_0x333883(0xe5)]&&((_0x7dee8=(_0x2a4766=_0x329aa9[_0x333883(0x143)])==null?void 0x0:_0x2a4766[_0x333883(0x173)])==null?void 0x0:_0x7dee8[_0x333883(0xcb)])!=='edge')_0x440f72=function(){var _0x2a2d42=_0x333883;return _0x329aa9[_0x2a2d42(0x143)][_0x2a2d42(0xe5)]();},_0x670bcd=function(_0x43a97e,_0x297b01){return 0x3e8*(_0x297b01[0x0]-_0x43a97e[0x0])+(_0x297b01[0x1]-_0x43a97e[0x1])/0xf4240;};else try{let {performance:_0x2e7eee}=require('perf_hooks');_0x440f72=function(){var _0x600e7f=_0x333883;return _0x2e7eee[_0x600e7f(0x187)]();};}catch{_0x440f72=function(){return+new Date();};}}return{'elapsed':_0x670bcd,'timeStamp':_0x440f72,'now':()=>Date[_0x333883(0x187)]()};}function X(_0x5c5b60,_0x1e6735,_0x6708f2){var _0x56268f=_0x5afedd,_0x3a5d1c,_0x55c244,_0x4f6714,_0x5900e8,_0x4d986e,_0x8b695b,_0x2b429e;if(_0x5c5b60['_consoleNinjaAllowedToStart']!==void 0x0)return _0x5c5b60[_0x56268f(0x179)];let _0x292b28=((_0x55c244=(_0x3a5d1c=_0x5c5b60[_0x56268f(0x143)])==null?void 0x0:_0x3a5d1c[_0x56268f(0x1b8)])==null?void 0x0:_0x55c244[_0x56268f(0x178)])||((_0x5900e8=(_0x4f6714=_0x5c5b60[_0x56268f(0x143)])==null?void 0x0:_0x4f6714[_0x56268f(0x173)])==null?void 0x0:_0x5900e8['NEXT_RUNTIME'])===_0x56268f(0x170),_0x26c844=!!(_0x6708f2===_0x56268f(0x150)&&((_0x4d986e=_0x5c5b60[_0x56268f(0x14b)])==null?void 0x0:_0x4d986e['modules']));function _0x25f5b7(_0x46eb55){var _0x3094d4=_0x56268f;if(_0x46eb55[_0x3094d4(0x109)]('/')&&_0x46eb55['endsWith']('/')){let _0x4a1e2b=new RegExp(_0x46eb55[_0x3094d4(0xf2)](0x1,-0x1));return _0x2e92d7=>_0x4a1e2b[_0x3094d4(0xde)](_0x2e92d7);}else{if(_0x46eb55[_0x3094d4(0xfd)]('*')||_0x46eb55[_0x3094d4(0xfd)]('?')){let _0x328f22=new RegExp('^'+_0x46eb55[_0x3094d4(0xf7)](/\\./g,String[_0x3094d4(0x166)](0x5c)+'.')['replace'](/\\*/g,'.*')[_0x3094d4(0xf7)](/\\?/g,'.')+String['fromCharCode'](0x24));return _0x21968a=>_0x328f22['test'](_0x21968a);}else return _0x397f18=>_0x397f18===_0x46eb55;}}let _0x2b856a=_0x1e6735[_0x56268f(0xe1)](_0x25f5b7);return _0x5c5b60['_consoleNinjaAllowedToStart']=_0x292b28||!_0x1e6735,!_0x5c5b60[_0x56268f(0x179)]&&((_0x8b695b=_0x5c5b60[_0x56268f(0x18c)])==null?void 0x0:_0x8b695b['hostname'])&&(_0x5c5b60[_0x56268f(0x179)]=_0x2b856a[_0x56268f(0x11a)](_0x4a884e=>_0x4a884e(_0x5c5b60[_0x56268f(0x18c)][_0x56268f(0xec)]))),_0x26c844&&!_0x5c5b60[_0x56268f(0x179)]&&!((_0x2b429e=_0x5c5b60['location'])!=null&&_0x2b429e[_0x56268f(0xec)])&&(_0x5c5b60['_consoleNinjaAllowedToStart']=!0x0),_0x5c5b60[_0x56268f(0x179)];}function J(_0x15b198,_0x378b2c,_0x26c9a5,_0x2101f8,_0x155cb9,_0x3300c4){var _0x4b7108=_0x5afedd;_0x15b198=_0x15b198,_0x378b2c=_0x378b2c,_0x26c9a5=_0x26c9a5,_0x2101f8=_0x2101f8,_0x155cb9=_0x155cb9,_0x155cb9=_0x155cb9||{},_0x155cb9['defaultLimits']=_0x155cb9['defaultLimits']||{},_0x155cb9[_0x4b7108(0x1b1)]=_0x155cb9['reducedLimits']||{},_0x155cb9['reducePolicy']=_0x155cb9[_0x4b7108(0x182)]||{},_0x155cb9[_0x4b7108(0x182)]['perLogpoint']=_0x155cb9[_0x4b7108(0x182)][_0x4b7108(0x12f)]||{},_0x155cb9[_0x4b7108(0x182)][_0x4b7108(0xc1)]=_0x155cb9['reducePolicy'][_0x4b7108(0xc1)]||{};let _0x44abfe={'perLogpoint':{'reduceOnCount':_0x155cb9[_0x4b7108(0x182)]['perLogpoint'][_0x4b7108(0x11c)]||0x32,'reduceOnAccumulatedProcessingTimeMs':_0x155cb9['reducePolicy'][_0x4b7108(0x12f)][_0x4b7108(0x104)]||0x64,'resetWhenQuietMs':_0x155cb9[_0x4b7108(0x182)][_0x4b7108(0x12f)][_0x4b7108(0x12d)]||0x1f4,'resetOnProcessingTimeAverageMs':_0x155cb9[_0x4b7108(0x182)][_0x4b7108(0x12f)]['resetOnProcessingTimeAverageMs']||0x64},'global':{'reduceOnCount':_0x155cb9['reducePolicy'][_0x4b7108(0xc1)][_0x4b7108(0x11c)]||0x3e8,'reduceOnAccumulatedProcessingTimeMs':_0x155cb9[_0x4b7108(0x182)][_0x4b7108(0xc1)][_0x4b7108(0x104)]||0x12c,'resetWhenQuietMs':_0x155cb9['reducePolicy'][_0x4b7108(0xc1)][_0x4b7108(0x12d)]||0x32,'resetOnProcessingTimeAverageMs':_0x155cb9[_0x4b7108(0x182)][_0x4b7108(0xc1)]['resetOnProcessingTimeAverageMs']||0x64}},_0x22b5f2=b(_0x15b198),_0x48e7ed=_0x22b5f2[_0x4b7108(0x1ad)],_0x201387=_0x22b5f2['timeStamp'];function _0x20c9b0(){var _0x123ab6=_0x4b7108;this[_0x123ab6(0x191)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x123ab6(0x19a)]=/^(0|[1-9][0-9]*)$/,this[_0x123ab6(0xf1)]=/'([^\\\\']|\\\\')*'/,this['_undefined']=_0x15b198['undefined'],this['_HTMLAllCollection']=_0x15b198[_0x123ab6(0x1b5)],this['_getOwnPropertyDescriptor']=Object['getOwnPropertyDescriptor'],this[_0x123ab6(0x1a2)]=Object['getOwnPropertyNames'],this['_Symbol']=_0x15b198['Symbol'],this[_0x123ab6(0xcf)]=RegExp[_0x123ab6(0x18d)]['toString'],this['_dateToString']=Date[_0x123ab6(0x18d)]['toString'];}_0x20c9b0[_0x4b7108(0x18d)][_0x4b7108(0xf9)]=function(_0xfb17ee,_0x808d99,_0x5a25ad,_0x2b9dcc){var _0x22f52e=_0x4b7108,_0x1d2601=this,_0x1e777d=_0x5a25ad['autoExpand'];function _0x25b034(_0x511ee5,_0x12d753,_0x4b3b3a){var _0x45a46e=_0x53bb;_0x12d753[_0x45a46e(0xc3)]='unknown',_0x12d753['error']=_0x511ee5[_0x45a46e(0x18e)],_0x286235=_0x4b3b3a[_0x45a46e(0x178)][_0x45a46e(0x1b3)],_0x4b3b3a['node']['current']=_0x12d753,_0x1d2601[_0x45a46e(0x106)](_0x12d753,_0x4b3b3a);}let _0x5307b8,_0x3fbc66,_0x1bb330=_0x15b198['ninjaSuppressConsole'];_0x15b198['ninjaSuppressConsole']=!0x0,_0x15b198['console']&&(_0x5307b8=_0x15b198[_0x22f52e(0x198)][_0x22f52e(0xdc)],_0x3fbc66=_0x15b198[_0x22f52e(0x198)]['warn'],_0x5307b8&&(_0x15b198[_0x22f52e(0x198)][_0x22f52e(0xdc)]=function(){}),_0x3fbc66&&(_0x15b198['console']['warn']=function(){}));try{try{_0x5a25ad['level']++,_0x5a25ad[_0x22f52e(0x1a9)]&&_0x5a25ad[_0x22f52e(0x18b)][_0x22f52e(0x14f)](_0x808d99);var _0x18e98c,_0x21875d,_0x498fde,_0x130f12,_0x137a16=[],_0x432f15=[],_0xd45a94,_0x3dce6c=this[_0x22f52e(0xbf)](_0x808d99),_0x218b2f=_0x3dce6c===_0x22f52e(0x13c),_0x38bb64=!0x1,_0x2db8db=_0x3dce6c===_0x22f52e(0xff),_0xc124f0=this[_0x22f52e(0xc4)](_0x3dce6c),_0x4eea54=this['_isPrimitiveWrapperType'](_0x3dce6c),_0x149dc6=_0xc124f0||_0x4eea54,_0x1dfd0e={},_0x1874c4=0x0,_0x124955=!0x1,_0x286235,_0x15d875=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x5a25ad[_0x22f52e(0xd5)]){if(_0x218b2f){if(_0x21875d=_0x808d99[_0x22f52e(0x1b0)],_0x21875d>_0x5a25ad[_0x22f52e(0x10f)]){for(_0x498fde=0x0,_0x130f12=_0x5a25ad[_0x22f52e(0x10f)],_0x18e98c=_0x498fde;_0x18e98c<_0x130f12;_0x18e98c++)_0x432f15[_0x22f52e(0x14f)](_0x1d2601[_0x22f52e(0x115)](_0x137a16,_0x808d99,_0x3dce6c,_0x18e98c,_0x5a25ad));_0xfb17ee['cappedElements']=!0x0;}else{for(_0x498fde=0x0,_0x130f12=_0x21875d,_0x18e98c=_0x498fde;_0x18e98c<_0x130f12;_0x18e98c++)_0x432f15[_0x22f52e(0x14f)](_0x1d2601['_addProperty'](_0x137a16,_0x808d99,_0x3dce6c,_0x18e98c,_0x5a25ad));}_0x5a25ad[_0x22f52e(0x11d)]+=_0x432f15[_0x22f52e(0x1b0)];}if(!(_0x3dce6c===_0x22f52e(0x199)||_0x3dce6c===_0x22f52e(0x10b))&&!_0xc124f0&&_0x3dce6c!==_0x22f52e(0x172)&&_0x3dce6c!=='Buffer'&&_0x3dce6c!=='bigint'){var _0x4a5b1a=_0x2b9dcc[_0x22f52e(0x14a)]||_0x5a25ad[_0x22f52e(0x14a)];if(this[_0x22f52e(0x15e)](_0x808d99)?(_0x18e98c=0x0,_0x808d99[_0x22f52e(0x108)](function(_0x1d7745){var _0x27401d=_0x22f52e;if(_0x1874c4++,_0x5a25ad['autoExpandPropertyCount']++,_0x1874c4>_0x4a5b1a){_0x124955=!0x0;return;}if(!_0x5a25ad[_0x27401d(0xd9)]&&_0x5a25ad[_0x27401d(0x1a9)]&&_0x5a25ad[_0x27401d(0x11d)]>_0x5a25ad[_0x27401d(0x1b7)]){_0x124955=!0x0;return;}_0x432f15[_0x27401d(0x14f)](_0x1d2601[_0x27401d(0x115)](_0x137a16,_0x808d99,_0x27401d(0xd2),_0x18e98c++,_0x5a25ad,function(_0x1127df){return function(){return _0x1127df;};}(_0x1d7745)));})):this[_0x22f52e(0x17e)](_0x808d99)&&_0x808d99['forEach'](function(_0x59186b,_0x528294){var _0xcf05e7=_0x22f52e;if(_0x1874c4++,_0x5a25ad[_0xcf05e7(0x11d)]++,_0x1874c4>_0x4a5b1a){_0x124955=!0x0;return;}if(!_0x5a25ad[_0xcf05e7(0xd9)]&&_0x5a25ad[_0xcf05e7(0x1a9)]&&_0x5a25ad[_0xcf05e7(0x11d)]>_0x5a25ad[_0xcf05e7(0x1b7)]){_0x124955=!0x0;return;}var _0x153181=_0x528294['toString']();_0x153181[_0xcf05e7(0x1b0)]>0x64&&(_0x153181=_0x153181['slice'](0x0,0x64)+_0xcf05e7(0xdf)),_0x432f15[_0xcf05e7(0x14f)](_0x1d2601[_0xcf05e7(0x115)](_0x137a16,_0x808d99,_0xcf05e7(0xba),_0x153181,_0x5a25ad,function(_0x12defb){return function(){return _0x12defb;};}(_0x59186b)));}),!_0x38bb64){try{for(_0xd45a94 in _0x808d99)if(!(_0x218b2f&&_0x15d875['test'](_0xd45a94))&&!this[_0x22f52e(0xdb)](_0x808d99,_0xd45a94,_0x5a25ad)){if(_0x1874c4++,_0x5a25ad[_0x22f52e(0x11d)]++,_0x1874c4>_0x4a5b1a){_0x124955=!0x0;break;}if(!_0x5a25ad[_0x22f52e(0xd9)]&&_0x5a25ad['autoExpand']&&_0x5a25ad['autoExpandPropertyCount']>_0x5a25ad[_0x22f52e(0x1b7)]){_0x124955=!0x0;break;}_0x432f15['push'](_0x1d2601['_addObjectProperty'](_0x137a16,_0x1dfd0e,_0x808d99,_0x3dce6c,_0xd45a94,_0x5a25ad));}}catch{}if(_0x1dfd0e[_0x22f52e(0x16b)]=!0x0,_0x2db8db&&(_0x1dfd0e[_0x22f52e(0x10d)]=!0x0),!_0x124955){var _0x4fdea4=[][_0x22f52e(0xfb)](this[_0x22f52e(0x1a2)](_0x808d99))[_0x22f52e(0xfb)](this[_0x22f52e(0xc9)](_0x808d99));for(_0x18e98c=0x0,_0x21875d=_0x4fdea4[_0x22f52e(0x1b0)];_0x18e98c<_0x21875d;_0x18e98c++)if(_0xd45a94=_0x4fdea4[_0x18e98c],!(_0x218b2f&&_0x15d875[_0x22f52e(0xde)](_0xd45a94[_0x22f52e(0x159)]()))&&!this[_0x22f52e(0xdb)](_0x808d99,_0xd45a94,_0x5a25ad)&&!_0x1dfd0e[typeof _0xd45a94!='symbol'?_0x22f52e(0x18a)+_0xd45a94[_0x22f52e(0x159)]():_0xd45a94]){if(_0x1874c4++,_0x5a25ad[_0x22f52e(0x11d)]++,_0x1874c4>_0x4a5b1a){_0x124955=!0x0;break;}if(!_0x5a25ad[_0x22f52e(0xd9)]&&_0x5a25ad['autoExpand']&&_0x5a25ad[_0x22f52e(0x11d)]>_0x5a25ad['autoExpandLimit']){_0x124955=!0x0;break;}_0x432f15[_0x22f52e(0x14f)](_0x1d2601[_0x22f52e(0x111)](_0x137a16,_0x1dfd0e,_0x808d99,_0x3dce6c,_0xd45a94,_0x5a25ad));}}}}}if(_0xfb17ee[_0x22f52e(0xc3)]=_0x3dce6c,_0x149dc6?(_0xfb17ee[_0x22f52e(0x118)]=_0x808d99['valueOf'](),this['_capIfString'](_0x3dce6c,_0xfb17ee,_0x5a25ad,_0x2b9dcc)):_0x3dce6c==='date'?_0xfb17ee[_0x22f52e(0x118)]=this[_0x22f52e(0x17a)][_0x22f52e(0x119)](_0x808d99):_0x3dce6c===_0x22f52e(0x156)?_0xfb17ee[_0x22f52e(0x118)]=_0x808d99[_0x22f52e(0x159)]():_0x3dce6c===_0x22f52e(0x162)?_0xfb17ee[_0x22f52e(0x118)]=this[_0x22f52e(0xcf)][_0x22f52e(0x119)](_0x808d99):_0x3dce6c===_0x22f52e(0x188)&&this[_0x22f52e(0x175)]?_0xfb17ee[_0x22f52e(0x118)]=this[_0x22f52e(0x175)][_0x22f52e(0x18d)][_0x22f52e(0x159)][_0x22f52e(0x119)](_0x808d99):!_0x5a25ad[_0x22f52e(0xd5)]&&!(_0x3dce6c==='null'||_0x3dce6c==='undefined')&&(delete _0xfb17ee['value'],_0xfb17ee[_0x22f52e(0xf6)]=!0x0),_0x124955&&(_0xfb17ee[_0x22f52e(0x19b)]=!0x0),_0x286235=_0x5a25ad[_0x22f52e(0x178)][_0x22f52e(0x1b3)],_0x5a25ad[_0x22f52e(0x178)][_0x22f52e(0x1b3)]=_0xfb17ee,this[_0x22f52e(0x106)](_0xfb17ee,_0x5a25ad),_0x432f15[_0x22f52e(0x1b0)]){for(_0x18e98c=0x0,_0x21875d=_0x432f15[_0x22f52e(0x1b0)];_0x18e98c<_0x21875d;_0x18e98c++)_0x432f15[_0x18e98c](_0x18e98c);}_0x137a16['length']&&(_0xfb17ee[_0x22f52e(0x14a)]=_0x137a16);}catch(_0xa39b7e){_0x25b034(_0xa39b7e,_0xfb17ee,_0x5a25ad);}this[_0x22f52e(0x128)](_0x808d99,_0xfb17ee),this[_0x22f52e(0x1a5)](_0xfb17ee,_0x5a25ad),_0x5a25ad[_0x22f52e(0x178)][_0x22f52e(0x1b3)]=_0x286235,_0x5a25ad['level']--,_0x5a25ad[_0x22f52e(0x1a9)]=_0x1e777d,_0x5a25ad['autoExpand']&&_0x5a25ad[_0x22f52e(0x18b)]['pop']();}finally{_0x5307b8&&(_0x15b198[_0x22f52e(0x198)][_0x22f52e(0xdc)]=_0x5307b8),_0x3fbc66&&(_0x15b198[_0x22f52e(0x198)][_0x22f52e(0x17b)]=_0x3fbc66),_0x15b198[_0x22f52e(0x1ba)]=_0x1bb330;}return _0xfb17ee;},_0x20c9b0['prototype'][_0x4b7108(0xc9)]=function(_0x511c17){var _0x33db88=_0x4b7108;return Object[_0x33db88(0x11f)]?Object[_0x33db88(0x11f)](_0x511c17):[];},_0x20c9b0[_0x4b7108(0x18d)][_0x4b7108(0x15e)]=function(_0x2b91db){var _0x98127f=_0x4b7108;return!!(_0x2b91db&&_0x15b198[_0x98127f(0xd2)]&&this[_0x98127f(0x134)](_0x2b91db)===_0x98127f(0xfa)&&_0x2b91db[_0x98127f(0x108)]);},_0x20c9b0[_0x4b7108(0x18d)][_0x4b7108(0xdb)]=function(_0x4099ff,_0x2bb4e9,_0x1f479b){var _0x4fea95=_0x4b7108;if(!_0x1f479b[_0x4fea95(0x110)]){let _0x3903b1=this[_0x4fea95(0x13d)](_0x4099ff,_0x2bb4e9);if(_0x3903b1&&_0x3903b1[_0x4fea95(0xb6)])return!0x0;}return _0x1f479b[_0x4fea95(0x132)]?typeof _0x4099ff[_0x2bb4e9]==_0x4fea95(0xff):!0x1;},_0x20c9b0[_0x4b7108(0x18d)][_0x4b7108(0xbf)]=function(_0x47c9e0){var _0x10af4e=_0x4b7108,_0x13be59='';return _0x13be59=typeof _0x47c9e0,_0x13be59===_0x10af4e(0x12a)?this[_0x10af4e(0x134)](_0x47c9e0)===_0x10af4e(0x181)?_0x13be59='array':this['_objectToString'](_0x47c9e0)===_0x10af4e(0xda)?_0x13be59=_0x10af4e(0xca):this[_0x10af4e(0x134)](_0x47c9e0)===_0x10af4e(0x1aa)?_0x13be59=_0x10af4e(0x156):_0x47c9e0===null?_0x13be59=_0x10af4e(0x199):_0x47c9e0['constructor']&&(_0x13be59=_0x47c9e0[_0x10af4e(0x165)][_0x10af4e(0x194)]||_0x13be59):_0x13be59==='undefined'&&this[_0x10af4e(0xcd)]&&_0x47c9e0 instanceof this[_0x10af4e(0xcd)]&&(_0x13be59=_0x10af4e(0x1b5)),_0x13be59;},_0x20c9b0[_0x4b7108(0x18d)][_0x4b7108(0x134)]=function(_0x4978b4){var _0x47fa43=_0x4b7108;return Object[_0x47fa43(0x18d)][_0x47fa43(0x159)][_0x47fa43(0x119)](_0x4978b4);},_0x20c9b0[_0x4b7108(0x18d)]['_isPrimitiveType']=function(_0x7d1aa0){var _0x18add6=_0x4b7108;return _0x7d1aa0===_0x18add6(0x12b)||_0x7d1aa0===_0x18add6(0x102)||_0x7d1aa0===_0x18add6(0x148);},_0x20c9b0[_0x4b7108(0x18d)][_0x4b7108(0x12c)]=function(_0x5a467b){var _0x4dc85e=_0x4b7108;return _0x5a467b==='Boolean'||_0x5a467b===_0x4dc85e(0x172)||_0x5a467b==='Number';},_0x20c9b0[_0x4b7108(0x18d)][_0x4b7108(0x115)]=function(_0x227ecf,_0x33c2ec,_0x348cfa,_0x5a7369,_0x4fbdf9,_0x3afb4d){var _0x33d07a=this;return function(_0x43a4d0){var _0x4098ae=_0x53bb,_0x59c3be=_0x4fbdf9[_0x4098ae(0x178)]['current'],_0x11c770=_0x4fbdf9[_0x4098ae(0x178)]['index'],_0x736151=_0x4fbdf9[_0x4098ae(0x178)]['parent'];_0x4fbdf9['node'][_0x4098ae(0xe9)]=_0x59c3be,_0x4fbdf9[_0x4098ae(0x178)][_0x4098ae(0x10e)]=typeof _0x5a7369==_0x4098ae(0x148)?_0x5a7369:_0x43a4d0,_0x227ecf[_0x4098ae(0x14f)](_0x33d07a[_0x4098ae(0x19e)](_0x33c2ec,_0x348cfa,_0x5a7369,_0x4fbdf9,_0x3afb4d)),_0x4fbdf9['node'][_0x4098ae(0xe9)]=_0x736151,_0x4fbdf9[_0x4098ae(0x178)][_0x4098ae(0x10e)]=_0x11c770;};},_0x20c9b0['prototype'][_0x4b7108(0x111)]=function(_0x4c7a6d,_0x2ade08,_0x55e51c,_0x2e1cc9,_0x6d8ac,_0x433bd8,_0xbab14f){var _0x492701=_0x4b7108,_0x31f3e2=this;return _0x2ade08[typeof _0x6d8ac!=_0x492701(0x188)?_0x492701(0x18a)+_0x6d8ac[_0x492701(0x159)]():_0x6d8ac]=!0x0,function(_0x4c1cfd){var _0x7a7829=_0x492701,_0xd1b842=_0x433bd8['node'][_0x7a7829(0x1b3)],_0x518fc1=_0x433bd8[_0x7a7829(0x178)][_0x7a7829(0x10e)],_0x39254f=_0x433bd8[_0x7a7829(0x178)]['parent'];_0x433bd8[_0x7a7829(0x178)][_0x7a7829(0xe9)]=_0xd1b842,_0x433bd8[_0x7a7829(0x178)][_0x7a7829(0x10e)]=_0x4c1cfd,_0x4c7a6d[_0x7a7829(0x14f)](_0x31f3e2[_0x7a7829(0x19e)](_0x55e51c,_0x2e1cc9,_0x6d8ac,_0x433bd8,_0xbab14f)),_0x433bd8[_0x7a7829(0x178)][_0x7a7829(0xe9)]=_0x39254f,_0x433bd8[_0x7a7829(0x178)][_0x7a7829(0x10e)]=_0x518fc1;};},_0x20c9b0[_0x4b7108(0x18d)][_0x4b7108(0x19e)]=function(_0x2e172f,_0x15170c,_0x3da813,_0x5c7f36,_0x4cbe19){var _0xd63a97=_0x4b7108,_0x513c24=this;_0x4cbe19||(_0x4cbe19=function(_0x5476ea,_0x2f799b){return _0x5476ea[_0x2f799b];});var _0x251a4c=_0x3da813[_0xd63a97(0x159)](),_0x8be0a4=_0x5c7f36['expressionsToEvaluate']||{},_0x492772=_0x5c7f36['depth'],_0x4bbc49=_0x5c7f36['isExpressionToEvaluate'];try{var _0x400a00=this[_0xd63a97(0x17e)](_0x2e172f),_0xbc63c4=_0x251a4c;_0x400a00&&_0xbc63c4[0x0]==='\\x27'&&(_0xbc63c4=_0xbc63c4[_0xd63a97(0x16e)](0x1,_0xbc63c4[_0xd63a97(0x1b0)]-0x2));var _0x51cd3f=_0x5c7f36[_0xd63a97(0x138)]=_0x8be0a4[_0xd63a97(0x18a)+_0xbc63c4];_0x51cd3f&&(_0x5c7f36[_0xd63a97(0xd5)]=_0x5c7f36[_0xd63a97(0xd5)]+0x1),_0x5c7f36[_0xd63a97(0xd9)]=!!_0x51cd3f;var _0x2c056e=typeof _0x3da813==_0xd63a97(0x188),_0x3e6ed1={'name':_0x2c056e||_0x400a00?_0x251a4c:this[_0xd63a97(0x17c)](_0x251a4c)};if(_0x2c056e&&(_0x3e6ed1[_0xd63a97(0x188)]=!0x0),!(_0x15170c===_0xd63a97(0x13c)||_0x15170c===_0xd63a97(0x123))){var _0x124fa5=this[_0xd63a97(0x13d)](_0x2e172f,_0x3da813);if(_0x124fa5&&(_0x124fa5[_0xd63a97(0xe6)]&&(_0x3e6ed1[_0xd63a97(0xf8)]=!0x0),_0x124fa5[_0xd63a97(0xb6)]&&!_0x51cd3f&&!_0x5c7f36[_0xd63a97(0x110)]))return _0x3e6ed1['getter']=!0x0,this['_processTreeNodeResult'](_0x3e6ed1,_0x5c7f36),_0x3e6ed1;}var _0x4adfbe;try{_0x4adfbe=_0x4cbe19(_0x2e172f,_0x3da813);}catch(_0x2ca526){return _0x3e6ed1={'name':_0x251a4c,'type':_0xd63a97(0xbb),'error':_0x2ca526[_0xd63a97(0x18e)]},this[_0xd63a97(0xbd)](_0x3e6ed1,_0x5c7f36),_0x3e6ed1;}var _0x2791e7=this[_0xd63a97(0xbf)](_0x4adfbe),_0x4cc3e6=this[_0xd63a97(0xc4)](_0x2791e7);if(_0x3e6ed1[_0xd63a97(0xc3)]=_0x2791e7,_0x4cc3e6)this[_0xd63a97(0xbd)](_0x3e6ed1,_0x5c7f36,_0x4adfbe,function(){var _0x1a5fc4=_0xd63a97;_0x3e6ed1['value']=_0x4adfbe[_0x1a5fc4(0x186)](),!_0x51cd3f&&_0x513c24['_capIfString'](_0x2791e7,_0x3e6ed1,_0x5c7f36,{});});else{var _0x5d650d=_0x5c7f36[_0xd63a97(0x1a9)]&&_0x5c7f36[_0xd63a97(0xf4)]<_0x5c7f36[_0xd63a97(0xc7)]&&_0x5c7f36['autoExpandPreviousObjects'][_0xd63a97(0x155)](_0x4adfbe)<0x0&&_0x2791e7!=='function'&&_0x5c7f36[_0xd63a97(0x11d)]<_0x5c7f36['autoExpandLimit'];_0x5d650d||_0x5c7f36[_0xd63a97(0xf4)]<_0x492772||_0x51cd3f?this[_0xd63a97(0xf9)](_0x3e6ed1,_0x4adfbe,_0x5c7f36,_0x51cd3f||{}):this[_0xd63a97(0xbd)](_0x3e6ed1,_0x5c7f36,_0x4adfbe,function(){var _0x7ed6bd=_0xd63a97;_0x2791e7===_0x7ed6bd(0x199)||_0x2791e7==='undefined'||(delete _0x3e6ed1[_0x7ed6bd(0x118)],_0x3e6ed1[_0x7ed6bd(0xf6)]=!0x0);});}return _0x3e6ed1;}finally{_0x5c7f36[_0xd63a97(0x138)]=_0x8be0a4,_0x5c7f36[_0xd63a97(0xd5)]=_0x492772,_0x5c7f36['isExpressionToEvaluate']=_0x4bbc49;}},_0x20c9b0[_0x4b7108(0x18d)][_0x4b7108(0x164)]=function(_0x23a7b2,_0x200eeb,_0x5ccfad,_0x260d3f){var _0x55a68c=_0x4b7108,_0x506796=_0x260d3f[_0x55a68c(0x11e)]||_0x5ccfad['strLength'];if((_0x23a7b2==='string'||_0x23a7b2===_0x55a68c(0x172))&&_0x200eeb[_0x55a68c(0x118)]){let _0x26aed6=_0x200eeb[_0x55a68c(0x118)][_0x55a68c(0x1b0)];_0x5ccfad['allStrLength']+=_0x26aed6,_0x5ccfad[_0x55a68c(0x193)]>_0x5ccfad[_0x55a68c(0x167)]?(_0x200eeb['capped']='',delete _0x200eeb[_0x55a68c(0x118)]):_0x26aed6>_0x506796&&(_0x200eeb[_0x55a68c(0xf6)]=_0x200eeb[_0x55a68c(0x118)][_0x55a68c(0x16e)](0x0,_0x506796),delete _0x200eeb[_0x55a68c(0x118)]);}},_0x20c9b0[_0x4b7108(0x18d)][_0x4b7108(0x17e)]=function(_0x111e01){var _0x5916a8=_0x4b7108;return!!(_0x111e01&&_0x15b198[_0x5916a8(0xba)]&&this[_0x5916a8(0x134)](_0x111e01)===_0x5916a8(0xe3)&&_0x111e01[_0x5916a8(0x108)]);},_0x20c9b0['prototype']['_propertyName']=function(_0x27177a){var _0x52cf8d=_0x4b7108;if(_0x27177a['match'](/^\\d+$/))return _0x27177a;var _0x5ad212;try{_0x5ad212=JSON[_0x52cf8d(0xc0)](''+_0x27177a);}catch{_0x5ad212='\\x22'+this[_0x52cf8d(0x134)](_0x27177a)+'\\x22';}return _0x5ad212[_0x52cf8d(0x18f)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x5ad212=_0x5ad212[_0x52cf8d(0x16e)](0x1,_0x5ad212['length']-0x2):_0x5ad212=_0x5ad212[_0x52cf8d(0xf7)](/'/g,'\\x5c\\x27')[_0x52cf8d(0xf7)](/\\\\\"/g,'\\x22')[_0x52cf8d(0xf7)](/(^\"|\"$)/g,'\\x27'),_0x5ad212;},_0x20c9b0[_0x4b7108(0x18d)][_0x4b7108(0xbd)]=function(_0xe71e83,_0x568d23,_0x4d6752,_0x4fbaea){var _0x2f55b4=_0x4b7108;this[_0x2f55b4(0x106)](_0xe71e83,_0x568d23),_0x4fbaea&&_0x4fbaea(),this[_0x2f55b4(0x128)](_0x4d6752,_0xe71e83),this[_0x2f55b4(0x1a5)](_0xe71e83,_0x568d23);},_0x20c9b0[_0x4b7108(0x18d)][_0x4b7108(0x106)]=function(_0x54ce58,_0x4c9efd){var _0x29f5f6=_0x4b7108;this['_setNodeId'](_0x54ce58,_0x4c9efd),this[_0x29f5f6(0x174)](_0x54ce58,_0x4c9efd),this[_0x29f5f6(0x105)](_0x54ce58,_0x4c9efd),this['_setNodePermissions'](_0x54ce58,_0x4c9efd);},_0x20c9b0['prototype'][_0x4b7108(0xc6)]=function(_0x1656be,_0x5099d2){},_0x20c9b0[_0x4b7108(0x18d)][_0x4b7108(0x174)]=function(_0xd2188,_0x1c4813){},_0x20c9b0[_0x4b7108(0x18d)][_0x4b7108(0x147)]=function(_0x5a11a7,_0x50d1dc){},_0x20c9b0[_0x4b7108(0x18d)]['_isUndefined']=function(_0x4ce30b){var _0x13690a=_0x4b7108;return _0x4ce30b===this[_0x13690a(0x12e)];},_0x20c9b0[_0x4b7108(0x18d)][_0x4b7108(0x1a5)]=function(_0x3210fc,_0x27dfe9){var _0x5249c4=_0x4b7108;this['_setNodeLabel'](_0x3210fc,_0x27dfe9),this[_0x5249c4(0xeb)](_0x3210fc),_0x27dfe9[_0x5249c4(0x15f)]&&this['_sortProps'](_0x3210fc),this[_0x5249c4(0x1a4)](_0x3210fc,_0x27dfe9),this[_0x5249c4(0x1a1)](_0x3210fc,_0x27dfe9),this['_cleanNode'](_0x3210fc);},_0x20c9b0[_0x4b7108(0x18d)]['_additionalMetadata']=function(_0x7f147e,_0x17a117){var _0x326739=_0x4b7108;try{_0x7f147e&&typeof _0x7f147e['length']==_0x326739(0x148)&&(_0x17a117[_0x326739(0x1b0)]=_0x7f147e[_0x326739(0x1b0)]);}catch{}if(_0x17a117[_0x326739(0xc3)]==='number'||_0x17a117[_0x326739(0xc3)]===_0x326739(0x13e)){if(isNaN(_0x17a117[_0x326739(0x118)]))_0x17a117['nan']=!0x0,delete _0x17a117[_0x326739(0x118)];else switch(_0x17a117[_0x326739(0x118)]){case Number[_0x326739(0x133)]:_0x17a117[_0x326739(0x158)]=!0x0,delete _0x17a117['value'];break;case Number['NEGATIVE_INFINITY']:_0x17a117[_0x326739(0x113)]=!0x0,delete _0x17a117[_0x326739(0x118)];break;case 0x0:this[_0x326739(0x183)](_0x17a117[_0x326739(0x118)])&&(_0x17a117[_0x326739(0x1b6)]=!0x0);break;}}else _0x17a117['type']===_0x326739(0xff)&&typeof _0x7f147e[_0x326739(0x194)]==_0x326739(0x102)&&_0x7f147e[_0x326739(0x194)]&&_0x17a117[_0x326739(0x194)]&&_0x7f147e[_0x326739(0x194)]!==_0x17a117['name']&&(_0x17a117[_0x326739(0x122)]=_0x7f147e['name']);},_0x20c9b0['prototype'][_0x4b7108(0x183)]=function(_0x2b1203){var _0x2d1fdc=_0x4b7108;return 0x1/_0x2b1203===Number[_0x2d1fdc(0x136)];},_0x20c9b0[_0x4b7108(0x18d)][_0x4b7108(0x112)]=function(_0x5563ec){var _0x3c0ceb=_0x4b7108;!_0x5563ec['props']||!_0x5563ec[_0x3c0ceb(0x14a)][_0x3c0ceb(0x1b0)]||_0x5563ec['type']===_0x3c0ceb(0x13c)||_0x5563ec[_0x3c0ceb(0xc3)]==='Map'||_0x5563ec[_0x3c0ceb(0xc3)]===_0x3c0ceb(0xd2)||_0x5563ec[_0x3c0ceb(0x14a)]['sort'](function(_0x1011a2,_0x22b546){var _0x4a4c54=_0x3c0ceb,_0x5bc57b=_0x1011a2[_0x4a4c54(0x194)]['toLowerCase'](),_0x5affc7=_0x22b546[_0x4a4c54(0x194)][_0x4a4c54(0x1af)]();return _0x5bc57b<_0x5affc7?-0x1:_0x5bc57b>_0x5affc7?0x1:0x0;});},_0x20c9b0[_0x4b7108(0x18d)][_0x4b7108(0x1a4)]=function(_0xfbe218,_0x46fae8){var _0x1149f6=_0x4b7108;if(!(_0x46fae8[_0x1149f6(0x132)]||!_0xfbe218[_0x1149f6(0x14a)]||!_0xfbe218[_0x1149f6(0x14a)][_0x1149f6(0x1b0)])){for(var _0x4c82b1=[],_0x283e3b=[],_0x3fad8f=0x0,_0x120791=_0xfbe218[_0x1149f6(0x14a)]['length'];_0x3fad8f<_0x120791;_0x3fad8f++){var _0x3580aa=_0xfbe218['props'][_0x3fad8f];_0x3580aa['type']===_0x1149f6(0xff)?_0x4c82b1[_0x1149f6(0x14f)](_0x3580aa):_0x283e3b['push'](_0x3580aa);}if(!(!_0x283e3b[_0x1149f6(0x1b0)]||_0x4c82b1['length']<=0x1)){_0xfbe218[_0x1149f6(0x14a)]=_0x283e3b;var _0x59e18f={'functionsNode':!0x0,'props':_0x4c82b1};this[_0x1149f6(0xc6)](_0x59e18f,_0x46fae8),this[_0x1149f6(0x147)](_0x59e18f,_0x46fae8),this[_0x1149f6(0xeb)](_0x59e18f),this[_0x1149f6(0x16f)](_0x59e18f,_0x46fae8),_0x59e18f['id']+='\\x20f',_0xfbe218[_0x1149f6(0x14a)]['unshift'](_0x59e18f);}}},_0x20c9b0[_0x4b7108(0x18d)]['_addLoadNode']=function(_0x2d66a1,_0x44e835){},_0x20c9b0[_0x4b7108(0x18d)][_0x4b7108(0xeb)]=function(_0x5c6711){},_0x20c9b0[_0x4b7108(0x18d)][_0x4b7108(0x1ab)]=function(_0x223f0f){var _0x2ed4c6=_0x4b7108;return Array['isArray'](_0x223f0f)||typeof _0x223f0f==_0x2ed4c6(0x12a)&&this['_objectToString'](_0x223f0f)===_0x2ed4c6(0x181);},_0x20c9b0[_0x4b7108(0x18d)]['_setNodePermissions']=function(_0x1a8e35,_0x5c6d1d){},_0x20c9b0[_0x4b7108(0x18d)][_0x4b7108(0x14c)]=function(_0x33edb0){var _0x2bee94=_0x4b7108;delete _0x33edb0[_0x2bee94(0x1b4)],delete _0x33edb0[_0x2bee94(0x13b)],delete _0x33edb0[_0x2bee94(0x117)];},_0x20c9b0[_0x4b7108(0x18d)][_0x4b7108(0x105)]=function(_0x40c28f,_0x5c19bf){};let _0x55b20a=new _0x20c9b0(),_0x4ab50f={'props':_0x155cb9[_0x4b7108(0x135)][_0x4b7108(0x14a)]||0x64,'elements':_0x155cb9[_0x4b7108(0x135)][_0x4b7108(0x10f)]||0x64,'strLength':_0x155cb9[_0x4b7108(0x135)][_0x4b7108(0x11e)]||0x400*0x32,'totalStrLength':_0x155cb9[_0x4b7108(0x135)][_0x4b7108(0x167)]||0x400*0x32,'autoExpandLimit':_0x155cb9[_0x4b7108(0x135)][_0x4b7108(0x1b7)]||0x1388,'autoExpandMaxDepth':_0x155cb9[_0x4b7108(0x135)][_0x4b7108(0xc7)]||0xa},_0x3c0bf4={'props':_0x155cb9[_0x4b7108(0x1b1)][_0x4b7108(0x14a)]||0x5,'elements':_0x155cb9['reducedLimits'][_0x4b7108(0x10f)]||0x5,'strLength':_0x155cb9['reducedLimits'][_0x4b7108(0x11e)]||0x100,'totalStrLength':_0x155cb9['reducedLimits']['totalStrLength']||0x100*0x3,'autoExpandLimit':_0x155cb9[_0x4b7108(0x1b1)][_0x4b7108(0x1b7)]||0x1e,'autoExpandMaxDepth':_0x155cb9[_0x4b7108(0x1b1)]['autoExpandMaxDepth']||0x2};if(_0x3300c4){let _0x151def=_0x55b20a[_0x4b7108(0xf9)][_0x4b7108(0x149)](_0x55b20a);_0x55b20a[_0x4b7108(0xf9)]=function(_0x51c8e1,_0x429cd4,_0x1f1f73,_0x4a3fc7){return _0x151def(_0x51c8e1,_0x3300c4(_0x429cd4),_0x1f1f73,_0x4a3fc7);};}function _0xc84fa3(_0x295517,_0x48d6a5,_0x818f7e,_0x5315a8,_0x527bee,_0x3609b9){var _0xf49b16=_0x4b7108;let _0x176dc5,_0x4dc8df;try{_0x4dc8df=_0x201387(),_0x176dc5=_0x26c9a5[_0x48d6a5],!_0x176dc5||_0x4dc8df-_0x176dc5['ts']>_0x44abfe[_0xf49b16(0x12f)][_0xf49b16(0x12d)]&&_0x176dc5[_0xf49b16(0x19f)]&&_0x176dc5[_0xf49b16(0x17d)]/_0x176dc5[_0xf49b16(0x19f)]<_0x44abfe['perLogpoint']['resetOnProcessingTimeAverageMs']?(_0x26c9a5[_0x48d6a5]=_0x176dc5={'count':0x0,'time':0x0,'ts':_0x4dc8df},_0x26c9a5[_0xf49b16(0x19c)]={}):_0x4dc8df-_0x26c9a5[_0xf49b16(0x19c)]['ts']>_0x44abfe[_0xf49b16(0xc1)][_0xf49b16(0x12d)]&&_0x26c9a5[_0xf49b16(0x19c)][_0xf49b16(0x19f)]&&_0x26c9a5['hits'][_0xf49b16(0x17d)]/_0x26c9a5[_0xf49b16(0x19c)][_0xf49b16(0x19f)]<_0x44abfe[_0xf49b16(0xc1)][_0xf49b16(0x184)]&&(_0x26c9a5[_0xf49b16(0x19c)]={});let _0x4d9429=[],_0x52343e=_0x176dc5[_0xf49b16(0x16d)]||_0x26c9a5[_0xf49b16(0x19c)]['reduceLimits']?_0x3c0bf4:_0x4ab50f,_0x33512a=_0x3cba4b=>{var _0x13d288=_0xf49b16;let _0x14ff5f={};return _0x14ff5f[_0x13d288(0x14a)]=_0x3cba4b[_0x13d288(0x14a)],_0x14ff5f['elements']=_0x3cba4b[_0x13d288(0x10f)],_0x14ff5f['strLength']=_0x3cba4b[_0x13d288(0x11e)],_0x14ff5f[_0x13d288(0x167)]=_0x3cba4b[_0x13d288(0x167)],_0x14ff5f[_0x13d288(0x1b7)]=_0x3cba4b[_0x13d288(0x1b7)],_0x14ff5f[_0x13d288(0xc7)]=_0x3cba4b['autoExpandMaxDepth'],_0x14ff5f['sortProps']=!0x1,_0x14ff5f[_0x13d288(0x132)]=!_0x378b2c,_0x14ff5f[_0x13d288(0xd5)]=0x1,_0x14ff5f[_0x13d288(0xf4)]=0x0,_0x14ff5f[_0x13d288(0xbc)]=_0x13d288(0x197),_0x14ff5f['rootExpression']='root_exp',_0x14ff5f['autoExpand']=!0x0,_0x14ff5f['autoExpandPreviousObjects']=[],_0x14ff5f[_0x13d288(0x11d)]=0x0,_0x14ff5f['resolveGetters']=_0x155cb9['resolveGetters'],_0x14ff5f[_0x13d288(0x193)]=0x0,_0x14ff5f[_0x13d288(0x178)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x14ff5f;};for(var _0x4935ff=0x0;_0x4935ff<_0x527bee['length'];_0x4935ff++)_0x4d9429[_0xf49b16(0x14f)](_0x55b20a[_0xf49b16(0xf9)]({'timeNode':_0x295517==='time'||void 0x0},_0x527bee[_0x4935ff],_0x33512a(_0x52343e),{}));if(_0x295517===_0xf49b16(0x114)||_0x295517==='error'){let _0x3723c6=Error[_0xf49b16(0xfc)];try{Error['stackTraceLimit']=0x1/0x0,_0x4d9429[_0xf49b16(0x14f)](_0x55b20a[_0xf49b16(0xf9)]({'stackNode':!0x0},new Error()[_0xf49b16(0x1bb)],_0x33512a(_0x52343e),{'strLength':0x1/0x0}));}finally{Error[_0xf49b16(0xfc)]=_0x3723c6;}}return{'method':_0xf49b16(0x13a),'version':_0x2101f8,'args':[{'ts':_0x818f7e,'session':_0x5315a8,'args':_0x4d9429,'id':_0x48d6a5,'context':_0x3609b9}]};}catch(_0xf13e58){return{'method':_0xf49b16(0x13a),'version':_0x2101f8,'args':[{'ts':_0x818f7e,'session':_0x5315a8,'args':[{'type':_0xf49b16(0xbb),'error':_0xf13e58&&_0xf13e58['message']}],'id':_0x48d6a5,'context':_0x3609b9}]};}finally{try{if(_0x176dc5&&_0x4dc8df){let _0x3600d7=_0x201387();_0x176dc5['count']++,_0x176dc5['time']+=_0x48e7ed(_0x4dc8df,_0x3600d7),_0x176dc5['ts']=_0x3600d7,_0x26c9a5[_0xf49b16(0x19c)][_0xf49b16(0x19f)]++,_0x26c9a5[_0xf49b16(0x19c)]['time']+=_0x48e7ed(_0x4dc8df,_0x3600d7),_0x26c9a5[_0xf49b16(0x19c)]['ts']=_0x3600d7,(_0x176dc5[_0xf49b16(0x19f)]>_0x44abfe['perLogpoint'][_0xf49b16(0x11c)]||_0x176dc5[_0xf49b16(0x17d)]>_0x44abfe[_0xf49b16(0x12f)][_0xf49b16(0x104)])&&(_0x176dc5['reduceLimits']=!0x0),(_0x26c9a5[_0xf49b16(0x19c)][_0xf49b16(0x19f)]>_0x44abfe['global'][_0xf49b16(0x11c)]||_0x26c9a5[_0xf49b16(0x19c)][_0xf49b16(0x17d)]>_0x44abfe[_0xf49b16(0xc1)]['reduceOnAccumulatedProcessingTimeMs'])&&(_0x26c9a5[_0xf49b16(0x19c)]['reduceLimits']=!0x0);}}catch{}}}return _0xc84fa3;}function G(_0x487677){var _0x3c0257=_0x5afedd;if(_0x487677&&typeof _0x487677=='object'&&_0x487677['constructor'])switch(_0x487677[_0x3c0257(0x165)]['name']){case _0x3c0257(0xc5):return _0x487677[_0x3c0257(0x126)](Symbol['iterator'])?Promise[_0x3c0257(0x14d)]():_0x487677;case'bound\\x20Promise':return Promise[_0x3c0257(0x14d)]();}return _0x487677;}((_0x21896c,_0x3d2bb3,_0x3b6e49,_0x4ae034,_0x5ca0c7,_0x33d691,_0x561acd,_0x3b405e,_0x195c99,_0xf8b394,_0x341229,_0x5d9290)=>{var _0x3d7fa6=_0x5afedd;if(_0x21896c[_0x3d7fa6(0xd3)])return _0x21896c[_0x3d7fa6(0xd3)];let _0x51350a={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}};if(!X(_0x21896c,_0x3b405e,_0x5ca0c7))return _0x21896c['_console_ninja']=_0x51350a,_0x21896c[_0x3d7fa6(0xd3)];let _0x75f224=b(_0x21896c),_0x249603=_0x75f224[_0x3d7fa6(0x1ad)],_0x571e25=_0x75f224['timeStamp'],_0x435ede=_0x75f224['now'],_0x377f80={'hits':{},'ts':{}},_0x12a304=J(_0x21896c,_0x195c99,_0x377f80,_0x33d691,_0x5d9290,_0x5ca0c7===_0x3d7fa6(0x195)?G:void 0x0),_0x38254c=(_0x3074c2,_0x3e70b7,_0x3a1b08,_0x64705f,_0x495e2c,_0x5512e7)=>{var _0x48f332=_0x3d7fa6;let _0x952889=_0x21896c[_0x48f332(0xd3)];try{return _0x21896c[_0x48f332(0xd3)]=_0x51350a,_0x12a304(_0x3074c2,_0x3e70b7,_0x3a1b08,_0x64705f,_0x495e2c,_0x5512e7);}finally{_0x21896c[_0x48f332(0xd3)]=_0x952889;}},_0x59e72b=_0x2afcd0=>{_0x377f80['ts'][_0x2afcd0]=_0x571e25();},_0x19a2c4=(_0x3da8f1,_0x29c5ab)=>{var _0x1bb204=_0x3d7fa6;let _0x4ea48f=_0x377f80['ts'][_0x29c5ab];if(delete _0x377f80['ts'][_0x29c5ab],_0x4ea48f){let _0x23b64c=_0x249603(_0x4ea48f,_0x571e25());_0x4f2152(_0x38254c(_0x1bb204(0x17d),_0x3da8f1,_0x435ede(),_0x492ebe,[_0x23b64c],_0x29c5ab));}},_0x156fef=_0x10a752=>{var _0x12d8cb=_0x3d7fa6,_0x57c9b1;return _0x5ca0c7===_0x12d8cb(0x195)&&_0x21896c[_0x12d8cb(0x168)]&&((_0x57c9b1=_0x10a752==null?void 0x0:_0x10a752[_0x12d8cb(0xd7)])==null?void 0x0:_0x57c9b1[_0x12d8cb(0x1b0)])&&(_0x10a752[_0x12d8cb(0xd7)][0x0]['origin']=_0x21896c[_0x12d8cb(0x168)]),_0x10a752;};_0x21896c[_0x3d7fa6(0xd3)]={'consoleLog':(_0x22ed36,_0x494255)=>{var _0x51f446=_0x3d7fa6;_0x21896c[_0x51f446(0x198)][_0x51f446(0x13a)][_0x51f446(0x194)]!=='disabledLog'&&_0x4f2152(_0x38254c(_0x51f446(0x13a),_0x22ed36,_0x435ede(),_0x492ebe,_0x494255));},'consoleTrace':(_0x47a276,_0x1252a9)=>{var _0x3f2f24=_0x3d7fa6,_0x12ceda,_0x2161a6;_0x21896c[_0x3f2f24(0x198)]['log'][_0x3f2f24(0x194)]!==_0x3f2f24(0x16c)&&((_0x2161a6=(_0x12ceda=_0x21896c[_0x3f2f24(0x143)])==null?void 0x0:_0x12ceda[_0x3f2f24(0x1b8)])!=null&&_0x2161a6['node']&&(_0x21896c[_0x3f2f24(0x1bd)]=!0x0),_0x4f2152(_0x156fef(_0x38254c(_0x3f2f24(0x114),_0x47a276,_0x435ede(),_0x492ebe,_0x1252a9))));},'consoleError':(_0x36754f,_0x18db17)=>{var _0x10b66a=_0x3d7fa6;_0x21896c[_0x10b66a(0x1bd)]=!0x0,_0x4f2152(_0x156fef(_0x38254c('error',_0x36754f,_0x435ede(),_0x492ebe,_0x18db17)));},'consoleTime':_0x961499=>{_0x59e72b(_0x961499);},'consoleTimeEnd':(_0x857404,_0x7c9fb8)=>{_0x19a2c4(_0x7c9fb8,_0x857404);},'autoLog':(_0x1e9f8d,_0x4078b2)=>{var _0x54b610=_0x3d7fa6;_0x4f2152(_0x38254c(_0x54b610(0x13a),_0x4078b2,_0x435ede(),_0x492ebe,[_0x1e9f8d]));},'autoLogMany':(_0x15e564,_0x435045)=>{var _0x394111=_0x3d7fa6;_0x4f2152(_0x38254c(_0x394111(0x13a),_0x15e564,_0x435ede(),_0x492ebe,_0x435045));},'autoTrace':(_0x22a301,_0x533012)=>{var _0x317d6d=_0x3d7fa6;_0x4f2152(_0x156fef(_0x38254c(_0x317d6d(0x114),_0x533012,_0x435ede(),_0x492ebe,[_0x22a301])));},'autoTraceMany':(_0x492ede,_0x160919)=>{var _0x2daf77=_0x3d7fa6;_0x4f2152(_0x156fef(_0x38254c(_0x2daf77(0x114),_0x492ede,_0x435ede(),_0x492ebe,_0x160919)));},'autoTime':(_0x25f44e,_0x107f2a,_0x3067d3)=>{_0x59e72b(_0x3067d3);},'autoTimeEnd':(_0x1dba81,_0xf95734,_0xa330d6)=>{_0x19a2c4(_0xf95734,_0xa330d6);},'coverage':_0x3ffbc2=>{var _0x52b3e1=_0x3d7fa6;_0x4f2152({'method':_0x52b3e1(0x11b),'version':_0x33d691,'args':[{'id':_0x3ffbc2}]});}};let _0x4f2152=H(_0x21896c,_0x3d2bb3,_0x3b6e49,_0x4ae034,_0x5ca0c7,_0xf8b394,_0x341229),_0x492ebe=_0x21896c['_console_ninja_session'];return _0x21896c['_console_ninja'];})(globalThis,'127.0.0.1',_0x5afedd(0x19d),_0x5afedd(0xfe),_0x5afedd(0x1ac),_0x5afedd(0x15d),_0x5afedd(0x192),_0x5afedd(0x169),_0x5afedd(0x121),'',_0x5afedd(0x15b),_0x5afedd(0x131));");
    } catch (e) {
        console.error(e);
    }
}
function oo_oo(i, ...v) {
    try {
        oo_cm().consoleLog(i, v);
    } catch (e) {}
    return v;
}
oo_oo; /* istanbul ignore next */ 
function oo_tr(i, ...v) {
    try {
        oo_cm().consoleTrace(i, v);
    } catch (e) {}
    return v;
}
oo_tr; /* istanbul ignore next */ 
function oo_tx(i, ...v) {
    try {
        oo_cm().consoleError(i, v);
    } catch (e) {}
    return v;
}
oo_tx; /* istanbul ignore next */ 
function oo_ts(v) {
    try {
        oo_cm().consoleTime(v);
    } catch (e) {}
    return v;
}
oo_ts; /* istanbul ignore next */ 
function oo_te(v, i) {
    try {
        oo_cm().consoleTimeEnd(v, i);
    } catch (e) {}
    return v;
}
oo_te; /*eslint unicorn/no-abusive-eslint-disable:,eslint-comments/disable-enable-pair:,eslint-comments/no-unlimited-disable:,eslint-comments/no-aggregating-enable:,eslint-comments/no-duplicate-disable:,eslint-comments/no-unused-disable:,eslint-comments/no-unused-enable:,*/ 
}}),

};

//# sourceMappingURL=src_5112a9d0._.js.map