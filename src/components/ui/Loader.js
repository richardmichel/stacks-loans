import React from 'react';
//import { BulletList } from 'react-content-loader'
import ContentLoader from "react-content-loader"
//const Loader = () => <div className="loader" >  <BulletList /> </div>;
const Loader = () => (
    <ContentLoader
        height={240}
        speed={1}
        backgroundColor={'rgba(83, 115, 115, 0.4)'}
        foregroundColor={'rgba(72, 135, 123, 0.9)'}
        viewBox="0 0 380 70"
    >
        {/* Only SVG shapes */}
        <rect x="0" y="0" rx="5" ry="5" width="100" height="70" />
    </ContentLoader>
)
export default Loader;