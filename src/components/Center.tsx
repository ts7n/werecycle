export default function Center({ skip, children }: { skip?: boolean, children: any }): JSX.Element {
  return (
    <>
      {
        !skip ?
        <div className="w-full h-full grid place-items-center">{children}</div>
        : <>{children}</>
      }
    </>
  )
}