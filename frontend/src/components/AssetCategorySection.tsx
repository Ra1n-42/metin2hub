import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import AssetCard from "@/components/AssetCard";
import type { Asset } from "@/data/assets";
import { Button } from "@/components/ui/button";
import { ArrowBigRightDash } from 'lucide-react';

const ITEMS_PER_LOAD = 5;

export default function AssetCategorySection({ title, items }: { title: string, items: Asset[] }) {
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
    const [isClicked, setIsClicked] = useState(false);
    const visibleItems = items.slice(0, visibleCount);
    const hasMore = visibleCount < items.length;

    const handleClick = () => {
        setIsClicked(true);

        // Animation zurücksetzen nach kurzer Zeit
        setTimeout(() => {
            setIsClicked(false);
        }, 600);

        // Items laden
        setVisibleCount((c) => c + ITEMS_PER_LOAD);
    };

    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>

            <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex space-x-4 pb-4 mt-2 mb-2">
                    {visibleItems.map((asset) => (
                        <AssetCard key={asset.id} asset={asset} />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {hasMore && (
                <div className="mt-4 text-center">
                    <Button
                        className="group relative bg-transparent hover:bg-accent border border-border hover:border-purple-400 transition-all duration-300 hover:shadow-md active:scale-95"
                        variant="outline"
                        onClick={handleClick}
                    >
                        <div className="flex items-center gap-3">
                            <span className="font-medium">Show More</span>
                            <div className="relative overflow-hidden w-5 h-5">
                                <ArrowBigRightDash
                                    className={`w-5 h-5 pt-1 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 ${isClicked
                                        ? 'transform translate-x-8 opacity-0'
                                        : 'transform translate-x-0 opacity-100'
                                        }`}
                                />
                                {/* Zweiter Pfeil der von links einschwebt */}
                                <ArrowBigRightDash
                                    className={`absolute top-0 left-0 w-5 h-5 pt-1 transition-all duration-300 ${isClicked
                                        ? 'transform translate-x-0 opacity-100 delay-300'
                                        : 'transform -translate-x-8 opacity-0'
                                        }`}
                                />
                            </div>
                        </div>

                        {/* Subtle underline effect */}
                        <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>

                        {/* Click ripple effect */}
                        <div className={`absolute inset-0 bg-purple-400/20 rounded-md transition-all duration-300 ${isClicked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                            }`}></div>
                    </Button>
                </div>
            )}
        </div>
    );
}