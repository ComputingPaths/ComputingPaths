// File: StoryCard/index.tsx
// This component renders a card displaying a story, including an optional photo, heading,
// quote, author information, and a link to read more. The card layout can be adjusted to display
// the photo on the left or right.

import React from 'react';

import LinkedArrow from '../../../assets/LinkedArrow.svg';

import './style.scss';

// Interface for the props of StoryCard
interface StoryCardProps {
    leftToRight?: boolean; // Controls the layout direction, with photo on left or right
    photoURL?: string; // URL of the photo to display
    headingText?: string; // Heading text for the story
    quoteText?: string; // A quote to highlight from the story
    authorName: string; // Name of the story's author
    authorDescriptor?: string; // Additional descriptor for the author (e.g., title, affiliation)
    linkText?: string; // Text for the read more link
    linkURL?: string; // URL for the read more link
}

// StoryCard component renders a card with optional photo, heading, quote, and author details.
// It supports layout customization to show the photo on the left or right.
const StoryCard: React.FC<StoryCardProps> = ({
  leftToRight = true, // Default layout has the photo on the left
  photoURL,
  headingText,
  quoteText,
  authorName,
  authorDescriptor,
  linkText,
  linkURL,
}) => (
  <div className={`story-card ${leftToRight ? 'left' : 'right'}`}>
    {/* Conditionally render the photo on the left if leftToRight is true */}
    {leftToRight && photoURL && <img className="story-card-photo left" src={photoURL} alt={`${authorName || 'Story Card'}`} />}
    <div>
      {/* Render the heading text if provided */}
      {headingText && <p className="story-card-heading">{headingText}</p>}
      {/* Render the quote text if provided, with conditional alignment */}
      {quoteText && <div className={`story-card-quote ${leftToRight ? 'left' : 'right'}`}><p className="story-card-quote-text">{quoteText}</p></div>}
      <div className="story-card-bottom">
        {/* Render the author's name and descriptor */}
        <p>
          {authorName && <span className="story-card-name">{authorName}</span>}
          <br />
          {authorDescriptor && <span className="story-card-descriptor">{authorDescriptor}</span>}
        </p>
        {/* Render the read more link if both linkText and linkURL are provided */}
        {linkText && linkURL && <a className="story-card-link" target="_blank" rel="noopener noreferrer" href={linkURL}>{linkText}<img className="story-card-link-arrow" src={LinkedArrow} alt="Link Arrow" /></a>}
      </div>
    </div>
    {!leftToRight && photoURL && <img className="story-card-photo right" src={photoURL} alt={`${authorName || 'Story Card'}`} />}
  </div>
);

export default StoryCard;
