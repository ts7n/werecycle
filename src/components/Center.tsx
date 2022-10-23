export default function Center({ children }: { children: any }): JSX.Element {
  return (
    <>
      <div className="w-full h-full grid place-items-center">{children}</div>
    </>
  )
}