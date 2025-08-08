import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Asset } from "@/data/assets";
import { getCharacterImage } from "@/data/assets";
import { Mars, Venus, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AssetCard({ asset }: { asset: Asset }) {
    return (
        <Card className="w-full max-w-[280px] flex flex-col rounded-2xl shadow-md overflow-hidden border border-muted bg-background transition hover:shadow-xl">
            {/* Bildbereich */}
            <div className="relative w-full h-44 bg-muted">
                {asset.previewUrl ? (
                    <img
                        src={asset.previewUrl}
                        alt={asset.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                        Kein Bild verfügbar
                    </div>
                )}
            </div>

            {/* Inhalt */}
            <CardHeader className="pb-2">
                {/* Title with gradient text */}
                <h3 className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                    {asset.name}
                </h3>

                {/* Creator info with enhanced styling */}
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <img
                            className="rounded-full h-10 w-10 ring-2 ring-purple-200 dark:ring-purple-800 transition-all duration-300 hover:ring-4"
                            src={asset.creator?.avatar}
                            alt={asset.creator?.name}
                        />
                        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full h-3 w-3 ring-2 ring-white dark:ring-gray-900"></div>
                    </div>
                    <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">{asset.creator?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Creator</p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-3">
                {/* Typ */}
                <Badge variant="outline" className="w-fit capitalize">
                    {asset.type}
                </Badge>

                {/* Gender */}
                {asset.gender && asset.gender.length > 0 && (
                    <div className="flex gap-1 items-center">
                        {asset.gender.map((gender) =>
                            gender === "male" ? (
                                <Mars key="male" className="h-5 w-5 text-blue-500" />
                            ) : (
                                <Venus key="female" className="h-5 w-5 text-pink-500" />
                            )
                        )}
                    </div>
                )}

                {/* Klassen */}
                {asset.classes && asset.classes.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                        {asset.classes.map((cls) => (
                            <img
                                key={cls}
                                src={getCharacterImage(cls)}
                                alt={cls}
                                className="h-6 w-6 rounded-md border bg-white dark:bg-muted"
                            />
                        ))}
                    </div>
                )}
            </CardContent>

            {/* Footer */}
            <CardFooter className="mt-auto pt-2 border-t">
                <Button variant="ghost" className="w-full justify-center gap-2" asChild>
                    <a href={asset.fileUrl} download>
                        <Download className="h-4 w-4" />
                        Download
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
}
