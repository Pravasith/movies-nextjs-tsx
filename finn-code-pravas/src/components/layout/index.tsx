import { ReactNode, FunctionComponent, FC } from "react"


import styles from '../../assets/sass/layout/layout.module.scss'
import Navbar from '../navbar'



type Props = {
    children: ReactNode
}


const Layout:FC<Props> = ( props: Props ) => {

    const { children } = props



    const PageContent: FunctionComponent = () => {

        return (
            <>
                <div className={styles.background}></div>

                <div className={styles.container}>
                    <div className={styles.mainContainer}>
                        <Navbar/>
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
            <PageContent/>
        </>
    )
}

export default Layout