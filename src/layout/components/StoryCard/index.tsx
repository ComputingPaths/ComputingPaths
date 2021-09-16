import React from 'react';

import './style.scss';

interface StoryCardProps {
    leftToRight?: boolean;
    photoURL?: string;
    headingText?: string;
    quoteText?: string;
    authorName: string;
    authorDescriptor?: string;
    linkText?: string;
    linkURL?: string;
}

const StoryCard: React.FC<StoryCardProps> = (props) => {
  const {
    leftToRight = true,
    photoURL,
    headingText,
    quoteText,
    authorName,
    authorDescriptor,
    linkText,
    linkURL,
  } = props;

  return (
    <div className="story-card">
      {leftToRight && photoURL && <img className="story-card-photo left" src={photoURL} alt={`${authorName || 'Story Card'}`} />}
      <div>
        {headingText && <p className="story-card-heading">{headingText}</p>}
        {quoteText && <p className="story-card-quote">{quoteText}</p>}
        {authorName && <p className="story-card-name">{authorName}</p>}
        {authorDescriptor && <p className="story-card-descriptor">{authorDescriptor}</p>}
        {linkText && linkURL && <a className="story-card-link" href={linkURL}>{linkText}</a>}
      </div>
      {!leftToRight && photoURL && <img className="story-card-photo right" src={photoURL} alt={`${authorName || 'Story Card'}`} />}
    </div>
  );
};

export default StoryCard;
