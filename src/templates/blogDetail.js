import React from 'react';
import { graphql, qrahql } from 'gatsby';
import Layout from '../components/layout';
import { Button, Container } from 'react-bootstrap';

// gatsby-source-contentful v3
import { BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// gatsby-source-contentful v4
// import { renderRichText } from "gatsby-source-contentful/rich-text";

export const query = graphql`
  query ($slug: String!) {
    contentfulBlogPost (slug: {eq: $slug}) {
      title
      createdDate(formatString: "YYYY/MM/DD")
      body {
        json
      }
    }
  }
`;
function BlogDetail(props) {
  // const options = {
  //   renderNode: {
  //     "embedded-asset-block": (node) => {
  //       return (
  //         <img
  //           src={node.data.target.fields.file["en-US"].url}
  //         />
  //       )
  //     }
  //   }
  // }
  const options = {
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => (
            <img
              width="100%"
              src={node.data.target.fields.file["en-US"].url}
              alt={node.data.target.fields.title["en-US"]}
            />
        )
    },
  };

  return (
    <Layout>
      <Container style={{maxwidth: 640}} className="pt-4">
        <h1>{props.data.contentfulBlogPost.title}</h1>
        <p>{props.data.contentfulBlogPost.createdDate}</p>
        { documentToReactComponents(props.data.contentfulBlogPost.body.json, options) }
      </Container>
      <Container className="text-center">
        <Button href="/" variant="outline-info">一覧へ戻る</Button>
      </Container>
    </Layout>
  );
}

export default BlogDetail;
