import Loader from "@/components/Loader";
import useSWR from 'swr';
import { memo } from 'react';

interface WatermarkedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
}

const watermarkImage = async (src: string) => {
    try {
        const imageResponse = await fetch(src);
        const imageBlob = await imageResponse.blob();

        const watermarkResponse = await fetch(import.meta.env.VITE_WATERMARK_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream',
                'Content-Length': imageBlob.size.toString(),
            },
            body: imageBlob,
        });

        if (!watermarkResponse.ok) {
            throw new Error('Failed to watermark image');
        }

        const watermarkedBlob = await watermarkResponse.blob();
        return URL.createObjectURL(watermarkedBlob);
    } catch (error) {
        throw error;
    }
};

const WatermarkedImage = memo(({ src, className, alt, ...props }: WatermarkedImageProps) => {
    const { data: watermarkedUrl, isLoading, error } = useSWR(
        src,
        watermarkImage,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 24 * 60 * 60 * 1000, // 24 hours
        }
    );

    if (isLoading) {
        return <Loader className="w-6 h-6" />;
    }

    if (error) {
        console.error('Error loading watermarked image:', error);
        return <div className="text-red-500 text-sm">Failed to load image</div>;
    }

    return (
        <img
            src={watermarkedUrl || src}
            className={className}
            alt={alt}
            {...props}
        />
    );
}, (prevProps, nextProps) => {
    return prevProps.src === nextProps.src;
});

export default WatermarkedImage;