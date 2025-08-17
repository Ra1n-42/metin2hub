import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SimpleTooltip } from "@/components/SimpleTooltip";
import { ArrowLeft, BadgeCheckIcon, User, Download, Eye, Flame, MessageCircle } from "lucide-react";
import type { Asset } from '@/data/assets';
import { dummyAssets } from '@/data/assets';
import AssetCard from '@/components/AssetCard';

// Creator interface
interface Creator {
    name: string;
    avatar?: string;
    verified?: boolean;
    contact?: string;
    joinDate?: string;
    bio?: string;
    totalDownloads?: number;
    totalViews?: number;
    totalAssets?: number;
}

// Function to get creator by name
function getCreatorByName(name: string): Creator | null {
    const creatorAssets = dummyAssets.filter(asset =>
        asset.creator?.name.toLowerCase() === name.toLowerCase()
    );

    if (creatorAssets.length === 0) return null;

    const firstAsset = creatorAssets[0];
    const totalViews = creatorAssets.reduce((sum, asset) => sum + (asset.allViewer || 0), 0);
    const totalDownloads = Math.floor(totalViews * 0.3); // Estimate downloads as 30% of views

    return {
        name: firstAsset.creator!.name,
        avatar: firstAsset.creator?.avatar,
        verified: firstAsset.creator?.verified,
        contact: firstAsset.creator?.contact,
        joinDate: "2025-08-17", // You could add this to your data
        bio: getBioForCreator(name), // Custom bio for each creator
        totalDownloads,
        totalViews,
        totalAssets: creatorAssets.length,
    };
}

// Function to get creator assets
function getCreatorAssets(creatorName: string): Asset[] {
    return dummyAssets.filter(asset =>
        asset.creator?.name.toLowerCase() === creatorName.toLowerCase()
    );
}

// Get bio based on creator name (you can expand this)
function getBioForCreator(name: string): string {
    const bios: Record<string, string> = {
        plechito: "Professional Metin2 content creator with over 5 years of experience. Specializing in high-quality costumes, maps, and game assets. Always pushing the boundaries of visual design.",
        tatsumaru: "Armor and weapon specialist focusing on detailed textures and realistic designs. Creating immersive content for warrior-class characters.",
        realis: "3D artist and animator creating stunning visual effects and creatures. Expert in particle systems and advanced rendering techniques.",
        creatifyx: "UI/UX designer specializing in game interfaces and icon packs. Clean, modern designs that enhance gameplay experience.",
        zrye: "Weapon designer with a focus on fantasy and magical items. Each creation tells a story through intricate details and effects."
    };

    return bios[name.toLowerCase()] || "Passionate Metin2 content creator dedicated to bringing high-quality assets to the community.";
}

export default function CreatorProfilePage() {
    const { name } = useParams<{ name: string }>();
    const [creator, setCreator] = useState<Creator | null>(null);
    const [assets, setAssets] = useState<Asset[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<string>('all');

    useEffect(() => {
        if (!name) return;

        const creatorData = getCreatorByName(name);
        const creatorAssets = getCreatorAssets(name);

        setCreator(creatorData);
        setAssets(creatorAssets);
    }, [name]);

    if (!creator || !name) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-lg text-foreground">Loading creator profile...</p>
                </div>
            </div>
        );
    }

    // Get unique asset types for filtering
    const assetTypes = ['all', ...new Set(assets.map(asset => asset.type))];

    // Filter assets based on selected filter
    const filteredAssets = selectedFilter === 'all'
        ? assets
        : assets.filter(asset => asset.type === selectedFilter);

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header with Back Button */}
                <div className="mb-8">
                    <Link to="/">
                        <Button variant="ghost" className="gap-2 cursor-pointer">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Assets
                        </Button>
                    </Link>
                </div>

                {/* Creator Profile Header */}
                <Card className="border-1 shadow-2xl mb-8">
                    <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Creator Avatar and Basic Info */}
                            <div className="flex flex-col items-center md:items-start">
                                <div className="relative mb-4">
                                    <img
                                        className="rounded-2xl h-32 w-32 ring-4 ring-gray-200 dark:ring-gray-700"
                                        src={creator.avatar}
                                        alt={creator.name}
                                    />
                                    {creator.verified && (
                                        <div className="absolute -bottom-2 -right-2">
                                            <SimpleTooltip content="Verified Creator" side="top">
                                                <div className="bg-blue-500 rounded-full h-8 w-8 flex items-center justify-center ring-4 ring-white dark:ring-gray-900">
                                                    <BadgeCheckIcon className="h-5 w-5 text-white" />
                                                </div>
                                            </SimpleTooltip>
                                        </div>
                                    )}
                                </div>

                                {/* Contact Button */}
                                {creator.contact && (
                                    <Button className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" asChild>
                                        <a href={creator.contact} target="_blank" rel="noopener noreferrer">
                                            <MessageCircle className="h-4 w-4 mr-2" />
                                            Contact Creator
                                        </a>
                                    </Button>
                                )}
                            </div>

                            {/* Creator Details */}
                            <div className="flex-1 space-y-6">
                                {/* Name and Verification */}
                                <div>
                                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                                        {creator.name}
                                    </h1>
                                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                                        <User className="h-4 w-4" />
                                        <span>Creator since {new Date(creator.joinDate || '2025-01-01').getFullYear()}</span>
                                    </div>
                                </div>

                                {/* Bio */}
                                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                                    {creator.bio}
                                </p>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="text-center md:text-left">
                                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                                <Eye className="h-4 w-4 text-blue-600" />
                                            </div>
                                        </div>
                                        <p className="text-2xl font-bold">{creator.totalViews?.toLocaleString()}</p>
                                        <p className="text-sm text-muted-foreground">Total Views</p>
                                    </div>

                                    <div className="text-center md:text-left">
                                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                                <Download className="h-4 w-4 text-green-600" />
                                            </div>
                                        </div>
                                        <p className="text-2xl font-bold">{creator.totalDownloads?.toLocaleString()}</p>
                                        <p className="text-sm text-muted-foreground">Total Downloads</p>
                                    </div>

                                    <div className="text-center md:text-left">
                                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                                                <Flame className="h-4 w-4 text-purple-600" />
                                            </div>
                                        </div>
                                        <p className="text-2xl font-bold">{creator.totalAssets}</p>
                                        <p className="text-sm text-muted-foreground">Assets Created</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Filter Tabs */}
                <Card className="border-0 shadow-lg bg-white dark:bg-gray-900 mb-8">
                    <CardHeader>
                        <div className="flex flex-wrap gap-2">
                            {assetTypes.map((type) => (
                                <Button
                                    key={type}
                                    variant={selectedFilter === type ? "default" : "outline"}
                                    size="sm"
                                    className={`capitalize ${selectedFilter === type
                                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                                        : ""
                                        }`}
                                    onClick={() => setSelectedFilter(type)}
                                >
                                    {type === 'all' ? 'All Assets' : type}
                                    <Badge variant="secondary" className="ml-2">
                                        {type === 'all'
                                            ? assets.length
                                            : assets.filter(asset => asset.type === type).length
                                        }
                                    </Badge>
                                </Button>
                            ))}
                        </div>
                    </CardHeader>
                </Card>

                {/* Assets Grid */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">
                            {selectedFilter === 'all' ? 'All Assets' : `${selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)} Assets`}
                        </h2>
                        <p className="text-muted-foreground">
                            {filteredAssets.length} {filteredAssets.length === 1 ? 'asset' : 'assets'} found
                        </p>
                    </div>

                    {filteredAssets.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredAssets.map((asset) => (
                                <AssetCard key={asset.id} asset={asset} />
                            ))}
                        </div>
                    ) : (
                        <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
                            <CardContent className="p-12 text-center">
                                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <User className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">No assets found</h3>
                                <p className="text-muted-foreground">
                                    This creator hasn't published any {selectedFilter === 'all' ? 'assets' : selectedFilter + ' assets'} yet.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}