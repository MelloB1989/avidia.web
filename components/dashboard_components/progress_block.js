import Head from 'next/head'
export default function navbar(){
    return(
        <>
        <Head>
    <title>Lora | Noobs Learning</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    </Head>
<div className="col-md-10 mx-3 my-3">
  <div className="row ">
    <div className="col-xl-3 col-lg-6">
      <div className="card l-bg-cherry">
        <div className="card-statistic-3 p-4">
          <div className="card-icon card-icon-large">
            <i className="fas fa-shopping-cart" />
          </div>
          <div className="mb-4">
            <h5 className="card-title mb-0">Hours spent coding</h5>
          </div>
          <div className="row align-items-center mb-2 d-flex">
            <div className="col-8">
              <h2 className="d-flex align-items-center mb-0">3,243</h2>
            </div>
            <div className="col-4 text-right">
              <span>
                12.5% <i className="fa fa-arrow-up" />
              </span>
            </div>
          </div>
          <div className="progress mt-1 " data-height={8} style={{ height: 8 }}>
            <div
              className="progress-bar l-bg-cyan"
              role="progressbar"
              data-width="25%"
              aria-valuenow={25}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{ width: "25%" }}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="col-xl-3 col-lg-6">
      <div className="card l-bg-blue-dark">
        <div className="card-statistic-3 p-4">
          <div className="card-icon card-icon-large">
            <i className="fas fa-users" />
          </div>
          <div className="mb-4">
            <h5 className="card-title mb-0">Quizzes solved</h5>
          </div>
          <div className="row align-items-center mb-2 d-flex">
            <div className="col-8">
              <h2 className="d-flex align-items-center mb-0">15.07k</h2>
            </div>
            <div className="col-4 text-right">
              <span>
                9.23% <i className="fa fa-arrow-up" />
              </span>
            </div>
          </div>
          <div className="progress mt-1 " data-height={8} style={{ height: 8 }}>
            <div
              className="progress-bar l-bg-green"
              role="progressbar"
              data-width="25%"
              aria-valuenow={25}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{ width: "25%" }}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="col-xl-3 col-lg-6">
      <div className="card l-bg-green-dark">
        <div className="card-statistic-3 p-4">
          <div className="card-icon card-icon-large">
            <i className="fas fa-ticket-alt" />
          </div>
          <div className="mb-4">
            <h5 className="card-title mb-0">Challenges solved</h5>
          </div>
          <div className="row align-items-center mb-2 d-flex">
            <div className="col-8">
              <h2 className="d-flex align-items-center mb-0">578</h2>
            </div>
            <div className="col-4 text-right">
              <span>
                10% <i className="fa fa-arrow-up" />
              </span>
            </div>
          </div>
          <div className="progress mt-1 " data-height={8} style={{ height: 8 }}>
            <div
              className="progress-bar l-bg-orange"
              role="progressbar"
              data-width="25%"
              aria-valuenow={25}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{ width: "25%" }}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="col-xl-3 col-lg-6">
      <div className="card l-bg-orange-dark">
        <div className="card-statistic-3 p-4">
          <div className="card-icon card-icon-large">
            <i className="fas fa-dollar-sign" />
          </div>
          <div className="mb-4">
            <h5 className="card-title mb-0">Courses completed</h5>
          </div>
          <div className="row align-items-center mb-2 d-flex">
            <div className="col-8">
              <h2 className="d-flex align-items-center mb-0">$11.61k</h2>
            </div>
            <div className="col-4 text-right">
              <span>
                2.5% <i className="fa fa-arrow-up" />
              </span>
            </div>
          </div>
          <div className="progress mt-1 " data-height={8} style={{ height: 8 }}>
            <div
              className="progress-bar l-bg-cyan"
              role="progressbar"
              data-width="25%"
              aria-valuenow={25}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{ width: "25%" }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
</>
        )
}