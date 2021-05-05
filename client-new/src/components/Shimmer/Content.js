import React from 'react';
import ContentLoader from 'react-content-loader'

const ContentShimmer = () => {
  return (
    <div className="shimmerBackground">
        <ContentLoader 
          speed={2}
          viewBox="0 0 600 500"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="37" y="147" rx="0" ry="0" width="1" height="0" /> 
          <rect x="-1" y="1" rx="0" ry="0" width="606" height="41" /> 
          <rect x="0" y="54" rx="0" ry="0" width="606" height="41" /> 
          <rect x="-1" y="112" rx="0" ry="0" width="611" height="275" /> 
          <rect x="0" y="406" rx="0" ry="0" width="604" height="66" />
        </ContentLoader>
      </div>
  )
}

export default ContentShimmer;