import { CheckCircle } from "lucide-react";
/* eslint-disable react/no-unescaped-entities */


export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      content:
        "TaskMaster has revolutionized how our team manages projects. Absolutely incredible!",
      avatar: "SJ",
    },
    {
      name: "Mike Chen",
      role: "Developer",
      content:
        "The best task management tool I've ever used. Clean, fast, and intuitive.",
      avatar: "MC",
    },
    {
      name: "Emma Davis",
      role: "Designer",
      content:
        "Beautiful interface and powerful features. It's everything we needed and more!",
      avatar: "ED",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-r from-pink-100 to-orange-100"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Loved by
            <span className="bg-gradient-to-r from-orange-600 to-pink-500 bg-clip-text text-transparent">
              Thousands
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            See what our amazing users have to say
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
