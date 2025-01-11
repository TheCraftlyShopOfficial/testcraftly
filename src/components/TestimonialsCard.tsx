const TestimonialsCard = ({
  name,
  username,
  feedback,
}: {
  name: string;
  username: string;
  feedback: string;
}) => {
  return (
    <>
      <div className="bg-white/15 rounded-lg shadow-lg border max-w-[300px] p-4 backdrop-blur-lg">
        <div className="card_header flex items-center gap-3">
          <div className="">
            <h6 className="font-semibold text-sm">{name}</h6>
            <p className="text-xs text-gray-500">{username}</p>
          </div>
        </div>
        <div className="card_body mt-4">
          <p className="text-sm">{feedback}</p>
        </div>
      </div>
    </>
  );
};

export default TestimonialsCard;
