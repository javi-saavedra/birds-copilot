import { Bird } from "@/lib/schemas";
import { Link } from "react-router-dom";
import WatermarkedImage from "@/components/WatermarkedImage/WatermarkedImage";
import { memo } from 'react';

type BirdItemProps = {
    bird: Bird;
}

const BirdListItem = memo(({ bird }: BirdItemProps) => {
    return (
        <Link className="flex flex-col w-[168.2px] gap-3" to={`/birds/${bird.id}`}>
            <WatermarkedImage src={bird.image_url} alt={bird.english_name} className="w-full h-[94.59px] object-cover rounded-lg" />
            <div className="flex flex-col gap-0.5">
                <h1 className="text-base font-medium">{bird.english_name}</h1>
                <p className="text-sm text-blueberry/80">{bird.latin_name}</p>
            </div>
        </Link>
    );
}, (prevProps, nextProps) => {
    return prevProps.bird.id === nextProps.bird.id;
});

export default BirdListItem;