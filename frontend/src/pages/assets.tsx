import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { dummyAssets } from "@/data/assets";
import type { Asset } from "@/data/assets";
import AssetGrid from "@/components/AssetGrid";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const INITIAL_PAGE_SIZE = 20;
const LOAD_MORE_SIZE = 10;

export default function AssetSearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    // Initialisiere State aus URL-Parametern
    const [search, setSearch] = useState(() => searchParams.get("search") || "");
    const [filter, setFilter] = useState(() => {
        const typeFromUrl = searchParams.get("type");
        return typeFromUrl &&
            ["map", "weapon", "armor", "mount", "npc", "effect", "icon", "pet", "costumes"].includes(typeFromUrl)
            ? typeFromUrl
            : "all";
    });

    const [displayedAssets, setDisplayedAssets] = useState<Asset[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const sentinelRef = useRef<HTMLDivElement | null>(null);

    // Reagiere auf URL-Parameter-Änderungen
    useEffect(() => {
        const typeFromUrl = searchParams.get("type");
        const searchFromUrl = searchParams.get("search") || "";

        const newFilter = typeFromUrl &&
            ["map", "weapon", "armor", "mount", "npc", "effect", "icon", "pet", "costumes"].includes(typeFromUrl)
            ? typeFromUrl
            : "all";

        setFilter(newFilter);
        setSearch(searchFromUrl);
    }, [searchParams]);

    // Gefilterte Assets basierend auf Such- und Filterkriterien
    const filteredAssets = dummyAssets.filter((asset: Asset) => {
        const matchesSearch = asset.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "all" || asset.type === filter;
        return matchesSearch && matchesFilter;
    });

    // Assets laden (initial oder mehr laden)
    const loadAssets = useCallback((filtered: Asset[], page: number, isInitial: boolean = false) => {
        setIsLoading(true);

        // Simuliere eine kleine Verzögerung für bessere UX
        setTimeout(() => {
            const startIndex = page * (isInitial ? INITIAL_PAGE_SIZE : LOAD_MORE_SIZE);
            const endIndex = startIndex + (isInitial ? INITIAL_PAGE_SIZE : LOAD_MORE_SIZE);
            const newAssets = filtered.slice(startIndex, endIndex);

            if (isInitial) {
                setDisplayedAssets(newAssets);
            } else {
                setDisplayedAssets(prev => [...prev, ...newAssets]);
            }

            setHasMore(endIndex < filtered.length);
            setIsLoading(false);
        }, 300);
    }, []);

    // Bei Änderung der Filter/Suche: Reset und neu laden
    useEffect(() => {
        setCurrentPage(0);
        setDisplayedAssets([]);
        loadAssets(filteredAssets, 0, true);
    }, [search, filter, loadAssets]);

    // Intersection Observer für Infinite Scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && hasMore && !isLoading) {
                    const nextPage = currentPage + 1;
                    setCurrentPage(nextPage);
                    loadAssets(filteredAssets, nextPage);
                }
            },
            {
                root: null,
                rootMargin: "20px",
                threshold: 1.0
            }
        );

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => {
            if (sentinelRef.current) {
                observer.unobserve(sentinelRef.current);
            }
        };
    }, [currentPage, hasMore, isLoading, filteredAssets, loadAssets]);

    const handleSearchChange = (value: string) => {
        setSearch(value);
        const newSearchParams = new URLSearchParams(searchParams);
        if (value) {
            newSearchParams.set("search", value);
        } else {
            newSearchParams.delete("search");
        }
        setSearchParams(newSearchParams);
    };

    const handleFilterChange = (value: string) => {
        setFilter(value);
        const newSearchParams = new URLSearchParams(searchParams);
        if (value === "all") {
            newSearchParams.delete("type");
        } else {
            newSearchParams.set("type", value);
        }
        setSearchParams(newSearchParams);
    };

    return (
        <div className="px-4 md:px-8 py-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                Assets durchsuchen
            </h1>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-center max-w-3xl mx-auto mb-8">
                <Input
                    type="text"
                    placeholder="Nach Name suchen..."
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full md:w-[300px]"
                />

                <Select onValueChange={handleFilterChange} value={filter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Typ wählen" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Alle Typen</SelectItem>
                        <SelectItem value="weapon">Waffen</SelectItem>
                        <SelectItem value="armor">Rüstungen</SelectItem>
                        <SelectItem value="map">Maps</SelectItem>
                        <SelectItem value="mount">Reittiere</SelectItem>
                        <SelectItem value="npc">NPCs</SelectItem>
                        <SelectItem value="effect">Effekte</SelectItem>
                        <SelectItem value="pet">Pets</SelectItem>
                        <SelectItem value="costumes">Kostüme</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <AssetGrid assets={displayedAssets} />

            {/* Loading-Indikator */}
            {isLoading && (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            )}

            {/* Ergebnisse-Info */}
            <div className="text-center text-gray-600 mt-4 mb-8">
                {displayedAssets.length > 0 ? (
                    <>
                        Zeige {displayedAssets.length} von {filteredAssets.length} Assets
                        {hasMore && " (scrollen Sie nach unten für mehr)"}
                    </>
                ) : (
                    !isLoading && "Keine Assets gefunden"
                )}
            </div>

            {/* Infinite Scroll Trigger */}
            {hasMore && <div ref={sentinelRef} className="h-10" />}

            {/* Ende erreicht */}
            {!hasMore && displayedAssets.length > 0 && (
                <div className="text-center text-gray-500 py-8">
                    Alle Assets wurden geladen
                </div>
            )}
        </div>
    );
}