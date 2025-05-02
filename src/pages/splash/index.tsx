import { dx } from '@/lib/dx'

export default function SplashPage() {
  return (
    <div className="flex h-full w-full grow flex-col justify-center">
      <div className="w-full max-w-5xl">
        <h1 className={dx('fluid-display-01', 'mb-5')}>
          Welcome to BlendVision CMS
        </h1>
        <p className={dx('fluid-paragraph-01', 'text-muted-foreground')}>
          BlendVision CMS is a powerful content management system that allows
          you to create, edit, and manage your website content with ease.
        </p>
      </div>
    </div>
  )
}
