export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const countryName = searchParams.get("country")
  const cityName = searchParams.get("name")

  if (!countryName || !cityName) {
    return new Response(
      JSON.stringify({ error: "No country or city name provided" }),
      { status: 400 }
    )
  }

  let countryCities = []

  let formattedCountryName = countryName.toLowerCase().replace(" ", "_")
  formattedCountryName =
    formattedCountryName.charAt(0).toUpperCase() + formattedCountryName.slice(1)

  try {
    countryCities = await import(
      `../../../../../assets/countries/${formattedCountryName}.json`
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: "Country not found" }), {
      status: 404,
    })
  }

  if (!countryCities.default) {
    return new Response(
      JSON.stringify({ error: "No cities found for the specified country" }),
      { status: 404 }
    )
  }

  const cities = countryCities.default
  const filteredCities = cities
    .filter((city) => city.toLowerCase().startsWith(cityName.toLowerCase()))
    .slice(0, 10)

  return new Response(JSON.stringify(filteredCities), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
