import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Asset } from "@/data/assets";
import { getCharacterImage } from "@/data/assets";
import { Mars, Venus, Download, BadgeCheckIcon, Flame, Eye, User, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SimpleTooltip } from "@/components/SimpleTooltip";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export default function AssetCard({ asset }: { asset: Asset }) {
    const [showPreview, setShowPreview] = useState(false);
    const [currentPreview, setCurrentPreview] = useState<string | undefined>(undefined);

    const navigate = useNavigate();

    const hotVotes = asset.hotVotes ?? 0;
    const viewer = asset.allViewer ?? 0;

    useEffect(() => {
        if (!showPreview || !asset.hoverImages || asset.hoverImages.length === 0) return;
        let index = 0;

        setCurrentPreview(asset.hoverImages[0]); // Start mit erstem Bild

        const interval = setInterval(() => {
            index = (index + 1) % asset.hoverImages!.length;
            setCurrentPreview(asset.hoverImages![index]);
        }, 1000);

        return () => clearInterval(interval);
    }, [showPreview, asset.hoverImages]);

    function handleCardClick() {
        navigate(`/asset/${asset.id}`);
    }

    return (
        <>
            <Card className="group w-full max-w-xs flex flex-col rounded-2xl shadow-xl overflow-hidden border-1 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                {/* Image Section - Simplified */}
                <div className="relative aspect-video overflow-hidden cursor-pointer"
                    onMouseEnter={() => setShowPreview(true)}
                    onMouseLeave={() => setShowPreview(false)}
                    onClick={handleCardClick}>

                    {/* Main Image/Video */}
                    {showPreview && asset.hoverImages?.length ? (
                        currentPreview?.endsWith('.mp4') ? (
                            <video
                                src={currentPreview}
                                autoPlay
                                loop
                                muted
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        ) : (
                            <img
                                src={currentPreview}
                                alt="Preview"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                            />
                        )
                    ) : (
                        asset.thumbnail.endsWith('.mp4') ? (
                            <video
                                src={asset.thumbnail}
                                autoPlay
                                loop
                                muted
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        ) : (
                            <img
                                src={asset.thumbnail}
                                alt={asset.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                            />
                        )
                    )}

                    {/* Minimal overlay - only on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                        {/* Bottom overlay with key info */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                            <div className="flex justify-between items-end text-white text-sm">
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-1">
                                        <Eye className="w-4 h-4 text-blue-400" />
                                        <span>{viewer}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Flame className="w-4 h-4 text-red-400" />
                                        <span>{hotVotes}</span>
                                    </div>
                                </div>
                                {asset.gender && (
                                    <div className="flex gap-1">
                                        {asset.gender.map((gender) => (
                                            <div key={gender} className={`h-5 w-5 rounded-full flex items-center justify-center ${gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'
                                                }`}>
                                                {gender === 'male' ? <Mars className="h-3 w-3" /> : <Venus className="h-3 w-3" />}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* info */}
                        <div className="absolute top-3 right-3 opacity-50">
                            <SimpleTooltip content={"Asset Info"} side="top">
                                <Info />
                            </SimpleTooltip>
                        </div>
                    </div>

                    {/* Asset type badge */}
                    <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="text-center bg-white/90 text-gray-800 text-xs font-medium">
                            {asset.type}
                        </Badge>
                    </div>
                </div>
                <CardHeader className="pb-1">
                    <h3 className="text-wrap font-bold text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                        {asset.name}
                    </h3>

                    {/* Creator info with enhanced styling */}
                    <Link to={`/creator/${encodeURIComponent(asset.creator?.name || '')}`} className="block mb-4">

                        <div className="flex items-center space-x-3 rounded-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                            <div className="relative">
                                <img
                                    className="rounded-full h-9 w-9 ring-2 ring-gray-500 dark:ring-green-500"
                                    src={asset.creator?.avatar}
                                    alt={asset.creator?.name}
                                />
                                {/* Badge Icon mit eigenem Container für korrekte Positionierung */}
                                {asset.creator?.verified && (
                                    <div className="absolute -bottom-1 -right-1">
                                        <SimpleTooltip content="verified user" side="top">
                                            <div className="bg-blue-500 rounded-full h-4 w-4 flex items-center justify-center">
                                                <BadgeCheckIcon className="h-full w-full text-white" />
                                            </div>
                                        </SimpleTooltip>
                                    </div>
                                )}
                            </div>

                            <div>
                                <p className="dark:text-gray-200 text-foreground font-medium text-xl">{asset.creator?.name}</p>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    Creator
                                </p>
                            </div>
                        </div>
                    </Link>
                </CardHeader>

                <CardContent className="flex flex-col gap-3">

                    {/* Character classes with improved layout */}
                    {asset.classes && asset.classes.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Race</p>
                            <div className="flex space-x-2">
                                {asset.classes.map((characterClass, index) => (
                                    <div key={index} className="relative group/class">
                                        <SimpleTooltip content={characterClass} side="bottom">
                                            <img
                                                className="rounded-lg h-8 w-8 ring-2 ring-gray-200 dark:ring-gray-700 transition-all duration-300 hover:ring-purple-400 hover:scale-110"
                                                src={getCharacterImage(characterClass)}
                                                alt={characterClass}
                                            />
                                        </SimpleTooltip>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>

                {/* Footer */}
                <CardFooter className="mt-auto pt-2 border-t">
                    <Button variant="ghost" className="w-full justify-center gap-2 transition-all duration-300 hover:scale-110" asChild>
                        {asset.price ? (
                            <a href={asset.creator?.contact ?? "#"}>
                                {asset.price} - Contact Seller
                            </a>
                        ) : (
                            <a href={asset.fileUrl} download>
                                <Download className="h-4 w-4" />
                                Download
                            </a>
                        )}
                    </Button>

                </CardFooter>
            </Card>
        </>
    );
}