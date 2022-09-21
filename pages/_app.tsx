import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import '../styles/styles.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Wordle Helper</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
