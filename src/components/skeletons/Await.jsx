export default async function Await({ promise, children }) {
  const data = await promise

  return children(data)
}
