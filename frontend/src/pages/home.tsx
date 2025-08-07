import { useState } from 'react';
import { dummyAssets } from '@/data/assets';
// import type { Asset } from '@/data/assets';

export default function Home() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');

    const filteredAssets = dummyAssets.filter((asset) => {
        const matchesSearch = asset.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all' || asset.type === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div>
            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Suche nach Name..."
                    className="border p-2 w-full"
                />
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border p-2"
                >
                    <option value="all">Alle Typen</option>
                    <option value="weapon">Waffen</option>
                    <option value="armor">Rüstungen</option>
                    <option value="map">Maps</option>
                    <option value="mount">Reittiere</option>
                    <option value="npc">NPCs</option>
                    <option value="effect">Effekte</option>
                    <option value="icon">Icons</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredAssets.map((asset) => (
                    <div
                        key={asset.id}
                        className="bg-white p-4 rounded shadow hover:shadow-md transition"
                    >
                        {asset.previewUrl ? (
                            <img
                                src={asset.previewUrl}
                                alt={asset.name}
                                className="w-full h-40 object-cover mb-2 rounded"
                            />
                        ) : (
                            <div className="w-full h-40 bg-gray-200 flex items-center justify-center mb-2 rounded">
                                Kein Bild
                            </div>
                        )}
                        <h3 className="font-bold text-lg">{asset.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">Typ: {asset.type}</p>
                        <a
                            href={asset.fileUrl}
                            download
                            className="text-blue-500 hover:underline text-sm"
                        >
                            Herunterladen
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}