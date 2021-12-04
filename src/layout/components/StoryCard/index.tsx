import React from 'react';

import LinkedArrow from '../../../assets/LinkedArrow.svg';

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

const StoryCard: React.FC<StoryCardProps> = ({
  leftToRight = true,
  photoURL,
  headingText,
  quoteText,
  authorName,
  authorDescriptor,
  linkText,
  linkURL,
}) => (
  <div className={`story-card ${leftToRight ? 'left' : 'right'}`}>
    {leftToRight && photoURL && <img className="story-card-photo left" src={photoURL} alt={`${authorName || 'Story Card'}`} />}
    <div>
      {headingText && <p className="story-card-heading">{headingText}</p>}
      {quoteText && <div className={`story-card-quote ${leftToRight ? 'left' : 'right'}`}><p className="story-card-quote-text">{quoteText}</p></div>}
      <div className="story-card-bottom">
        <p>
          {authorName && <span className="story-card-name">{authorName}</span>}
          <br />
          {authorDescriptor && <span className="story-card-descriptor">{authorDescriptor}</span>}
        </p>
        {linkText && linkURL && <a className="story-card-link" target="_blank" rel="noopener noreferrer" href={linkURL}>{linkText}<img className="story-card-link-arrow" src={LinkedArrow} alt="Link Arrow" /></a>}
      </div>
    </div>
    {!leftToRight && photoURL && <img className="story-card-photo right" src={photoURL} alt={`${authorName || 'Story Card'}`} />}
  </div>
);

export default StoryCard;
