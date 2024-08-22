// File: StoryPage/index.tsx
// This component renders a page that displays a collection of stories from students at UCSD. Each
// story is presented with a quote, author details, and a link to read the full story. The stories
// are displayed using the StoryCard component in an alternating left-to-right layout.

import React, { useEffect, useState } from 'react';

import StoryCard from '../StoryCard';

import { DataTypes, useData, Stories } from '../../../utils/data';

import './style.scss';

// StoryPage component renders a list of student stories, using alternating layouts for
// each story. The stories are displayed using StoryCard components,
// with data fetched from the backend.
const StoryPage: React.FC = () => {
  // State for storing the array of stories
  const [data, setData] = useState<Array<Stories>>([]);

  // Fetch stories data on component mount
  useEffect(() => {
    useData(DataTypes.Stories)
      .then((newData) => setData(newData))
      .catch(() => setData([]));
  }, [useData]);

  return (
    <div className="story-page">
      <h1 className="story-page-title">Stories</h1>
      <p className="story-page-text">Every path through UCSD is unique, and there’s no right or wrong path. Some students have explored many different routes on their way to finding the right fit for them. These are their stories and advice.</p>
      <div className="story-page-stories">
        {/* Map through the data array and render a StoryCard for each story */}
        {data.map((story, index) => (
          <StoryCard
            key={index}
            leftToRight={index % 2 === 0}
            photoURL={story.image}
            headingText={story.highlighted_quote ? `"${story.highlighted_quote}"` : undefined}
            quoteText={story.quote}
            authorName={story.name}
            authorDescriptor={`${story.role ? `${story.role}` : ''}${story.role && story.class ? ' | ' : ''}${story.class ? `Class of ${story.class}` : ''}`}
            linkText={`Hear ${story.name}'s story`}
            linkURL={story.link}
          />
        ))}
      </div>
    </div>
  );
};

export default StoryPage;
