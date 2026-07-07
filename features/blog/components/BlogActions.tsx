"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, Share2, Link2, MessageCircle, Check } from "lucide-react";
import { toggleBlogLike } from "../actions/blog";

interface BlogActionsProps {
  blogSlug: string;
  initialLikes: number;
  blogTitle: string;
}

export function BlogActions({ blogSlug, initialLikes, blogTitle }: BlogActionsProps) {
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Read liked state from localStorage on client side mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`liked_blog_${blogSlug}`);
      if (stored === "true") {
        setIsLiked(true);
      }
    } catch (e) {
      console.error("Error reading localStorage:", e);
    }
  }, [blogSlug]);

  // Click outside to close share dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShareOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLike = async () => {
    // Optimistic UI updates
    const nextLiked = !isLiked;
    const diff = nextLiked ? 1 : -1;
    
    setIsLiked(nextLiked);
    setLikesCount((prev) => Math.max(0, prev + diff));

    try {
      if (nextLiked) {
        localStorage.setItem(`liked_blog_${blogSlug}`, "true");
      } else {
        localStorage.removeItem(`liked_blog_${blogSlug}`);
      }
      
      // Update count from server action response
      const updatedLikes = await toggleBlogLike(blogSlug, nextLiked);
      setLikesCount(updatedLikes);
    } catch (e) {
      console.error("Error toggling like:", e);
      // Revert state on failure
      setIsLiked(!nextLiked);
      setLikesCount((prev) => Math.max(0, prev - diff));
    }
  };

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "";
  };

  const handleCopyLink = async () => {
    const url = getShareUrl();
    if (!url) return;
    
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy link:", e);
    }
  };

  const shareUrl = getShareUrl();
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${blogTitle} - ${shareUrl}`)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(blogTitle)}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="flex items-center justify-between py-4 border-y border-slate-200/80 my-8">
      {/* Likes Panel */}
      <button
        onClick={handleLike}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 active:scale-90 ${
          isLiked
            ? "bg-rose-50 text-rose-600 border border-rose-100"
            : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60"
        }`}
      >
        <Heart
          className={`w-4 h-4 transition-all duration-300 ${
            isLiked ? "fill-rose-500 stroke-rose-500 scale-110" : ""
          }`}
        />
        <span>{likesCount} {likesCount === 1 ? "Like" : "Likes"}</span>
      </button>

      {/* Share Panel */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShareOpen(!shareOpen)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 border ${
            shareOpen
              ? "bg-blue-50 text-blue-600 border-blue-100"
              : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200/60"
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>

        {/* Share Popover Dropdown */}
        {shareOpen && (
          <div className="absolute right-0 bottom-full mb-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="text-[10px] font-bold text-slate-400 px-3 py-1.5 uppercase tracking-wider">
              Share Article
            </div>
            
            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center justify-between text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Link2 className="w-3.5 h-3.5 text-slate-500" />
                Copy Link
              </span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : null}
            </button>

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShareOpen(false)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
              WhatsApp
            </a>

            {/* Facebook */}
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShareOpen(false)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <svg className="w-3.5 h-3.5 text-blue-600 fill-current" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              Facebook
            </a>

            {/* Twitter */}
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShareOpen(false)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <svg className="w-3.5 h-3.5 text-sky-500 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
              Twitter / X
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
