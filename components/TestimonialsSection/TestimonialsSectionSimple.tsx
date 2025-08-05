export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-4xl font-bold text-center mb-8">
          Ils parlent de nous sur Instagram
        </h3>
        <p className="text-xl text-gray-600 text-center mb-12">
          Rejoignez des dizaines d'entrepreneurs Réunionnais
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="font-semibold">@romy.malbroukou</p>
            <p className="text-gray-600 mt-2">Un grand merci pour votre travail!</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="font-semibold">@lcda_reunion</p>
            <p className="text-gray-600 mt-2">Excellent service, très professionnel!</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="font-semibold">@restaurantcoteseine974</p>
            <p className="text-gray-600 mt-2">Des résultats incroyables!</p>
          </div>
        </div>
      </div>
    </section>
  )
}