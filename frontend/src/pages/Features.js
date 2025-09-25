import { CheckCircle, Users, Zap, Shield } from "lucide-react";

function Features() {
  const features = [
    {
      icon: <CheckCircle className="w-8 h-8 text-orange-500" />,
      title: "Smart Task Management",
      description:
        "Organize, prioritize, and track your tasks with intelligent automation",
    },
    {
      icon: <Users className="w-8 h-8 text-pink-500" />,
      title: "Team Collaboration",
      description: "Work seamlessly with your team members in real-time",
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      title: "Lightning Fast",
      description:
        "Experience blazing fast performance with our optimized platform",
    },
    {
      icon: <Shield className="w-8 h-8 text-pink-500" />,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Why Choose
            <span className="bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
              {" "}
              TaskMaster
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the features that make TaskMaster the go-to choice for
            productive teams worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-orange-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Features;
