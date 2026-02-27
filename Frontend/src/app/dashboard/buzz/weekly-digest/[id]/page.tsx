"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getBuzzById, Buzz } from "@/lib/buzz";
import { PageTitle } from "@/components/page-title";
import { ChevronLeft, FileText } from "lucide-react"; // Removed unused Download
import { useToast } from "@/hooks/use-toast";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure pdfjs worker to run in browser
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function WeeklyDigestEditionPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const id = params.id as string;
  const editionName = searchParams.get("edition");

  const [buzz, setBuzz] = useState<Buzz | null>(null);
  const [items, setItems] = useState<{ name: string; pdf: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id || !editionName) {
      router.push("/dashboard/buzz");
      return;
    }

    const fetchEdition = async () => {
      try {
        const data = await getBuzzById(id);
        setBuzz(data);

        if (data && Array.isArray(data.weeklyDigest)) {
          const targetEdition = data.weeklyDigest.find((ed: any) => ed.editionName === editionName);
          if (targetEdition) {
            setItems(targetEdition.items || []);
          } else {
            toast({ title: "Error", description: "Edition not found.", variant: "destructive" });
            router.push("/dashboard/buzz");
          }
        }
      } catch (error) {
        toast({ title: "Error", description: "Failed to load edition.", variant: "destructive" });
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEdition();
  }, [id, editionName, router, toast]);

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading edition details...</div>;
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1 [&>div]:mb-0">
          <button
            onClick={() => router.push("/dashboard/buzz")}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900 focus:outline-none"
            aria-label="Go back"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <PageTitle title={`Weekly Digest: ${editionName}`} />
        </div>
      </div>

      <div className="bg-white rounded-md shadow overflow-hidden min-h-[500px]">
        <div className="p-4 md:p-6 border-b border-gray-100 bg-gray-50/50">
          <h3 className="text-lg font-semibold text-gray-800">Resources ({items.length})</h3>
          <p className="text-sm text-gray-500 mt-1">Select a document below to view or download.</p>
        </div>

        {/* Updated Container to match Magazines flex layout */}
        <div className="flex flex-row flex-wrap gap-6 p-4 md:p-6 text-[#1E1E1E]">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col w-40">
              <a
                href={
                  item.pdf?.startsWith("buzz-digest-")
                    ? `${process.env.NEXT_PUBLIC_API_URL}/buzz/file/${item.pdf}`
                    : `${process.env.NEXT_PUBLIC_API_URL}/files/${item.pdf}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-transform hover:scale-105"
              >
                {/* Fixed wrapper acting exactly as "w-40 h-56 object-cover rounded shadow" */}
                <div className="w-40 h-48 overflow-hidden rounded shadow bg-gray-100 relative">
                  <Document
                    file={
                      item.pdf?.startsWith("buzz-digest-")
                        ? `${process.env.NEXT_PUBLIC_API_URL}/buzz/file/${item.pdf}`
                        : `${process.env.NEXT_PUBLIC_API_URL}/files/${item.pdf}`
                    }
                    loading={
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 transition-colors animate-pulse">
                        <FileText className="w-8 h-8" />
                      </div>
                    }
                    error={
                      <div className="absolute inset-0 flex items-center justify-center bg-red-50 text-red-500 transition-colors">
                        <FileText className="w-8 h-8" />
                      </div>
                    }
                    className="w-full h-full"
                  >
                    {/* We set the baseline width to 160px (w-40). 
      The custom className targets the inner canvas, forcing it to fill the 
      parent block and crop cleanly using object-cover.
    */}
                    <Page
                      pageNumber={1}
                      width={160}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      className="w-full h-full [&>canvas]:!w-full [&>canvas]:!h-full [&>canvas]:!object-fit"
                    />
                  </Document>
                </div>
              </a>

              {/* Item Title matching Magazines */}
              <span className="mt-2 text-center text-sm font-medium line-clamp-2 leading-tight">{item.name || "Untitled Document"}</span>
            </div>
          ))}

          {items.length === 0 && <div className="w-full py-12 text-center text-gray-400">No resources available in this edition.</div>}
        </div>
      </div>
    </div>
  );
}
