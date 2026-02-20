"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getBuzzById, Buzz } from "@/lib/buzz";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { ChevronLeft, FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
          const targetEdition = data.weeklyDigest.find((ed) => ed.editionName === editionName);
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

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, idx) => (
            <a
              key={idx}
              href={`${process.env.NEXT_PUBLIC_API_URL}/files/${item.pdf}`}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                  <Download className="w-4 h-4" />
                </div>
              </div>

              <h4 className="font-medium text-gray-800 line-clamp-2 leading-tight group-hover:text-blue-700 transition-colors">
                {item.name || "Untitled Document"}
              </h4>
            </a>
          ))}

          {items.length === 0 && <div className="col-span-full py-12 text-center text-gray-400">No resources available in this edition.</div>}
        </div>
      </div>
    </div>
  );
}
