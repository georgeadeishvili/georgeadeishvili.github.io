import styled from 'styled-components/macro'

const StyledHeading = styled.h1`
	color: red;
`

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<StyledHeading>Giorgi Adeishvili</StyledHeading>
			</header>
		</div>
	)
}

export default App
