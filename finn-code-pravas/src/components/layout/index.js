

import React from "react"
import { useRouter } from "next/router" 
 
import Head from 'next/head'


import styles from '../../assets/sass/layout/layout.module.scss'

import Navbar from '../navbar'







const Layout = ( props ) => {


    const { children } = props

    const router = useRouter()
    const currentRoute = router.asPath


    const previewImage = `https://folio-pics.s3.eu-west-2.amazonaws.com/pravasith.png`,
            description = `Pravas - Full Stack Dev + Designer`,
            name = `Pravasith Kumar`,
            currentURL = `https://pravasdesign.com/`




    const returnPageContent = () => {

        return (
            <>
                <div className={styles.background}></div>

                <div className={styles.container}>
                    <div className={styles.mainContainer}>
                        <Navbar
                            style = {{
                                zIndex : 1
                            }}
                        />
                        <main className = "main">
                            {
                                children
                            }
                        </main>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>{description}</title>
                <link rel="icon" href="/favicon.ico" />


                {/* Twitter */}

                <meta name="twitter:card" content="summary" key="twcard" />
                <meta name="twitter:title" content={name} key="twtitle" />
                <meta
                    name="twitter:description"
                    content={description}
                    key="twdesc"
                />
                <meta name="twitter:creator" content="@Pravasith"  key="twcreator" />
                <meta
                    name="twitter:image"
                    content={previewImage}
                    key="twimg"
                />

                {/* Open Graph */}
                <meta property="og:url" content={currentURL} key="ogurl" />
                <meta property="og:image" content={previewImage} key="ogimage" />
                <meta property="og:site_name" content={name} key="ogsitename" />
                <meta property="og:title" content={name} key="ogtitle" />
                <meta property="og:description" content={description} key="ogdesc" />
            </Head>

            {
                returnPageContent(props)
            }
        </>
    )
}

export default Layout