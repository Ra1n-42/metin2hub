import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Asset } from "@/data/assets";
import { getCharacterImage } from "@/data/assets";
import { Mars, Venus, Download, BadgeCheckIcon, Ellipsis, Flag, Flame, Eye, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SimpleTooltip } from "@/components/SimpleTooltip";
import { Link, useNavigate } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ReportDialogContent } from "./ReportDialog";


function TheMoreComponent({ assetName, assetId }: { assetName: string; assetId: number }) {
    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-6 w-7 cursor-pointer bg-white/10 backdrop-blur-sm hover:bg-white/50">
                        <Ellipsis className="h-4 w-4 text-white" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {/* <DropdownMenuItem>
                        <div className="flex items-center justify-center w-full">TEST</div>
                    </DropdownMenuItem> */}
                    <DropdownMenuItem asChild>
                        <DialogTrigger asChild>
                            <div className="flex items-center justify-center cursor-pointer h-7">
                                <Flag className="text-red-500" />
                                <p className="text-red-500">Report</p>
                            </div>
                        </DialogTrigger>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <ReportDialogContent assetName={assetName} assetId={assetId} />
        </Dialog>
    );
}



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
            <Card className="w-full min-w-60 max-w-70 flex flex-col rounded-2xl shadow-md overflow-hidden border border-muted bg-background transition hover:shadow-xl">
                {/* Bildbereich */}
                <div className="relative w-full h-44 bg-muted hover:cursor-pointer">
                    {/* Gender icons floating */}
                    <div className="absolute top-3 right-3 flex space-x-1">
                        <div className="flex items-center gap-1.5 z-10">
                            {/* Viewer Anzeige */}
                            <div className="flex items-center gap-1 text-blue-500" title="Viewer">
                                <Eye className="w-5 h-5" />
                                <span>{viewer}</span>
                            </div>

                            {/* Hot Votes Anzeige */}
                            <div className="flex items-center gap-1 text-red-500 font-semibold" title="Hot votes">
                                <Flame className="w-5 h-5" />
                                <span>{hotVotes}</span>
                            </div>
                            {asset.gender?.map((gender) => (
                                <div key={gender} className="h-4 w-4 bg-white/20 backdrop-blur-md rounded-full">
                                    {gender === 'male'
                                        ? <div className="h-4 w-4 rounded-full bg-blue-400 flex items-center justify-center text-white text-xs font-bold"><Mars /></div>
                                        : <div className="h-4 w-4 rounded-full bg-pink-400 flex items-center justify-center text-white text-xs font-bold"><Venus /></div>
                                    }
                                </div>
                            ))}
                            <TheMoreComponent assetName={asset.name} assetId={asset.id} />
                        </div>
                    </div>
                    {asset.thumbnail ? (
                        <div
                            className="relative w-full h-44 bg-muted"
                            onMouseEnter={() => setShowPreview(true)}
                            onMouseLeave={() => setShowPreview(false)}
                            onClick={handleCardClick}>

                            {showPreview && asset.hoverImages?.length ? (<img
                                src={currentPreview}
                                alt="hoverImages"
                                className="w-full h-full object-cover"
                                loading="lazy" // Browser lädt erst, wenn sichtbar.
                                decoding="async" // Rendering wird nicht blockiert.
                            />) : (
                                <img
                                    src={asset.thumbnail}
                                    alt={asset.name}
                                    className="w-full h-full object-cover"
                                    loading="lazy" // Browser lädt erst, wenn sichtbar.
                                    decoding="async" // Rendering wird nicht blockiert.
                                />)}
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                            Kein Bild verfügbar
                        </div>
                    )}
                </div>
                {/* Inhalt */}
                <CardHeader className="pb-1">
                    <h3 className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                        {asset.name}
                    </h3>

                    {/* Creator info with enhanced styling */}
                    <Link to={"/"} >
                        <div className="flex items-center space-x-3 transition-all duration-300 hover:-translate-y-1 hover:scale-105 rounded-2xl border-white hover:border-b-2 hover:border-r-2">
                            <div className="relative">
                                <img
                                    className="rounded-full h-9 w-9 ring-2 ring-gray-500 dark:ring-green-500"
                                    src={asset.creator?.avatar}
                                    alt={asset.creator?.name}
                                />
                                {/* Badge Icon mit eigenem Container für korrekte Positionierung */}
                                <div className="absolute -bottom-1 -right-1">
                                    <SimpleTooltip content="verified user" side="top">
                                        <div className="bg-blue-500 rounded-full h-4 w-4 flex items-center justify-center">
                                            <BadgeCheckIcon className="h-full w-full text-white" />
                                        </div>
                                    </SimpleTooltip>
                                </div>
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
                    {/* Typ */}
                    <Badge variant="outline" className="w-fit capitalize">
                        {asset.type}
                    </Badge>
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
            {/* Report Dialog
            <ReportDialog
                isOpen={isReportDialogOpen}
                onOpenChange={setIsReportDialogOpen}
                assetName={asset.name}
                assetId={asset.id}
            /> */}
        </>
    );
}