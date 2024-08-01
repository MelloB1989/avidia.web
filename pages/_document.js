import Document, { Html, Head, Main, NextScript } from 'next/document';
const ASSETS_CDN_URL = "https://cdn.global.noobsverse.com/avidia.lms/";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Philosopher:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900" rel="stylesheet" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@500&family=Teko&display=swap" rel="stylesheet" />
           {/* CSS============================================ */}
  <link rel="stylesheet" href={`${ASSETS_CDN_URL}assets/css/vendor/bootstrap.min.css`} />
  <link rel="stylesheet" href={`${ASSETS_CDN_URL}assets/css/vendor/slick.css`} />
  <link rel="stylesheet" href={`${ASSETS_CDN_URL}assets/css/vendor/slick-theme.css`} />
  <link rel="stylesheet" href={`${ASSETS_CDN_URL}assets/css/plugins/sal.css`} />
  <link rel="stylesheet" href={`${ASSETS_CDN_URL}assets/css/plugins/feather.css`} />
  <link rel="stylesheet" href={`${ASSETS_CDN_URL}assets/css/plugins/fontawesome.min.css`} />
  <link rel="stylesheet" href={`${ASSETS_CDN_URL}assets/css/plugins/euclid-circulara.css`} />
  <link rel="stylesheet" href={`${ASSETS_CDN_URL}assets/css/plugins/swiper.css`} />
  <link rel="stylesheet" href={`${ASSETS_CDN_URL}assets/css/plugins/magnify.css`} />
  <link rel="stylesheet" href={`${ASSETS_CDN_URL}assets/css/plugins/odometer.css`} />
  <link rel="stylesheet" href={`${ASSETS_CDN_URL}assets/css/plugins/animation.css`} />
  <link rel="stylesheet" href={`${ASSETS_CDN_URL}assets/css/plugins/bootstrap-select.min.css`} />
  <link rel="stylesheet" href={`${ASSETS_CDN_URL}assets/css/plugins/jquery-ui.css`} />
  <link rel="stylesheet" href={`${ASSETS_CDN_URL}assets/css/plugins/magnigy-popup.min.css`} />
  <link rel="stylesheet" href={`${ASSETS_CDN_URL}assets/css/plugins/plyr.css`} />
  <link rel="stylesheet" href={`${ASSETS_CDN_URL}assets/css/style_new.css`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;