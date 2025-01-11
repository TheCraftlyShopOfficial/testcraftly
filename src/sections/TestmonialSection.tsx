import TestimonialsCard from "@/components/TestimonialsCard";

const Testimonials = async () => {
  try {
    let req = await fetch(`${process.env.HOST}/api/feedback`);
    if (!req.ok) {
      throw new Error(`Error fetching data: ${req.statusText}`);
    }
    let testimonials = await req.json();
    return (
      <>
        <section id="users-feedback" className="mt-20 max-w-[900px] mx-auto">
          <div className="bg-white/15 border-rose-300 backdrop-blur-xl mx-auto w-max text-xs py-2 px-4 rounded-full border">
            Feedback
          </div>
          <h4 className="text-center font-bold text-2xl md:text-3xl lg:text-4xl mt-2">
            Public Cheers for Us!
          </h4>
          <p className="text-center text-xs sm:text-base lg:text-normal mt-4">
            Find out how much our users are happy after buying gifts from us!
          </p>

          <div className="feedback-forms mt-16 grid sm:grid-cols-3 gap-6 place-items-center">
            {testimonials &&
              testimonials.map(
                (
                  item: { name: string; username: string; feedback: string },
                  index: number
                ) => {
                  return (
                    <TestimonialsCard
                      key={index}
                      name={item.name}
                      username={item.username}
                      feedback={item.feedback}
                    />
                  );
                }
              )}
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return <div>Failed to load testimonials.</div>;
  }
};

export default Testimonials;
