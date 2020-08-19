import React from 'react';
//import { BulletList } from 'react-content-loader'
import ContentLoader from "react-content-loader"
//const Loader = () => <div className="loader" >  <BulletList /> </div>;
const Loader = () => (
    <ContentLoader
        height={240}
        speed={1}
        backgroundColor={'#fa6f35d6'}
        foregroundColor={'#f8b819fa'}
        viewBox="0 0 380 70"
    >
        {/* Only SVG shapes */}
        <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
    </ContentLoader>
)
export default Loader;