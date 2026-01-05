import { landingFeatures } from "@/lib/data";

const Features = () => {
  return (
    <section id="features" className="px-4 py-20 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Everything You Need
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Nx Tree offers a comprehensive suite of features designed to
            simplify monorepo management and enhance developer productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {landingFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col p-6 border border-border rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 text-primary">
                <feature.icon className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
