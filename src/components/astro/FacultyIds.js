/* Component for making project searches faster and easier. Returns dictionary/hash of projects by their IDs */
import { getCollection } from 'astro:content';
import { collections } from '../../content/config';

const base = import.meta.env.BASE_URL == '/' ? '' : import.meta.env.BASE_URL;

// Fetch the projects and build the tech counts
const instructors = await getCollection('instructors');
const projects = await getCollection('projects');
let facultyIds = {};

// Build tech counts from the projects
instructors.forEach(instructor => {
  // Add the computed slug here
  instructor.data.slug = `${base}/instructors/${instructor.data.id}`;
  facultyIds[instructor.data.id] = {
      ...instructor,
      relatedProjects: []
    };
});

// link projects to instructors
projects.forEach(project => {
  (project.data.instructors || []).forEach(facultyKey => {
    const key = String(facultyKey).toLowerCase();
    if (facultyIds[key]) {
      facultyIds[key].relatedProjects.push({
        id: project.data.id,
        title: project.data.shortTitle || project.data.title,
        semester: project.data.semester,
        year: project.data.year
      });
    } else {
      // If the faculty isn’t in instructors collection, create a stub entry
      facultyIds[key] = {
        id: facultyKey,
        data: {
          id: facultyKey,
          name: facultyKey.replace(/-/g, ' '),
          slug: `${base}/instructors/${facultyKey}`
        },
        relatedProjects: [{
          id: project.data.id,
          title: project.data.shortTitle || project.data.title,
          semester: project.data.semester,
          year: project.data.year
        }]
      };
    }
  });
});

export default facultyIds;