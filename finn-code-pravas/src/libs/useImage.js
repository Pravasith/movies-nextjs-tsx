import Image from 'next/image'


export const useImage = image => {
    const [ url, alt, posterOrBackdrop ] = image

    let width, height, scale = 1.5

    if(posterOrBackdrop === "backdrop"){
        // Landscape/backdrop
        width = 256 * scale
        height = 144 * scale
    }

    else if(posterOrBackdrop === "poster"){
        // Portrait/poster
        width = 128 * scale
        height = 192 * scale
    }

    return <Image 
        src={url} 
        alt={alt}
        width={width}
        height={height}
    />
}