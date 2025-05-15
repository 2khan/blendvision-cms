export default function TextureBackground() {
  return (
    <div
      style={{
        backgroundImage: 'url(/static/noise.png)',
        backgroundSize: 200
      }}
      className="absolute -z-50 pointer-events-none inset-0 bg-repeat opacity-[0.035]"
    />
  )
}
