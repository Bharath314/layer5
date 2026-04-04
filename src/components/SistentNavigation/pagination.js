import React, { useEffect, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";

import Button from "../../reusecore/Button";
import PaginationWrapper from "./pagination.style";

const STABLE_ROUTES = [
  // Getting Started
  { link: "/projects/sistent/getting-started/about", text: "About" },
  { link: "/projects/sistent/getting-started/installation", text: "Installation" },
  { link: "/projects/sistent/getting-started/usage", text: "Usage" },
  { link: "/projects/sistent/getting-started/tokens", text: "Tokens" },

  // Identity
  { link: "/projects/sistent/identity/color", text: "Colors" },
  { link: "/projects/sistent/identity/color/guidance", text: "Colors" },
  { link: "/projects/sistent/identity/color/code", text: "Colors" },
  { link: "/projects/sistent/identity/spacing", text: "Spacing" },
  { link: "/projects/sistent/identity/spacing/guidance", text: "Spacing" },
  { link: "/projects/sistent/identity/spacing/code", text: "Spacing" },
  { link: "/projects/sistent/identity/typography", text: "Typography" },
  { link: "/projects/sistent/identity/typography/guidance", text: "Typography" },
  { link: "/projects/sistent/identity/typography/code", text: "Typography" },
];

const PAGE_TYPE_ORDER = {
  overview: 1,
  guidance: 2,
  code: 3,
};

const SistentPagination = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const data = useStaticQuery(graphql`
    query SistentPaginationNav {
      allMdx(
        filter: {
          fields: { collection: { eq: "sistent" } }
        }
      ) {
        nodes {
          frontmatter {
            name
            component
            published
          }
          fields {
            slug
            pageType
          }
        }
      }
    }
  `);

  // Compile set of published components based on overview pages
  const publishedComponents = new Set();
  data.allMdx.nodes.forEach((node) => {
    if (node.fields.pageType === "overview" && node.frontmatter.published === true) {
      publishedComponents.add(node.frontmatter.component);
    }
  });

  // Map, filter out drafts, and group by tab order: overview -> guidance -> code
  const dynamicRoutes = data.allMdx.nodes
    .map((node) => ({
      componentSlug: node.frontmatter.component,
      name: node.frontmatter.name || node.frontmatter.component,
      link: node.fields.slug,
      pageType: node.fields.pageType,
    }))
    .filter((node) => publishedComponents.has(node.componentSlug))
    .sort((a, b) => {
      if (a.componentSlug !== b.componentSlug) {
        return (a.componentSlug || "").localeCompare(b.componentSlug || "");
      }
      return (
        (PAGE_TYPE_ORDER[a.pageType] || 99) - (PAGE_TYPE_ORDER[b.pageType] || 99)
      );
    });

  const fullContentArray = [...STABLE_ROUTES, ...dynamicRoutes];

  useEffect(() => {
    const path = window.location.pathname;
    // Handle trajectory slashes
    const cleanPath = path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
    const index = fullContentArray.findIndex((x) => x.link === cleanPath);
    setCurrentPage(index);
  }, [fullContentArray]);

  return (
    <PaginationWrapper>
      {currentPage > 0 ? (
        <Button $secondary $url={fullContentArray[currentPage - 1]?.link}>
          &larr; Previous
        </Button>
      ) : <div />}

      {currentPage !== -1 && currentPage < fullContentArray.length - 1 ? (
        <Button $primary $url={fullContentArray[currentPage + 1]?.link}>
          Next &rarr;
        </Button>
      ) : <div />}
    </PaginationWrapper>
  );
};

export default SistentPagination;
