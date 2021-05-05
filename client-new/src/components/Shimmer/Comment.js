import React from 'react';
import ContentLoader from 'react-content-loader'

const CommentShimmer = () => {
  return (
    <div className="shimmerBackground">
      <ContentLoader 
        speed={2}
        width={800}
        height={340}
        viewBox="0 0 800 340"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="7" y="0" rx="0" ry="0" width="72" height="64" /> 
        <rect x="88" y="0" rx="0" ry="0" width="193" height="30" /> 
        <rect x="88" y="36" rx="0" ry="0" width="431" height="28" /> 
        <rect x="8" y="86" rx="0" ry="0" width="72" height="64" /> 
        <rect x="87" y="87" rx="0" ry="0" width="193" height="30" /> 
        <rect x="87" y="124" rx="0" ry="0" width="431" height="28" /> 
        <rect x="87" y="166" rx="0" ry="0" width="72" height="64" /> 
        <rect x="166" y="166" rx="0" ry="0" width="193" height="30" /> 
        <rect x="166" y="202" rx="0" ry="0" width="431" height="28" /> 
        <rect x="88" y="244" rx="0" ry="0" width="72" height="64" /> 
        <rect x="167" y="244" rx="0" ry="0" width="193" height="30" /> 
        <rect x="167" y="281" rx="0" ry="0" width="431" height="28" />
      </ContentLoader>
    </div>
  )
}

export default CommentShimmer;