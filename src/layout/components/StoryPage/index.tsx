import React from 'react';

import { DataTypes, useData } from '../../../utils/data';

import './style.scss';

const StoryPage: React.FC = () => {
  const data = useData(DataTypes.Stories);

  return (
    <div className="story-page">
      Story
      {(data && data.length) ? data.map((story) => <h1>{story.Name}</h1>) : null}
    </div>
  );
};

export default StoryPage;
