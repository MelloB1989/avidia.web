import { TypeAnimation } from 'react-type-animation';

export default function Preloader(){
    return(
        <>
        <div className="preloader" id="preloadsd">
            <div className="iconpreloader">
                {/* You can use an SVG or an image here */}
                <img src="https://avidia.in/assets/images/logo.png" alt="Avidia" />
            </div>
            <div className="loading-bar">
                <div className="loading-progress"></div>
            </div>
            <br/>
            <br/>
            <div className="preloadertext">
            <TypeAnimation
  sequence={[
    // Same substring at the start will only be typed once, initially
    'Avidia, a hub to learn',
    1000,
    'Avidia, a realm to understand',
    1000,
    'Avidia, a forge to implement',
    1000,
  ]}
  speed={90}
  style={{ fontSize: '2em', color: 'black' }}
  repeat={Infinity}
/>
</div>
        </div>
        </>
        )
}