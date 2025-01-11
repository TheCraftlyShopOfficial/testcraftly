import { NextRequest, NextResponse } from "next/server";

// Define the type for your feedback entries (Optional, if using TypeScript)
type Feedback = {
  name: string;
  username: string;
  feedback: string;
};

export function GET(req: NextRequest) {
  const feedbackData: Feedback[] = [
    {
      name: "Simi Das",
      username: "simi123",
      feedback:
        "I absolutely love the gifts I purchased! They were beautifully wrapped and the quality was top-notch. Highly recommend this shop!",
    },
    {
      name: "Somnath Shaw",
      username: "somnath1990",
      feedback:
        "Great variety of gifts and excellent customer service. My order arrived quickly and exceeded my expectations. Will definitely be shopping here again!",
    },
   
   
  ];

  return NextResponse.json(feedbackData);
}
