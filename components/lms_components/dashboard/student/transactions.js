import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import querygen from '@querygen';
import Skeleton from 'react-loading-skeleton';

export default function Transactions({user_id}){
  
    const [transactions, setTransactions] = useState();

    const { loading, error, data } = useQuery(querygen("getUserTransactions", user_id),{
    onCompleted: (data) => {
        const trnxs = data.getUser.transactions;
        console.log(trnxs);
        trnxs.map((trnx) => {
            const {data: trnx_data} = useQuery(querygen("getTransactionDetails", trnx),{
            onCompleted: (trnx_data) => {
                console.log(trnx_data);
            }})
        })
    }});


    useEffect(()=>{
      if(data){
        setTransactions(data.getUser.transactions);
      }
    }
    ,[data]);

    return(
        <>
        {loading? (<Skeleton height={300}/>) : (<div className="col-lg-9">

      <div className="tab-content">
        <div
          className="tab-pane fade active show"
          id="home-4"
          role="tabpanel"
          aria-labelledby="home-tab-4"
        >
          <div className="row g-5">
           {!(transactions?.length === 0) ? transactions?.map((transaction) => {
            return (
            <div className="col-lg-4 col-md-6 col-12">
              <div className="rbt-card variation-01 rbt-hover">
                <div className="rbt-card-img">
                  <a href="#">
                    <img
                      src="https://noobsverse-internal.s3.ap-south-1.amazonaws.com/assets/t.png"
                      alt="Avidia Transactions"
                    />
                  </a>
                </div>
                <div className="rbt-card-body">
                  <h4 className="rbt-card-title">
                    <a href="#">{transaction}</a>
                  </h4>
                  <p></p>
                </div>
              </div>
            </div>
            )
        }) : <h1>No transactions yet.</h1>}
          </div>
        </div>
      </div>
      </div>
      )}
      </>
        )
}