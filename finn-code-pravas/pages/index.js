import Home from '../src/components/home'



function Index(props) {

	return (
		<div className="container">
			<main>
				<Home
					{ ...props }
				/>
			</main>
		</div>
	)
}



export default Index