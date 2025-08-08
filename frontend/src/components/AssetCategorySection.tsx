import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import AssetCard from "@/components/AssetCard";
import type { Asset } from "@/data/assets";
import { Button } from "@/components/ui/button";

const ITEMS_PER_LOAD = 10;

export default function AssetCategorySection({ title, items }: { title: string, items: Asset[] }) {
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

    const visibleItems = items.slice(0, visibleCount);
    const hasMore = visibleCount < items.length;

    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>

            <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex space-x-4 pb-4">
                    {visibleItems.map((asset) => (
                        <AssetCard key={asset.id} asset={asset} />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {hasMore && (
                <div className="mt-4 text-center">
                    <Button onClick={() => setVisibleCount((c) => c + ITEMS_PER_LOAD)}>
                        Weitere laden
                    </Button>
                </div>
            )}
        </div>
    );
}
