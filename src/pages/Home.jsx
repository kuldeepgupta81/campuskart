import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();

  const slides = [
    {
      img: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1600",
      title: "CampusKart 🎓",
      subtitle: "Best Deals for Students",
    },
    {
      img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1600",
      title: "Group Buying 💥",
      subtitle: "Save More with Friends",
    },
    {
      img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1600",
      title: "Student Discount 🎯",
      subtitle: "Exclusive Prices",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const safeImg = (e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800";
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* 🔥 HERO */}
      <div className="relative h-[420px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.img}
            onError={safeImg}
            className={`absolute w-full h-full object-cover transition-all duration-1000 ${
              index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-black/60 flex items-center">
          <div className="text-white p-10 max-w-xl">
            <h1 className="text-5xl font-bold">{slides[current].title}</h1>
            <p className="mt-3 text-lg">{slides[current].subtitle}</p>

            <button
              onClick={() => navigate("/products")}
              className="mt-6 bg-gradient-to-r from-purple-600 to-purple-800 px-7 py-3 rounded-xl text-lg hover:scale-110 transition"
            >
              Shop Now 🚀
            </button>
          </div>
        </div>
      </div>

      {/* 🔥 FULL WIDTH CONTENT */}
      <div className="w-full">

        {/* 🔥 BANNERS */}
        <div className="p-6 grid md:grid-cols-3 gap-5">
          {[
            {
              img: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800",
              text: "🔥 Mega Sale",
            },
            {
              img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800",
              text: "👗 Fashion Deals",
            },
            {
              img: "https://images.unsplash.com/photo-1526178613658-3f1622045557?w=800",
              text: "📱 Electronics",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="relative h-[200px] rounded-xl overflow-hidden group shadow-md hover:shadow-xl transition"
            >
              <img
                src={item.img}
                onError={safeImg}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition"></div>

              <div className="absolute bottom-3 left-4 text-white font-semibold text-lg">
                {item.text}
              </div>
            </div>
          ))}
        </div>

        {/* 🔥 WHY */}
        <div className="p-8 bg-white">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Why Choose CampusKart 🤔
          </h2>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              "🚚 Free Delivery",
              "💰 Best Prices",
              "🔒 Secure Payment",
              "📦 Easy Returns",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-100 p-5 rounded-xl hover:bg-purple-100 transition hover:scale-105"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* 🔥 TRENDING */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">🔥 Trending Products</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
              "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
              "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=800",
              "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800",
            ].map((img, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow p-4 transition hover:shadow-2xl hover:-translate-y-2 group"
              >
                <img
                  src={img}
                  onError={safeImg}
                  className="h-40 w-full object-cover rounded mb-3 group-hover:scale-105 transition"
                />

                <h3 className="font-semibold">Item {i + 1}</h3>
                <p className="text-green-600 font-bold">₹{499 + i * 200}</p>

                <button
                  onClick={() => navigate("/products")}
                  className="mt-3 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 🔥 FEATURED */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">💎 Featured Deals</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1000",
                text: "Fashion Sale 🔥",
              },
              {
                img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1000",
                text: "Electronics Deals ⚡",
              },
            ].map((deal, i) => (
              <div
                key={i}
                className="relative h-[250px] rounded-xl overflow-hidden group shadow-md"
              >
                <img
                  src={deal.img}
                  onError={safeImg}
                  className="h-full w-full object-cover group-hover:scale-110 transition"
                />

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xl font-bold">
                  {deal.text}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 🔥 TESTIMONIAL */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-10 text-center mt-8">
        <h2 className="text-3xl font-bold mb-4">❤️ What Students Say</h2>
        <p>"Best platform for cheap deals! Saved a lot 💸"</p>
      </div>

      {/* 🔥 FOOTER */}
      <div className="bg-black text-white p-6 text-center">
        © 2026 CampusKart
      </div>
    </div>
  );
}