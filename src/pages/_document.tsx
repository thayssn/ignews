
import NextDocment, {Html, Head, Main, NextScript} from 'next/document'
export default class Document extends NextDocment {
    render() {
        return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700;800&display=swap" rel="stylesheet"/>

                <link rel="shortcut icon" href="favicon.png" type="image/png"/>
            </Head>
            <body>
                <Main/>
                <NextScript></NextScript>
            </body>
        </Html>
        )
    }
}