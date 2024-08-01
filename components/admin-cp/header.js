import Head from "next/head";

export default function Header() {
  return (
    <>
      <Head>
        <title>Admin CP || Avidia</title>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
          crossorigin="anonymous"
        ></script>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://au-spot.s3.ap-south-1.amazonaws.com/assets/scroll-bar.css"
        />
        {/* Favicon */}
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="https://avidia.in/assets/images/logo.png"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <header className="rbt-header rbt-header-1">
        <div className="rbt-sticky-placeholder" />
        <div className="rbt-header-wrapper header-space-betwween header-sticky">
          <div className="container-fluid">
            <div className="mainbar-row rbt-navigation-center align-items-center">
              <div className="header-left rbt-header-content">
                <div className="header-info">
                  <div className="logo">{/* Logo Here  */}</div>
                </div>
              </div>
              <div className="rbt-main-navigation d-none d-xl-block">
                <nav className="mainmenu-nav">
                  {/* Start Navigation Here  */}
                  <ul className="mainmenu">...</ul>
                  {/* End Navigation Here  */}
                </nav>
              </div>
              <div className="header-right">
                <ul className="quick-access">
                  {/* Start Navbar Icons */}
                  ...
                  {/* End Navbar Icons */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
