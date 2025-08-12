import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Asset } from '@/data/assets'; // dein Asset-Interface
import { getAssetById } from '@/data/assets'; // Beispiel: Funktion, um Asset-Daten zu laden

export default function AssetDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [asset, setAsset] = useState<Asset | null>(null);

    useEffect(() => {
        if (!id) return;

        // Beispiel: Asset laden (entweder via API oder lokal)
        // Hier musst du deine Datenquelle anpassen!
        const assetData = getAssetById(Number(id));
        setAsset(assetData);
    }, [id]);

    if (!asset) return <div>Lädt...</div>;

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{asset.name}</h1>

            <img
                src={asset.thumbnail}
                alt={asset.name}
                className="w-full max-h-96 object-contain rounded-lg mb-6"
            />

            {/* Beispiel: Weitere Infos */}
            <p>Type: {asset.type}</p>
            {asset.price && <p>Price: {asset.price}</p>}
            {asset.creator && (
                <p>Creator: {asset.creator.name}</p>
            )}

            {/* Hier kannst du weitere Details, Hover-Images, Votes, etc. anzeigen */}
        </div>
    );
}
