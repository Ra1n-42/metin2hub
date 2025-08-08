import { Button } from "@/components/ui/button"
import { dummyAssets } from "@/data/assets";
import AssetCategorySection from "@/components/AssetCategorySection";
import { Link } from "react-router-dom";

export default function Home() {

    const groupedAssets = {
        Waffen: dummyAssets.filter((a) => a.type === 'weapon'),
        Rüstungen: dummyAssets.filter((a) => a.type === 'armor'),
        Costüme: dummyAssets.filter((a) => a.type === 'costumes'),
        Mounts: dummyAssets.filter((a) => a.type === 'mount'),
        NPCs: dummyAssets.filter((a) => a.type === 'npc'),
        Maps: dummyAssets.filter((a) => a.type === 'map'),
        Effekte: dummyAssets.filter((a) => a.type === 'effect'),
        Icons: dummyAssets.filter((a) => a.type === 'icon'),

    };

    return (
        <div className="px-4 md:px-8">
            <section className="text-center py-12 md:py-20">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Metin2 Asset Hub
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-4 max-w-2xl mx-auto">
                    Entdecke Maps, Waffen, Rüstungen, NPCs und mehr für dein Modding-Projekt.
                </p>
                <Button asChild variant="outline">
                    <Link to="/assets?type=map">Alle Maps ansehen</Link>
                </Button>

            </section>
            <section className="mb-20">
                {Object.entries(groupedAssets).map(([title, items]) => (
                    <AssetCategorySection key={title} title={title} items={items} />
                ))}
            </section>
        </div>
    );
}
