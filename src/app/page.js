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

export default async function Home() {
  const {data: posts, prev, next } = await getAllPosts(1);
  return (
    <main className={styles.grid}>
      {posts.map(post => <CardPost key = {post.id} post={post}/>)}
      {/* Link is a next helper that does not refresh the page */}
      {prev && <Link href={`/?page=${prev}`}>Pagina anterior</Link>}
      {next && <Link href={`/?page=${next}`}>Proxima Pagina</Link>}
    </main>
  );
}