import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WEB_SEARCH_RESULTS_QUERY_PARAM } from "@/constants";
import { useGraphContext } from "@/contexts/GraphContext";
import { useAppConfig } from "@/contexts/AppConfigContext";
import { SearchResult } from "@opencanvas/shared/types";
import { TighterText } from "../ui/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TooltipIconButton } from "../assistant-ui/tooltip-icon-button";
import { X, ExternalLink, Clock, User, Copy, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { LoadingSearchResultCards } from "./loading-cards";
import { useQueryState } from "nuqs";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

function SearchResultCard({ result }: { result: SearchResult }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const { config } = useAppConfig();

  const handleCopy = async () => {
    const citationText = `${result.metadata?.title || "Untitled"} - ${result.metadata?.author || "Unknown author"} (${result.metadata?.url || "No URL"})`;
    await navigator.clipboard.writeText(citationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyContent = async () => {
    const contentText = result.pageContent || "No content available";
    await navigator.clipboard.writeText(contentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getReliabilityScore = (result: SearchResult) => {
    // Simple heuristic for demonstration
    let score = 50;
    if (result.metadata?.author) score += 20;
    if (result.metadata?.publishedDate) score += 15;
    if (result.pageContent && result.pageContent.length > 200) score += 15;
    return Math.min(100, score);
  };

  const reliabilityScore = getReliabilityScore(result);
  const reliabilityColor = reliabilityScore >= 80 ? "green" : reliabilityScore >= 60 ? "yellow" : "red";

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base leading-tight">
            {result.metadata?.url ? (
              <div className="flex items-center gap-2">
                <a
                  href={result.metadata.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  {result.metadata?.title || "Untitled"}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ) : (
              <>{result.metadata?.title || "Untitled"}</>
            )}
          </CardTitle>
          <div className="flex items-center gap-1">
            <Badge 
              variant="outline" 
              className={cn(
                "text-xs",
                reliabilityColor === "green" && "border-green-500 text-green-700",
                reliabilityColor === "yellow" && "border-yellow-500 text-yellow-700", 
                reliabilityColor === "red" && "border-red-500 text-red-700"
              )}
            >
              {reliabilityScore}% reliable
            </Badge>
            <TooltipIconButton
              tooltip={copied ? "Copied!" : "Copy citation"}
              variant="ghost"
              size="sm"
              onClick={handleCopy}
            >
              {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            </TooltipIconButton>
          </div>
        </div>
        <CardDescription className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {result.metadata?.author || "Unknown author"}
          </div>
          {result.metadata?.publishedDate && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {format(new Date(result.metadata?.publishedDate), "MMM d, yyyy")}
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent
        className="cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <AnimatePresence initial={false}>
          <motion.div
            initial={false}
            animate={{ height: expanded ? "auto" : "80px" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-sm text-gray-700 leading-relaxed">
              {result.pageContent || "No content available"}
            </p>
          </motion.div>
        </AnimatePresence>
        
        <div className="flex items-center justify-between mt-3 pt-2 border-t">
          <p className="text-xs text-gray-500">
            {expanded ? "Click to collapse" : "Click to expand"}
          </p>
          {config.enableSourceCitation && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleCopyContent();
              }}
              className="text-xs h-6"
            >
              {copied ? "Copied!" : "Copy text"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface WebSearchResultsProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function WebSearchResults({ open, setOpen }: WebSearchResultsProps) {
  const [status, setStatus] = useState<"searching" | "done">("searching");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const {
    graphData: { messages },
  } = useGraphContext();
  const [webSearchResultsId, setWebSearchResultsId] = useQueryState(
    WEB_SEARCH_RESULTS_QUERY_PARAM
  );

  useEffect(() => {
    if (!webSearchResultsId && open) {
      setOpen(false);
      setSearchResults([]);
      return;
    }
    if (!webSearchResultsId || !messages.length) {
      return;
    }
    const webResultsMessage =
      messages.find((message) => message.id === webSearchResultsId) ||
      messages.find((message) => message.id?.startsWith("web-search-results-"));
    if (!webResultsMessage) {
      return;
    } else if (
      webResultsMessage.id &&
      webResultsMessage.id !== webSearchResultsId
    ) {
      setWebSearchResultsId(webResultsMessage.id);
    }
    const searchResults = webResultsMessage.additional_kwargs
      ?.webSearchResults as SearchResult[] | undefined;
    const status = (webResultsMessage.additional_kwargs?.webSearchStatus ||
      "searching") as "searching" | "done";

    setOpen(true);
    setSearchResults(searchResults || []);
    setStatus(status);
  }, [webSearchResultsId, messages]);

  const handleClose = () => {
    setOpen(false);
    setSearchResults([]);
    setWebSearchResultsId(null);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="flex flex-col gap-6 w-full max-w-md p-5 border-l-[1px] border-gray-200 shadow-inner-left h-screen overflow-hidden bg-white"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <TighterText className="text-lg font-medium">
                Research Sources
              </TighterText>
              {searchResults?.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {searchResults.length} sources
                </Badge>
              )}
            </div>
            <TooltipIconButton
              tooltip="Close"
              variant="ghost"
              onClick={handleClose}
            >
              <X className="size-4" />
            </TooltipIconButton>
          </div>
          
          {status === "done" && searchResults?.length > 0 && (
            <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <p className="text-sm text-green-800">Research complete with verified sources</p>
            </div>
          )}
          
          <motion.div
            className="flex flex-col gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {searchResults?.length > 0 &&
              status === "done" &&
              searchResults.map((result, index) => (
                <SearchResultCard
                  key={`${index}-${result.id}`}
                  result={result}
                />
              ))}
            {!searchResults?.length && status === "done" && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-gray-500 mb-2">No sources found</p>
                <p className="text-xs text-gray-400">Try a different search query</p>
              </div>
            )}
            {status === "searching" && <LoadingSearchResultCards />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
