import { Button } from "@/components/ui/button"
// import { dummyAssets } from "@/data/assets";
import AssetCategorySection from "@/components/AssetCategorySection";
import { Link } from "react-router-dom";
import { assetTypes, groupedAssets } from "@/data/assets";

export default function Home() {



    return (
        <div className="px-4 md:px-8">
            <section className="text-center py-12 md:py-20">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Metin2 Asset Hub
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-4 max-w-2xl mx-auto">
                    Discover maps, weapons, armor, NPCs, and more for your modding project, all for free.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                    {assetTypes.map(type => (

                        <Button key={type} asChild variant="outline">
                            <Link to={`/assets?type=${type}`}>All {type.charAt(0).toUpperCase() + type.slice(1)}</Link>
                        </Button>
                    ))}

                </div>

            </section>
            <section className="mb-20">
                {Object.entries(groupedAssets).map(([title, items]) => (
                    <div key={title}>
                        <AssetCategorySection key={title} title={title} items={items} />
                        {/* {console.log(title, items)} */}
                    </div>
                ))}
            </section>
        </div>
    );
}
