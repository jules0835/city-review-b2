export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const countryName = searchParams.get("name")

  if (!countryName) {
    return Response.json({ error: "No country name provided" })
  }

  let formatedCountryName = countryName.toLowerCase().replace(" ", "_")

  formatedCountryName =
    formatedCountryName.charAt(0).toUpperCase() + formatedCountryName.slice(1)

  try {
    const countryCities = await import(
      `../../../../assets/countries/${formatedCountryName}.json`
    )

    return Response.json(countryCities.default)
  } catch (error) {
    return Response.json({ error: "Country not found" })
  }
}
