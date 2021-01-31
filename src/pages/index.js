import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import Kv from "../components/kv"
import { Container, Row, Col } from "react-bootstrap"
import BlogItem from "../components/blogItem"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost (
        sort:{
          fields: createdDate,
          order: ASC
        }
      ) {
        edges {
          node {
            title
            slug
            createdDate(formatString: "YYYY/MM/DD")
            thumbnail {
              fluid {
                src
              }
            }
          }
        }
      }
    }
  `);
  console.log('data', data.allContentfulBlogPost.edges);

  return (
    <Layout>
      <Kv />
      <Container>
        <Row>
          {data.allContentfulBlogPost.edges.map((edge, index) => {
            return (
              <Col key={index} sm="4">
                <BlogItem
                  title={edge.node.title}
                  date={edge.node.createdDate}
                  src={edge.node.thumbnail.fluid.src}
                  link={`/blog/${edge.node.slug}`}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </Layout>
  )
}

export default IndexPage
