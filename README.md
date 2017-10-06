# Computing Paths Website Guide

## Table of Contents
1. [Introduction](README.md/#introduction)
2. [Prerequisites](README.md/#prerequisites)
3. [Publish Changes to Live Website](README.md/#publish-changes-to-live-website)
4. [content.json](README.md/#contentjson)
5. [Add a Project](README.md/#add-a-project)
6. [Add a Resource](README.md/#add-a-resource)
7. [Edit Majors Page](README.md/#edit-majors-page)


## Introduction
Whether you want to add new projects, resources, or edit the Majors page to the Computing Paths website, all these changes can be made in a single file titled *content.json*. But before introducing how these changes are made, the procedure to publish changes to the live website will be introduced.


## Prerequisites
Node Package Manager (npm) must be installed in order to run the command which publishes changes to the live website. npm can be downloaded and installed from this webpage: https://nodejs.org/en/.


## Publish Changes to Live Website
Before attempting to publish changes to the live website, ensure the ComputingPaths GitHub repo is up-to-date with all changes you have made by adding and committing your changes. This can be accomplished by running the commands:
```
git add content.json
git commit -m "[brief message explaining what changes were made]"
```
Finally, to publish these changes to the live website, run the command:
```
npm run publish
```


## content.json
All changes to text content are made within the file *content.json*, located in the root directory of the project. *content.json* contains data structured in the JSON format, essentially composed of key-value pairs which may also be nested. A given key identifies the data, and the value is the data itself.


Keys and values are written with double quotations, and separated by a colon. For example, to add the name of a project where the key is name and the value is Computational Art, this would be written as:
```
“name”: “Computational Art”
```

If the value in a key value pair is a list of values, then the value is surrounded by square brackets, and commas separate elements of the list. For example, to add the list of image files for a project, where the key is images and the values are 1.jpg, 2.jpg, and 3.jpg, this would be written as:
```
“images”: [ “1.jpg”, “2.jpg”, “3.jpg” ]
```


## Add a Project
Projects can be added inside the *content.json* file. Search for the key “projects” within *content.json* (using ctrl+F is helpful).

To add a new project, add key-value pairs for all project data. These are: name, intro, description, members, images, videos, link, and tags.

-	name: The title of the project that will be displayed on the website
-	intro: A brief summary, or hook, that encapsulates the project
-	description: A longer, complete summary of the project
-	members: A list of team members that participated in the project
-	images: A list of the names of image files for the project
  -	The file names are written as *img/projectImages/[name]/1.jpg*, *img/projectImages/[name]/2.jpg*, …
-	videos: A list of YouTube links for the videos of the project
-	link: A link to the project page
-	tags: An abbreviation used by the site to create colorful tags that allow students to quickly identify the project type
  -	Web Application = wa, Arduino = ar, Datamining = da, Mobile App = ma, Research = re, Game = ga


## Add a Resource
Adding a resource is identical in procedure to adding a new project, except that the key-value pairs are different of course. First, find the key “resources” in *content.json*.

Next, add key-value pairs for all resources data, which are: name, description, mapImage, mapLink, link, and tags.

-	name: name of resource (e.g. the name of a building)
-	description: summary of the resources purpose and use
-	mapImage: the file name of a screenshot of this resource on the maps.ucsd.edu website
  -	The file name should be written as “img/[custom image title].jpg”
-	link: A link to the maps.ucsd.edu website centered on this resource
  -	This can be accomplished by searching for the resource on the maps.ucsd.edu website, clicking on that resource (a pop-up over the resource should appear), then clicking Share, which allows copying a link to this location
-	tags: Abbreviation that allows colorful tags to appear which quickly show students what type of resource this is
  -	Academic Support = ac, Buildings = bs, Workspaces = ws, Equipment = eq, Event = ev, Showcases = sc


## Edit Majors Page
To edit content on the majors page, first navigate to the majors section within *content.json*, which is accomplished identically to the projects and resources section.

Once you have found the majors section, find the key-value pair you wish to edit, and then information can then be directly changed. The key-value pairs contained for each major are: name, cap, degree, departments, hook, websites, image, short.

-	name: The title of the major
-	cap: true, if the major is capped, and false if not (**NOTE**: this value is not surrounded in quotations, as shown in the above picture)
-	degree: bs for bachelors of science, ba for bachelors of science, etc.
-	hook: A brief, and engaging description of this major
-	websites: The link to the official major page
-	image: The file name of the image displayed for this major
  -	The file name is written as */img/[your custom file name].jpg*
-	short: an abbreviation of the major name (e.g. bio for biology)

There are two additional sections within *content.json* for majors content: major descriptions, and specializations within a major.

To edit major descriptions, find the key titled “majorDescriptions”.

This will contain a list of key-value pairs, where the key is the abbreviation for a major given by the “short” value above. The description can be edited directly here.

To edit major specializations, find the key titled “majorExpand” (just below “majorDescriptions”).

As with the major descriptions, each major is identified by its abbreviation. Within each major, there are keys titled name and detail. Name is the title of the major specialization, and detail is a short description of that specialization.
