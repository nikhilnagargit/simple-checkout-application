import { useParams } from "next/navigation";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return <div>product with specific {params.id}</div>;
};

export default page;
