import { dx } from '@/lib/dx'

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className={dx('fluid-heading-04', 'mb-4')}>
        Welcome to the Dashboard
      </h1>
      <p className={dx('fluid-paragraph-01', 'mb-4')}>
        This platform is currently under active development, which means
        you&apos;re getting a behind-the-scenes look at a product that&apos;s
        growing and evolving in real time.
      </p>
      <p className={dx('body-02', 'mb-4')}>
        You might notice some sections are still being built out, features are
        gradually being rolled in, and occasional quirks may pop up as we work
        to bring the full vision to life.
      </p>
      <p className={dx('body-02', 'mb-4')}>
        Our team is hard at work shaping a streamlined, intuitive, and robust
        dashboard experience that will empower you to do more — with clarity,
        control, and confidence. During this phase, we truly appreciate your
        patience, your curiosity, and your feedback. Your presence here helps
        shape what this platform becomes.
      </p>
      <p className={dx('body-02', 'mb-4')}>
        Stay tuned, explore what’s available so far, and don’t hesitate to reach
        out with any questions or suggestions. Welcome aboard — we’re building
        something great, and we&apos;re glad you’re here for the journey.
      </p>
    </div>
  )
}
