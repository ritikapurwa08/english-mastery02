"use client"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Document, Page, pdfjs } from "react-pdf"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2 } from "lucide-react"
import Link from "next/link"
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewerPage() {
    const searchParams = useSearchParams()
    const pdfPath = searchParams.get('path')
    const title = searchParams.get('title') || "Document Viewer"

    const [numPages, setNumPages] = useState<number>(0)
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [scale, setScale] = useState<number>(1.0)
    const [containerWidth, setContainerWidth] = useState<number>(800)
    const [prevPdfPath, setPrevPdfPath] = useState(pdfPath)

    // Robust width handling using ResizeObserver
    useEffect(() => {
        const container = document.getElementById('pdf-container-wrapper');
        if (!container) return;

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry) {
                // Subtract padding (32px for md horizontal padding)
                const width = entry.contentRect.width;
                setContainerWidth(width > 800 ? 800 : width - 32);
            }
        });

        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    // Reset pagination when document changes (using render-time adjustment)
    if (pdfPath !== prevPdfPath) {
        setPrevPdfPath(pdfPath)
        setPageNumber(1)
    }

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages)
    }

    function changePage(offset: number) {
        setPageNumber((prevPageNumber) => Math.min(Math.max(1, prevPageNumber + offset), numPages))
    }

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-100 dark:bg-slate-950">
            {/* Top Toolbar */}
            <div className="bg-white dark:bg-slate-900 border-b px-4 py-3 flex items-center justify-between shadow-sm z-20 sticky top-0">
                <div className="flex items-center flex-1 gap-2 min-w-0">
                    <Button variant="ghost" size="icon" asChild className="shrink-0 -ml-2">
                        <Link href="/resources">
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                    </Button>
                    <h1 className="font-semibold text-slate-800 dark:text-slate-200 truncate pr-2 text-sm md:text-base" title={title}>
                        {title}
                    </h1>
                </div>

                {/* Desktop Zoom Controls */}
                <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border">
                    <Button variant="ghost" size="icon" onClick={() => setScale(s => Math.max(0.5, s - 0.1))} className="h-8 w-8 hover:bg-white dark:hover:bg-slate-700">
                        <ZoomOut className="w-4 h-4" />
                    </Button>
                    <span className="text-xs font-mono font-medium w-12 text-center text-slate-600 dark:text-slate-400">{Math.round(scale * 100)}%</span>
                    <Button variant="ghost" size="icon" onClick={() => setScale(s => Math.min(2.5, s + 0.1))} className="h-8 w-8 hover:bg-white dark:hover:bg-slate-700">
                        <ZoomIn className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-auto relative bg-slate-100 dark:bg-slate-950" id="pdf-container-wrapper">
                <div className="min-h-full flex justify-center p-4">
                    {pdfPath ? (
                        <div className="relative">
                            <Document
                                file={pdfPath}
                                onLoadSuccess={onDocumentLoadSuccess}
                                onLoadError={(error) => console.error("Error loading PDF:", error)}
                                loading={
                                    <div className="flex flex-col items-center justify-center h-64 gap-3">
                                        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                                        <p className="text-sm text-slate-500 font-medium">Loading document...</p>
                                    </div>
                                }
                                className="shadow-2xl rounded-sm overflow-hidden"
                            >
                                <Page
                                    pageNumber={pageNumber}
                                    scale={scale}
                                    renderTextLayer={true}
                                    renderAnnotationLayer={true}
                                    className="bg-white dark:bg-slate-800"
                                    width={containerWidth}
                                    error={<div className="p-10 text-red-500">Failed to load page.</div>}
                                />
                            </Document>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-slate-400 h-full">
                            <p>No document selected.</p>
                            <Button variant="link" asChild><Link href="/resources">Go back</Link></Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Controls Bar (Mobile Optimized) */}
            <div className="bg-white dark:bg-slate-900 border-t p-3 md:p-4 flex justify-between items-center gap-2 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                {/* Mobile Zoom (Left) */}
                <div className="flex md:hidden items-center gap-1">
                     <Button variant="outline" size="icon" onClick={() => setScale(s => Math.max(0.5, s - 0.1))} className="h-9 w-9">
                        <ZoomOut className="w-4 h-4" />
                    </Button>
                     <Button variant="outline" size="icon" onClick={() => setScale(s => Math.min(2.5, s + 0.1))} className="h-9 w-9">
                        <ZoomIn className="w-4 h-4" />
                    </Button>
                </div>

                {/* Pagination (Center/Right) */}
                <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end md:justify-center">
                    <Button
                        variant="outline"
                        onClick={() => changePage(-1)}
                        disabled={pageNumber <= 1}
                        className="w-10 px-0 md:w-32 md:px-4"
                    >
                        <ChevronLeft className="w-4 h-4 md:mr-2" />
                        <span className="hidden md:inline">Previous</span>
                    </Button>

                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap min-w-12 text-center">
                        <span className="text-slate-900 dark:text-slate-100 font-bold">{pageNumber}</span> / {numPages || "-"}
                    </span>

                    <Button
                        variant="outline"
                        onClick={() => changePage(1)}
                        disabled={pageNumber >= numPages}
                        className="w-10 px-0 md:w-32 md:px-4"
                    >
                        <span className="hidden md:inline">Next</span>
                        <ChevronRight className="w-4 h-4 md:ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
