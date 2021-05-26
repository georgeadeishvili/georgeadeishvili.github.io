import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider, DefaultTheme, createGlobalStyle } from 'styled-components'
import App from './App'
import reportWebVitals from './reportWebVitals'

const theme: DefaultTheme = {
	borderRadius: '8px',
	colors: {
		primary: '#000',
		secondary: '#fff',
		background: '#292929'
	}
}

const GlobalStyles = createGlobalStyle`
	*, *::after, *::before {
		margin: 0;
		padding: 0;
		box-sizing: inherit;
	}
	html {
		font-size: 62.5%;
	}
	body {
		box-sizing: border-box;
		font-family: Poppins, sans-serif;
		font-weight: 400;
		line-height: 1.7;
		color: ${({ theme }) => theme.colors.primary};
		background-color: ${({ theme }) => theme.colors.background};
	}
`

ReactDOM.render(
	<React.StrictMode>
		<Suspense fallback={<div />}>
			<ThemeProvider theme={theme}>
				<App />
				<GlobalStyles />
			</ThemeProvider>
		</Suspense>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
