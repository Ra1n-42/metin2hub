import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SimpleTooltip } from "@/components/SimpleTooltip";
import {
    Download,
    Flag,
    Flame,
    Eye,
    ArrowLeft,
    Share2,
    Heart,
    Tag,
    User,
    CheckCircle,
    Mars, Venus
} from "lucide-react";
import type { Asset } from '@/data/assets';
import { getAssetById, getCharacterImage } from '@/data/assets';

export default function AssetDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [asset, setAsset] = useState<Asset | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (!id) return;
        const assetData = getAssetById(Number(id));
        setAsset(assetData);
    }, [id]);

    if (!asset) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-lg text-foreground">Loading asset details...</p>
                </div>
            </div>
        );
    }

    const hotVotes = asset.hotVotes ?? 0;
    const viewer = asset.allViewer ?? 0;
    const allImages = [asset.thumbnail, ...(asset.hoverImages || [])];

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Back Button */}
                <div className="mb-6">
                    <Link to="/">
                        <Button variant="ghost" className="gap-2 hover:bg-accent">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Assets
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <Card className="overflow-hidden border shadow-2xl bg-card backdrop-blur-sm">
                            <div className="relative">
                                <img
                                    src={allImages[currentImageIndex]}
                                    alt={asset.name}
                                    className="w-full h-80 lg:h-96 object-cover"
                                />

                                {/* Image Navigation Dots */}
                                {allImages.length > 1 && (
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                        {allImages.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex
                                                    ? 'bg-white scale-125'
                                                    : 'bg-white/50 hover:bg-white/75'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Stats Overlay */}
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                                        <Eye className="w-4 h-4 text-blue-400" />
                                        <span>{viewer}</span>
                                    </div>
                                    <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                                        <Flame className="w-4 h-4 text-red-400" />
                                        <span>{hotVotes}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Thumbnail Strip */}
                        {allImages.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {allImages.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${index === currentImageIndex
                                            ? 'border-purple-500 scale-105'
                                            : 'border-border hover:border-purple-300'
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Asset Details */}
                    <div className="space-y-6">
                        <Card className="border shadow-xl bg-card backdrop-blur-sm">
                            <CardHeader className="pb-4">
                                <div className="flex justify-between items-start mb-4">
                                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                                        {asset.name}
                                    </h1>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setIsLiked(!isLiked)}
                                            className={`${isLiked ? 'text-red-500 border-red-500' : ''}`}
                                        >
                                            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Share2 className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Flag className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Creator Info */}
                                {asset.creator && (
                                    <Link to="/">
                                        <div className="flex items-center space-x-4 p-4 rounded-xl border border-border hover:border-purple-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card">
                                            <div className="relative">
                                                <img
                                                    className="rounded-full h-12 w-12 ring-2 ring-border"
                                                    src={asset.creator.avatar}
                                                    alt={asset.creator.name}
                                                />
                                                <div className="absolute -bottom-1 -right-1">
                                                    <SimpleTooltip content="Verified user" side="top">
                                                        <div className="bg-blue-500 rounded-full h-5 w-5 flex items-center justify-center">
                                                            <CheckCircle className="h-3 w-3 text-white" />
                                                        </div>
                                                    </SimpleTooltip>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-lg">{asset.creator.name}</p>
                                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                    <User className="h-3 w-3" />
                                                    Creator
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                )}
                            </CardHeader>

                            <CardContent className="space-y-6">
                                {/* Asset Type & Gender */}
                                <div className="flex flex-wrap gap-3">
                                    <Badge variant="outline" className="px-3 py-1 text-sm font-medium capitalize flex items-center gap-1">
                                        <Tag className="h-3 w-3" />
                                        {asset.type}
                                    </Badge>
                                    {asset.set && (
                                        <Badge variant="secondary" className="px-3 py-1">
                                            Set Item
                                        </Badge>
                                    )}
                                    {asset.gender?.map((gender) => (
                                        <Badge key={gender} variant="outline" className="px-2 py-1 flex items-center gap-1">
                                            {gender === 'male'
                                                ? <div className="h-4 w-4 rounded-full bg-blue-400 flex items-center justify-center text-white text-xs font-bold"><Mars /></div>
                                                : <div className="h-4 w-4 rounded-full bg-pink-400 flex items-center justify-center text-white text-xs font-bold"><Venus /></div>
                                            }
                                            {gender}
                                        </Badge>
                                    ))}
                                </div>

                                {/* Character Classes */}
                                {asset.classes && asset.classes.length > 0 && (
                                    <div className="space-y-3">
                                        <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                                            Compatible Races
                                        </h3>
                                        <div className="flex flex-wrap gap-3">
                                            {asset.classes.map((characterClass, index) => (
                                                <div key={index} className="group">
                                                    <SimpleTooltip content={characterClass} side="bottom">
                                                        <div className="flex flex-col items-center space-y-1 p-2 rounded-lg border border-border hover:border-purple-300 transition-all duration-300 hover:shadow-md hover:scale-105 bg-card">
                                                            <img
                                                                className="h-10 w-10 rounded-lg"
                                                                src={getCharacterImage(characterClass)}
                                                                alt={characterClass}
                                                            />
                                                            <span className="text-xs font-medium capitalize">{characterClass}</span>
                                                        </div>
                                                    </SimpleTooltip>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 p-4 bg-accent/50 rounded-xl">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
                                            <Eye className="h-4 w-4" />
                                        </div>
                                        <p className="text-2xl font-bold">{viewer}</p>
                                        <p className="text-xs text-muted-foreground">Views</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-1 text-red-500 mb-1">
                                            <Flame className="h-4 w-4" />
                                        </div>
                                        <p className="text-2xl font-bold">{hotVotes}</p>
                                        <p className="text-xs text-muted-foreground">Hot Votes</p>
                                    </div>
                                </div>

                                {/* Download/Purchase Button */}
                                <div className="pt-4 border-t">
                                    {asset.price ? (
                                        <Button className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:shadow-lg hover:scale-105" asChild>
                                            <a href={asset.creator?.contact ?? "#"}>
                                                <span className="mr-2">{asset.price}</span>
                                                Contact Seller
                                            </a>
                                        </Button>
                                    ) : (
                                        <Button className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105" asChild>
                                            <a href={asset.fileUrl} download>
                                                <Download className="h-5 w-5 mr-2" />
                                                Free Download
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Additional Information */}
                <Card className="border shadow-xl bg-card backdrop-blur-sm">
                    <CardHeader>
                        <h2 className="text-2xl font-bold">About this Asset</h2>
                    </CardHeader>
                    <CardContent>
                        <div className="prose dark:prose-invert max-w-none">
                            <p className="text-muted-foreground leading-relaxed">
                                This {asset.type} asset "{asset.name}" is a high-quality addition to your Metin2 server.
                                Created by {asset.creator?.name}, this asset has been viewed {viewer} times and received {hotVotes} hot votes from the community.
                            </p>

                            {asset.classes && asset.classes.length > 0 && (
                                <p className="text-muted-foreground leading-relaxed mt-4">
                                    This asset is compatible with the following character classes: {asset.classes.join(', ')}.
                                    {asset.gender && asset.gender.length > 0 && ` Available for ${asset.gender.join(' and ')} characters.`}
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}