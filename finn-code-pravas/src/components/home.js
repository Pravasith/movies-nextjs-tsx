import styles from '../assets/sass/home.module.scss'
import utilStyles from '../assets/sass/libs/utils.module.scss'



const Home = (props) => {
   
    return (
        <>
            <div className={ `${styles.container}` }>
                <div className={ `${styles.homeWrap} ${utilStyles.flexCol_NW}` }>
                    <h1>Hello Finn!</h1>
                    <h2>I am Pravas, nice to meet you, coding coding la la la..</h2>
                </div>
            </div>
        </>
    )
}


export default Home