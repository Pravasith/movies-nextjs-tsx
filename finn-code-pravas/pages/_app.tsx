import { AppProps } from 'next/app'
import { FC } from 'react'

import '../src/assets/sass/libs/global.scss'
import Layout from '../src/components/layout/index'


const App:FC<AppProps> = ({ Component, pageProps, router }: AppProps) => {
    return (
        <>
            <Layout>
                <Component
                    {...pageProps} 
                    key={router.route}
                />
            </Layout>
        </>
    )
}


export default App