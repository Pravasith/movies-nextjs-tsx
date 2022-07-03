import Image from "next/image"
import { FC } from "react"

export const useImage: FC<string[]> = (image: string[]) => {
    // This is relatively new in Next JS (10+ release) and
    // it basically does the job of cloudinary, optimizes
    // images according to screen sizes ..etc.

    const [url, alt, posterOrBackdrop] = image

    let width,
        height,
        scale = 2

    if (posterOrBackdrop === "backdrop") {
        // Landscape/backdrop
        width = 256 * scale
        height = 144 * scale
    } else if (posterOrBackdrop === "poster") {
        // Portrait/poster
        width = 128 * scale
        height = 192 * scale
    }

    width = width + ""
    height = height + ""

    return <Image src={url} alt={alt} width={width} height={height} />
}
