import React from 'react';

import StoryCard from '../StoryCard';

import { useData } from '../../../utils/data';

import './style.scss';

const StoryPage: React.FC = () => {
  const data = useData('stories');

  return (
    <div className="story-page">
      <h1 className="story-page-title">Stories</h1>
      <p className="story-page-text">Every path through UCSD is unique, and there’s no right or wrong path. Some students have explored many different routes on their way to finding the right fit for them. These are their stories and advice.</p>
      <div className="story-page-stories">
        {data && data.map((story, index) => (
          <StoryCard
            key={index}
            leftToRight={index % 2 === 0}
            photoURL={story.Image}
            headingText="Example heading text, need to determine how to split this from quote."
            quoteText={story.Quote}
            authorName={story.Name}
            authorDescriptor={`Class of ${story.Class}`}
            linkText={`Hear ${story.Name}'s story`}
            linkURL={story.Link}
          />
        ))}
      </div>
    </div>
  );
};

export default StoryPage;
