import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <div id="big-banner">
        <p id="ready">Get Ready!</p>
        <p id="set">... Get Set!</p>
        <p id="go">... ... Track Stuff!</p>
      </div>
      <Link className="i-am-a-button" href="/register">Register Now</Link>
      <Link className="i-am-a-button" href="/register">View All Items</Link>
    </div>
  );
}
