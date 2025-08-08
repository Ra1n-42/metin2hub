import AssetCard from "@/components/AssetCard";
import type { Asset } from "@/data/assets";

export default function AssetGrid({ assets }: { assets: Asset[] }) {
    if (assets.length === 0) {
        return (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
                Keine Assets gefunden.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {assets.map((asset) => (
                <AssetCard key={asset.id} asset={asset} />
            ))}
        </div>
    );
}
