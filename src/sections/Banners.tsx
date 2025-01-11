import SwiperBanner from "@/components/SwiperBanner";

const Banners = async () => {
  let req = await fetch(`${process.env.SERVERHOST}/api/v1/banners`, {
    next: { revalidate: 300 },
  });
  if (!req.ok) {
    return (
      <div className="w-full mt-8 h-[500px] bg-zinc-600 rounded-md">
        Something Went Wrong !!
      </div>
    );
  }
  let data = await req.json();
  return <SwiperBanner banners={data} />;
};

export default Banners;
