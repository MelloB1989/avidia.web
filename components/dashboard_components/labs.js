import { useRouter } from 'next/router';
export default function labs({ is_pro, pro_type }){
    const router = useRouter();
    function createCookie(name, value, daysToExpire) {
  let cookie = name + '=' + encodeURIComponent(value);

  if (daysToExpire) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);
    cookie += '; expires=' + expirationDate.toUTCString();
  }

  document.cookie = cookie;
}
if(is_pro === "1") createCookie('pp', '1', 7); // Set a cookie named 'username' with value 'John Doe' that expires in 7 days.

    return(
        <>
        {is_pro === "1" ? (
            <div className="text-center">
            <p>You are a pro member and are eligible for early access to Avidia!</p>
            <button type="button" class="btn btn-success my-3" onClick={(e) => {
              e.preventDefault();
              router.push('/lab');
            }}>Click here to access the lab now!!</button>
            </div>
            ) : 
            (
            <div className="text-center">
            <p>You are not a pro member of Noobs Spaces, please buy a <a href="https://spaces.noobsverse.com/go-pro">subscription</a> or talk to the <a href="https://instagram.com/mellob.ai">developers!</a></p>
            </div>
            )
        }
        </>
        );
}