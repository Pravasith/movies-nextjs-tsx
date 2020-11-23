import '../src/assets/sass/libs/global.scss'
import Layout from '../src/components/layout/index'


const App = ({ Component, pageProps, router }) => {
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