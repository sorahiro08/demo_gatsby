/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');

// exports.onCreateNode = ({ node, actions }) => {
//   const { createNode, createNodeField } = actions;
//   if (node.internal.type === 'MarkdownRemark') {
//     // console.log(node);
//     const slug = path.basename(node.fileAbsolutePath, '.md');
//     // console.log(slug);

//     createNodeField({
//       node,
//       name: 'slug',
//       value: slug,
//     });
//   }
// }

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogTemplate = path.resolve('./src/templates/blogDetail.js');
  const res = await graphql(`
    query {
      allContentfulBlogPost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  // console.log(blogTemplate);
  // console.log(res.data.allContentfulBlogPost.edges);

  res.data.allContentfulBlogPost.edges.forEach((edge) => {
    createPage({
      component: blogTemplate,
      path: `/blog/${edge.node.slug}`,
      context: {
        slug: edge.node.slug
      },
    });
  });
}
