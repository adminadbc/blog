import { AppProps } from 'next/app';
import '../styles/index.css';
// import {  fetchVideos } from "../components/updateAlgolia"

export default function MyApp({ Component, pageProps }: AppProps) {
	// fetchVideos()
	return (<Component {...pageProps} />);
}
