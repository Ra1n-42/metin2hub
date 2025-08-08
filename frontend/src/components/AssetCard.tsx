import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Asset } from "@/data/assets";

export default function AssetCard({ asset }: { asset: Asset }) {
    return (
        <Card className="w-[250px] flex flex-col justify-between">
            {asset.previewUrl ? (
                <img
                    src={asset.previewUrl}
                    alt={asset.name}
                    className="w-full h-48 object-cover rounded-t-md"
                />
            ) : (
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 flex items-center justify-center rounded-t-md">
                    Kein Bild
                </div>
            )}

            <CardContent className="pt-4">
                <h3 className="font-semibold text-lg">{asset.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Typ: {asset.type}
                </p>
            </CardContent>

            <CardFooter className="justify-end">
                <Button variant="link" asChild>
                    <a href={asset.fileUrl} download>
                        Herunterladen
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
}
