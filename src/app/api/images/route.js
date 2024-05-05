import { join } from "path"
import { writeFile } from "fs/promises"

export async function POST(request) {
  const data = await request.formData()
  const file = data.get("file")

  if (!file) {
    return new Response("No file found", { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const imageName = `${Date.now()}-picupd.jpg`
  const path = join("public/images/locations", imageName)
  await writeFile(path, buffer)

  return new Response(JSON.stringify({ imagePath: imageName }), {
    status: 200,
  })
}
