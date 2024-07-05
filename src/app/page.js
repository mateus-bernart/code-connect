import { CardPost } from "@/components/CardPost";
import logger from "@/logger";
import styles from './page.module.css'
import Link from "next/link";

async function getAllPosts (page) {
  try {
    const response = await fetch(`http://localhost:3042/posts?_page=${page}&_per_page=6`);
    if (!response.ok) throw new Error('Falha na rede');
    return response.json();
  } catch (error) {
    logger.error('Ops, algo correu mal: ' + error.message);
    return [];
  }
}

export default async function Home({ searchParams }) {
  const currentPage = searchParams?.page || 1
  const {data: posts, prev, next } = await getAllPosts(currentPage);
  return (
    <main className={styles.grid}>
      {posts.map(post => <CardPost key = {post.id} post={post}/>)}
      {/* Link is a next helper that does not refresh the page */}
      {prev && <Link className={styles.link} href={`/?page=${prev}`}>Pagina anterior</Link>}
      {next && <Link className={styles.link} href={`/?page=${next}`}>Proxima Pagina</Link>}
    </main>
  );
}