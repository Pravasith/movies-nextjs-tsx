import { AppProps } from 'next/app'

import '../src/assets/sass/libs/global.scss'
import Layout from '../src/components/layout/index'


const App = ({ Component, pageProps, router }: AppProps) => {
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