import matter from "gray-matter";

export const posts = () =>
  ((context) => {
    const keys = context.keys();
    const documents = keys.map(context);

    return keys
      .map((key, index) => {
        // const slug = key.replace(/^.*[\\\/]/, "").slice(0, -3);
        const slug = key.replace(/^.\//, "").slice(0, -3);
        console.log('************************** Slug', slug);
        const document = documents[index];
        const { data: frontmatter, content: body } = matter(document.default);

        return { frontmatter, body, slug };
      })
      .sort(
        (post1, post2) =>
          new Date(post2.frontmatter.date) - new Date(post1.frontmatter.date)
      );
  })(require.context("./", true, /\.md$/));

export const postSlugs = () =>
  ((context) => {
    console.log('************************** Keys', context.keys());
    let slugs = context
      .keys()
      // .map((key) => key.replace(/^.*[\\\/]/, "").slice(0, -3));
      .map((key) => key.replace(/^.\//, "").slice(0, -3));

    console.log('************************** Slugs', slugs);
    return slugs;
  })(require.context("./", true, /\.md$/));

export const postForSlug = async (slug) => {
  console.log('************************** postForSlug', slug);
  const document = await import(`./${slug}.md`);
  const { data: frontmatter, content: body } = matter(document.default);

  return { frontmatter, body, slug };
};
