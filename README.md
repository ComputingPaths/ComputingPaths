# Welcome to Computing Paths!
This repository hosts the source code and site content of the Computing Paths website. For details about how to edit site content and develop new features, please refer to the project [content guide](https://docs.google.com/document/d/1oJeoiLy2kp-hF9ntmxVzWUoYXXmplfEFkj459G5BRE0/edit).

## Development Process

To view the current site, visit [http://computingpaths.ucsd.edu/](http://computingpaths.ucsd.edu/).
For a preview of the latest stable development branch, visit [https://computingpaths-preview.netlify.app/](https://computingpaths-preview.netlify.app/).

All PRs that are made will also generate a netlify deployment preview, which can be used to share the status of your PR.

## Style and Conventions

Please make your branch names follow the format `yourname/whatyourworkingon`. For example, if I'm going to be updating the stories page, I'd make my branch called `ronak/update-stories-page`.

We require you to use **functional** components, and to define required props using an **interface**. [This guide](https://www.pluralsight.com/guides/use-interface-props-in-functional-components-using-typescript-with-react) can provide some more context.

### Fixing Bugs
If you're working on a PR and notice a related bug, feel free to fix that bug within the same current PR if it's too much of a hassle to separate it into a separate PR. We'd rather you fix a bug + complete a feature than only complete a feature + never fix the bug.

### CSS Class Names
Prefix all classnames with the component you're in. For example, if you are adding css classes for elements inside the Stories page, prefix all class names with `story-page`.

**Example**
```tsx
const StoryCard: React.FC<StoryCardProps> = ({photoURL, authorName, headingText}) => (
	<div className="story-card">
		<img className="story-card-photo left" src={photoURL} alt={`${authorName || 'Story Card'}`} />}
		<div>
			{<p className="story-card-heading">{headingText}</p>}
		</div>
)
```

You can then take advantage of Sass language features to make your `.scss` file look like this:

```scss
.story-card {
  display: flex;
  margin: 4rem 0;

  &-photo {
    flex-shrink: 0;
    height: 15.0625rem;
    width: 17.75rem;

    &.left {
      margin-right: 3rem;
    }

    &.right {
      margin-left: 3rem;
    }
  }

  &-heading {
    @include font-heading-3;
  }
}
```

